import React, { useEffect, useState } from "react";
import { HiOutlineX } from "react-icons/hi";
import { Link } from "react-router-dom";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { UserAuth } from "../context/AuthContext";
import { Sparklines, SparklinesLine } from "react-sparklines";

const SavedCoin = ({ allCoins }) => {
  const [coins, setCoins] = useState([]);
  const { user } = UserAuth();

  useEffect(() => {
    onSnapshot(doc(db, "users", `${user?.email}`), (doc) => {
      setCoins(doc.data()?.watchList);
    });
  }, [user?.email]);

  const coinPath = doc(db, "users", `${user?.email}`);
  const deleteCoin = async (passedId) => {
    try {
      const result = coins.filter((item) => item.id !== passedId);
      await updateDoc(coinPath, {
        watchList: result,
      });
    } catch (e) {
      console.log(e);
    }
  };

  const filteredData = allCoins.filter((value) => {
    if (coins.find((coin) => coin.name === value.name)) {
      return value;
    }
  });

  return (
    <div>
      {console.log("here:" + coins)}
      {coins?.length === 0 ? (
        <p className="">
          You don't have any coins saved. Please save a coin to add it to your
          watchlist.{" "}
          <Link className="text-accent" to="/">
            Click here to search for coins.
          </Link>
        </p>
      ) : (
        <table className="w-full border-collapse text-right">
          <thead>
            <tr className="border-b">
              <th className="px-4"># </th>
              <th className="text-left ">Coin</th>
              <th className="table-header-text">
                <p className="inline-block table-header-text">Price</p>
              </th>
              <th className="table-header-text">
                <p className="inline-block table-header-text">24h</p>
              </th>
              <th className="hidden md:table-cell table-header-text">
                <p className="inline-block table-header-text">24h Volume</p>
              </th>
              <th className="hidden md:table-cell table-header-text ">
                <p className="inline-block table-header-text">Market</p>
              </th>
              <th className="text-center pl-2 hidden md:table-cell">
                <p className="inline-block">Last 7 days</p>
              </th>
              <th className="text-center pl-2 pr-2 text-center w-[10px]">
                Remove
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredData?.map((coin) => (
              <tr
                key={coin.id}
                className="h-[80px] border-b overflow-hidden hover:bg-row border-borderRow"
              >
                <td className="text-center w-[10px]">
                  {coin?.market_cap_rank}
                </td>
                <td>
                  <Link to={`/coin/${coin.id}`}>
                    <div className="flex items-center">
                      <img src={coin?.image} className="w-8 mr-4" alt="" />
                      <div>
                        <p className="hidden sm:table-cell text-left">
                          {coin?.name}
                        </p>
                        <p className="text-gray-400 text-left text-sm">
                          {coin?.symbol.toUpperCase()}
                        </p>
                      </div>
                    </div>
                  </Link>
                </td>
                <td className="mr-2 pl-2 ">${coin?.current_price}</td>
                <td className="pl-2 ">
                  {coin.price_change_percentage_24h > 0 ? (
                    <p className="text-teal-500">
                      {coin.price_change_percentage_24h.toFixed(2)}%
                    </p>
                  ) : (
                    <p className="text-red-600">
                      {coin.price_change_percentage_24h.toFixed(2)}%
                    </p>
                  )}
                </td>
                <td className="w-[150px] hidden md:table-cell md:pl-10">
                  ${coin.total_volume.toLocaleString()}
                </td>
                <td className="w-[150px] hidden md:table-cell md:pl-10">
                  ${coin.market_cap.toLocaleString()}
                </td>
                <td className="pl-2 hidden md:table-cell">
                  <Sparklines data={coin.sparkline_in_7d.price}>
                    <SparklinesLine
                      color={
                        coin.sparkline_in_7d.price.slice(-1) <
                        coin.sparkline_in_7d.price[0]
                          ? "red"
                          : "teal"
                      }
                    ></SparklinesLine>
                  </Sparklines>
                </td>
                <td className="">
                  <HiOutlineX
                    onClick={() => deleteCoin(coin.id)}
                    className="cursor-pointer mx-auto"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default SavedCoin;
