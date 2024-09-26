import axios from "axios";
import { BASE_API_URL } from '../constants/api/index'


const axiosInstance = axios.create({
    baseURL: BASE_API_URL
})

const requestHandler = async (request) => {
    return request;
};

const errorHandler = async (error) => {

    if (error.response.status === 403) {
       //
    }

    if (error.response.status >= 400) {
        await Promise.reject(error.response);
    }
};

const successHandler = (response) => {
    return response;
};

axiosInstance.interceptors.request.use((request) => requestHandler(request));
axiosInstance.interceptors.response.use(
    (response) => successHandler(response),
    (error) => errorHandler(error)
);

export default axiosInstance;