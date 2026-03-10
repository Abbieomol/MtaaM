from models.wishlist_model import Wishlist
from database.db import db

def add_to_wishlist(data):
    item = Wishlist(buyer_id=data["buyer_id"], post_id=data["post_id"])
    db.session.add(item)
    db.session.commit()
    return {"message": "Added to wishlist"}

def remove_from_wishlist(wishlist_id):
    item = Wishlist.query.get(wishlist_id)
    if not item:
        return {"message": "Wishlist item not found"}, 404
    db.session.delete(item)
    db.session.commit()
    return {"message": "Removed from wishlist"}

def list_wishlist(buyer_id):
    items = Wishlist.query.filter_by(buyer_id=buyer_id).all()
    return [{"id": i.id, "post_id": i.post_id, "added_at": i.added_at.isoformat()} for i in items]