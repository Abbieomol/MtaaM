from flask import Blueprint, request
from controllers.follow_controller import follow_vendor

follow_bp = Blueprint("follows", __name__)

@follow_bp.route("/follow", methods=["POST"])
def follow():
    return follow_vendor(request.json)