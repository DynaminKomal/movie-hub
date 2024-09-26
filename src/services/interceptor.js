import axios from "axios";
import { BASE_API_URL } from '../constants/api/index'


const axiosInstance = axios.create({
    baseURL: BASE_API_URL
})