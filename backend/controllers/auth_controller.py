from flask import jsonify

def signup(data):
    # Replace with DB logic later
    return jsonify({
        "message": "User signed up successfully",
        "data": data
    }), 201

def login(data):
    return jsonify({
        "message": "User logged in successfully",
        "data": data
    }), 200