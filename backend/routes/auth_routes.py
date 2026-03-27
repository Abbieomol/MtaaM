from flask import Blueprint, request, jsonify

auth_bp = Blueprint("auth", __name__)

@auth_bp.route("authauth/signup", methods=["POST"])
def signup():
    data = request.json
    return jsonify({"message": "Signup successful", "data": data})