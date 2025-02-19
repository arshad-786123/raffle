import { API_INSTANCE } from "../../API/Instance";
import { errorToast } from "../../Utils/Toast/error.toast";
import { API_ENDPOINTS } from "../../constants";
import { fetchAccessToken } from "../Middleware/fetchAccessToken";

export const getOwnerWallet = async () => {
  try {
    const response = await API_INSTANCE.get(API_ENDPOINTS.GET_WALLET);
    return response.data;
  } catch (error: any) {
    if (error.response.data === "Unauthorized") {
      fetchAccessToken();
      errorToast("Something went wrong! Please try again");
    }
    return error;
  }
};

export const getOwnerTransaciton = async () => {
  try {
    const response = await API_INSTANCE.get(API_ENDPOINTS.GET_TRANSACTION);
    return response.data;
  } catch (error: any) {
    if (error.response.data === "Unauthorized") {
      fetchAccessToken();
      errorToast("Something went wrong! Please try again");
    }
    return error;
  }
};
