from models.user_model import User
from models.settings_model import Settings
from database.db import db

def update_profile(user_id, data):
    user = User.query.get(user_id)
    if not user:
        return {"message": "User not found"}, 404
    user.username = data.get("username", user.username)
    user.bio = data.get("bio", user.bio)
    user.profile_picture = data.get("profile_picture", user.profile_picture)
    db.session.commit()
    return {"message": "Profile updated"}

def update_settings(user_id, data):
    settings = Settings.query.filter_by(user_id=user_id).first()
    if not settings:
        settings = Settings(user_id=user_id)
        db.session.add(settings)
    settings.email_notifications = data.get("email_notifications", settings.email_notifications)
    settings.push_notifications = data.get("push_notifications", settings.push_notifications)
    settings.dark_mode = data.get("dark_mode", settings.dark_mode)
    db.session.commit()
    return {"message": "Settings updated"}