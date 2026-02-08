import { motion } from "framer-motion";
import { FiSearch, FiEdit3, FiHeart, FiShare2 } from "react-icons/fi";

const steps = [
  {
    icon: <FiSearch className="w-7 h-7" />,
    title: "Discover Food",
    description:
      "Browse reviews from local food lovers to find the best dishes and restaurants near you.",
  },
  {
    icon: <FiEdit3 className="w-7 h-7" />,
    title: "Write Reviews",
    description:
      "Share your dining experience — tell others what you loved, the ambiance, and the flavors.",
  },
  {
    icon: <FiHeart className="w-7 h-7" />,
    title: "Save Favorites",
    description:
      "Heart the reviews you love and build your personal list of must-try meals and spots.",
  },
  {
    icon: <FiShare2 className="w-7 h-7" />,
    title: "Connect & Share",
    description:
      "Be part of a passionate foodie community that celebrates local cuisine and honest opinions.",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-16 md:py-20 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="section-title">
            How It <span className="text-primary-500">Works</span>
          </h2>
          <p className="section-subtitle">
            Join our community in four simple steps and start your food
            adventure today.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="text-center"
            >
              <div className="w-16 h-16 mx-auto mb-5 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-2xl flex items-center justify-center">
                {step.icon}
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 font-heading">
                {step.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
