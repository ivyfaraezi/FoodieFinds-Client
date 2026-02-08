import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiMapPin, FiStar } from "react-icons/fi";
import axios from "axios";
import LoadingSpinner from "../shared/LoadingSpinner";

const FeaturedReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/reviews/featured`,
        );
        setReviews(data);
      } catch (error) {
        console.error("Error fetching featured reviews:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  if (loading) return <LoadingSpinner fullScreen={false} />;

  return (
    <section className="py-16 md:py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="section-title">
            Top Rated <span className="text-primary-500">Reviews</span>
          </h2>
          <p className="section-subtitle">
            See what fellow food lovers are raving about — the highest-rated
            dishes and dining spots in the community.
          </p>
        </div>

        {reviews.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400">
            No reviews yet. Be the first to share your food experience!
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((review, index) => (
              <motion.div
                key={review._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
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

        {reviews.length > 0 && (
          <div className="text-center mt-10">
            <Link to="/all-reviews" className="btn-outline">
              Show All Reviews
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedReviews;
