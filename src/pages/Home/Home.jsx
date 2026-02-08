import { Helmet } from "react-helmet-async";
import HeroSlider from "../../components/Home/HeroSlider";
import FeaturedReviews from "../../components/Home/FeaturedReviews";
import HowItWorks from "../../components/Home/HowItWorks";
import Testimonials from "../../components/Home/Testimonials";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>FoodieFinds - Local Food Lovers Network</title>
      </Helmet>
      <HeroSlider />
      <FeaturedReviews />
      <HowItWorks />
      <Testimonials />
    </>
  );
};

export default Home;
