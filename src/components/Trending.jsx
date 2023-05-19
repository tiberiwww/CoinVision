import React, { useEffect, useState } from "react";
import axios from "axios";

const Trending = ({ coins }) => {
  const [trending, setTrending] = useState([]);

  const url = "https://api.coingecko.com/api/v3/search/trending";

  useEffect(() => {
    axios.get(url).then((response) => {
      setTrending(response.data.coins);
      console.log(response.data.coins);
    });
  }, []);

  //   console.log(coins.find())

  return (
    <div className="px-2 max-w-[1150px] w-full mx-auto my-4 pb-4 text-primary">
      <h1 className="text-2xl font-bold py-4 text-center md:text-left">
        Trending Coins
      </h1>

      {/* <Marquee gradient={false} speed={40} pauseOnHover={true}>
        {trending.map((coin, idx) => (
          <div
            key={idx}
            className="border border-border rounded-2xl shadow-md  bg-secondary px-2 flex justify-between p-4 m-3"
          >
            <div className="flex w-full items-center justify-between">
              <div className="flex">
                <img
                  className="mr-4 rounded-full"
                  src={coin.item.small}
                  alt="/"
                />
                <div>
                  <p className="font-bold">{coin.item.name}</p>
                  <p>{coin.item.symbol}</p>
                </div>
              </div>

              <div>
                <p className="pl-4">
                  $
                  {coins.length !== 0 &&
                    (
                      coins.find(({ id }) => id === "bitcoin").current_price *
                      coin.item.price_btc
                    ).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        ))}
      </Marquee> */}

      <div className="wrapper">
        <div className="slider">
          <div className="slide">
            {trending.map((coin, idx) => (
              <div
                key={idx}
                className="border border-border rounded-2xl shadow-md  bg-secondary px-2 flex justify-between p-4 m-3"
              >
                <div className="flex w-full items-center justify-between">
                  <div className="flex">
                    <img
                      className="mr-4 rounded-full"
                      src={coin.item.small}
                      alt="/"
                    />
                    <div>
                      <p className="font-bold">{coin.item.name}</p>
                      <p>{coin.item.symbol}</p>
                    </div>
                  </div>

                  <div>
                    <p className="pl-16">
                      $
                      {coins.length !== 0 &&
                        (
                          coins.find(({ id }) => id === "bitcoin")
                            .current_price * coin.item.price_btc
                        ).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="slide">
            {trending.map((coin, idx) => (
              <div
                key={idx}
                className="border border-border rounded-2xl shadow-md  bg-secondary px-2 flex justify-between p-4 m-3"
              >
                <div className="flex w-full items-center justify-between">
                  <div className="flex">
                    <img
                      className="mr-4 rounded-full"
                      src={coin.item.small}
                      alt="/"
                    />
                    <div>
                      <p className="font-bold">{coin.item.name}</p>
                      <p>{coin.item.symbol}</p>
                    </div>
                  </div>

                  <div>
                    <p className="pl-16">
                      $
                      {coins.length !== 0 &&
                        (
                          coins.find(({ id }) => id === "bitcoin")
                            .current_price * coin.item.price_btc
                        ).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Trending;
