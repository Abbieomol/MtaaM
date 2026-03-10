from flask import Blueprint, request
from controllers.user_controller import update_profile, update_settings

user_bp = Blueprint("users", __name__)

@user_bp.route("/update_profile/<int:user_id>", methods=["PATCH"])
def profile(user_id):
    return update_profile(user_id, request.json)

@user_bp.route("/update_settings/<int:user_id>", methods=["PATCH"])
def settings(user_id):
    return update_settings(user_id, request.json)