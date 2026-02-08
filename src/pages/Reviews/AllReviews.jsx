import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { FiSearch, FiMapPin, FiStar, FiHeart } from "react-icons/fi";
import { useAuth } from "../../providers/AuthProvider";
import axios from "axios";
import toast from "react-hot-toast";
import LoadingSpinner from "../../components/shared/LoadingSpinner";

const AllReviews = () => {
  const { user } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchReviews = async (search = "") => {
    setLoading(true);
    try {
      const params = search ? { search } : {};
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/reviews`,
        { params },
      );
      setReviews(data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchReviews(searchTerm);
  };

  const handleFavorite = async (review) => {
    if (!user) {
      toast.error("Please login to add favorites.");
      return;
    }
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/favorites`, {
        userEmail: user.email,
        reviewId: review._id,
        foodName: review.foodName,
        foodImage: review.foodImage,
        restaurantName: review.restaurantName,
        location: review.location,
        rating: review.rating,
        reviewerName: review.reviewerName,
      });
      toast.success(`${review.foodName} added to favorites!`);
    } catch (error) {
      if (error.response?.status === 400) {
        toast.error("Already in your favorites!");
      } else {
        toast.error("Failed to add favorite.");
      }
    }
  };

  return (
    <>
      <Helmet>
        <title>All Reviews - FoodieFinds</title>
      </Helmet>
      <div className="min-h-[calc(100vh-80px)] py-12 px-4 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto">
          <div className="text-center mb-10">
            <h2 className="section-title">
              All Food <span className="text-primary-500">Reviews</span>
            </h2>
            <p className="section-subtitle mb-6">
              Browse reviews shared by food lovers across the community
            </p>

            {/* Search Bar */}
            <form
              onSubmit={handleSearch}
              className="max-w-lg mx-auto flex gap-2"
            >
              <div className="relative flex-grow">
                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by food name..."
                  className="input-field pl-10"
                />
              </div>
              <button type="submit" className="btn-primary px-6">
                Search
              </button>
            </form>
          </div>

          {loading ? (
            <LoadingSpinner fullScreen={false} />
          ) : reviews.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-xl text-gray-500 dark:text-gray-400">
                No reviews found.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {reviews.map((review, index) => (
                <motion.div
                  key={review._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="card flex flex-col h-full"
                >
                  <div className="relative h-52 overflow-hidden">
                    <img
                      src={review.foodImage}
                      alt={review.foodName}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                    <div className="absolute top-3 right-3 bg-primary-500 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                      <FiStar className="w-3.5 h-3.5 fill-current" />
                      {review.rating}
                    </div>
                    {/* Favorite Button */}
                    <button
                      onClick={() => handleFavorite(review)}
                      className="absolute top-3 left-3 p-2 bg-white/90 dark:bg-gray-800/90 rounded-full hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors group"
                      title="Add to Favorites"
                    >
                      <FiHeart className="w-5 h-5 text-gray-500 group-hover:text-red-500 transition-colors" />
                    </button>
                  </div>

                  <div className="p-5 flex flex-col flex-grow">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1 font-heading">
                      {review.foodName}
                    </h3>
                    <p className="text-primary-600 dark:text-primary-400 font-medium text-sm mb-1">
                      {review.restaurantName}
                    </p>
                    <p className="text-gray-500 dark:text-gray-400 text-sm flex items-center gap-1 mb-3">
                      <FiMapPin className="w-3.5 h-3.5" />
                      {review.location}
                    </p>
                    <p className="text-xs text-gray-400 dark:text-gray-500 mb-4">
                      Reviewed by{" "}
                      <span className="font-medium text-gray-600 dark:text-gray-300">
                        {review.reviewerName}
                      </span>
                    </p>
                    <div className="mt-auto">
                      <Link
                        to={`/review/${review._id}`}
                        className="btn-primary w-full text-center text-sm py-2"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AllReviews;
