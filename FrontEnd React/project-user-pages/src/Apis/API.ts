import axiosInttance from "./configApi";
import axios from "./configApi";

// GET

export const getData = async (pathName: string) => {
  try {
    const response = await axios.get(pathName);
    return response.data;
  } catch (error) {
    throw error
  }
};

export const getDataById = async (pathName: string,id:string) => {
  try {
    const response = await axios.get(pathName+ "/" + id);
    return response.data;
  } catch (error) {
    throw error
  }
};


export const getDataByCondition = async (pathName: string, conditions: any) => {
  try {
    const response = await axios.get(pathName, { params: conditions });
    return response;
  } catch (error) {
    throw error;
  }
};


export const fetchUserData = async (pathName: string) => {
  try {
    const response = await axiosInttance.get(pathName);
    return response.data;
  } catch (error) {
    throw error
  }
};

export const searchData = async (
  pathName: string,
  params: { [key: string]: string }
) => {
  try {
    const response = await axios.get(pathName, {
      params: params, // Truyền query params ở đây
    });
    return response.data;
  } catch (error) {
    throw error
  }
};


// POST

export const createData = async (pathName: string, data: any) => {
  try {
    const response = await axios.post(pathName, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createDataWithImage = async (pathName: string, data: any) => {
  try {
    const response = await axios.post(pathName, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};


// DELETE

export const deleteData = async (pathName: string, id: string) => {
  try {
    const response = await axios.delete(pathName + "/" + id);
    return response.data;
  } catch (error) {
    throw error
  }
};

export const deleteAllDataByCondition = async (pathName: string) => {
  try {
    const response = await axios.delete(pathName);
    return response.data;
  } catch (error) {
    throw error
  }
};

// PUT

export const updateData = async (pathName: string, id: string, data: any) => {
  try {
    const response = await axios.put(pathName + "/" + id, data);
    return response.data;
  } catch (error) {
    throw error
  }
};

export const updateDataWithImage = async (
  pathName: string,
  id: string,
  data: any
) => {
  try {
    const response = await axios.put(pathName + "/" + id, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    throw error
  }
};

export const restoreData = async (pathName: string, id: string) => {
  try {
    const response = await axios.put(pathName + "/" + id);
    return response.data;
  } catch (error) {
    throw error
  }
};


// PATCH
export const updateDataByPatch = async (
  pathName: string,
  id: string,
  data: any
) => {
  try {
    const response = await axios.patch(pathName + "/" + id , data);
    return response.data;
  } catch (error) {
    throw error
  }
};

export const updateDataByPatchUserAvatar = async (
  pathName: string,
  id: string,
  data: any
) => {
  try {
    const response = await axios.patch(pathName + "/" + id + "/avatar", {avatar:data},{
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    throw error
  }
};

export const updateDataByPatchChangePassword = async (
  pathName: string,
  id: string,
  data: any
) => {
  try {
    const response = await axios.patch(pathName + "/" + id + "/change-password", data);
    return response.data;
  } catch (error) {
    throw error
  }
};
