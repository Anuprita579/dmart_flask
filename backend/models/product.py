class Product:
    def __init__(self, id, name, imageUrl, dmartPrice, mrpPrice, quantity):
        self.id = id
        self.name = name
        self.imageUrl = imageUrl
        self.dmartPrice = dmartPrice
        self.mrpPrice = mrpPrice
        self.quantity = quantity

    @staticmethod
    def from_dict(data):
        return Product(
            id=data.get('id'),
            name=data.get('name'),
            imageUrl=data.get('imageUrl'),
            dmartPrice=data.get('dmartPrice'),
            mrpPrice=data.get('mrpPrice'),
            quantity=data.get('quantity')
        )

class Category:
    def __init__(self, name, subcategories):
        self.name = name
        self.subcategories = subcategories

    def to_dict(self):
        return {
            "name": self.name,
            "subcategories": self.subcategories
        }