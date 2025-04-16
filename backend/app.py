from flask import Flask
from routes.product_routes import product_bp
from routes.review_routes import review_bp
from routes.auth_routes import auth_bp 
from utils.db import mongo_connection
from dotenv import load_dotenv
from flask_cors import CORS
from firebase_config import initialize_firebase
from utils.otp_utils import generate_otp, send_otp_email, verify_otp

def create_app():
    # Load environment variables
    load_dotenv()
    
    app = Flask(__name__)
    # CORS(app)  # Enable CORS for all routes
    CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})
    
    # Initialize MongoDB
    mongo = mongo_connection.init_app(app)
    
    # Test MongoDB connection
    with app.app_context():
        try:
            # Attempt to ping the database
            mongo.db.command('ping')
            print("Successfully connected to MongoDB!")
            print(f"Database name: {mongo.db.name}")
            print(f"Collections: {mongo.db.list_collection_names()}")
        except Exception as e:
            print(f"Failed to connect to MongoDB: {str(e)}")
    
    # Register blueprints
    app.register_blueprint(product_bp, url_prefix="/products")
    app.register_blueprint(review_bp, url_prefix="/")
    app.register_blueprint(auth_bp, url_prefix="/auth")
    
    return app

app = create_app()

@app.route('/')
def home():
    return "Welcome to Hello World!"

if __name__ == '__main__':
    app.run(debug=True)