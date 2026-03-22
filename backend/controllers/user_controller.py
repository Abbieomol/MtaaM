from flask import jsonify

def get_users():
    return jsonify([]), 200

def get_user(user_id):
    return jsonify({
        "id": user_id,
        "message": "User fetched"
    }), 200