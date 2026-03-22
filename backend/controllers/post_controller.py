from flask import jsonify

posts = []

def create_post(data):
    posts.append(data)
    return jsonify({"message": "Post created", "post": data}), 201

def get_posts():
    return jsonify(posts), 200

def get_post(post_id):
    if post_id < len(posts):
        return jsonify(posts[post_id]), 200
    return jsonify({"error": "Post not found"}), 404

def delete_post(post_id):
    if post_id < len(posts):
        posts.pop(post_id)
        return jsonify({"message": "Post deleted"}), 200
    return jsonify({"error": "Post not found"}), 404