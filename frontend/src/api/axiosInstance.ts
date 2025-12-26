import { useAuthStore } from "../stores/useAuthStore";
import axios from "axios";

export const axiosInstance = axios.create({
baseURL: "http://localhost:3000", //JCloud 배포 시 변경 필요
withCredentials: true,
})

axiosInstance.interceptors.request.use((config) => {
const accessToken= useAuthStore.getState().accessToken;
if (accessToken) {
config.headers["Authorization"] = `Bearer ${accessToken}`;
}
return config;
})