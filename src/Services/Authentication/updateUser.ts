import { API_INSTANCE } from "../../API/Instance";
import { API_ENDPOINTS } from "../../constants";
import Cookies from "js-cookie";
import { fetchAccessToken } from "../Middleware/fetchAccessToken";

export const updateUser = async (userData: any) => {
  try {
    const getUserType = await API_INSTANCE.post(
      API_ENDPOINTS.UPDATE_USER,
      userData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return getUserType.data;
  } catch (error) {
    throw error;
  }
};

export const updateCardUser = async (userData: any) => {
  try {
    const getUserType = await API_INSTANCE.post(
      API_ENDPOINTS.UPDATE_USER_CARD,
      userData
    );

    return getUserType.data;
  } catch (error) {
    throw error;
  }
};

export const deleteCardUser = async (userData: any) => {
  try {
    const getUserType = await API_INSTANCE.post(
      API_ENDPOINTS.DELETE_USER_CARD,
      userData
    );

    return getUserType.data;
  } catch (error) {
    throw error;
  }
};


export const deleteUser = async (userId: string) => {
  try {
    const deleteUserResponse = await API_INSTANCE.delete(
      API_ENDPOINTS.DELETE_USER.replace(':id', userId) // Replace :id with actual user ID
    );

    return deleteUserResponse.data;
  } catch (error) {
    throw error;
  }
};