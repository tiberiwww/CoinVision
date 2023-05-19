import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import SavedCoin from "../components/SavedCoin";
import { UserAuth } from "../context/AuthContext";

const Account = ({ allCoins }) => {
  const { user, logout } = UserAuth();
  const navigate = useNavigate();

  const handleSignout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (e) {
      console.log(e.message);
    }
  };

  if (user) {
    return (
      <div className="max-w-[1140px] mx-auto w-full">
        <div className="flex justify-between items-center my-12 py-8 rounded-div ">
          <div>
            <h1 className="text-2xl font-bold pb-2">Account</h1>
            <div>
              <p>Welcome, {user?.email}</p>
            </div>
          </div>
          <div>
            <button
              onClick={handleSignout}
              className="border px-6 py-2 rounded-2xl shadow-lg hover:shadow-xl"
            >
              Sign Out
            </button>
          </div>
        </div>
        <div className="flex justify-between items-center my-12 pt-4 pb-8 rounded-div">
          <div className="w-full ">
            <h1 className="text-2xl font-bold py-4">Watchlist</h1>
            <SavedCoin allCoins={allCoins} />
          </div>
        </div>
      </div>
    );
  } else {
    return <Navigate to="/signin" />;
  }
};

export default Account;
