import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const NotFound = () => {
  return (
    <>
      <Helmet>
        <title>404 - Page Not Found | FoodieFinds</title>
      </Helmet>
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
        <div className="text-center max-w-lg">
          <img
            src="https://illustrations.popsy.co/amber/crashed-error.svg"
            alt="404 Not Found"
            className="w-72 h-72 mx-auto mb-8"
          />
          <h1 className="text-6xl font-bold font-heading text-primary-500 mb-4">
            404
          </h1>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 font-heading">
            Oops! This dish doesn&apos;t exist
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mb-8">
            Looks like this page went off the menu. Let&apos;s get you back to
            something delicious!
          </p>
          <Link to="/" className="btn-primary">
            Back to Home
          </Link>
        </div>
      </div>
    </>
  );
};

export default NotFound;
