import { API_INSTANCE } from "../../API/Instance";
import { errorToast } from "../../Utils/Toast/error.toast";
import { API_ENDPOINTS } from "../../constants";
import { fetchAccessToken } from "../Middleware/fetchAccessToken";

export const createRaffle = async (
  formData: any,
  isEdit: boolean,
  id?: string
) => {
  try {
    let raffleUrl = isEdit
      ? API_ENDPOINTS.EDIT_RAFFLE + `/${id}`
      : API_ENDPOINTS.CREATE_RAFFLE;
    const response = await API_INSTANCE[isEdit ? "put" : "post"](
      raffleUrl,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data;
  } catch (error: any) {
    if (error.response.data === "Unauthorized") {
      fetchAccessToken();
      errorToast("Somethin went wrong! Please try again");
    }
    return error;
  }
};

export const createRaffleAdmin = async (
  formData: any,
  isEdit: boolean,
  id?: string
) => {
  try {
    let raffleUrl = isEdit
      ? API_ENDPOINTS.ADMIN_EDIT_RAFFLE + `/${id}`
      : API_ENDPOINTS.CREATE_RAFFLE;
    const response = await API_INSTANCE[isEdit ? "put" : "post"](
      raffleUrl,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data;
  } catch (error: any) {
    if (error.response.data === "Unauthorized") {
      fetchAccessToken();
      errorToast("Somethin went wrong! Please try again");
    }
    return error;
  }
};
