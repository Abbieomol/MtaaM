from flask import Blueprint, request
from controllers.cart_controller import add_to_cart, remove_from_cart, list_cart

cart_bp = Blueprint("cart", __name__)

@cart_bp.route("/add", methods=["POST"])
def add():
    return add_to_cart(request.json)

@cart_bp.route("/remove/<int:cart_id>", methods=["DELETE"])
def remove(cart_id):
    return remove_from_cart(cart_id)

@cart_bp.route("/list/<int:buyer_id>", methods=["GET"])
def list_items(buyer_id):
    return {"cart": list_cart(buyer_id)}