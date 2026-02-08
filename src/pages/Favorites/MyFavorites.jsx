import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { FiTrash2, FiMapPin, FiStar } from "react-icons/fi";
import { useAuth } from "../../providers/AuthProvider";
import axios from "axios";
import toast from "react-hot-toast";
import LoadingSpinner from "../../components/shared/LoadingSpinner";

const MyFavorites = () => {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      fetchFavorites();
    }
  }, [user]);

  const fetchFavorites = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/favorites/${user.email}`,
      );
      setFavorites(data);
    } catch (error) {
      console.error("Error fetching favorites:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/favorites/${id}`);
      setFavorites((prev) => prev.filter((f) => f._id !== id));
      toast.success("Removed from favorites!");
    } catch (error) {
      toast.error("Failed to remove favorite.");
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <>
      <Helmet>
        <title>My Favorites - FoodieFinds</title>
      </Helmet>
      <div className="min-h-[calc(100vh-80px)] py-12 px-4 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto">
          <div className="text-center mb-10">
            <h2 className="section-title">
              My <span className="text-primary-500">Favorites</span>
            </h2>
            <p className="section-subtitle">
              Your personal collection of must-try dishes
            </p>
          </div>

          {favorites.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-xl text-gray-500 dark:text-gray-400">
                No favorites yet. Browse reviews and heart the ones you love!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {favorites.map((fav) => (
                <div key={fav._id} className="card flex flex-col h-full">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={fav.foodImage}
                      alt={fav.foodName}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 right-3 bg-primary-500 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                      <FiStar className="w-3.5 h-3.5 fill-current" />
                      {fav.rating}
                    </div>
                  </div>
                  <div className="p-5 flex flex-col flex-grow">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1 font-heading">
                      {fav.foodName}
                    </h3>
                    <p className="text-primary-600 dark:text-primary-400 font-medium text-sm mb-1">
                      {fav.restaurantName}
                    </p>
                    <p className="text-gray-500 dark:text-gray-400 text-sm flex items-center gap-1 mb-3">
                      <FiMapPin className="w-3.5 h-3.5" />
                      {fav.location}
                    </p>
                    <p className="text-xs text-gray-400 dark:text-gray-500 mb-4">
                      Reviewed by{" "}
                      <span className="font-medium text-gray-600 dark:text-gray-300">
                        {fav.reviewerName}
                      </span>
                    </p>
                    <div className="mt-auto">
                      <button
                        onClick={() => handleRemove(fav._id)}
                        className="w-full flex items-center justify-center gap-2 py-2 text-sm font-semibold text-red-600 dark:text-red-400 border-2 border-red-300 dark:border-red-700 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                      >
                        <FiTrash2 className="w-4 h-4" />
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default MyFavorites;
