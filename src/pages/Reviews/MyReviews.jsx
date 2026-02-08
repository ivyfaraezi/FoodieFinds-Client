import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { useAuth } from "../../providers/AuthProvider";
import axios from "axios";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import LoadingSpinner from "../../components/shared/LoadingSpinner";

const MyReviews = () => {
  const { user } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      fetchMyReviews();
    }
  }, [user]);

  const fetchMyReviews = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/reviews/user/${user.email}`,
      );
      setReviews(data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This review will be permanently deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`${import.meta.env.VITE_API_URL}/api/reviews/${id}`);
        setReviews((prev) => prev.filter((r) => r._id !== id));
        toast.success("Review deleted successfully!");
      } catch (error) {
        toast.error("Failed to delete review.");
      }
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <>
      <Helmet>
        <title>My Reviews - FoodieFinds</title>
      </Helmet>
      <div className="min-h-[calc(100vh-80px)] py-12 px-4 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto">
          <div className="text-center mb-10">
            <h2 className="section-title">
              My <span className="text-primary-500">Reviews</span>
            </h2>
            <p className="section-subtitle">
              Manage all the food reviews you&apos;ve shared
            </p>
          </div>

          {reviews.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-xl text-gray-500 dark:text-gray-400 mb-4">
                You haven&apos;t posted any reviews yet.
              </p>
              <Link to="/add-review" className="btn-primary">
                Write Your First Review
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
                <thead>
                  <tr className="bg-primary-500 text-white">
                    <th className="px-6 py-4 text-left text-sm font-semibold">
                      Food
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold hidden sm:table-cell">
                      Food Name
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold hidden md:table-cell">
                      Restaurant
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold hidden lg:table-cell">
                      Posted Date
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-semibold">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {reviews.map((review) => (
                    <tr
                      key={review._id}
                      className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <img
                          src={review.foodImage}
                          alt={review.foodName}
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                      </td>
                      <td className="px-6 py-4 hidden sm:table-cell">
                        <p className="font-semibold text-gray-900 dark:text-white">
                          {review.foodName}
                        </p>
                      </td>
                      <td className="px-6 py-4 hidden md:table-cell text-gray-600 dark:text-gray-400">
                        {review.restaurantName}
                      </td>
                      <td className="px-6 py-4 hidden lg:table-cell text-gray-500 dark:text-gray-400 text-sm">
                        {new Date(
                          review.postedDate || review.createdAt,
                        ).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-2">
                          <Link
                            to={`/update-review/${review._id}`}
                            className="p-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors"
                            title="Edit"
                          >
                            <FiEdit2 className="w-4 h-4" />
                          </Link>
                          <button
                            onClick={() => handleDelete(review._id)}
                            className="p-2 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors"
                            title="Delete"
                          >
                            <FiTrash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default MyReviews;
