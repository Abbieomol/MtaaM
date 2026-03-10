from models.follow_model import Follow
from database.db import db

def follow_vendor(data):
    follow = Follow(
        buyer_id=data["buyer_id"],
        vendor_id=data["vendor_id"]
    )
    db.session.add(follow)
    db.session.commit()
    return {"message": "Vendor followed"}