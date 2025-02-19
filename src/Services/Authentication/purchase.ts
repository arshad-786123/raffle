import { API_INSTANCE } from "../../API/Instance";
import { API_ENDPOINTS } from "../../constants";

export const purchaseRaffle = async (userData: any) => {
  try {
    console.log("getUserType", userData);
    const getUserType = await API_INSTANCE.post(
      API_ENDPOINTS.PURCHASE_RAFFLE,
      userData,
      {
        timeout: 20000, // 20 seconds timeout
      }
    );

    return getUserType.data;
  } catch (error) {
    throw error;
  }
};

export const createOrder = async (userData: any) => {
  try {
    const getUserType = await API_INSTANCE.post(
      API_ENDPOINTS.CREATE_ORDER,
      userData,
      {
        timeout: 20000, // 20 seconds timeout
      }
    );

    return getUserType.data;
  } catch (error) {
    throw error;
  }
};

export const confirmPaypalOrder = async (orderId: string, transactionId: string) => {
  try {
    const response = await API_INSTANCE.post(API_ENDPOINTS.CONFIRM_ORDER, {
      orderId,
      transactionId,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const capturePaypalOrder = async (paypalOrderId: string, paypalRequestId: string) => {
  try {
    const response = await API_INSTANCE.post(`${API_ENDPOINTS.CAPTURE_ORDER}/${paypalOrderId}`, {
      paypalRequestId,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const getDataByOrderId = async (orderId: any) => {
  try {
    console.log("orderId", orderId);
    const getOrderDetails = await API_INSTANCE.get(
      `${API_ENDPOINTS.THANK_YOU}${orderId}`
    );
    return getOrderDetails.data; // Assuming you want only data from the response
  } catch (error) {
    console.error("Error fetching order details", error);
    throw error;
  }
};