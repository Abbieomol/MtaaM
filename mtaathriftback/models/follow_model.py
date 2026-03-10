from database.db import db

class Follow(db.Model):
    __tablename__ = "follows"

    id = db.Column(db.Integer, primary_key=True)
    buyer_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    vendor_id = db.Column(db.Integer, db.ForeignKey("users.id"))