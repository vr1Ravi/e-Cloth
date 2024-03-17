import { Link } from "react-router-dom";
import { FaLongArrowAltRight } from "react-icons/fa";
import { MdVisibility, MdOutlineVisibilityOff } from "react-icons/md";
import { useState } from "react";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gray-100 overflow-hidden">
      <h2 className=" text-center font-extrabold font-Roboto text-xl">
        Login to your account
      </h2>
      <form className=" py-4 mt-4 space-y-6 w-[97%] px-3 sm:w-[500px] shadow-md rounded-md flex flex-col items-center mx-1 sm:mx-auto bg-white">
        <div className="w-[90%]">
          <label htmlFor="email ">
            Email address
            <input
              required
              id="email"
              type="email"
              className="w-full p-2 outline-none border border-gray-300 bg-transparent rounded-md"
            />
          </label>
        </div>
        <div className="w-[90%] relative">
          <label htmlFor="password">
            Password
            <input
              required
              id="password"
              type={showPassword ? "text" : "password"}
              className="w-full p-2 outline-none border border-gray-300 bg-transparent rounded-md"
            />
          </label>
          <div className="absolute right-2 top-[50%] *:text-xl *:cursor-pointer">
            {showPassword ? (
              <MdVisibility onClick={() => setShowPassword(!showPassword)} />
            ) : (
              <MdOutlineVisibilityOff
                onClick={() => setShowPassword(!showPassword)}
              />
            )}
          </div>
        </div>

        <div className="w-[90%] flex justify-between text-[16px]">
          <div>
            <input type="checkbox" id="remember" className="mr-1" />
            <label htmlFor="remember">Remember me</label>
          </div>
          <div className="flex justify-start items-center">
            <button className="mr-1">Forgot your password? </button>
            <FaLongArrowAltRight className="text-red-600" />
          </div>
        </div>
        <button
          type="submit"
          className="bg-red-600 text-white w-[90%] p-2 rounded-md"
        >
          {" "}
          LOGIN
        </button>
        <div className="flex">
          <p className="mr-1">Not have any account?</p>{" "}
          <Link to="/signup" className=" cursor-pointer text-red-600">
            Signup
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
