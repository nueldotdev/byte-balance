import React, { useState, useEffect, memo, useContext } from "react";
// import { useContext } from "react";
import Logo from "../components/Logo/Logo";
import { useNavigate } from "react-router-dom";
import { signInTexts, signUpTexts } from "../assets/text";
import { PinInput, Modal } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import { notifications } from '@mantine/notifications';
import { apiService } from "../api/Api";
import { isauthenticated } from "../../Services";
import { UserContext } from "../context/UserContext";


// Memoized Signup component to prevent unnecessary re-renders
const Signup = memo(({ userDet, handleInputChange, setAction, apiFunc }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % signUpTexts.length);
        setFade(true);
      }, 1000);
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="flex bg-tertiary2 min-w-full min-h-full">
      <div className="w-1/2 bg-secondary text-white flex max-sm:hidden flex-col justify-center items-center p-8">
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

      <div className="w-1/2 max-sm:w-full bg-primary_acc flex flex-col justify-center items-center p-8">
        <h1 className="text-3xl font-bold text-primary mb-6">Create Account</h1>
        <p className="text-gray-500">Sign up to get started</p>
        <p className="mb-4 text-gray-500">Use your email for registration</p>
        <div className="w-full max-w-xs">
          <input
            type="text"
            placeholder="Full Name"
            name="full_name"
            value={userDet.full_name}
            className="input-form-style"
            onChange={handleInputChange}
          />
          <input
            type="text"
            placeholder="Username"
            name="username"
            className="input-form-style"
            value={userDet.username}
            onChange={handleInputChange}
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            className="input-form-style"
            value={userDet.email}
            onChange={handleInputChange}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            className="input-form-style"
            value={userDet.password}
            onChange={handleInputChange}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            className="input-form-style"
            value={userDet.password2}
            onChange={handleInputChange}
          />
          <button
            className="w-full py-3 bg-primary text-white rounded-lg hover:bg-secondary transition-all"
            onClick={apiFunc}
          >
            SIGN UP
          </button>

          <div className="hidden max-sm:block mt-4">
          <p className="text-gray-500 mb-2">Already have an account?</p>
          <button
            className="px-8 py-2 border-2 border-secondary2 text-secondary2 rounded-full hover:bg-white hover:text-primary transition-main"
            onClick={() => setAction("signin")}
          >
            SIGN IN
          </button>
        </div>
        </div>
      </div>
    </div>
  );
});

// Memoized SignIn component to prevent unnecessary re-renders
const SignIn = memo(({ userDet, handleInputChange, setAction, apiFunc }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % signInTexts.length);
        setFade(true);
      }, 1000);
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="flex flex-row-reverse bg-tertiary2 min-w-full min-h-full">
      <div className="w-1/2 bg-secondary text-white max-sm:hidden flex flex-col justify-center items-center p-8">
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

      <div className="w-1/2 max-sm:w-full bg-primary_acc flex flex-col justify-center items-center p-8">
        <h1 className="text-3xl font-bold text-primary mb-6">Sign In Now</h1>
        <p className="text-gray-500">Already have an account?</p>
        <p className="mb-4 text-gray-500">
          Sign in with your email or username and password
        </p>
        <div className="w-full max-w-xs">
          <input
            type="text"
            placeholder="Email or Username"
            className="input-form-style"
            name="username"
            value={userDet.username}
            onChange={handleInputChange}
          />
          <input
            type="password"
            placeholder="Password"
            className="input-form-style"
            name="password"
            value={userDet.password}
            onChange={handleInputChange}
          />
          <button className="w-full py-3 bg-primary text-white rounded-lg hover:bg-secondary transition-all"
            onClick={apiFunc}>
            SIGN IN
          </button>
          <div className="hidden max-sm:block mt-4">
            <p className="text-gray-500 mb-2">Don't have an account?</p>
            <button
              className="px-8 py-2 border-2 border-secondary2 text-secondary2 rounded-full hover:bg-white hover:text-primary transition-main"
              onClick={() => setAction("signup")}
            >
            SIGN UP
          </button>
        </div>
        </div>
      </div>
    </div>
  );
});

const Entry = () => {
  const [tokenModal, setTokenModal] = useState(false);
  const { getAll } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(isauthenticated())
    if (isauthenticated()) {
      window.location.href = "/dashboard/home"
    }
  }, [])

  const [action, setAction] = useState("signup");

  const [userDet, setUserDet] = useState({
    full_name: "",
    username: "",
    email: "",
    password: "",
    password2: "",
  });
  const [token, setToken] = useState(0);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDet((prevState) => ({ ...prevState, [name]: value }));

    // Use localStorage after the state has been updated
    setTimeout(() => {
      localStorage.setItem(name, value);
    }, 0);
  };

  const handleToken = () => {
    setTokenModal(!tokenModal);
  };

  const goBack = () => {
    navigate(-1);
  };

  const signupReq = () => {
    setTokenModal(true);
    if (userDet.password2 === userDet.password) {
      apiService
        .signup(
          userDet.full_name,
          userDet.username,
          userDet.email,
          userDet.password
        )
        .then((response) => {
          console.log(response.data);
          notifications.show({
            title: 'Sign Up Successful',
            color: '#E34A32',
            message: 'Please verify your email address',
          })
        })
        .catch((error) => console.error(error));
    } else {
      console.log("Passords don't match!");
      notifications.show({
        title: 'Passwords do not match',
        color: 'red',
        message: 'Type well you dummy',
      })
    }
  };

  const signinReq = () => {
    apiService
      .login(userDet.username, userDet.password)
      .then((response) => {
        console.log(response.data);
        const data = response.data;
        
        localStorage.setItem("email", data.email);
        localStorage.setItem("user_id", data.user_id); 

        getAll()

        notifications.show({
          title: 'Sign In Successful',
          color: '#E34A32',
          message: 'YAY! You have signed in successfully 🌟',
        })

        navigate('/dashboard/home')
      })
      .catch((error) => {
        console.error(error)
        notifications.show({
          title: 'Sign In Failed',
          color: 'red',
          message: 'Check your info stupid!',
        })
      });
  };

  const verifyTokenReq = () => {
    apiService
      .verifyUserToken(
        token,
        userDet.email,
        userDet.full_name,
        userDet.username,
        userDet.password
      )
      .then((response) => {
        notifications.show({
          title: 'Email Verified',
          color: '#E34A32',
          message: 'YAY! Your email has been verified 🌟',
        })
        navigate("/verified-email")
      })
      .catch((error) => {
        console.error(error);
        notifications.show({
          title: 'Email Verification Failed',
          color: 'red',
          message: 'Something went wrong, please try again!',
        })
      });
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const actionParam = urlParams.get("action");
    setAction(actionParam || "signup");
  }, []);

  return (
    <>
      <div className="full-screen-fixed">
        <div className="w-full h-full flex justify-center items-center gap-y-3">
          <button
            className="absolute top-8 left-8 hover-scale text-tertiary bg-primary p-3 rounded-lg"
            onClick={goBack}
          >
            <IconArrowLeft />
          </button>
          {action === "signup" ? (
            <Signup
              userDet={userDet}
              handleInputChange={handleInputChange}
              setAction={setAction}
              apiFunc={signupReq}
            />
          ) : (
            <SignIn
              userDet={userDet}
              handleInputChange={handleInputChange}
              setAction={setAction}
              apiFunc={signinReq}
            />
          )}
        </div>
      </div>
      <Modal
        opened={tokenModal}
        onClose={() => setTokenModal(false)}
        title="Verify Token"
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}
        centered
      >
        <div className="flex flex-col items-center justify-start gap-6">
          <p>Enter the 6-Digit token sent to you email</p>
          <PinInput
            size="md"
            length={6}
            inputMode="numeric"
            onChange={setToken}
          />
          <button
            className="w-full py-3 bg-primary text-white rounded-lg hover:bg-secondary transition-all"
            onClick={() => {
              console.log("Token: ", token);
              verifyTokenReq()
            }}
          >
            Verify Token
          </button>
        </div>
      </Modal>
    </>
  );
};

export default Entry;
