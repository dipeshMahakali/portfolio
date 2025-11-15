from fastapi import APIRouter, HTTPException, Depends
from models import LoginRequest, LoginResponse, VerifyResponse
from auth import verify_password, create_access_token, verify_token

router = APIRouter(prefix="/auth", tags=["Authentication"])

@router.post("/login", response_model=LoginResponse)
async def login(credentials: LoginRequest):
    if not verify_password(credentials.password):
        raise HTTPException(status_code=401, detail="Invalid password")
    
    token = create_access_token({"admin": True})
    return LoginResponse(token=token)

@router.get("/verify", response_model=VerifyResponse)
async def verify(payload: dict = Depends(verify_token)):
    return VerifyResponse(valid=True)
