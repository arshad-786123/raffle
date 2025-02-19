import { API_INSTANCE } from "../../API/Instance";
import { API_ENDPOINTS } from "../../constants";
import Cookies from "js-cookie";
import { fetchAccessToken } from "../Middleware/fetchAccessToken";

export const getUserData = async () => {
  try {
    const getUserType = await API_INSTANCE.get(API_ENDPOINTS.GET_USER_DATA);

    return getUserType.data;
  } catch (error) {
    throw error;
  }
};
