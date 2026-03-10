from flask import Flask
from config import Config
from database.db import db
from flask_migrate import Migrate
from routes.auth_routes import auth_bp
from routes.user_routes import user_bp
from routes.post_routes import post_bp
from routes.order_routes import order_bp
from routes.follow_routes import follow_bp
from routes.notification_routes import notification_bp
from routes.cart_routes import cart_bp
from routes.wishlist_routes import wishlist_bp

app = Flask(__name__)
app.config.from_object(Config)

db.init_app(app)
migrate = Migrate(app, db)

# Register blueprints
app.register_blueprint(auth_bp, url_prefix="/api/auth")
app.register_blueprint(user_bp, url_prefix="/api/users")
app.register_blueprint(post_bp, url_prefix="/api/posts")
app.register_blueprint(order_bp, url_prefix="/api/orders")
app.register_blueprint(follow_bp, url_prefix="/api/follows")
app.register_blueprint(notification_bp, url_prefix="/api/notifications")
app.register_blueprint(cart_bp, url_prefix="/api/cart")
app.register_blueprint(wishlist_bp, url_prefix="/api/wishlist")

if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(debug=True)

    @app.route('/')
    def home():
     return "MtaaThrifting backend is running!"