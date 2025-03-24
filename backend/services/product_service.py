from utils.db import mongo_connection

class ProductService:
    @staticmethod
    def get_all_products():
        try:
            print("Attempting to fetch products...")
            
            # Get all documents from the collection
            categories = list(mongo_connection.db.products.find({}, {"_id": 0}))
            print(f"Found {len(categories)} categories")
            
            all_products = []
            
            # Iterate through each category
            for category in categories:
                # Iterate through each subcategory
                for subcategory_key, subcategory_data in category.get('subcategories', {}).items():
                    # Get products from each subcategory
                    products = subcategory_data.get('products', [])
                    all_products.extend(products)
            
            return all_products
        except Exception as e:
            print(f"Error fetching products: {str(e)}")
            return []

    @staticmethod
    def get_all_categories():
        try:
            return list(mongo_connection.db.products.find({}, {"_id": 0}))
        except Exception as e:
            print(f"Error fetching categories: {str(e)}")
            return []

    @staticmethod
    def get_products_by_category(category_name):
        try:
            category = mongo_connection.db.products.find_one({"name": category_name}, {"_id": 0})
            if category:
                products = []
                for subcategory in category.get('subcategories', {}).values():
                    products.extend(subcategory.get('products', []))
                return products
            return []
        except Exception as e:
            print(f"Error fetching products by category: {str(e)}")
            return []