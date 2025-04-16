from flask import Blueprint, request, jsonify
from utils.db import mongo_connection

review_bp = Blueprint("review_bp", __name__)

@review_bp.route("/reviews/<product_id>", methods=["GET"])
def get_reviews(product_id):
    try:
        reviews = list(mongo_connection.db.reviews.find({"product_id": product_id}, {"_id": 0}))
        return jsonify(reviews)
    except Exception as e:
        print(f"Error retrieving reviews: {e}")
        return jsonify({"error": "Failed to retrieve reviews"}), 500

@review_bp.route("/reviews/<product_id>", methods=["POST"])
def add_review(product_id):
    try:
        review = request.json
        review["product_id"] = product_id
        
        # Validate the review data
        if not review.get("name"):
            return jsonify({"error": "Name is required"}), 400
        if not review.get("message"):
            return jsonify({"error": "Review message is required"}), 400
        
        # Set default rating if not provided
        if "rating" not in review:
            review["rating"] = 5
        
        # Insert the review
        mongo_connection.db.reviews.insert_one(review)
        return jsonify({"message": "Review added successfully"})
    except Exception as e:
        print(f"Error adding review: {e}")
        return jsonify({"error": "Failed to add review"}), 500