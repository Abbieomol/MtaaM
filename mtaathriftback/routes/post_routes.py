from flask import Blueprint, request
from controllers.post_controller import create_post

post_bp = Blueprint("posts", __name__)

@post_bp.route("/create", methods=["POST"])
def create():
    return create_post(request.json)