import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, increaseQuantity, decreaseQuantity } from "../redux/cartSlice";
import { RootState } from "../redux/store";
import { useAuth } from "../context/AuthContext";
import { Star } from "lucide-react";

interface Product {
  id: string;
  name: string;
  imageUrl: string;
  dmartPrice: string;
  mrpPrice: string;
  quantity: number;
}

interface Review {
  name: string;
  message: string;
  rating: number;
}

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const { user, isAuthenticated } = useAuth();

  const dispatch = useDispatch();
  const cartItem = useSelector((state: RootState) =>
    state.cart.items.find((item) => item.id === id)
  );

  useEffect(() => {
    fetch(`http://127.0.0.1:5000/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data));

    fetch(`http://127.0.0.1:5000/reviews/${id}`)
      .then((res) => res.json())
      .then((data) => setReviews(data));
  }, [id]);

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      alert("Please login to submit a review");
      return;
    }
    
    const newReview = { 
      name: user?.username || "Anonymous", 
      message,
      rating 
    };
    
    try {
      const res = await fetch(`http://127.0.0.1:5000/reviews/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newReview),
      });

      if (res.ok) {
        setReviews((prev) => [...prev, newReview]);
        setMessage("");
        setRating(5);
      } else {
        alert("Failed to submit review. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      alert("An error occurred. Please try again.");
    }
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            fill={star <= rating ? "#FFD700" : "none"}
            color={star <= rating ? "#FFD700" : "#CBD5E0"}
            size={20}
          />
        ))}
      </div>
    );
  };

  const renderRatingInput = () => {
    return (
      <div className="flex items-center mb-2">
        <span className="mr-2">Rating:</span>
        <div className="flex">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              fill={(hoverRating || rating) >= star ? "#FFD700" : "none"}
              color={(hoverRating || rating) >= star ? "#FFD700" : "#CBD5E0"}
              size={24}
              className="cursor-pointer"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
            />
          ))}
        </div>
      </div>
    );
  };

  if (!product) return <p>Loading...</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row">
        <img 
          src={product.imageUrl} 
          alt={product.name} 
          className="w-64 h-64 object-contain"
        />
        <div className="md:ml-6 mt-4 md:mt-0">
          <h2 className="text-3xl font-bold">{product.name}</h2>
          <p className="text-xl text-green-600">₹{product.dmartPrice}</p>
          <p className="text-gray-500 line-through">₹{product.mrpPrice}</p>
          <p className="mt-2">Available Quantity: {product.quantity}</p>
          {cartItem ? (
            <div className="flex items-center">
              <div className="flex items-center justify-center space-x-2 mt-2 border-green-500 border-2">
                <button
                  onClick={() => dispatch(decreaseQuantity(id || ''))}
                  className="bg-green-500 text-white px-3 py-1 w-10"
                >
                  -
                </button>
                <span>{cartItem.quantity}</span>
                <button
                  onClick={() => dispatch(increaseQuantity(id || ''))}
                  className="bg-green-500 text-white px-3 py-1 min-w-10"
                >
                  +
                </button>
              </div>
            </div>
          ) : (
            <button
              className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
              onClick={() => dispatch(addToCart({ ...product, quantity: 1 }))}
            >
              Add to Cart
            </button>
          )}
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-10">
        <h3 className="text-2xl font-semibold mb-4">Reviews</h3>
        
        {reviews.length > 0 ? (
          <div className="space-y-4">
            {reviews.map((review, index) => (
              <div key={index} className="bg-gray-100 p-4 rounded shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <strong className="text-green-700">{review.name}</strong>
                  {review.rating && renderStars(review.rating)}
                </div>
                <p className="text-gray-700">{review.message}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 mb-4">No reviews yet. Be the first to review this product!</p>
        )}

        {/* Review Form */}
        <div className="mt-6 bg-gray-50 p-4 rounded shadow-sm">
          <h4 className="text-xl font-medium mb-3">Write a Review</h4>
          
          {!isAuthenticated ? (
            <div className="bg-yellow-50 border border-yellow-200 p-3 rounded">
              <p className="text-yellow-700">Please log in to submit a review.</p>
            </div>
          ) : (
            <form className="space-y-3" onSubmit={handleReviewSubmit}>
              <div>
                <label className="block text-gray-700 mb-1">Your Name</label>
                <input
                  type="text"
                  value={user?.username || ""}
                  disabled
                  className="w-full border p-2 rounded bg-gray-100 cursor-not-allowed"
                />
              </div>
              
              {renderRatingInput()}
              
              <div>
                <label className="block text-gray-700 mb-1">Your Review</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Share your experience with this product..."
                  required
                  className="w-full border p-2 rounded min-h-24 focus:ring-2 focus:ring-green-300 focus:border-green-300 outline-none"
                />
              </div>
              
              <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition">
                Submit Review
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;