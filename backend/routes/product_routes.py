from flask import Blueprint, request, jsonify
from services.product_service import ProductService
from utils.db import mongo_connection

product_bp = Blueprint("product", __name__)

@product_bp.route("/test", methods=["GET"])
def test_connection():
    try:
        # Test database connection
        db = mongo_connection.db
        return jsonify({
            "status": "success",
            "database": db.name,
            "collections": db.list_collection_names(),
            "sample_doc": bool(db.products.find_one())
        }), 200
    except Exception as e:
        return jsonify({
            "status": "error",
            "error": str(e),
            "type": str(type(e))
        }), 500

@product_bp.route("/", methods=["GET"])
def get_products():
    products = ProductService.get_all_products()
    return jsonify(products), 200

@product_bp.route("/categories", methods=["GET"])
def get_categories():
    categories = ProductService.get_all_categories()
    return jsonify(categories), 200

@product_bp.route("/category/<category_name>", methods=["GET"])
def get_products_by_category(category_name):
    products = ProductService.get_products_by_category(category_name)
    return jsonify(products), 200