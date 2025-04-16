// frontend/Login.tsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const sendOtp = async () => {
    if (!email) {
      setError("Please enter an email address");
      return;
    }
    
    setLoading(true);
    setError("");
    
    try {
      const res = await axios.post("http://localhost:5000/auth/send-otp", { email });
      setStep(2);
      alert(`OTP sent to ${email}. Please check your inbox and spam folder.`);
    } catch (err) {
      console.error(err);
      setError("Failed to send OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async () => {
    if (!otp) {
      setError("Please enter the OTP");
      return;
    }
    
    setLoading(true);
    setError("");
    
    try {
      const res = await axios.post("http://localhost:5000/auth/verify-otp", { email, otp });
      
      // Extract username from email (or you could request it separately)
      const username = email.split('@')[0];
      
      // Call the login function from auth context
      login(email, username);
      
      // Show success message
      alert("Login successful!");
      
      // Redirect to home page
      navigate('/');
    } catch (err) {
      console.error(err);
      setError("Failed to verify OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto mt-10 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      
      {error && <div className="bg-red-100 text-red-700 p-2 mb-4 rounded">{error}</div>}
      
      {step === 1 ? (
        <div className="space-y-4">
          <div>
            <label className="block mb-1">Email</label>
            <input 
              className="w-full p-2 border rounded" 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              placeholder="Enter your email" 
            />
          </div>
          <button 
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
            onClick={sendOtp}
            disabled={loading}
          >
            {loading ? "Sending..." : "Send OTP"}
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <div>
            <label className="block mb-1">OTP</label>
            <input 
              className="w-full p-2 border rounded" 
              type="text" 
              value={otp} 
              onChange={(e) => setOtp(e.target.value)} 
              placeholder="Enter the OTP sent to your email" 
            />
          </div>
          <button 
            className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600 disabled:bg-gray-400"
            onClick={verifyOtp}
            disabled={loading}
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
          <button 
            className="w-full bg-gray-200 text-gray-800 p-2 rounded hover:bg-gray-300"
            onClick={() => setStep(1)}
          >
            Back
          </button>
        </div>
      )}
    </div>
  );
};

export default Login;