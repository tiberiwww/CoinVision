import React, { useState } from "react";
import { CiLock, CiMail } from "react-icons/ci";
import { GrRotateRight } from "react-icons/gr";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [passwordLength, setPasswordLength] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { signUp } = UserAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (password !== confirmPassword) {
      setPasswordsMatch(false);
      return;
    } else {
      setPasswordsMatch(true);
    }
    if (password.length < 6) {
      setPasswordLength(false);
      return;
    } else {
      setPasswordLength(true);
    }
    try {
      await signUp(email, password);
      navigate("/account");
    } catch (e) {
      setError(e.message);
      console.log(e.message);
    }
  };

  return (
    <div>
      <div className="max-w-[400px] mx-auto px-4 py-20">
        <h1 className="text-2xl font-bold text-center">Sign Up</h1>
        {error ? <p className="bg-red-300 p-3 my-2">{error}</p> : null}
        <form onSubmit={handleSubmit}>
          <div className="my-4">
            <label htmlFor="">Email</label>
            <div className="my-2 w-full relative rounded-2xl shadow-xl">
              <input
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 bg-primary border border-input rounded-2xl"
                type="email"
              />
              <CiMail className="absolute right-2 top-3 test" />
            </div>
          </div>
          <div className="my-4">
            <label>Password</label>
            <div className="my-2 w-full relative rounded-2xl shadow-xl">
              <input
                onChange={(e) => {
                  setPassword(e.target.value);
                  setPasswordLength(e.target.value.length > 5);
                }}
                className="w-full p-2 bg-primary border border-input rounded-2xl"
                type="password"
              />
              <CiLock className="absolute right-2 top-3" />
            </div>
            {!passwordLength && (
              <div className="text-red-500">
                Password must be at least 6 characters long.
              </div>
            )}
          </div>
          <div className="my-4">
            <label>Confirm Password</label>
            <div className="my-2 w-full relative rounded-2xl shadow-xl">
              <input
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  setPasswordsMatch(e.target.value === password);
                }}
                className="w-full p-2 bg-primary border border-input rounded-2xl"
                type="password"
              />
              <GrRotateRight className="absolute right-2 top-3 text-gray-400" />
            </div>
            {!passwordsMatch && (
              <div className="text-red-500">Passwords do not match.</div>
            )}
          </div>
          <button className="w-full my-2 p-3 bg-button text-btnText rounded-2xl shadow-xl">
            Sign up
          </button>
        </form>
        <p className="my-4 text-center">
          Already have an account?{" "}
          <Link to="/signin" className="text-accent">
            {" "}
            Sign in{" "}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
