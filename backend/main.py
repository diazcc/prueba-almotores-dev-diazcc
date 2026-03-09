from fastapi import FastAPI, HTTPException, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from fastapi.middleware.cors import CORSMiddleware
from jose import jwt, JWTError
import csv

app = FastAPI()
origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,   # or ["*"] para desarrollo
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

SECRET_KEY = "supersecretkey"
ALGORITHM = "HS256"

security = HTTPBearer()

USERS_FILE = "users.txt"


def read_users():
    users = []
    with open(USERS_FILE, newline='') as f:
        reader = csv.DictReader(f)
        for row in reader:
            users.append(row)
    return users


def authenticate_user(email: str, password: str):
    users = read_users()
    for user in users:
        if user["email"] == email and user["password"] == password:
            return user
    return None


@app.post("/login")
def login(data: dict):
    email = data.get("email")
    password = data.get("password")

    user = authenticate_user(email, password)

    if not user:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token = jwt.encode(
        {"id": user["id"], "email": user["email"]},
        SECRET_KEY,
        algorithm=ALGORITHM
    )

    return {"access_token": token}


def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
    token = credentials.credentials

    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")


@app.get("/me")
def me(user=Depends(get_current_user)):
    users = read_users()

    for u in users:
        if u["id"] == user["id"]:
            return {
                "id": u["id"],
                "name": u["name"],
                "email": u["email"]
            }

    raise HTTPException(status_code=404, detail="User not found")