import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import { createData } from "../Apis/API";
import { errorMessageLogin } from "../Types/error.type";
import { REGISTER } from "../Apis/common";

export const RegisterService = (
  setError: React.Dispatch<React.SetStateAction<errorMessageLogin>>,
  navigate: ReturnType<typeof useNavigate>
) => {
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

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    const isValidEmail = (email: string): boolean => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };

    // Kiểm tra validation trực tiếp ở đây
    // Basic form validation
   // Basic form validation
const newErrors: errorMessageLogin = {
  msgUserName: "",
  msgEmail: "",
  msgPassword: "",
  msgConfirmPassword: "",
};

// Check for minimum length for user_name
if (!formData.user_name.trim() || formData.user_name.length < 3) {
  newErrors.msgUserName = !formData.user_name.trim()
    ? "Tên tài khoản không được để trống"
    : "Tên tài khoản phải có ít nhất 3 ký tự";
}

// Check for email validity and emptiness
if (!formData.email.trim()) {
  newErrors.msgEmail = "Email không được để trống";
} else if (!isValidEmail(formData.email)) {
  newErrors.msgEmail = "Email không hợp lệ";
}

// Check for emptiness in confirmPassword
if (!formData.confirmPassword.trim()) {
  newErrors.msgConfirmPassword = "Nhập lại mật khẩu không được để trống";
} else if (formData.password !== formData.confirmPassword) {
  newErrors.msgConfirmPassword = "Nhập lại mật khẩu không khớp";
}

// Check for minimum length for password
if (!formData.password.trim() || formData.password.length < 6) {
  newErrors.msgPassword = !formData.password.trim()
    ? "Mật khẩu không được để trống"
    : "Mật khẩu phải có ít nhất 6 ký tự";
}

// Check if any error exists
if (Object.values(newErrors).some((error) => !!error)) {
  setError(newErrors);
  return;
}


    // Continue with your other validations

    try {
      const registrationData = {
        email: formData.email,
        user_name: formData.user_name,
        password: formData.password,
        avatar:
          "http://res.cloudinary.com/dr9lw2qk0/image/upload/v1701404820/yx0nyadrspas8s2bc6qn.png",
      };

      await createData(REGISTER, registrationData);
      navigate("/Login");
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        const errorMsg = error.response.data.errors as errorMessageLogin;
        setError(errorMsg);
      }
    }
  };

  return {
    formData,
    handleChange,
    handleSubmit,
  };
};
