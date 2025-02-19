import { API_INSTANCE } from "../../API/Instance";
import { API_ENDPOINTS } from "../../constants";
import Cookies from "js-cookie";
import { fetchAccessToken } from "../Middleware/fetchAccessToken";

const accessToken = Cookies.get("accessToken");

export const checkType = async () => {
  try {
    if (accessToken) {
      const getUserType = await API_INSTANCE.get(API_ENDPOINTS.CHECK_TYPE);
      return getUserType.data;
    }
  } catch (error) {
    throw error;
  }
};
