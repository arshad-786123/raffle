import { API_INSTANCE } from "../../API/Instance";
import { API_ENDPOINTS } from "../../constants";
import Cookies from "js-cookie";
import { fetchAccessToken } from "../Middleware/fetchAccessToken";

export const verifyUser = async (userData: any) => {
  try {
    const getUserType = await API_INSTANCE.post(
      API_ENDPOINTS.VERIFY_USER,
      userData
    );
    return getUserType.data;
  } catch (error) {
    throw error;
  }
};

export const loginUser = async (credentials: {
  emailOrUsername: string;
  password: string;
}): Promise<any> => {
  try {
    const response = await API_INSTANCE.post(
      API_ENDPOINTS.USER_LOGIN,
      credentials
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const socialLogin = async (credentials: {
  userId: string;
  email: string;
  name: string;
  role: string;
  loginType: string;
}): Promise<any> => {
  try {
    const response = await API_INSTANCE.post(
      API_ENDPOINTS.SOCIAL_LOGIN,
      credentials
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
