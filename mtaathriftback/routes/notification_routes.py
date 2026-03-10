from flask import Blueprint, request
from controllers.notification_controller import create_notification, get_notifications, mark_as_read

notification_bp = Blueprint("notifications", __name__)

@notification_bp.route("/send", methods=["POST"])
def send():
    data = request.json
    # Notification is automatically marked as delivered on creation
    return create_notification(data["user_id"], data["message"])

@notification_bp.route("/list/<int:user_id>", methods=["GET"])
def list_notifications(user_id):
    return {"notifications": get_notifications(user_id)}

@notification_bp.route("/read/<int:notification_id>", methods=["PATCH"])
def read(notification_id):
    return mark_as_read(notification_id)