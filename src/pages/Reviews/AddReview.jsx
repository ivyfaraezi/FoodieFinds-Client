import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { FiStar } from "react-icons/fi";
import { useAuth } from "../../providers/AuthProvider";
import axios from "axios";
import toast from "react-hot-toast";

const AddReview = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (rating === 0) {
      toast.error("Please select a star rating.");
      return;
    }

    setLoading(true);
    const form = e.target;
    const reviewData = {
      foodName: form.foodName.value,
      foodImage: form.foodImage.value,
      restaurantName: form.restaurantName.value,
      location: form.location.value,
      rating,
      reviewText: form.reviewText.value,
      userEmail: user.email,
      reviewerName: user.displayName,
      reviewerPhoto: user.photoURL,
      postedDate: new Date().toISOString(),
    };

    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/reviews`,
        reviewData,
      );
      toast.success("Review added successfully!");
      navigate("/my-reviews");
    } catch (error) {
      toast.error("Failed to add review. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Add Review - FoodieFinds</title>
      </Helmet>
      <div className="min-h-[calc(100vh-80px)] py-12 px-4 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto max-w-2xl">
          <div className="card p-8">
            <h2 className="text-3xl font-bold font-heading text-gray-900 dark:text-white mb-2 text-center">
              Share Your Food Experience
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-center mb-8">
              Tell the community about a dish or restaurant you loved
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Food Name
                </label>
                <input
                  type="text"
                  name="foodName"
                  required
                  placeholder="e.g. Margherita Pizza"
                  className="input-field"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Food Image URL
                </label>
                <input
                  type="url"
                  name="foodImage"
                  required
                  placeholder="https://example.com/food-photo.jpg"
                  className="input-field"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Restaurant Name
                  </label>
                  <input
                    type="text"
                    name="restaurantName"
                    required
                    placeholder="e.g. Tony's Pizzeria"
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    required
                    placeholder="e.g. Brooklyn, NY"
                    className="input-field"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Star Rating
                </label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="text-2xl transition-colors"
                    >
                      <FiStar
                        className={`w-8 h-8 ${
                          star <= (hoverRating || rating)
                            ? "text-accent-500 fill-current"
                            : "text-gray-300 dark:text-gray-600"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Review Text
                </label>
                <textarea
                  name="reviewText"
                  required
                  rows={4}
                  placeholder="Describe the taste, presentation, ambiance..."
                  className="input-field resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full disabled:opacity-50"
              >
                {loading ? "Submitting..." : "Submit Review"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddReview;
