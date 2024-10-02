// import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import GenderCheckbox from "@/components/GenderCheckBox";
import toast from "react-hot-toast";


export default function SignUp() {
  const navigate = useNavigate();

  
  const formik = useFormik({
    initialValues: {
      fullName: "",
      universityRegNo: "",
      password: "",
      confirmPassword: "",
      gender: "",
    },
    validationSchema: Yup.object({
      fullName: Yup.string().required("Full Name is required"),
      universityRegNo: Yup.string()
        .matches(
          /^0\d{2}-\d{3}-20\d{2}-\d{3}$/,
          "Registration number must follow the format 0XX-XXX-20XX-XXX"
        )
        .required("University Registration No. is required"),
      password: Yup.string().required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), undefined], "Passwords must match")
        .required("Confirm Password is required"),
      gender: Yup.string().required("Gender is required"),
    }),
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        const res = await axios.post("/api/v1/auth/register-student", values, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = res.data;
        if (data.success === true) {
          navigate("/student-logIn", { replace: true });
        }
      } catch (error: any) {
        setErrors({
          fullName: "Check your credentials",
          universityRegNo: "Filled The Registration Number Correctly",
          password: "Check your password",
          confirmPassword: "please be sure to enter the same password",
          gender: "Something went wrong!",
        });
        toast.error(error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="bg-gradient-to-r from-orange-500 to-yellow-400 shadow-xl rounded-lg p-6 md:p-12 max-w-lg mx-auto my-10 transform transition duration-500 hover:scale-105">
      <h1 className="text-4xl font-extrabold text-center mb-8 text-slate-800 animate-fade-in">
        Sign Up
      </h1>
      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Full Name"
          id="fullName"
          className="bg-slate-100 p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out"
          {...formik.getFieldProps("fullName")}
        />
        {formik.touched.fullName && formik.errors.fullName ? (
          <p className="text-red-700">{formik.errors.fullName}</p>
        ) : null}

        <input
          type="text"
          placeholder="University Reg No."
          id="universityRegNo"
          className="bg-slate-100 p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out"
          {...formik.getFieldProps("universityRegNo")}
        />
        {formik.touched.universityRegNo && formik.errors.universityRegNo ? (
          <p className="text-red-700">{formik.errors.universityRegNo}</p>
        ) : null}

        <GenderCheckbox
          selectedGender={formik.values.gender}
          onCheckboxChange={(gender) => formik.setFieldValue("gender", gender)}
          {...formik.getFieldProps("gender")}
        />
        {formik.touched.gender && formik.errors.gender ? (
          <p className="text-red-700">{formik.errors.gender}</p>
        ) : null}

        <input
          type="password"
          placeholder="Enter New Password"
          id="password"
          className="bg-slate-100 p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out"
          {...formik.getFieldProps("password")}
        />
        {formik.touched.password && formik.errors.password ? (
          <p className="text-red-700">{formik.errors.password}</p>
        ) : null}

        <input
          type="password"
          placeholder="Enter Confirm Password"
          id="confirmPassword"
          className="bg-slate-100 p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out"
          {...formik.getFieldProps("confirmPassword")}
        />
        {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
          <p className="text-red-700">{formik.errors.confirmPassword}</p>
        ) : null}

        <button
          className="bg-blue-600 text-white p-4 rounded-lg uppercase hover:bg-blue-700 disabled:opacity-80 transition duration-200 ease-in-out"
          disabled={formik.isSubmitting}
        >
          {formik.isSubmitting ? "Loading..." : "Register"}
        </button>
      </form>
      <div className="flex gap-2 mt-5 justify-center items-center">
        <p>Already Have an account?</p>
        <Link to="/student-logIn">
          <span className="text-purple-950 font-bold hover:text-blue-800 transition duration-200 ease-in-out">
            Log in
          </span>
        </Link>
      </div>
      <p className="text-red-700 mt-5 text-center">
      {formik.errors && Object.keys(formik.errors).length > 0 && "Error occurred"}
      </p>
    </div>
  );
}
