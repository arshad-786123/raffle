import { API_INSTANCE } from "../../API/Instance";
import { errorToast } from "../../Utils/Toast/error.toast";
import { API_ENDPOINTS } from "../../constants";
import { fetchAccessToken } from "../Middleware/fetchAccessToken";

export const getRaffle = async () => {
  try {
    const response = await API_INSTANCE.get(API_ENDPOINTS.GET_RAFFLE);
    return response.data;
  } catch (error: any) {
    if (error.response.data === "Unauthorized") {
      fetchAccessToken();
      errorToast("Something went wrong! Please try again");
    }
    return error;
  }
};

export const specificRaffleNull = async (ID: any) => {
  try {
    const response = await API_INSTANCE.get(
      API_ENDPOINTS.SPECIFIC_RAFFLE + "/" + ID
    );
    return response.data;
  } catch (error: any) {
    if (error.response.data === "Unauthorized") {
      fetchAccessToken();
      errorToast("Something went wrong! Please try again");
    }
    return error;
  }
};
export const getOwnerNotification = async () => {
  try {
    const response = await API_INSTANCE.get(API_ENDPOINTS.OWNER_NOTIFICATION);
    return response.data;
  } catch (error: any) {
    if (error.response.data === "Unauthorized") {
      fetchAccessToken();
      errorToast("Something went wrong! Please try again");
    }
    return error;
  }
};

export const ownerNotificationListing = async (ID: any, currentPage = 1, limit = 10) => {
  try {
    const params = { page: currentPage, limit };
    const response = await API_INSTANCE.get(`${API_ENDPOINTS.OWNER_NOTIFICATION_LISTING}/${ID}`, { params });
    return response.data;
  } catch (error: any) {
    if (error.response.data === "Unauthorized") {
      fetchAccessToken();
      errorToast("Something went wrong! Please try again");
    }
    return error;
  }
};


export const ownerNotificationStatusUpdate = async (ID: any, isRead: any) => {
  try {
    const response = await API_INSTANCE.put(
      `${API_ENDPOINTS.NOTIFICATION_STATUS_UPDATE}/${ID}`,
      { isRead }
    );
    return response.data;
  } catch (error: any) {
    if (error.response?.data === "Unauthorized") {
      fetchAccessToken();
      errorToast("Something went wrong! Please try again");
    }
    return error;
  }
};