import React, { useState } from "react";
import CoinItem from "./CoinItem";
import { TbArrowsSort } from "react-icons/tb";
import { AiOutlineArrowDown } from "react-icons/ai";

const CoinSearch = ({ coins, setCoins }) => {
  const [searchText, setSearchText] = useState("");
  console.log(coins);
  const [isSortUp, setIsSortUp] = useState(true);

  const [showMore, setShowMore] = useState(false);


  const filteredData = coins.filter((value) => {
    if (searchText === "") {
      return value;
    } else if (
      value.name.toLowerCase().includes(searchText.toLocaleLowerCase())
    ) {
      return value;
    }
  });

  const displayedRows = showMore ? filteredData : filteredData.slice(0, 10);
  console.log(displayedRows);

  function sortCoins(sortBy) {
    switch (sortBy) {
      case "market":
        if (isSortUp) {
          setCoins(
            [...coins].sort((a, b) => b.market_cap_rank - a.market_cap_rank)
          );
          setIsSortUp(!isSortUp);
        } else {
          setCoins(
            [...coins].sort((a, b) => a.market_cap_rank - b.market_cap_rank)
          );
          setIsSortUp(!isSortUp);
        }
        break;
      case "price":
        if (isSortUp) {
          setCoins(
            [...coins].sort((a, b) => b.current_price - a.current_price)
          );
          setIsSortUp(!isSortUp);
        } else {
          setCoins(
            [...coins].sort((a, b) => a.current_price - b.current_price)
          );
          setIsSortUp(!isSortUp);
        }
        break;
      case "24h":
        if (isSortUp) {
          setCoins(
            [...coins].sort(
              (a, b) =>
                b.price_change_percentage_24h - a.price_change_percentage_24h
            )
          );
          setIsSortUp(!isSortUp);
        } else {
          setCoins(
            [...coins].sort(
              (a, b) =>
                a.price_change_percentage_24h - b.price_change_percentage_24h
            )
          );
          setIsSortUp(!isSortUp);
        }
        break;
      case "24hvolume":
        if (isSortUp) {
          setCoins([...coins].sort((a, b) => b.total_volume - a.total_volume));
          setIsSortUp(!isSortUp);
        } else {
          setCoins([...coins].sort((a, b) => a.total_volume - b.total_volume));
          setIsSortUp(!isSortUp);
        }
        break;

      default:
        break;
    }
  }

  return (
    <div className="rounded-div bg-primary my-4">
      <div className="flex flex-col md:flex-row justify-between pt-4 pb-6 text-center md:text-right">
        <h1 className="text-2xl font-bold my-2 pb-4">Cryptocurrency Prices</h1>
        <form>
          <input
            onChange={(e) => setSearchText(e.target.value)}
            className="w-full bg-secondary border border-input px-4 py-2 rounded-2xl shadow-xl"
            type="text"
            placeholder="Search a coin"
          />
        </form>
      </div>

      <table className="w-full border-collapse text-right">
        <thead className="text-right">
          <tr className="border-b">
            <th></th>
            <th
              onClick={() => sortCoins("market")}
              className="px-4 text-center cursor-pointer table-header-text"
            >
              #
            </th>
            <th className="text-left ">Coin</th>
            <th></th>
            <th
              className="cursor-pointer table-header-text"
              onClick={() => sortCoins("price")}
            >
              <p className="inline-block table-header-text">Price</p>
              <TbArrowsSort className="inline-block pb-0.5 arrow-sort" />
            </th>
            <th
              className="cursor-pointer table-header-text"
              onClick={() => sortCoins("24h")}
            >
              <p className="inline-block table-header-text">24h</p>
              <TbArrowsSort className="inline-block pb-0.5 arrow-sort" />
            </th>
            <th
              onClick={() => sortCoins("24hvolume")}
              className="hidden md:table-cell cursor-pointer table-header-text"
            >
              <p className="inline-block table-header-text">24h Volume</p>
              <TbArrowsSort className="inline-block pb-0.5 arrow-sort" />
            </th>
            <th
              onClick={() => sortCoins("market")}
              className="hidden md:table-cell cursor-pointer table-header-text"
            >
              <p className="inline-block table-header-text">Market</p>
              <TbArrowsSort className="inline-block pb-0.5 arrow-sort" />
            </th>
            <th className="text-center pl-2">
              <p className="inline-block">Last 7 days</p>
            </th>
          </tr>
        </thead>
        <tbody>
          {displayedRows.map((coin) => (
            <CoinItem key={coin.id} coin={coin} />
          ))}
        </tbody>
      </table>
      <div className="flex justify-center">
        {!showMore && filteredData.length > 10 && (
          <button
            className="bg-button text-btnText px-4 p-2 my-5 w-full rounded-2xl shadow-xl hover:shadow-2xl md:w-auto my-2 flex justify-center items-center"
            onClick={() => setShowMore(true)}
          >
            <p>Show More</p>
            <AiOutlineArrowDown className="" />
          </button>
        )}
      </div>
    </div>
  );
};

export default CoinSearch;
