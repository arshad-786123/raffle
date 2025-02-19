import { API_INSTANCE } from "../../API/Instance";
import { errorToast } from "../../Utils/Toast/error.toast";
import { API_ENDPOINTS } from "../../constants";
import { fetchAccessToken } from "../Middleware/fetchAccessToken";

export const getSpecificRafflePrize = async (ID: any) => {
  try {
    const response = await API_INSTANCE.get(`/owner/get-prize/${ID}`);
    return response.data;
  } catch (error: any) {
    if (error.response.data === "Unauthorized") {
      fetchAccessToken();
      errorToast("Something went wrong! Please try again");
    }
    return error;
  }
};

export const getOwnerWinners = async () => {
  try {
    const response = await API_INSTANCE.get(API_ENDPOINTS.GET_WINNERS);
    return response.data;
  } catch (error: any) {
    if (error.response.data === "Unauthorized") {
      fetchAccessToken();
      errorToast("Something went wrong! Please try again");
    }
    return error;
  }
};

export const getWinnersList = async (page: number, limit: number, searchTerm: string = '',
  isDownload: boolean = false,
  startDate: string = '',
  endDate: string = '') => {
  try {
    const response = await API_INSTANCE.get(API_ENDPOINTS.GET_WINNERS_LIST, {
      params: {
        page, limit, searchTerm: searchTerm || undefined,  // Only include searchTerm if it's provided
        isDownload: isDownload || undefined,  // Only include isDownload if it's provided
        startDate: startDate || undefined,    // Only include startDate if it's provided
        endDate: endDate || undefined
      }, // Pass page and limit here
    });
    return response.data;
  } catch (error: any) {
    errorToast("Something went wrong! Please try again");
    return error;
  }
};


export const getWinnersUserList = async (page: number, limit: number) => {
  try {
    const response = await API_INSTANCE.get(API_ENDPOINTS.GET_WINNERS_USER_LIST, {
      params: { page, limit }, // Pass page and limit here
    });
    return response.data;
  } catch (error: any) {
    errorToast("Something went wrong! Please try again");
    return error;
  }
};

