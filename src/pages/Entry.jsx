import React, { useState, useEffect } from "react";
import Logo from "../components/Logo/Logo";
import { useNavigate } from "react-router-dom";
import { signInTexts, signUpTexts } from "../assets/text";
import { IconArrowLeft } from "@tabler/icons-react";
import axios from "axios";






const Entry = () => {
  const navigate = useNavigate();
  const [action, setAction] = useState("");

  const goBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const actionParam = urlParams.get("action");
    setAction(actionParam);
  }, []);

  const Signup = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [fade, setFade] = useState(true); // State to control fade in/out

    useEffect(() => {
      const intervalId = setInterval(() => {
        setFade(false);
        setTimeout(() => {
          setCurrentIndex((prevIndex) => (prevIndex + 1) % signUpTexts.length);
          setFade(true);
        }, 1000);
      }, 5000);

      return () => clearInterval(intervalId);
    }, [signUpTexts.length]);

    return (
      <div className="flex bg-tertiary2 min-w-full min-h-full">
        <div className="w-1/2 bg-secondary text-white flex flex-col justify-center items-center p-8">
          <div className="mb-8">
            <Logo className="text-white" />
          </div>
          <h1 className={`text-3xl font-bold mb-4 fade ${fade ? "in" : "out"}`}>
            {signUpTexts[currentIndex].header}
          </h1>
          <p className={`mb-8 text-lg text-center fade ${fade ? "in" : "out"}`}>
            {signUpTexts[currentIndex].body}
          </p>
          <div>
            <p className="text-gray-500 mb-2">Already have an account?</p>
            <button
              className="px-8 py-2 border-2 border-white text-white rounded-full hover:bg-white hover:text-primary transition-main"
              onClick={() => setAction("signin")}
            >
              SIGN IN
            </button>
          </div>
        </div>

        <div className="w-1/2 bg-primary_acc flex flex-col justify-center items-center p-8">
          <h1 className="text-3xl font-bold text-primary mb-6">
            Create Account
          </h1>
          <p className="text-gray-500">Sign up to get started</p>
          <p className="mb-4 text-gray-500">Use your email for registration</p>
          <div className="w-full max-w-xs">
            <input
              type="text"
              placeholder="Name"
              className="input-form-style"
            />
            <input
              type="email"
              placeholder="Email"
              className="input-form-style"
            />
            <input
              type="password"
              placeholder="Password"
              className="input-form-style"
            />
            <input
              type="password"
              placeholder="Confirm Password"
              className="input-form-style"
            />
            <button className="w-full py-3 bg-primary text-white rounded-lg hover:bg-secondary transition-all">
              SIGN UP
            </button>
          </div>
        </div>
      </div>
    );
  };

  const SignIn = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [fade, setFade] = useState(true); // State to control fade in/out

    useEffect(() => {
      const intervalId = setInterval(() => {
        setFade(false);
        setTimeout(() => {
          setCurrentIndex((prevIndex) => (prevIndex + 1) % signInTexts.length);
          setFade(true);
        }, 1000);
      }, 5000);

      return () => clearInterval(intervalId);
    }, [signInTexts.length]);

    return (
      <div className="flex flex-row-reverse bg-tertiary2 min-w-full min-h-full">
        <div className="w-1/2 bg-secondary text-white flex flex-col justify-center items-center p-8">
          <div className="mb-8">
            <Logo className="text-white" />
          </div>
          <h1 className={`text-3xl font-bold mb-4 fade ${fade ? "in" : "out"}`}>
            {signInTexts[currentIndex].header}
          </h1>
          <p className={`mb-8 text-lg text-center fade ${fade ? "in" : "out"}`}>
            {signInTexts[currentIndex].body}
          </p>
          <div>
            <p className="text-gray-500 mb-2">Don't have an account?</p>
            <button
              className="px-8 py-2 border-2 border-white text-white rounded-full hover:bg-white hover:text-primary transition-main"
              onClick={() => setAction("signup")}
            >
              SIGN UP
            </button>
          </div>
        </div>

        <div className="w-1/2 bg-primary_acc flex flex-col justify-center items-center p-8">
          <h1 className="text-3xl font-bold text-primary mb-6">Sign In Now</h1>
          <p className="text-gray-500">Already have an account?</p>
          <p className="mb-4 text-gray-500">
            Sign in your email or username and password
          </p>
          <div className="w-full max-w-xs">
            <input
              type="text"
              placeholder="Email or Username"
              className="input-form-style"
            />
            <input
              type="password"
              placeholder="Password"
              className="input-form-style"
            />
            <button className="w-full py-3 bg-primary text-white rounded-lg hover:bg-secondary transition-all">
              SIGN IN
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="full-screen-fixed">
      <div className="w-full h-full flex justify-center items-center gap-y-3">
        <button
          className="absolute top-8 left-8 hover-scale text-tertiary bg-primary p-3 rounded-lg"
          onClick={goBack}
        >
          <IconArrowLeft />
        </button>
        {action === "signup" ? <Signup /> : <SignIn />}
      </div>
    </div>
  );
};

export default Entry;
