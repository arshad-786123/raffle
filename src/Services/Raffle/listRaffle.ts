import { API_INSTANCE } from "../../API/Instance"
import { API_ENDPOINTS } from "../../constants"


export interface IRaffle {
  category: string;
  createdAt: string;
  cronTime: string;
  currency: string;
  images: string[];
  videos: string[];
  instant_prize: string[];
  instant_value: string[];
  isAlive: boolean;
  isApprovedByAdmin: boolean;
  isDraft: boolean;
  isEmailApproved: boolean;
  isSuspended: boolean;
  main_prize_value: string;
  owner: string;
  purchases: any[]; // Depending on your data structure, this might be a more specific type
  raffle_description: string;
  websites: string;
  raffle_name: string;
  raffle_type: string;
  ratings: any[]; // Depending on your data structure, this might be a more specific type
  revenue_set_prize: string;
  review: any[]; // Depending on your data structure, this might be a more specific type
  tcApproved: boolean;
  ticket_price: string;
  ticket_set_prize: string;
  time_set_prize: string;
  totalPurchasedTicket: number; // Depending on your data structure, this might be a more specific type
  totalPurchasedTicketAmount: string; // Depending on your data structure, this might be a more specific type
  uniqueID: string;
  updatedAt: string;
  winners: any[]; // Depending on your data structure, this might be a more specific type
  isFreeRaffle: any;
  raffle_status: number;
}



export interface RaffleResponse {
  success: boolean;
  result: IRaffle;
  message: string | null;
}

export interface AxiosData {
  data: RaffleResponse
}



export const listRaffle = async (page: number, limit: number, category?: string) => {
  try {
    const response = await API_INSTANCE.get(API_ENDPOINTS.LIST_RAFFLE, {
      params: { page, limit, category: category !== "All" ? category : undefined },
    });
    const raffleData = response?.data?.result; // Assuming response.data.result contains raffles
    return raffleData;
  } catch (error) {
    console.error("Error fetching raffles:", error);
    throw error; // Propagate the error for handling upstream
  }
};

export const getApprovedPaidRaffles = async (search?: string) => {
  try {
    const response = await API_INSTANCE.get(API_ENDPOINTS.APPROVED_PAID, {
      params: { search },
    });
    return response?.data?.data || []; // Assuming response.data.data contains raffles
  } catch (error) {
    console.error("Error fetching approved and paid raffles:", error);
    throw error; // Propagate the error for handling upstream
  }
};




export const exclusiveRaffle = async () => {
  try {
    const response: AxiosData = await API_INSTANCE.get(API_ENDPOINTS.EXCLUSIVE_RAFFLES);
    const raffleData = response?.data?.result; // Assuming response.data is an array of Country objects
    return raffleData;
  } catch (error) {
    console.error('Error fetching countries:', error);
    throw error; // Propagate the error for handling upstream
  }
};
export const listCategoryWiseRaffle = async (categoryName: string, page: number = 1, limit: number = 10) => {
  try {
    const params: any = { page, limit };
    const response = await API_INSTANCE.get(`${API_ENDPOINTS.LIST_CATEGORY_WISE_RAFFLE}/${categoryName}`, { params });
    const raffleData = response?.data;
    console.log(`Raffles for category ${categoryName}:`, raffleData);
    return raffleData; // Return the fetched data
  } catch (error) {
    console.error(`Error fetching raffles for category ${categoryName}:`, error);
    throw error; // Throw the error to handle it in the component
  }
};

