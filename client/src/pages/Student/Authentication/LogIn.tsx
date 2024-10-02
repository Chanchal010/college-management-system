import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import {
  signInFailure,
  signInSuccess,
  signInStart,
} from "../../../redux/Authorization/authSlice";
// import OAuth from "../components/OAuth.jsx";
import { RootState } from "../../../redux/store";

export default function LogIn() {

  const { loginWithRedirect } = useAuth0();
  const [formData, setFormData] = useState({
    universityRegNo: "",
    password: "",
  });
//   // const [error, setError] = useState(false);
  const { loading } = useSelector((state : RootState) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // Start the sign-in process
      dispatch(signInStart());
  
      // Make the POST request to the backend
      const res = await axios.post("/api/v1/auth/login-student", formData, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true, // Include this if your backend uses cookies
      });
  
      const data = res.data;
  
      console.log(data);
  
      if (!data.success) {
        // Handle login failure
        dispatch(signInFailure(data));
        return;
      }
  
      // Handle successful login
      dispatch(signInSuccess(data));
  
      // Navigate to the home page after successful login
      navigate("/student-home", { replace: true });
  
    } catch (error) {
      console.error('Login error:', error);
  
      // // Optionally handle specific error cases
      // if (error.response) {
      //   // The request was made and the server responded with a status code outside the 2xx range
      //   console.error('Error response:', error.response.data);
      //   dispatch(signInFailure(error.response.data));
      // } else if (error.request) {
      //   // The request was made but no response was received
      //   console.error('Error request:', error.request);
      //   dispatch(signInFailure({ message: "No response from server" }));
      // } else {
      //   // Something else happened in setting up the request
      //   console.error('Error message:', error.message);
      //   dispatch(signInFailure({ message: error.message }));
      // }
    }
  };
    

    

  return (
    <div className="bg-gradient-to-r from-purple-600 to-indigo-600 shadow-2xl rounded-lg p-6 md:p-12 max-w-lg mx-auto my-10 transform transition duration-500 hover:scale-105">
      <h1 className="text-4xl font-extrabold text-center mb-8 text-white animate-bounce">
        Student Sign In
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <input
          type="text"
          placeholder="University Reg No."
          id="universityRegNo"
          className="bg-slate-100 p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out"
          value={formData.universityRegNo}
          onChange={handleChange}
        />
        
        <input
          type="password"
          placeholder="Enter Password"
          id="password"
          className="bg-slate-100 p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out"
          value={formData.password}
          onChange={handleChange}
        />
        <button className="bg-purple-800 text-white p-4 rounded-lg uppercase hover:bg-purple-900 disabled:opacity-80 transition duration-200 ease-in-out">
          {loading ? "Loading..." : "Sign In"}
        </button>
        
        <Button onClick={() => loginWithRedirect()}>Log In With Google</Button>        
      </form>
      <div className="flex justify-center gap-2 mt-5">
        <p className="text-white">Don't have an account?</p>
        <Link to="/student-register">
          <span className="text-yellow-300 hover:text-yellow-400 transition duration-200 ease-in-out">
            Sign Up
          </span>
        </Link>
      </div>
      <p className="text-red-700 mt-5 text-center">
        {/* {error ? error.message || "Something went wrong!" : ""} */}
      </p>
    </div>
  );
}