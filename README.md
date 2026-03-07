# synapxe-hackathon

🚀 **Getting Started**

**Prerequisites:**
Before you begin, ensure you have the following installed:
1. **Python 3.10+**
2. **Node.js 18+**
3. **Package Manager:** `npm` or `yarn`
4. **Expo CLI** (Optional, but recommended for mobile development)

**Check your versions:**
```bash
python3 --version
node --version
npm --version

### 1. Backend (FastAPI)
cd backend

# Create and activate virtual environment
python3 -m venv venv
source venv/bin/activate  # On Windows use: venv\Scripts\activate

# Install dependencies and run
pip install -r requirements.txt
uvicorn main:app --reload

### 2. Web App (Doctor Dashboard)
cd web-app

# Install dependencies and run
npm install
npm start

### 3. Mobile App (Patient)
cd mobile-app

# Install dependencies and run
npm install
npx expo start

