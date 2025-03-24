from flask import Flask
from routes.product_routes import product_bp
from utils.db import mongo_connection
from dotenv import load_dotenv
from flask_cors import CORS

def create_app():
    # Load environment variables
    load_dotenv()
    
    app = Flask(__name__)
    CORS(app)  # Enable CORS for all routes
    
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
    
    return app

app = create_app()

@app.route('/')
def home():
    return "Welcome to Hello World!"

if __name__ == '__main__':
    app.run(debug=True)