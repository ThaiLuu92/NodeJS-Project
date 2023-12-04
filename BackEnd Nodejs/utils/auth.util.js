import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import "dotenv/config";

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY
const MAIL_USERNAME = process.env.MAIL_USERNAME
const MAIL_PASSWORD = process.env.MAIL_PASSWORD

export function generateResetToken() {
  const secretKey = JWT_SECRET_KEY;
  const expiresIn = '1h'; 

  const resetToken = jwt.sign({}, secretKey, { expiresIn });

  return resetToken;
}

export function generateRandomToken(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let token = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    token += characters.charAt(randomIndex);
  }
  return token;
}

export function sendResetEmail(email, resetPassword, resetPasswordExpiryInMinutes) {
  const transporter = nodemailer.createTransport({
    service: 'gmail', 
    auth: {
      user: MAIL_USERNAME, 
      pass: MAIL_PASSWORD, 
    },
  });

  const mailOptions = {
    from: MAIL_USERNAME, 
    to: email,
    subject: 'Lấy lại mật khẩu',
    text: ` Mã xác nhận lấy lại mật khẩu: ${resetPassword}. Thời hạn có hiệu lực là ${resetPasswordExpiryInMinutes} phút.`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
}


export function sendRegister(email) {
  const transporter = nodemailer.createTransport({
    service: 'gmail', 
    auth: {
      user: MAIL_USERNAME, 
      pass: MAIL_PASSWORD, 
    },
  });

  const mailOptions = {
    from: MAIL_USERNAME, 
    to: email,
    subject: 'Đăng kí thành công',
    text: `Cảm ơn bạn đã thành công tại trang Web chúng tội Với email đăng nhập là ${email}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
}


export function sendPayment(email, course_name) {
  const transporter = nodemailer.createTransport({
    service: 'gmail', 
    auth: {
      user: MAIL_USERNAME, 
      pass: MAIL_PASSWORD, 
    },
  });

  const mailOptions = {
    from: MAIL_USERNAME, 
    to: email,
    subject: 'Mua thành công',
    text: `Cảm ơn bạn mua khóa học ${course_name} tại trang Web chúng tôi`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
}

