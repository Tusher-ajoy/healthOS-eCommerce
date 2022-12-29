import React, { useState } from "react";
import { ImSpinner2 } from "react-icons/im";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import loginImg from "../../images/login.jpg";

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [number, setNumber] = useState("+880");
  const [loading, setLoading] = useState();
  const [showOTPInput, setShowOTPInput] = useState(false);
  const [OTP, setOTP] = useState("");
  const [error, setError] = useState();
  const [loginLoading, setLoginLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from || "/";

  const { signup, signIn } = useAuth();

  //Signup with number
  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");
      await signup(number);
      setLoading(false);
      setShowOTPInput(true);
    } catch (error) {
      console.log(error);
      setError("Failed to create an account");
      setLoading(false);
    }
  }

  //verify OTP
  async function handleOTPVerify() {
    if (OTP.length === 6) {
      try {
        setLoading(true);
        setLoginLoading(true);
        setError("");
        await signIn(OTP);
        setLoading(false);
        setLoginLoading(false);
        navigate(from);
      } catch (error) {
        console.log(error);
        setError("Invalid OTP");
        setLoading(false);
      }
    } else {
      setError("Invalid OTP");
    }
  }

  return (
    <div className="h-screen bg-gray-100 flex items-center justify-center">
      {/* Login Container */}
      <div className="bg-white flex rounded-2xl shadow-lg max-w-3xl p-5 items-center">
        {/* image div */}
        <div className="sm:block hidden w-1/2">
          <img src={loginImg} alt="" className="rounded-md" />
        </div>

        {/* from div */}
        <div className="sm:w-1/2 sm:mx-5">
          <h2 className="font-bold text-2xl text-[#002D74]">
            {isSignUp ? "Sign up" : "Sign in"}
          </h2>
          <p className="text-sm mt-4 text-[#002D74]">
            {isSignUp
              ? "If you don't have an account, create one"
              : "If you already a member, easily sign in"}
          </p>

          {/* from */}
          <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
            {/* number input */}
            <label htmlFor="phone" className="mt-5 font-semibold text-gray-500">
              Phone number
            </label>
            <input
              className="p-2 border border-[#002D74] rounded-md"
              type="tel"
              name="phone"
              pattern="^(?:(?:\+|00)88|01)?\d{11}"
              title="Enter a valid Bangladeshi phone number"
              value={number}
              required
              onChange={(e) => setNumber(e.target.value)}
            />

            {/* Captcha and Submit button. Hide captcha and submit button when otp section is showing */}
            {!showOTPInput && (
              <>
                {/* div for showing captcha */}
                <div id="recaptcha-container"></div>

                {error && <p className="text-sm text-red-500">{error}</p>}
                {/* submit button */}
                <button
                  type="submit"
                  className="bg-[#002D74] rounded-md text-white py-2 hover:bg-[#002c74f3]"
                  disabled={loading}
                >
                  SUBMIT
                </button>
              </>
            )}

            {/* OTP Section - show when phone number and captcha is successfully verified */}
            {showOTPInput && (
              <>
                {/* OTP input */}
                <label htmlFor="otp" className="font-semibold text-gray-500">
                  Enter OTP
                </label>
                <input
                  className="p-2 border border-[#002D74] rounded-md"
                  type="number"
                  name="otp"
                  placeholder="123456"
                  onChange={(e) => setOTP(e.target.value)}
                  required
                />

                {/* show OTP error if any */}
                {error && <p className="text-sm text-red-500">{error}</p>}

                <button
                  className="bg-[#002D74] rounded-md text-white py-2 hover:bg-[#002c74f3]"
                  disabled={loading}
                  onClick={handleOTPVerify}
                >
                  VERIFY
                </button>
              </>
            )}
          </form>

          {/* toggle between sign in and sign up */}
          <div className="mt-3 text-xs flex justify-between items-center space-x-20">
            <p>
              {isSignUp ? "already have an account?" : "don't have an account?"}
            </p>
            <button
              className="py-2 px-5 border rounded-xl bg-white text-[#ff5659] hover:ring-1 hover:ring-[#ff5659]"
              onClick={() => setIsSignUp(!isSignUp)}
            >
              {isSignUp ? "Login" : "Register"}
            </button>
          </div>
        </div>
      </div>
      {/* show spinner on loading */}
      {loginLoading && (
        <div className="absolute top-0 left-0 bg-[#00000080] h-full w-full flex justify-center items-center">
          <ImSpinner2 className="animate-spin text-[#ff5659] font-extrabold text-5xl" />
        </div>
      )}
    </div>
  );
};

export default Login;
