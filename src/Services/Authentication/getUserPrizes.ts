import { API_INSTANCE } from "../../API/Instance";
import { API_ENDPOINTS } from "../../constants";

export const getUserPrizes = async () => {
  try {
    const getUserType = await API_INSTANCE.get(API_ENDPOINTS.USER_PRIZES);
    return getUserType.data;
  } catch (error) {
    throw error;
  }
};
