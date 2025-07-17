import { apiConnector } from "../apiConnector";
import { dashboard } from "../apis";
import { toast } from 'react-toastify';


const {
    GET_DASHBOARD_DATA
} = dashboard





export const getAllDashboardDataAPI = async () => {

    try {
        const response = await apiConnector("GET", GET_DASHBOARD_DATA)


        if (!response?.data?.success) {
            throw new Error(response?.data?.message || "Something went wrong!");
        }

        return response?.data;
    } catch (error) {
        console.error("GET dashboard API ERROR:", error);
        toast.error(error?.response?.data?.message || "Failed to get dashboard data!");
        return [];
    }

};
