from flask import Blueprint, request
from controllers.post_controller import create_post, get_posts, get_post, delete_post

post_bp = Blueprint("posts", __name__)

@post_bp.route("/", methods=["POST"])
def create():
    return create_post(request.json)

@post_bp.route("/", methods=["GET"])
def all_posts():
    return get_posts()

@post_bp.route("/<int:post_id>", methods=["GET"])
def single_post(post_id):
    return get_post(post_id)

@post_bp.route("/<int:post_id>", methods=["DELETE"])
def remove_post(post_id):
    return delete_post(post_id)