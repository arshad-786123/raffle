import { API_INSTANCE } from "../../API/Instance";
import { API_ENDPOINTS } from "../../constants";

export const resendOTP = async (userData: any) => {
  try {
    const getUserType = await API_INSTANCE.post(
      API_ENDPOINTS.RESEND_OTP,
      userData
    );

    return getUserType.data;
  } catch (error) {
    throw error;
  }
};
