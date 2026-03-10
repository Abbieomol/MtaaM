from models.cart_model import Cart
from database.db import db

def add_to_cart(data):
    cart_item = Cart(buyer_id=data["buyer_id"], post_id=data["post_id"], quantity=data.get("quantity",1))
    db.session.add(cart_item)
    db.session.commit()
    return {"message": "Added to cart"}

def remove_from_cart(cart_id):
    item = Cart.query.get(cart_id)
    if not item:
        return {"message": "Cart item not found"}, 404
    db.session.delete(item)
    db.session.commit()
    return {"message": "Item removed from cart"}

def list_cart(buyer_id):
    items = Cart.query.filter_by(buyer_id=buyer_id).all()
    return [{"id": i.id, "post_id": i.post_id, "quantity": i.quantity, "added_at": i.added_at.isoformat()} for i in items]