export function isValidEmail(email) {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return emailRegex.test(email);
}

export function isMinLength(text, minLength) {
  return text.length >= minLength;
}

export function checkPasswordsMatch(password, confirmPassword) {
  return password === confirmPassword;
}

// Hàm kiểm tra xem một chuỗi có giá trị không rỗng
export function isNotEmptyString(value) {
  return value.trim() !== '';
}
