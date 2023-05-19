import axios from "axios";
import React, { useEffect, useState } from "react";
import { GrReddit, GrGithub } from "react-icons/gr";
import { CgWebsite } from "react-icons/cg";
import { Sparklines, SparklinesLine } from "react-sparklines";
import DOMPurify from "dompurify";
import { useParams } from "react-router-dom";

const CoinPage = () => {
  const [coin, setCoin] = useState({});
  const params = useParams();
  console.log(params);

  const url = `https://api.coingecko.com/api/v3/coins/${params.coinId}?localization=false&tickers=true&market_data=true&community_data=true&developer_data=true&sparkline=true`;

  useEffect(() => {
    axios.get(url).then((response) => {
      setCoin(response.data);
      console.log(response.data);
    });
  }, [url]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleRedditClick = () => {
    if (coin.links?.subreddit_url) {
      window.open(coin.links?.subreddit_url, "_blank");
    }
  };
  const handleWebsiteClick = () => {
    if (coin.links?.homepage[0]) {
      window.open(coin.links?.homepage[0], "_blank");
    }
  };

  const handleGithubClick = () => {
    if (coin.links?.repos_url.github[0]) {
      window.open(coin.links?.repos_url.github[0], "_blank");
    }
  };

  return (
    <div className="rounded-div my-12  pb-4">
      <div className="flex items-center py-8">
        <img className="w-20 mr-8" src={coin.image?.large} alt="/" />
        <div>
          <p className="text-3xl font-bold">{coin?.name}</p>
          <p>({coin.symbol?.toUpperCase()}/ USD)</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <div className="flex justify-between">
            {coin.market_data?.current_price ? (
              <p className="text-3xl font-bold pb-2">
                ${coin.market_data.current_price.usd.toLocaleString()}
              </p>
            ) : null}
            <p>7 Day</p>
          </div>
          <div>
            <Sparklines data={coin.market_data?.sparkline_7d.price}>
              <SparklinesLine
                color={
                  coin.market_data?.sparkline_7d.price.slice(-1) <
                  coin.market_data?.sparkline_7d.price[0]
                    ? "red"
                    : "teal"
                }
              />
            </Sparklines>
          </div>
          <div className="flex justify-between py-4">
            <div>
              <p className="text-gray-500 text-sm">Market Cap</p>
              {coin.market_data?.market_cap ? (
                <p>${coin.market_data.market_cap.usd.toLocaleString()}</p>
              ) : null}
            </div>

            <div>
              <p className="text-gray-500 text-sm text-right">Volume (24h)</p>
              {coin.market_data?.market_cap ? (
                <p>${coin.market_data.total_volume.usd.toLocaleString()}</p>
              ) : null}
            </div>
          </div>
          <div className="flex justify-between py-4">
            <div>
              <p className="text-gray-500 text-sm">24h High</p>
              {coin.market_data?.high_24h ? (
                <p>${coin.market_data.high_24h.usd.toLocaleString()}</p>
              ) : null}
            </div>

            <div>
              <p className="text-gray-500 text-sm">24h Low</p>
              {coin.market_data?.low_24h ? (
                <p>${coin.market_data.low_24h.usd.toLocaleString()}</p>
              ) : null}
            </div>
          </div>
        </div>

        <div>
          <p className="text-xl font-bold">Market Stats</p>
          <div className="grid grid-cols-3 grid gap-3 py-4">
            <div className="">
              <p className="text-gray-500 text-sm">Market Rank</p>
              {coin.market_cap_rank}
            </div>

            <div>
              <p className="text-gray-500 text-sm">Total Supply</p>
              {coin.market_data?.max_supply ? (
                <p>{coin.market_data.max_supply.toLocaleString()}</p>
              ) : (
                "Unknown"
              )}
            </div>

            <div>
              <p className="text-gray-500 text-sm break-words">Circulating Supply</p>
              {coin.market_data?.circulating_supply ? (
                <p className="break-words">{coin.market_data.circulating_supply.toLocaleString()}</p>
              ) : null}
            </div>

            <div>
              <p className="text-gray-500 text-sm">All time high</p>
              {coin.market_data?.ath ? (
                <p>${coin.market_data.ath.usd.toLocaleString()}</p>
              ) : null}
            </div>

            <div>
              <p className="text-gray-500 text-sm">All time high %</p>
              {coin.market_data?.ath_change_percentage ? (
                <p
                  className={
                    coin.market_data.ath_change_percentage.usd > 0
                      ? "text-teal-500"
                      : "text-red-500"
                  }
                >
                  {coin.market_data.ath_change_percentage.usd.toFixed(2)}%
                </p>
              ) : null}
            </div>

            <div>
              <p className="text-gray-500 text-sm">All time high date</p>
              {coin.market_data?.ath_date ? (
                <p>
                  {new Date(coin.market_data.ath_date.usd).toLocaleString(
                    "en-US",
                    {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                      hour: "numeric",
                      minute: "numeric",
                    }
                  )}
                </p>
              ) : null}
            </div>

            <div>
              <p className="text-gray-500 text-sm">Price Change (7d)</p>
              {coin.market_data ? (
                <p
                  className={
                    coin.market_data.price_change_percentage_7d > 0
                      ? "text-teal-500"
                      : "text-red-500"
                  }
                >
                  {coin.market_data.price_change_percentage_7d.toFixed(2)}%
                </p>
              ) : null}
            </div>

            <div>
              <p className="text-gray-500 text-sm">Price Change (30d)</p>
              {coin.market_data ? (
                <p
                  className={
                    coin.market_data.price_change_percentage_30d > 0
                      ? "text-teal-500"
                      : "text-red-500"
                  }
                >
                  {coin.market_data.price_change_percentage_30d.toFixed(2)}%
                </p>
              ) : null}
            </div>

            <div>
              <p className="text-gray-500 text-sm">Price Change (1y)</p>
              {coin.market_data ? (
                <p
                  className={
                    coin.market_data.price_change_percentage_1y > 0
                      ? "text-teal-500"
                      : "text-red-500"
                  }
                >
                  {coin.market_data.price_change_percentage_1y.toFixed(2)}%
                </p>
              ) : null}
            </div>
          </div>
          <div className="flex justify-between p-2 text-accent text-3xl">
            <CgWebsite
              className="cursor-pointer"
              onClick={handleWebsiteClick}
            />
            <GrReddit className="cursor-pointer" onClick={handleRedditClick} />
            <GrGithub className="cursor-pointer" onClick={handleGithubClick} />
          </div>
        </div>
      </div>
      {/* Description */}
      <div className="py-4">
        <p className=" py-4 text-xl font-bold">About {coin.name}</p>
        <p
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(
              coin.description ? coin.description.en : ""
            ),
          }}
        ></p>
      </div>
    </div>
  );
};

export default CoinPage;
