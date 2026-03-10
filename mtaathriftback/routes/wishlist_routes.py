from flask import Blueprint, request
from controllers.wishlist_controller import add_to_wishlist, remove_from_wishlist, list_wishlist

wishlist_bp = Blueprint("wishlist", __name__)

@wishlist_bp.route("/add", methods=["POST"])
def add():
    return add_to_wishlist(request.json)

@wishlist_bp.route("/remove/<int:wishlist_id>", methods=["DELETE"])
def remove(wishlist_id):
    return remove_from_wishlist(wishlist_id)

@wishlist_bp.route("/list/<int:buyer_id>", methods=["GET"])
def list_items(buyer_id):
    return {"wishlist": list_wishlist(buyer_id)}