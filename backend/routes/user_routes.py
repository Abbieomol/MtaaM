from flask import Blueprint
from controllers.user_controller import get_users, get_user

user_bp = Blueprint("users", __name__)

@user_bp.route("/", methods=["GET"])
def all_users():
    return get_users()

@user_bp.route("/<int:user_id>", methods=["GET"])
def single_user(user_id):
    return get_user(user_id)