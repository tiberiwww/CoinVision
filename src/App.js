import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import { ThemeProvider } from "./context/ThemeContext";
import Home from "./routes/Home";
import Signin from "./routes/Signin";
import Signup from "./routes/Signup";
import Account from "./routes/Account";
import CoinPage from "./routes/CoinPage";
import axios from "axios";
import Footer from "./components/Footer";
import { AuthContextProvider } from "./context/AuthContext";
// import ScrollToTop from "./components/ScrollToTop";

function App() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState();

  const url =
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=true";

  // useEffect(() => {
  //   axios.get(url).then((response) => {
  //     setCoins(response.data);
  //     // console.log(response.data);
  //   });
  // }, [url]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await axios
        .get(url)
        .then((response) => {
          /* DO STUFF WHEN THE CALLS SUCCEEDS */
          setCoins(response.data);
          setLoading(false);
        })
        .catch((e) => {
          console.log("The API is currently busy.");
        });
    };
    fetchData();
  }, [url]);

  return (
    <ThemeProvider>
      <AuthContextProvider>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={<Home coins={coins} setCoins={setCoins} />}
          />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/account" element={<Account allCoins={coins} />} />
          <Route path="/coin/:coinId" element={<CoinPage />}>
            <Route />
          </Route>
        </Routes>

        <Footer></Footer>
      </AuthContextProvider>
    </ThemeProvider>
  );
}

export default App;
