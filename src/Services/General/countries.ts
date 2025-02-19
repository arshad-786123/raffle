import { API_INSTANCE } from "../../API/Instance";
import { API_ENDPOINTS } from "../../constants";

// Define an interface for a country
export interface Country {
  name: string;
  flag: string;
  code: string;
  dial_code: string;
}

// Assuming you have an API_INSTANCE and API_ENDPOINTS setup for making HTTP requests
// Here's how you can define and use a function to fetch countries and handle the response

// Define a function to fetch countries data
export const getCountries = async (): Promise<Country[]> => {
  try {
    const response = await API_INSTANCE.get(API_ENDPOINTS.COUNTRIES_DATA);
    const countries: Country[] = response.data;
    // Assuming response.data is an array of Country objects
    return countries;
  } catch (error) {
    console.error("Error fetching countries:", error);
    throw error; // Propagate the error for handling upstream
  }
};
