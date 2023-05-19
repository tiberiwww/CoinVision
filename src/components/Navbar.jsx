import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import { UserAuth } from "../context/AuthContext";

const Navbar = () => {
  const [nav, setNav] = useState(false);

  const { user, logout } = UserAuth();
  const navigate = useNavigate();

  const handleNav = () => {
    setNav(!nav);
    if (!nav) {
      window.scrollTo(0, 0);
    }
  };

  const handleSignout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    // Add event listener to disable scrolling when mobile menu is active
    if (nav) {
      document.body.style.overflow = "hidden";
      window.addEventListener("touchmove", preventDefault, { passive: false });
    } else {
      document.body.style.overflow = "";
      window.removeEventListener("touchmove", preventDefault);
    }

    return () => {
      // Clean up event listener when component unmounts
      document.body.style.overflow = "";
      window.removeEventListener("touchmove", preventDefault);
    };
  }, [nav]);

  const preventDefault = (e) => {
    e.preventDefault();
  };

  return (
    <div className="rounded-div flex items-center justify-between h-20 font-bold">
      <Link to="/">
        <h1 className="text-2xl">CoinVision</h1>
      </Link>
      <div className="hidden md:block pl-3">
        <ThemeToggle></ThemeToggle>
      </div>

      {user?.email ? (
        <div className="hidden md:block">
          <Link to="/account" className="p-4">
            Account
          </Link>
          <button
            className="bg-button text-btnText px-5 py-2 ml-2 rounded-2xl shadow-md hover:shadow-lg"
            onClick={handleSignout}
          >
            Sign out
          </button>
        </div>
      ) : (
        <div className="hidden md:block">
          <Link to="/signin" className="p-4 hover:text-accent">
            Sign In
          </Link>
          <Link
            to="/signup"
            className="bg-button text-btnText px-5 py-2 ml-2 rounded-2xl shadow-md hover:shadow-lg"
          >
            Sign Up
          </Link>
        </div>
      )}

      {/* Menu Icon */}

      <div onClick={handleNav} className="block md:hidden cursor-pointer z-10">
        {nav ? <HiOutlineX size={20} /> : <HiOutlineMenu size={20} />}
      </div>

      {/* Mobile Menu */}

      <div
        className={
          nav
            ? "md:hidden fixed left-0 top-20 flex flex-col items-center  w-full h-[92vh] bg-secondary ease-in duration-300 z-10"
            : "fixed left-[200%] top-20  h-[92vh] flex flex-col items-center w-full  ease-in duration-300"
        }
      >
        <ul className="w-full p-4">
          <li onClick={handleNav} className="border-b py-6 ">
            <Link to="/">Home</Link>
          </li>
          <li onClick={handleNav} className="border-b py-6 ">
            <Link to="/account">Account</Link>
          </li>
          <li className="py-6">
            <ThemeToggle />
          </li>
        </ul>

        <div className="flex flex-col  w-full p-4 pb-10">
          {user?.email ? (
            <Link to="/">
              <button
                className="w-full my-2 p-3 bg-button text-btnText rounded-2xl shadow-xl"
                onClick={() => {
                  handleNav();
                  handleSignout();
                }}
              >
                Sign out
              </button>
            </Link>
          ) : (
            <div>
              <Link to="/signin">
                <button
                  onClick={handleNav}
                  className="w-full my-2 p-3 bg-secondary text-primary border border-border rounded-2xl shadow-xl"
                >
                  Sign In
                </button>
              </Link>
              <Link to="/signup">
                <button
                  onClick={handleNav}
                  className="w-full my-2 p-3 bg-button text-btnText rounded-2xl shadow-xl "
                >
                  Sign Up
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
