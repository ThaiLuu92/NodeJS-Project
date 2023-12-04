import {
  isValidEmail,
  isMinLength,
  checkPasswordsMatch,
  isNotEmptyString,
} from "../../utils/validation.js";

export function validateUserData(userData) {
  if (!isNotEmptyString(userData.email)) {
    return {
      statusCode: 403,
      success: false,
      message: "Email không được để trống",
    };
  }

  if (!isNotEmptyString(userData.user_name)) {
    return {
      statusCode: 403,
      success: false,
      message: "User Name không được để trống",
    };
  }

  if (!isNotEmptyString(userData.password)) {
    return {
      statusCode: 403,
      success: false,
      message: "Password không được để trống",
    };
  }

  if (!isValidEmail(userData.email)) {
    return {
      statusCode: 403,
      success: false,
      message: "Email không hợp lệ",
    };
  }

  if (!isMinLength(userData.password, 6)) {
    return {
      statusCode: 403,
      success: false,
      message: "Mật khẩu quá ngắn",
    };
  }

  return null; // Trả về null nếu dữ liệu hợp lệ
}
