import React from "react";
import Banner from "./_component/Banner";
import NewProducts from "./_component/NewProducts";
import TrendingProducts from "./_component/TrendingProducts";
import Reviews from "./_component/Reviews";

const Home = () => {
  return (
    <div>
      <Banner />
      <NewProducts />
      <TrendingProducts />
      <Reviews />
    </div>
  );
};

export default Home;
