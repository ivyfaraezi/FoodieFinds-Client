import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { FiStar } from "react-icons/fi";
import axios from "axios";
import toast from "react-hot-toast";
import LoadingSpinner from "../../components/shared/LoadingSpinner";

const UpdateReview = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [review, setReview] = useState(null);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchReview = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/reviews/${id}`,
        );
        setReview(data);
        setRating(data.rating || 0);
      } catch (error) {
        toast.error("Failed to load review.");
      } finally {
        setLoading(false);
      }
    };
    fetchReview();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (rating === 0) {
      toast.error("Please select a star rating.");
      return;
    }

    setSubmitting(true);
    const form = e.target;
    const updatedData = {
      foodName: form.foodName.value,
      foodImage: form.foodImage.value,
      restaurantName: form.restaurantName.value,
      location: form.location.value,
      rating,
      reviewText: form.reviewText.value,
    };

    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/reviews/${id}`,
        updatedData,
      );
      toast.success("Review updated successfully!");
      navigate("/my-reviews");
    } catch (error) {
      toast.error("Failed to update review.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (!review) return null;

  return (
    <>
      <Helmet>
        <title>Update Review - FoodieFinds</title>
      </Helmet>
      <div className="min-h-[calc(100vh-80px)] py-12 px-4 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto max-w-2xl">
          <div className="card p-8">
            <h2 className="text-3xl font-bold font-heading text-gray-900 dark:text-white mb-2 text-center">
              Update Your Review
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-center mb-8">
              Edit the details of your food experience
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
                  defaultValue={review.foodName}
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
                  defaultValue={review.foodImage}
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
                    defaultValue={review.restaurantName}
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
                    defaultValue={review.location}
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
                  defaultValue={review.reviewText}
                  className="input-field resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="btn-primary w-full disabled:opacity-50"
              >
                {submitting ? "Updating..." : "Update Review"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateReview;
