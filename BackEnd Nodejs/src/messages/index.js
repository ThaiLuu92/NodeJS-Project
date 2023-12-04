export const MSG_COMMON = {
  MSG_ERROR: {
    BadRequestException: "Yêu cầu không hợp lệ",
    UnauthorizedException: "Unauthorized",
    NotFoundException: "Không tìm thấy tài nguyên",
    ForbiddenException: "Từ chối truy cập",
    InternalServerException: "Lỗi server",
  },
  MSG_SUCCESS: {
    create: (data) => `Create ${data} successfully`,
    read: (data) => `get ${data} successfully`,
    update: (data) => `Update ${data} successfully`,
    delete: (data) => `Delete ${data} successfully`,
    softDelete: (data) => `Soft Delete ${data} successfully`,
    restore: (data) => `Restore ${data} successfully`,


  },
  MSG_FAILURE: {
    create: (data) => `Create ${data} failure`,
    read: (data) => `get ${data} failure`,
    update: (data) => `Update ${data} failure`,
    delete: (data) => `Delete ${data} failure`,
    softDelete: (data) => `Soft Delete ${data} failure`,
    restore: (data) => `Restore ${data} failure`,

  },
};

export const MSG_VALIDATION = {
  UnauthorizedException: "Email hoặc mật khẩu không đúng",
  InvalidName: "Tên không hợp lệ. Tên là bắt buộc và tối đa 20 ký tự.",
  InvalidDescription: "Mô tả không hợp lệ. Mô tả phải tối đa 2000 ký tự.",
};
