import React from "react";
import { Link } from "react-router-dom";

export default function ChooseUser() {
    return (
        <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-r from-yellow-300 to-yellow-500 p-5 md:flex-row md:justify-between md:items-start">
      {/* Admin Section */}
      <div className="text-center pt-5 md:pt-0 md:m-5 md:text-left">
        <span className="block text-3xl font-bold mb-5 text-blue-600">
          Admin
        </span>
        <button>
          <Link to="/admin-logIn">Login</Link>
        </button>
      </div>
      {/* Student Section */}
      <div className="text-center pt-5 md:pt-0 md:m-5 md:text-left">
        <span className="block text-3xl font-bold mb-5 text-orange-600">
          Student
        </span>
        <button>
          <Link to="/student-logIn">Login</Link>
        </button>
      </div>
      {/* Teacher Section */}
      <div className="text-center pt-5 md:pt-0 md:m-5 md:text-left">
        <span className="block text-3xl font-bold mb-5 text-green-600">
          Faculty
        </span>
        <button>
          <Link to="/teacher-logIn">Login</Link>
        </button>
      </div>
    </div>
    );
}
