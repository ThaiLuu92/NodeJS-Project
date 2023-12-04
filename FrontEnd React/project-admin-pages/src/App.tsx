import React, { useEffect, useLayoutEffect, useState } from "react";
import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./Pages/Home/Home";
import UserManagement from "./Pages/UserManagement/UserManagement";
import TeachersManagement from "./Pages/TeachersManagement/TeachersManagement";
import CoursesManagement from "./Pages/CoursesManagement/CoursesManagement";
import CourseLessonManagement from "./Pages/CourseLessonManagement/CourseLessonManagement";
import OderManagement from "./Pages/OderManagement/OderManagement";
import { useSelector, useDispatch } from "react-redux";
import {
  AuthState,
  loginSuccess,
} from "../../project-admin-pages/src/Redux/Slice/appSlice";
import Login from "./Components/Login/Login";
import CatagoryManagement from "./Pages/CatagoryManagement/CatagoryManagement";
import { fetchUser } from "./services/fechLogin/fechLogin";

function App() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(
    (state: { app: AuthState }) => state.app.isLoggedIn
  );

  useLayoutEffect(() => {
    const fetchData = async () => {
      const data = await fetchUser();
      if (data) {
        dispatch(loginSuccess(data));
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <BrowserRouter>
        {isLoggedIn ? (
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/userManagement" element={<UserManagement />} />
            <Route
              path="/teachersManagement"
              element={<TeachersManagement />}
            />
            <Route
              path="/catagoryManagement"
              element={<CatagoryManagement />}
            />
            <Route path="/coursesManagement" element={<CoursesManagement />} />
            <Route
              path="/courseLessonManagement"
              element={<CourseLessonManagement />}
            />
            <Route path="/oderManagement" element={<OderManagement />} />
          </Routes>
        ) : (
          <Login />
        )}
      </BrowserRouter>
    </>
  );
}

export default App;
