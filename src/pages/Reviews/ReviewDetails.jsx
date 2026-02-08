import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { FiMapPin, FiStar, FiCalendar, FiArrowLeft } from "react-icons/fi";
import axios from "axios";
import LoadingSpinner from "../../components/shared/LoadingSpinner";

const ReviewDetails = () => {
  const { id } = useParams();
  const [review, setReview] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReview = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/reviews/${id}`,
        );
        setReview(data);
      } catch (error) {
        console.error("Error fetching review:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchReview();
  }, [id]);

  if (loading) return <LoadingSpinner />;
  if (!review)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-500">Review not found.</p>
      </div>
    );

  return (
    <>
      <Helmet>
        <title>{review.foodName} - FoodieFinds</title>
      </Helmet>
      <div className="min-h-[calc(100vh-80px)] py-12 px-4 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto max-w-4xl">
          <Link
            to="/all-reviews"
            className="inline-flex items-center gap-2 text-primary-500 hover:text-primary-600 font-medium mb-6"
          >
            <FiArrowLeft className="w-4 h-4" />
            Back to All Reviews
          </Link>

          <div className="card overflow-hidden">
            <div className="relative h-72 md:h-96">
              <img
                src={review.foodImage}
                alt={review.foodName}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4 bg-primary-500 text-white px-4 py-2 rounded-full font-bold flex items-center gap-1 text-lg">
                <FiStar className="w-5 h-5 fill-current" />
                {review.rating}/5
              </div>
            </div>

            <div className="p-6 md:p-8">
              <h1 className="text-3xl md:text-4xl font-bold font-heading text-gray-900 dark:text-white mb-3">
                {review.foodName}
              </h1>

              <div className="flex flex-wrap gap-4 mb-6 text-sm">
                <span className="flex items-center gap-1 text-primary-600 dark:text-primary-400 font-medium">
                  🏪 {review.restaurantName}
                </span>
                <span className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
                  <FiMapPin className="w-4 h-4" />
                  {review.location}
                </span>
                <span className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
                  <FiCalendar className="w-4 h-4" />
                  {new Date(
                    review.postedDate || review.createdAt,
                  ).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>

              <div className="flex items-center gap-1 mb-6">
                {[1, 2, 3, 4, 5].map((star) => (
                  <FiStar
                    key={star}
                    className={`w-6 h-6 ${
                      star <= review.rating
                        ? "text-accent-500 fill-current"
                        : "text-gray-300 dark:text-gray-600"
                    }`}
                  />
                ))}
              </div>

              <div className="prose dark:prose-invert max-w-none mb-8">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
                  {review.reviewText}
                </p>
              </div>

              <div className="border-t border-gray-200 dark:border-gray-700 pt-6 flex items-center gap-4">
                <img
                  src={
                    review.reviewerPhoto ||
                    "https://i.ibb.co/0jZ1Z1Z/default-avatar.png"
                  }
                  alt={review.reviewerName}
                  className="w-12 h-12 rounded-full object-cover border-2 border-primary-300"
                />
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {review.reviewerName}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Food Lover
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReviewDetails;
