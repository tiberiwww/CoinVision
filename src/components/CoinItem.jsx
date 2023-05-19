import React, { useState } from "react";
import { HiOutlineStar, HiStar } from "react-icons/hi";
import { Link } from "react-router-dom";
import { Sparklines, SparklinesLine } from "react-sparklines";
import { UserAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";

const CoinItem = ({ coin }) => {
  const [savedCoin, setSavedCoin] = useState(false);
  const { user } = UserAuth();

  const [showPopup, setShowPopup] = useState(false);

  function handlePopup() {
    setShowPopup(true);
    document.body.style.overflow = "hidden";
  }

  function closePopup() {
    setShowPopup(false);
    console.log("it did close");
    document.body.style.overflow = "auto";
  }

  const coinPath = doc(db, "users", `${user?.email}`);
  const saveCoin = async () => {
    if (user?.email) {
      setSavedCoin(true);
      await updateDoc(coinPath, {
        watchList: arrayUnion({
          id: coin.id,
          name: coin.name,
        }),
      });
    } else {
      handlePopup();
    }
  };

  return (
    
    <tr className="h-[80px] border-b overflow-hidden hover:bg-row border-borderRow">
      
      <td>
        {savedCoin ? (
          <HiStar />
        ) : (
          <HiOutlineStar onClick={saveCoin} className="hover:cursor-pointer text-center" />
        )}
        {showPopup && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-75 ">
            <div className=" p-6 pb-4 text-center border border-border rounded-2xl shadow-xl bg-secondary">
              <h2 className="text-lg font-bold mb-4">
                Please{" "}
                <Link className="text-accent" to="/signin">
                  sign in{" "}
                </Link>
                before saving a coin
              </h2>
              <button
                className="my-2 p-3 px-6 bg-button text-btnText rounded-2xl shadow-xl"
                onMouseDown={closePopup}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </td>
      <td className="text-center w-[10px]">{coin.market_cap_rank}</td>
      <td>
        <Link to={`/coin/${coin.id}`}>
          <div className="flex items-center">
            <img
              className="w-6 mr-2 rounded-full"
              src={coin.image}
              alt={coin.id}
            />
            <p className="hidden sm:table-cell text-left">{coin.name}</p>
          </div>
        </Link>
      </td>
      <td className="text-center">{coin.symbol.toUpperCase()}</td>
      <td className="mr-2 pl-2">${coin.current_price.toLocaleString()}</td>
      <td className="pl-1">
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
      <td className="w-[150px] hidden md:table-cell">
        ${coin.total_volume.toLocaleString()}
      </td>
      <td className="w-[150px] hidden md:table-cell">
        ${coin.market_cap.toLocaleString()}
      </td>
      <td className="pl-2 ">
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
    </tr>
  );
};

export default CoinItem;
