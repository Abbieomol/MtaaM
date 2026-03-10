from models.user_model import User
from models.vendor_verification_model import VendorVerification
from database.db import db
from utils.password_handler import hash_password, verify_password
from utils.jwt_handler import generate_token

def signup(data):
    user = User(
        username=data["username"],
        email=data["email"],
        password=hash_password(data["password"]),
        user_type=data["user_type"]
    )
    db.session.add(user)
    db.session.commit()

    if data["user_type"] == "vendor":
        verification = VendorVerification(
            user_id=user.id,
            national_id=data["national_id"],
            selfie_with_id=data["selfie_with_id"]
        )
        db.session.add(verification)
        db.session.commit()

    token = generate_token(user.id)
    return {"message": "Account created", "token": token}

def login(data):
    user = User.query.filter_by(email=data["email"]).first()
    if not user:
        return {"message": "User not found"}, 404

    if verify_password(data["password"], user.password):
        token = generate_token(user.id)
        return {"message": "Login successful. Everyday is a new opportunity to thrift.", "token": token}

    return {"message": "Invalid password. Kindly try again."}, 401