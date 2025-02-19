import { API_INSTANCE, WITHOUT_API_INSTANCE } from "../../API/Instance";
import { UserLogin } from "../../Utils/Interface/login.interface";
import { UserRegister } from "../../Utils/Interface/register.interface";
import { API_ENDPOINTS } from "../../constants";

interface User {
  id: string;
  email: string;
  role: string;
  verified: boolean;
  accessTokenExpiresIn: number;
  refreshTokenExpiresIn: number;
  firstname: string;
  lastname: string;
  businessName: string;
  businessAddress: string;
  city: string;
  postcode: number;
  country: string;
  businessEmailNote: string;
  businessEmailVerify: string;
  phone: string;
  referralCode: string;
  verification: string;
  isFAQRead: boolean;
  image: string;
}

export interface AuthResult {
  accessToken: string;
  refreshToken: string;
  user: User;
}

export interface RegisterResponse {
  success: boolean;
  result: AuthResult;
  message: string | null;
}

export const getUserLoginData = async (
  userData: UserLogin
): Promise<RegisterResponse> => {
  try {
    const response = await WITHOUT_API_INSTANCE.post(
      API_ENDPOINTS.USER_LOGIN,
      userData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const countries: RegisterResponse = response.data; // Assuming response.data is an array of Country objects
    return countries;
  } catch (error) {
    throw error; // Propagate the error for handling upstream
  }
};
