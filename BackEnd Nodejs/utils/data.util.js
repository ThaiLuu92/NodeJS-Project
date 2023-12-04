import { Op } from "sequelize";
import { BadRequestException } from "../src/expeiptions/index.js";
import { MSG_COMMON } from "../src/messages/index.js";
import unorm from "unorm";
// Chia chuỗi điều kiện thành mảng đối tượng { key, value }
export function parseQueryConditions(query) {
  if (query) {
    return query.split("&").map((condition) => {
      const data = condition.split("=");
      return { key: data[0], value: decodeURIComponent(data[1]) };
    });
  }
}

// Lọc dữ liệu dựa trên điều kiện
export function filterDataByConditions(dataArray, conditions) {
  if (conditions) {
    return dataArray.filter((data) => {
      return conditions.find(
        (condition) => condition.value == data[condition.key]
      );
    });
  }
}

// Lấy toàn bộ dữ liệu từ mô hình
export async function getData(model) {
  return model.findAll({raw: true});
}
// Lấy toàn bộ dữ liệu từ mô hình theo nhiều điều kiện
export async function getDataWhereCondition(model, conditions) {
  return model.findAll({
    where: {
      [Op.and]: conditions,
    },
    raw: true,
  });
}
// Lấy toàn bộ dữ liệu theo soft delele
export async function getDeletedData(model) {
  return model.findAll({
    raw: true,
    paranoid: false, // Bỏ qua paranoid để lấy cả những bản ghi đã xóa mềm
    where: {
      deletedAt: {
        [Op.ne]: null, // Lọc những bản ghi đã bị xóa mềm
      },
    },
  });
}

// Lấy dữ liệu từ mô hình dựa trên ID
export async function getDataById(model, id) {
  return model.findByPk(id);
}

// Lấy dữ liệu theo soft delele từ ID
export async function getDeletedDataById(model, id) {
  return model.findByPk(id, {
    paranoid: false,
    where: {
      deletedAt: {
        [Op.ne]: null, // Lọc những bản ghi đã bị xóa mềm
      },
    },
  });
}


// Lấy dữ liệu từ mô hình dựa trên Email
export async function getDataByEmail(model, email) {
  return model.findOne({
    where: {
      email: email
    }
  });
}

// Lấy dữ liệu từ mô hình dựa trên Name
export async function getDataByCondition(model, condition) {
  const normalizedSearchTerm = unorm.nfkd(`${condition.value}`).toLowerCase();
  return await model.findAll({
    raw: true,
    where: {
      [condition.key]: {
        [Op.substring]: `${normalizedSearchTerm}`,
      }
    }
  });
}

// Chèn dữ liệu mới vào mô hình
export async function insertData(model, data) {
  try {
    return await model.create(data);
  } catch (error) {
    if(error.parent.code === "ER_DUP_ENTRY"){
      throw new BadRequestException( MSG_COMMON.MSG_ERROR.InternalServerException,400, {msgName: "Tên đã tồn tại"})
    }
    throw new BadRequestException( MSG_COMMON.MSG_ERROR.InternalServerException)
  }
}

// Chèn dữ liệu mới vào mô hình với kiểu là Array
export async function insertMultipleData(model, dataArray) {
  try {
    return await model.bulkCreate(dataArray);
  } catch (error) {
    // Xử lý lỗi nếu cần
    throw error;
  }
}

// Xóa dữ liệu từ mô hình dựa trên ID Xóa mềm
export async function sortDeleteData(model, id) {
  return await model.destroy({
    where: {
      id: id,
    },
  });
}

// Xóa dữ liệu từ mô hình dựa trên ID Xóa cứng
export async function deleteData(model, id) {
  return await model.destroy({
    where: {
      id: id,
    },
    force: true
  });
}

// Xóa toàn bộ dữ liệu theo điều kiện
export async function deleteAllDataByCondition(model) {
  return await model.destroy({
    paranoid: false,
    where: {
      deletedAt: {
        [Op.ne]: null, // Lọc những bản ghi đã bị xóa mềm
      },
    },
    force: true
  });
}

// Lấy lại dữ liệu đã xóa mềm
export async function restoreData(model, id) {
  return await model.restore({
    where: {
      id: id,
    },
  });
}

// Chỉnh sửa dữ liệu trong mô hình dựa trên ID
export function editData(model, id, updatedData) {
  return model.update(updatedData, {
    where: {
      id: id,
    },
  });
}
