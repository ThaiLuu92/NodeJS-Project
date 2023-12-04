import { generateRandomToken, sendRegister, sendResetEmail } from "../../utils/auth.util.js";
import { createAssetToken, createRefreshToken } from "../../utils/jwt.util.js";
import { AuthencationException } from "../expeiptions/index.js";
import AuthRepository from "../repository/auth.repository.js";
import { validateUserData } from "../validations/user-register-validation.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const authRepository = new AuthRepository();
const JWT_SECRET_ASSET_KEY = process.env.JWT_SECRET_ASSET_KEY
export default class AuthService {
  async performLogin(user) {
    try {
      const getAllUser = await authRepository.getUsers();
      const checkLoginUser = getAllUser.find(
        (userDB) => userDB.email === user.email
      );

      // if (checkLoginUser.role !== 1) {
      //   throw new AuthencationException(undefined, undefined, {
      //     msgEmail: "Bạn không có quyền truy cập vào đây",
      //   });
      // }

      if (checkLoginUser) {
        // Kiểm tra mật khẩu bằng bcrypt
        const isPasswordMatch = await bcrypt.compare(
          user.password,
          checkLoginUser.password
        );
        if (isPasswordMatch) {
          const assetToken = createAssetToken({
            id: checkLoginUser.id,
            role: checkLoginUser.role,
          });
          delete checkLoginUser.password;
          const successLogin = {
            message: "Đăng nhập thành công",
            assetToken: assetToken,
            user: {
              id: checkLoginUser.id,
              avatar: checkLoginUser.avatar,
              address: checkLoginUser.address,
              dob: checkLoginUser.dob,
              email: checkLoginUser.email,
              level: checkLoginUser.level,
              phone: checkLoginUser.phone,
              user_name: checkLoginUser.user_name,
            },
          };
          return successLogin;
        } else {
          throw new AuthencationException(undefined, undefined, {
            msgPassword: "Mật khẩu không đúng",
          });
        }
      } else {
        throw new AuthencationException(undefined, undefined, {
          msgEmail: "Email không đúng",
        });
      }
    } catch (error) {
      throw error;
    }
  }

  async performRegister(userData) {
    try {
      const getAllUser = await authRepository.getUsers();
      const isEmailExists = getAllUser.some(
        (user) => user.email === userData.email
      );

      if (isEmailExists) {
        throw new AuthencationException(undefined, undefined, {
          msgEmail: "Email đã  tồn tại",
        });
      }

      // Băm mật khẩu trước khi lưu vào cơ sở dữ liệu
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      userData.password = hashedPassword;

      const newUser = await authRepository.createUser(userData);
      sendRegister(newUser.email)
      if (newUser) {
        const successRegister = {
          statusCode: 200,
          success: true,
          message: "Đăng ký thành công",
          userData: newUser,
        };
        return successRegister;
      }
    } catch (error) {
        throw error;
    }
  }

  async changePassword(userId, data) {
    try {
      const userById = await authRepository.getUserById(userId);
      console.log(123, userById);

      // Kiểm tra mật khẩu cũ
      const isPasswordValid = await bcrypt.compare(
        data.oldPassword,
        userById.password
      );
      if (!isPasswordValid) {
        throw new AuthencationException(undefined, undefined, {
          msgOldPassword: "Mật khẩu cũ không đúng",
        });
      }

      // Hash mật khẩu mới
      const hashedNewPassword = await bcrypt.hash(data.newPassword, 10);

      // Cập nhật mật khẩu mới
      userById.password = hashedNewPassword;
      await userById.save();

      return { statusCode: 200, message: "Password changed successfully" };
    } catch (error) {
      throw error;
    }
  }

  async requestPasswordReset(email) {
    // Tạo và lưu resetToken vào bảng Users
    const user = await authRepository.getUserByEmail(email);
    if (!user) {
      throw new AuthencationException(undefined, undefined, {
        msgEmail: "Người dùng không tồn tại.",
      });
    }
    if (user) {
      // Nếu đã có resetPassword, xóa nó
      if (user.resetPassword && user.resetPasswordExpiry) {
        user.resetPassword = null;
        user.resetPasswordExpiry = null;
      }

      const resetPasswordExpiryInMinutes = 1; // 10 phút
      const resetPasswordExpiry = new Date();
      resetPasswordExpiry.setMinutes(
        resetPasswordExpiry.getMinutes() + resetPasswordExpiryInMinutes
      );

      const resetPassword = generateRandomToken(6);
      user.resetPassword = resetPassword;
      user.resetPasswordExpiry = resetPasswordExpiry;
      await user.save();
      // Gửi email xác nhận hoặc link đặt lại mật khẩu
      sendResetEmail(user.email, resetPassword, resetPasswordExpiryInMinutes);
    }
  }

  async resetPassword(email, codeResetPassword, newPassword) {
    try {
      // Lấy thông tin người dùng theo email
      const user = await authRepository.getUserByEmail(email);

      // Kiểm tra xem người dùng có tồn tại không
      if (!user) {
        throw new AuthencationException(undefined, undefined, {
          msgEmail: "Người dùng không tồn tại.",
        });
      }

      // Kiểm tra tính hợp lệ của token
      if (user.resetPassword !== codeResetPassword) {
        throw new AuthencationException(undefined, undefined, {
          msgCode: "Mã xác nhận không hợp lệ.",
        });
      }
      // Kiểm tra xem token có hết hạn không
      if (user.resetPasswordExpiry && new Date() > user.resetPasswordExpiry) {
        throw new AuthencationException(undefined, undefined, {
          msgCode: "Yêu cầu đặt lại mật khẩu đã hết hạn. Vui lòng gửi lại yêu cầu mới.",
        });
      };


      // Hash mật khẩu mới và cập nhật thông tin người dùng
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
      user.resetPassword = null; // Hủy bỏ token sau khi đã sử dụng
      user.resetPasswordExpiry = null; // Hủy bỏ thời hạn token sau khi đã sử dụng
      await user.save();

      // Trả về kết quả thành công
      return { message: "Đặt lại mật khẩu thành công." };
    } catch (error) {
      console.error("Error resetting password:", error);
      throw error;
    }
  }

  async fetchUserData(token) {
    try {
      const decoded = jwt.verify(token, JWT_SECRET_ASSET_KEY);

      // Extract user ID from the decoded token
      const userId = decoded.data.id;

      const user = await authRepository.getUserById(userId);

      // delete user.password
      const {password, resetPassword, resetPasswordExpiry, avatarPublicId, ...order} = user.dataValues

      return order;
    } catch (err) {
      throw new Error('Token invalid or expired');
    }
  };
}
