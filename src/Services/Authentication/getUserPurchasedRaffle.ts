import { API_INSTANCE } from "../../API/Instance";

export const getUserPurchasedRaffle = async (url: string) => {
  try {
    const getUserType = await API_INSTANCE.get(url);
    return getUserType.data;
  } catch (error) {
    throw error;
  }
};
