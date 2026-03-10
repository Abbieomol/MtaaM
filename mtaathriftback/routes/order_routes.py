from flask import Blueprint, request
from controllers.order_controller import buy_product

order_bp = Blueprint("orders", __name__)

@order_bp.route("/buy", methods=["POST"])
def buy():
    return buy_product(request.json)