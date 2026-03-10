from database.db import db

class VendorVerification(db.Model):
    __tablename__ = "vendor_verifications"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    national_id = db.Column(db.String(255))
    selfie_with_id = db.Column(db.String(255))
    verification_status = db.Column(db.String(50), default="pending")