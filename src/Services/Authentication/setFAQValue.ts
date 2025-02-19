import { API_INSTANCE } from "../../API/Instance";
import { API_ENDPOINTS } from "../../constants";
import Cookies from "js-cookie";
import { fetchAccessToken } from "../Middleware/fetchAccessToken";

export const setFAQValue = async () => {
  try {
    const getUserType = await API_INSTANCE.get(API_ENDPOINTS.SET_FAQ_VALUE);

    return getUserType.data;
  } catch (error) {
    throw error;
  }
};
