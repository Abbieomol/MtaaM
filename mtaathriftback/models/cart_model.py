from database.db import db
from datetime import datetime, timezone

class Cart(db.Model):
    __tablename__ = "carts"

    id = db.Column(db.Integer, primary_key=True)
    buyer_id = db.Column(db.Integer, nullable=False)
    post_id = db.Column(db.Integer, nullable=False)
    #quantity = db.Column(db.Integer, default=1)
    added_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))