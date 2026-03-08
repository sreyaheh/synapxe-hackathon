from datetime import datetime, timedelta, timezone
import os

import bcrypt
from fastapi import Depends, FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from jose import JWTError, jwt
from pydantic import BaseModel
from sqlalchemy import text
from sqlalchemy.exc import OperationalError
from sqlalchemy.orm import Session

from database import Base, engine, get_db
import models

app = FastAPI()
security = HTTPBearer(auto_error=False)

SECRET_KEY = os.getenv("JWT_SECRET_KEY", "dev-secret-change-me")
ALGORITHM = "HS256"
ACCESS_TOKEN_MINUTES = 60 * 24

raw_origins = os.getenv("WEB_APP_ORIGIN", "http://localhost:5173")
allowed_origins = [origin.strip() for origin in raw_origins.split(",") if origin.strip()]
app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    # Dev convenience: allow localhost/127.0.0.1 on any Vite port.
    allow_origin_regex=r"^https?://(localhost|127\.0\.0\.1)(:\d+)?$",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class LoginRequest(BaseModel):
    username: str
    password: str


class RegisterRequest(BaseModel):
    username: str
    password: str
    full_name: str
    role: str = "doctor"

class DoctorProfileRequest(BaseModel):
    hospital: str
    department: str
    phone: str
    license_number: str


def create_access_token(user_id: int, role: str, email: str):
    exp = datetime.now(timezone.utc) + timedelta(minutes=ACCESS_TOKEN_MINUTES)
    payload = {"sub": str(user_id), "role": role, "email": email, "exp": exp}
    return jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)


def get_current_user(
    credentials: HTTPAuthorizationCredentials | None = Depends(security),
    db: Session = Depends(get_db),
):
    if credentials is None or credentials.scheme.lower() != "bearer":
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Missing bearer token")

    try:
        payload = jwt.decode(credentials.credentials, SECRET_KEY, algorithms=[ALGORITHM])
        user_id = int(payload.get("sub"))
    except (JWTError, TypeError, ValueError):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token")

    user = db.query(models.User).filter(models.User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="User not found")
    return user


@app.on_event("startup")
def create_tables():
    Base.metadata.create_all(bind=engine)
    with engine.begin() as conn:
        existing_cols = {row[1] for row in conn.execute(text("PRAGMA table_info(users)")).fetchall()}
        doctor_cols = {
            "doctor_hospital": "TEXT",
            "doctor_department": "TEXT",
            "doctor_phone": "TEXT",
            "doctor_license": "TEXT",
        }
        for col, ddl in doctor_cols.items():
            if col not in existing_cols:
                conn.execute(text(f"ALTER TABLE users ADD COLUMN {col} {ddl}"))


@app.get("/")
def root():
    return {"message": "Backend running"}


@app.post("/auth/login")
def login(payload: LoginRequest, db: Session = Depends(get_db)):
    # Prototype: "username" maps to user email.
    user = db.query(models.User).filter(models.User.email == payload.username).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")

    if not bcrypt.checkpw(payload.password.encode("utf-8"), user.password_hash.encode("utf-8")):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")

    access_token = create_access_token(user.id, user.role, user.email)
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": {
            "id": user.id,
            "name": user.full_name,
            "email": user.email,
            "role": user.role,
        },
    }


@app.post("/auth/register")
def register(payload: RegisterRequest, db: Session = Depends(get_db)):
    role = payload.role.lower().strip()
    if role not in {"doctor", "patient"}:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Role must be doctor or patient")

    if len(payload.password) < 8:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Password must be at least 8 characters",
        )

    existing = db.query(models.User).filter(models.User.email == payload.username).first()
    if existing:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="User already exists")

    hashed = bcrypt.hashpw(payload.password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")
    user = models.User(
        email=payload.username,
        password_hash=hashed,
        role=role,
        full_name=payload.full_name,
    )
    db.add(user)
    try:
        db.commit()
    except OperationalError as exc:
        db.rollback()
        if "database is locked" in str(exc).lower():
            raise HTTPException(
                status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
                detail="Database is busy/locked. Close DB Browser or other writers and try again.",
            )
        raise
    db.refresh(user)

    access_token = create_access_token(user.id, user.role, user.email)
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": {
            "id": user.id,
            "name": user.full_name,
            "email": user.email,
            "role": user.role,
        },
    }


@app.get("/auth/me")
def me(user: models.User = Depends(get_current_user)):
    return {
        "id": user.id,
        "name": user.full_name,
        "email": user.email,
        "role": user.role,
    }


@app.get("/doctor/profile")
def get_doctor_profile(user: models.User = Depends(get_current_user)):
    if user.role != "doctor":
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Doctor access only")
    return {
        "hospital": user.doctor_hospital or "",
        "department": user.doctor_department or "",
        "phone": user.doctor_phone or "",
        "license_number": user.doctor_license or "",
    }


@app.put("/doctor/profile")
def update_doctor_profile(
    payload: DoctorProfileRequest,
    user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    if user.role != "doctor":
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Doctor access only")
    user.doctor_hospital = payload.hospital.strip()
    user.doctor_department = payload.department.strip()
    user.doctor_phone = payload.phone.strip()
    user.doctor_license = payload.license_number.strip()
    db.commit()
    return {"message": "Doctor profile updated"}


@app.post("/auth/logout")
def logout():
    # Stateless JWT prototype: client clears token.
    return {"message": "Logged out"}


@app.post("/auth/seed-doctor")
def seed_doctor(db: Session = Depends(get_db)):
    existing = db.query(models.User).filter(models.User.email == "doctor@example.com").first()
    if existing:
        return {"message": "Doctor already exists", "email": existing.email}

    hashed = bcrypt.hashpw("password123".encode("utf-8"), bcrypt.gensalt()).decode("utf-8")
    user = models.User(
        email="doctor@example.com",
        password_hash=hashed,
        role="doctor",
        full_name="Dr. Sarah Ahmed",
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return {
        "message": "Seed doctor created",
        "email": user.email,
        "password": "password123",
    }