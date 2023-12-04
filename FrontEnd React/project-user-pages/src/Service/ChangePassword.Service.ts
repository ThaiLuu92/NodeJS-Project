import {  updateDataByPatchChangePassword } from "../Apis/API";
import { AUTH } from "../Apis/common";
import { FormDataChangePassword } from "../Types/formData.type";

export const changePassword = async (id: string, data:FormDataChangePassword) => {
  try {
    await updateDataByPatchChangePassword(AUTH, id, data);
  } catch (error) {
    console.log(11111, error);
    
    throw error;
  }
};