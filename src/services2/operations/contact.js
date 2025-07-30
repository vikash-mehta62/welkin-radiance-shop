import { apiConnector } from "../apiConnector";
import { contact } from "../apis";
import { toast } from 'react-toastify';


const {
    SEND_CONTACT_TO_EMAIL
} = contact

export const createContactAPI = async (formData) => {

    const toastId = toast.loading("Loading...");


    try {
        const response = await apiConnector("POST", SEND_CONTACT_TO_EMAIL, formData);

        if (!response?.data?.success) {
            throw new Error(response?.data?.message || "Something went wrong!");
        }


        toast.success(response?.data?.message);

        return response;
    } catch (error) {
        console.error("Product  API ERROR:", error);
        toast.error(error?.response?.data?.message || "Failed to send email!");
        return null;
    } finally {

        toast.dismiss(toastId);
    }
};