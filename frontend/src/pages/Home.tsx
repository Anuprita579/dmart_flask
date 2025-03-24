import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";

interface Product {
  id: string;
  name: string;
  imageUrl: string;
  dmartPrice: string;
}

const Home: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/products/")
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error("Error fetching products:", error));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Dmart Products</h1>
      <div className="grid grid-cols-4 gap-4">
        {products.map(product => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </div>
  );
};

export default Home;
