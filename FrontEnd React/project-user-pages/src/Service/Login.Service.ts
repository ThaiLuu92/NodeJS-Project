// LoginLogic.ts
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AxiosError } from "axios";
import * as Yup from "yup";
import axios from "../Apis/configApi";
import { LOGIN } from "../Apis/common";
import { errorMessageLogin } from "../Types/error.type";
import { loginFailure, loginSuccess } from "../Redux/Slice/AuthSlice";

export const LoginService = (
  navigate: ReturnType<typeof useNavigate>,
  setError: React.Dispatch<React.SetStateAction<errorMessageLogin>>
) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    user_name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setError((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const handleSubmit = async ( e: React.FormEvent<HTMLFormElement>
    ): Promise<void> => {
      e.preventDefault();
    const email = formData.email;
    const password = formData.password;

    try {
      const response = await axios.post(LOGIN, { email, password });
      window.localStorage.setItem("X-API-Key", response.data.assetToken);
      const user = response.data.user;
      if (user) {
        dispatch(loginSuccess(user));
        navigate("/");
      }
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        const errorMsg = error.response.data.errors as errorMessageLogin;
        setError(errorMsg);
        dispatch(loginFailure());
      }
      
    }
  };

  return {
    handleSubmit,
    handleChange,
    formData
  };
};
