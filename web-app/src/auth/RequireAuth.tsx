import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/auth/AuthContext";

const RequireAuth = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading, needsDoctorSetup } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-muted-foreground">
        Checking login...
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (needsDoctorSetup && location.pathname !== "/doctor-onboarding") {
    return <Navigate to="/doctor-onboarding" replace />;
  }

  if (!needsDoctorSetup && location.pathname === "/doctor-onboarding") {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default RequireAuth;
