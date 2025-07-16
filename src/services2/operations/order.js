import { apiConnector } from "../apiConnector";
import { paymentEndpoints, order } from "../apis";
import { resetCart } from "../../redux/authSlice";
import toast from "react-hot-toast";

const {
  PRODUCT_PAYMENT_API,
  PRODUCT_VERIFY_API,
  SEND_PAYMENT_SUCCESS_EMAIL_API,
  GET_ALL_ORDER,
} = paymentEndpoints;

const {
  UPDATE_ORDER_STATUS,
  GET_ORDER_FOR_USER,
} = order;

async function capturePayment(dispatch, token, products, userDetails, navigate) {
  const toastId = toast.loading("Loading...");
  dispatch(setLoading(true));
  try {
    const response = await apiConnector("POST", PRODUCT_PAYMENT_API, {
      products,
      amount: products.reduce((acc, product) => acc + product.price * product.quantity, 0),
    }, {
      Authorization: `Bearer ${token}`,
    });

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    const {
      token: orderToken,
    } = response.data;
    console.log("ORDER TOKEN : ", orderToken);

    // Move to placement order page
    navigate("/dashboard/enrolled-courses");
    toast.success("Payment Successful");
  } catch (error) {
    console.log("PRODUCT PAYMENT API ERROR............", error);
    console.log(products)
    toast.error("Could Not Make Payment");
    navigate("/cart");
  }
  dispatch(setLoading(false));
  toast.dismiss(toastId);
}

async function verifyPayment(dispatch, token, navigate, orderToken) {
  const toastId = toast.loading("Verifying Payment....");
  dispatch(setLoading(true));
  try {
    const response = await apiConnector("POST", PRODUCT_VERIFY_API, {
      orderToken,
    }, {
      Authorization: `Bearer ${token}`,
    });

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    toast.success("Payment Verified, you are redirected to course dashboard");
    dispatch(resetCart());
    navigate("/dashboard/enrolled-courses");
  } catch (error) {
    console.log("PRODUCT PAYMENT API ERROR............", error);
    toast.error("Could Not Verify Payment");
  }
  dispatch(setLoading(false));
  toast.dismiss(toastId);
}

async function sendPaymentSuccessEmail(dispatch, token, orderId, navigate) {
  try {
    const response = await apiConnector("POST", SEND_PAYMENT_SUCCESS_EMAIL_API, {
      orderId,
    }, {
      Authorization: `Bearer ${token}`,
    });

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    toast.success("Payment Verified, you are redirected to course dashboard");
  } catch (error) {
    console.log("PRODUCT SEND PAYMENT SUCCESS EMAIL API ERROR............", error);
    toast.error("Could Not Send Payment Success Email");
  }
}

export const getAllOrderAPI = async (token) => {
  const toastId = toast.loading("Loading Orders...");
  try {
    const response = await apiConnector("GET", GET_ALL_ORDER, null, {
      Authorization: `Bearer ${token}`,
    });

    if (!response?.data?.success) {
      throw new Error(response?.data?.message);
    }

    toast.success("Orders Loaded Successfully");
    return response.data.orders;
  } catch (error) {
    console.log("GET_ALL_ORDER_API ERROR............", error);
    toast.error("Could Not Load Orders");
    return [];
  } finally {
    toast.dismiss(toastId);
  }
};

export const updateOrderStatusAPI = async (orderId, status, token) => {
  const toastId = toast.loading("Updating Order Status...");
  try {
    const response = await apiConnector(
      "PUT", 
      `${UPDATE_ORDER_STATUS}/${orderId}`, 
      { orderStatus: status }, 
      {
        Authorization: `Bearer ${token}`,
      }
    );

    if (!response?.data?.success) {
      throw new Error(response?.data?.message);
    }

    toast.success("Order Status Updated Successfully");
    return response.data.order;
  } catch (error) {
    console.log("UPDATE_ORDER_STATUS_API ERROR............", error);
    toast.error("Could Not Update Order Status");
    throw error;
  } finally {
    toast.dismiss(toastId);
  }
};

export const getUserOrderApi = async (userId, token) => {
  const toastId = toast.loading("Loading User Orders...");
  try {
    const response = await apiConnector("GET", `${GET_ORDER_FOR_USER}/${userId}`, null, {
      Authorization: `Bearer ${token}`,
    });

    if (!response?.data?.success) {
      throw new Error(response?.data?.message);
    }

    toast.success("User Orders Loaded Successfully");
    return response.data.orders;
  } catch (error) {
    console.log("GET_USER_ORDER_API ERROR............", error);
    toast.error("Could Not Load User Orders");
    return [];
  } finally {
    toast.dismiss(toastId);
  }
};
