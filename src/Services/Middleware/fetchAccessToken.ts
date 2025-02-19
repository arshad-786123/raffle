import { API_INSTANCE } from "../../API/Instance";
import { API_ENDPOINTS } from "../../constants";
import Cookies from "js-cookie";

const refreshToken = Cookies.get("refreshToken");

export const fetchAccessToken = async () => {
  try {
    if (refreshToken) {
      const response: any = await API_INSTANCE.get(
        API_ENDPOINTS.FETCH_ACCESSTOKEN,
        {
          headers: {
            "Content-Type": "application/json",
            "refresh-token": refreshToken,
          },
        }
      );
      const accessToken = response.headers.tk;
      const accessTokenExpiresIn = response.headers.tk_ex;

      const accessTokenExpires = new Date(
        Date.now() + accessTokenExpiresIn * 1000
      );

      // Set the access token cookie
      Cookies.set("accessToken", accessToken, {
        expires: accessTokenExpires,
        sameSite: "strict",
        secure: false, // Set to true if you're using HTTPS
        // httpOnly:true
      });
    }
  } catch (error) {
    console.log(error);

    throw error; // Propagate the error for handling upstream
  }
};
