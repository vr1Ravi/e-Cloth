import { Link } from "react-router-dom";
import { FaLongArrowAltRight } from "react-icons/fa";
import { MdVisibility, MdOutlineVisibilityOff } from "react-icons/md";
import profile_logo from "../../assets/Profile.png";
import { ChangeEvent, useState } from "react";
const Signup = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [profilePicPreview, setProfilePicPreview] = useState<
    string | ArrayBuffer | null
  >(null);

  const handleProfilePicChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setProfilePicPreview(reader.result);
      };
    }
  };
  return (
    <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gray-100 overflow-hidden">
      <h2 className=" text-center font-extrabold font-Roboto text-xl">
        Sign up
      </h2>
      <form className=" py-4 mt-4 space-y-6 w-[97%] px-3 sm:w-[500px] shadow-md rounded-md flex flex-col items-center mx-1 sm:mx-auto bg-white">
        <div className="relative w-full">
          <input
            type="file"
            onChange={(e) => handleProfilePicChange(e)}
            className="absolute w-28 h-28 top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 opacity-0"
          />
          <img
            src={
              profilePicPreview ? profilePicPreview.toString() : profile_logo
            }
            className="w-28 h-28 rounded-full mx-auto"
          />
        </div>
        <div className="w-[90%]">
          <label htmlFor="name ">
            Full Name
            <input
              id="name"
              type="name"
              className="w-full p-2 outline-none border border-gray-300 bg-transparent rounded-md"
            />
          </label>
        </div>
        <div className="w-[90%]">
          <label htmlFor="email ">
            Email address
            <input
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
          SIGN UP
        </button>
        <div className="flex">
          <p className="mr-1">Already have an account?</p>{" "}
          <Link to="/login" className=" cursor-pointer text-red-600">
            Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Signup;
