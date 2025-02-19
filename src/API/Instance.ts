import axios from "axios";
import { CONSTANT_DATA } from "../constants";
import Cookies from "js-cookie";
import { fetchAccessToken } from "../Services/Middleware/fetchAccessToken";

const accessToken = Cookies.get('accessToken')

if (!accessToken) {
  const a = async () => {
    await fetchAccessToken()
  }
  a();
}

export const API_INSTANCE = axios.create({
  baseURL: CONSTANT_DATA.BASE_URL,
  timeout: 40000,
  headers: { 'X-Custom-Header': 'foobar', 'Authorization': accessToken }
});


export const WITHOUT_API_INSTANCE = axios.create({
  baseURL: CONSTANT_DATA.BASE_URL,
  timeout: 2000
})