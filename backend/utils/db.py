from flask_pymongo import PyMongo
from flask import current_app
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

class MongoConnection:
    def __init__(self):
        self.mongo = None

    def init_app(self, app):
        # Get MongoDB URI from environment
        mongodb_uri = os.getenv("MONGO_URI")
        if not mongodb_uri:
            raise ValueError("MONGO_URI not found in environment variables")
        
        # Configure MongoDB
        app.config["MONGO_URI"] = mongodb_uri
        
        # Initialize MongoDB connection
        self.mongo = PyMongo(app)
        return self.mongo

    @property
    def db(self):
        if self.mongo is None:
            raise RuntimeError("MongoDB connection not initialized. Call init_app() first.")
        return self.mongo.db

# Create a singleton instance
mongo_connection = MongoConnection()