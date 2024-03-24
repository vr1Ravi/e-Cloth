import { Link } from "react-router-dom";
import { FaLongArrowAltRight } from "react-icons/fa";
import { MdVisibility, MdOutlineVisibilityOff } from "react-icons/md";
import profile_logo from "../../assets/Profile.png";
import { ChangeEvent, useState, FormEvent } from "react";
import { signUpUser } from "../../apis/user_api";
const Signup = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [profilePicPreview, setProfilePicPreview] = useState<
    string | ArrayBuffer | null
  >(null);
  const [showValidatePassword, setShowValidatePassword] = useState(false);
  const [isMinChar, setIsMinChar] = useState(true);
  const [isDigit, setIsDigit] = useState(false);
  const [isSpecialChar, setIsSpecialChar] = useState(false);

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

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    signUpUser(formData);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gray-100 overflow-hidden">
      <h2 className=" text-center font-extrabold font-Roboto text-xl">
        Sign up
      </h2>
      <form
        onSubmit={(e) => handleSubmit(e)}
        className=" py-4 mt-4 space-y-6 w-[97%] px-3 sm:w-[500px] shadow-md rounded-md flex flex-col items-center mx-1 sm:mx-auto bg-white"
      >
        <div className="relative w-full">
          <input
            required
            type="file"
            name="file"
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
              required
              id="name"
              type="text"
              name="name"
              className={` w-full p-2 outline-none border border-gray-300  bg-transparent rounded-md`}
            />
          </label>
        </div>
        <div className="w-[90%]">
          <label htmlFor="email ">
            Email address
            <input
              required
              id="email"
              type="email"
              name="email"
              className={`w-full p-2 outline-none border border-gray-300 bg-transparent rounded-md`}
            />
          </label>
        </div>
        <div className="w-[90%] relative ">
          {showValidatePassword && (
            <div className="absolute w-[70%] sm:w-1/2 right-0 -top-16 border shadow-md rounded-md z-10 bg-white p-3 *:block">
              <small
                className={`${isMinChar ? "text-red-600" : "text-green-600"}`}
              >
                . Minimum 6 characters
              </small>
              <small
                className={`${isDigit ? "text-green-600" : "text-red-600"}`}
              >
                . Atleast 1 digit
              </small>
              <small
                className={`${
                  isSpecialChar ? "text-green-600" : "text-red-600"
                }`}
              >
                . Atleast 1 special character
              </small>
            </div>
          )}
          <label htmlFor="password">
            Password
            <input
              onClick={(e) => {
                setShowValidatePassword(true);
                const value = (e.target as HTMLInputElement).value;
                if (value.length > 5) setIsMinChar(false);
                const isDigitRegex = /\d/;
                if (isDigitRegex.test(value)) setIsDigit(true);
                const isSpecialCharRegex = /[^\w]/g;
                if (isSpecialCharRegex.test(value)) setIsSpecialChar(true);
              }}
              onChange={(e) => {
                const value = (e.target as HTMLInputElement).value;
                value.length > 5 ? setIsMinChar(false) : setIsMinChar(true);
                const isDigitRegex = /\d/;
                isDigitRegex.test(value) ? setIsDigit(true) : setIsDigit(false);
                const isSpecialCharRegex = /[^\w]/g;
                isSpecialCharRegex.test(value)
                  ? setIsSpecialChar(true)
                  : setIsSpecialChar(false);
              }}
              required
              id="password"
              type={showPassword ? "text" : "password"}
              name="password"
              minLength={6}
              className={`w-full p-2 outline-none border border-gray-300 bg-transparent rounded-md`}
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
          disabled={isMinChar || !isDigit || !isSpecialChar ? true : false}
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
