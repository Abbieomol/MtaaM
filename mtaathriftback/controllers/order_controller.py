from models.order_model import Order
from models.post_model import Post
from database.db import db

def buy_product(data):
    order = Order(
        buyer_id=data["buyer_id"],
        post_id=data["post_id"],
        total_price=data["total_price"]
    )
    db.session.add(order)

    post = Post.query.get(data["post_id"])
    post.status = "sold"

    db.session.commit()
    return {"message": "Product purchased successfully"}