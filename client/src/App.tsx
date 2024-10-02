// import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/landing page/Home";
import ChooseUser from "./components/landing page/ChooseUser";

// student
import StudentLogIn from "./pages/Student/Authentication/LogIn";
import StudentRegister from "./pages/Student/Authentication/Register";
import StudentHome from "./pages/Student/Layout";
import StudentProfile from "./pages/Student/Self-Services/Profile";
import StudentMarks from "./pages/Student/Self-Services/Marks";
import StudentAdmit from "./pages/Student/Self-Services/Admit";
import StudentSyllabus from "./pages/Student/Self-Services/Syllabus";
import StudentForgotPassword from "./pages/Student/Authentication/ForgotPassword";
import FeesStructure from "./pages/Student/Admission Document/FeesStructure";
import HostelFeesStructure from "./pages/Student/Admission Document/HostelFeesStructure";
import Registration from "./pages/Student/Admission Document/Registration";
import AdmissionLetter from "./pages/Student/Admission Document/AdmissionLetter";
import IdCard from "./pages/Student/Admission Document/IdCard";
import Dashboard from "./pages/Student/Dashboard";
// import Layout from './pages/Student/Layout';

// admin
import AdminLogIn from "./pages/Admin/Authentication/LogIn";
import AdminRegister from "./pages/Admin/Authentication/Register";

import AdminLayout from "./pages/Admin/AdminLayout"


// Teacher
import TeacherLogIn from './pages/Faculty/Authentication/LogIn'
import TeacherRegister from './pages/Faculty/Authentication/Register'
import TeacherLayout from './pages/Faculty/FacultyLayout'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/choose-user" element={<ChooseUser />} />

        {/* student */}
        <Route path="/student-logIn" element={<StudentLogIn />} />
        <Route path="/student-register" element={<StudentRegister />} />

        <Route path="/student-home" element={<StudentHome />}>
          <Route path="student-profile" element={<StudentProfile />} />
          <Route path="student-marks" element={<StudentMarks />} />
          <Route path="student-admit" element={<StudentAdmit />} />
          <Route path="student-syllabus" element={<StudentSyllabus />} />
          <Route path="student-forgot-password" element={<StudentForgotPassword />} />

          <Route path="student-feesStructure" element={<FeesStructure />} />
          <Route path="student-hostel-feesStructure" element={<HostelFeesStructure />} />
          <Route path="registration-certificate" element={<Registration />} />
          <Route path="admission-letter" element={<AdmissionLetter />} />
          <Route path="idCard" element={<IdCard />} />
          <Route path="student-dashboard" element={<Dashboard />} />
        </Route>

        {/* admin  */}
        <Route path="/admin-logIn" element={<AdminLogIn />} />
        <Route path="/admin-Register" element={<AdminRegister />} />

        <Route path="/admin-home" element={<AdminLayout />}>



        </Route>


        {/* Faculty  */}
        
        <Route path="/teacher-logIn" element={<TeacherLogIn />} />
        <Route path="/teacher-register" element={<TeacherRegister />} />
        <Route path="/teacher-home" element={<TeacherLayout />}>
        
        </Route>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
