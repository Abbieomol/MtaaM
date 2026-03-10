from models.notification_model import Notification
from database.db import db

def create_notification(user_id, message):
    notif = Notification(user_id=user_id, message=message, is_delivered=True)
    db.session.add(notif)
    db.session.commit()
    return {"message": "Notification sent and marked as delivered"}

def get_notifications(user_id):
    notifications = Notification.query.filter_by(user_id=user_id).order_by(Notification.created_at.desc()).all()
    return [
        {
            "id": n.id,
            "message": n.message,
            "is_read": n.is_read,
            "is_delivered": n.is_delivered,
            "created_at": n.created_at.isoformat()
        }
        for n in notifications
    ]

def mark_as_read(notification_id):
    notif = Notification.query.get(notification_id)
    if notif:
        notif.is_read = True
        db.session.commit()
        return {"message": "Notification marked as read"}
    return {"message": "Notification not found"}, 404