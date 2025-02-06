import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignUpAuth = () => {
  const [otp, setOtp] = useState(new Array(8).fill(""));
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (index, value) => {
    if (/^[0-9]?$/.test(value)) {
      let newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    const otpCode = otp.join(""); 
    try {
      const response = await fetch("https://authentication-h5lw.onrender.com/api/auth/signupauth", { otp: otpCode });
      navigate("/login"); 
    } catch (err) {
      setMessage(err.response?.data?.message || "Error verifying OTP");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-10 rounded-lg border w-lg">
        <h2 className="text-2xl font-bold text-center mb-4">Verify your email</h2>
        <p className="text-gray-900 text-center mb-4">Enter the 8-digit code you recevied on <br></br> <span className="font-semibold">dev***@revispy.com</span></p>
        <p className="text-gray-900 p-5">Code</p>
        <form onSubmit={handleVerify} className="flex flex-col items-center">
          <div className="flex gap-2 mb-4">
            {otp.map((value, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                value={value}
                onChange={(e) => handleChange(index, e.target.value)}
                className="w-10 h-12 text-center border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            ))}
          </div>
          <button
            type="submit"
            className="bg-black text-white w-full py-2 rounded-lg font-semibold hover:bg-gray-900 transition"
          >
            VERIFY
          </button>
        </form>
        
        {message && <p className="text-red-500 text-center mt-3">{message}</p>}
      </div>
    </div>
  );
};

export default SignUpAuth;
