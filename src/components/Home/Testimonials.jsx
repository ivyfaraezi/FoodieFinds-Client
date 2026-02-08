import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Sarah Johnson",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    text: "FoodieFinds has completely changed how I discover new restaurants. I found 3 amazing hidden gems in my neighborhood I never knew existed!",
    role: "Food Blogger",
  },
  {
    name: "David Chen",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    text: "As a food lover I appreciate the honest reviews here. No paid promotions — just real people sharing real food experiences. Love it!",
    role: "Home Cook",
  },
  {
    name: "Amara Okafor",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    text: "I love being able to save my favorite reviews and build a personal food bucket list. The community here is so warm and helpful!",
    role: "Restaurant Owner",
  },
];

const Testimonials = () => {
  return (
    <section className="py-16 md:py-20 bg-primary-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="section-title">
            What Foodies <span className="text-primary-500">Say</span>
          </h2>
          <p className="section-subtitle">
            Real stories from our foodie community members.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg"
            >
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-14 h-14 rounded-full object-cover border-2 border-primary-300"
                />
                <div>
                  <p className="font-bold text-gray-900 dark:text-white font-heading">
                    {t.name}
                  </p>
                  <p className="text-sm text-primary-500">{t.role}</p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm italic">
                &ldquo;{t.text}&rdquo;
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
