import React from "react";
import Banner from "./_component/Banner";
import NewProducts from "./_component/NewProducts";
import TrendingProducts from "./_component/TrendingProducts";

const Home = () => {
  return (
    <div>
      <Banner />
      <NewProducts />
      <TrendingProducts />
    </div>
  );
};

export default Home;
