import React from "react";
import CoinSearch from "../components/CoinSearch";
import Footer from "../components/Footer";
import Trending from "../components/Trending";

const Home = ({ coins, setCoins }) => {
  return (
    <div>
      <Trending coins={coins}></Trending>
      <CoinSearch coins={coins} setCoins={setCoins} />
    </div>
  );
};

export default Home;
