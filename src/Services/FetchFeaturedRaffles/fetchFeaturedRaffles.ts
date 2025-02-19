import { API_INSTANCE } from "../../API/Instance";
import { API_ENDPOINTS } from "../../constants";

// Interface for Raffle Type
export interface IRaffle {
  _id: string;
  raffle_name: string;
  raffle_description: string;
  websites: string;
  images: string[];
  category: string;
  ticket_price: string;
  main_prizes: {
    ticket_position: string;
    prize_value: string;
    prize_name: string;
  }[];
  totalPurchasedTicket: number;
  time_set_prize: string;
  start_date: string;

}

// Interface for Featured Raffles Response
export interface IFeaturedRafflesResponse {
  result: IRaffle[];
  total: number;
  page: number;
  limit: number;
  success: boolean;
}

// Service function to fetch featured raffles
export const fetchFeaturedRaffles = async (
  page: number = 1,
  limit: number = 5
): Promise<IFeaturedRafflesResponse> => {
  try {
    const response = await API_INSTANCE.get(API_ENDPOINTS.FEATURED_RAFFLES, {
      params: { page, limit }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching featured raffles:', error);
    throw error;
  }
};