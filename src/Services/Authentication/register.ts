import { API_INSTANCE } from "../../API/Instance";
import { UserRegister } from "../../Utils/Interface/register.interface";
import { API_ENDPOINTS } from "../../constants";

interface User {
  id: string;
  email: string;
  role: string;
  verified: boolean;
  expiresIn: number;
  firstname: string;
  lastname: string;
  phone: string;
  referralCode: string;
  verification: string;
}

interface AuthResult {
  accessToken: string;
  refreshToken: string;
  user: User;

}

interface RegisterResponse {
  success: boolean;
  result: AuthResult;
  message: string | null;
  password?: string;
}

export const getUserRegisteredData = async (
  userData: UserRegister
): Promise<RegisterResponse> => {
  try {
    const response = await API_INSTANCE.post(
      API_ENDPOINTS.USER_REGISTER,
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

interface UserRegisterGoogle {
  userId: string;
  email: string;
  name: string;
  role?: string;  // Add role as an optional property
}
export const getUserRegisteredWithGoogleData = async (
  userData: UserRegisterGoogle
): Promise<RegisterResponse> => {
  try {
    const response = await API_INSTANCE.post(
      API_ENDPOINTS.USER_REGISTER_WITH_GOOGLE,
      userData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error; // Propagate the error for handling upstream
  }
};