import { API_INSTANCE } from "../../API/Instance";
import { API_ENDPOINTS } from "../../constants";
import Cookies from "js-cookie";
import { fetchAccessToken } from "../Middleware/fetchAccessToken";

export const forgotPassword = async (userData: any) => {
  try {
    const getUserType = await API_INSTANCE.post(
      API_ENDPOINTS.FORGOT_PASSWORD,
      userData
    );

    return getUserType.data;
  } catch (error) {
    throw error;
  }
};
