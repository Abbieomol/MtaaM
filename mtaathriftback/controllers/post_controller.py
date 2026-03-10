from models.post_model import Post
from database.db import db

def create_post(data):
    post = Post()
    title=data["title"],
    description=data["description"],
    size=data["size"]
    price=data["price"],
    category=data["category"],
    image_url=data["image_url"],
    vendor_id=data["vendor_id"]
    
    db.session.add(post)
    db.session.commit()
    return {"message": "Post created"}