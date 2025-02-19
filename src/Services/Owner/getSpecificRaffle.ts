import { API_INSTANCE } from "../../API/Instance";
import { errorToast } from "../../Utils/Toast/error.toast";
import { API_ENDPOINTS } from "../../constants";
import { fetchAccessToken } from "../Middleware/fetchAccessToken";

export const getSpecificRaffle = async (ID: any) => {
  try {
    const response = await API_INSTANCE.get(`/owner/get-raffle-detail/${ID}`);
    return response.data;
  } catch (error: any) {
    if (error.response.data === "Unauthorized") {
      fetchAccessToken();
      errorToast("Something went wrong! Please try again");
    }
    return error;
  }
};
