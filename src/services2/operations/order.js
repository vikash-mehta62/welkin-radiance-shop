
import { toast } from "react-toastify"
import { apiConnector } from "../apiConnector"
import { paymentEndpoints } from "../apis"
import { order } from "../apis"
import rzpLogo from "/logo.jpeg"

const {
  PRODUCT_PAYMENT_API,
  PRODUCT_VERIFY_API,

} = paymentEndpoints
const {
  GET_ALL_ORDER,
  UPDATE_ORDER_STATUS,
  GET_ORDER_FOR_USER
} = order


// Load the Razorpay SDK from the CDN
function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script")
    script.src = src
    script.onload = () => {
      resolve(true)
    }
    script.onerror = () => {
      resolve(false)
    }
    document.body.appendChild(script)
  })
}




// Buy Product

export async function BuyProduct(
  token,
  products,
  address,
  payable,
  navigate,
  dispatch
) {
  const toastId = toast.loading("Loading...")
  try {
    // Loading the script of Razorpay SDK
    const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js")

    if (!res) {
      toast.error(
        "Razorpay SDK failed to load. Check your Internet Connection."
      )
      return
    }

    // Initiating the Order in Backend
    const orderResponse = await apiConnector(
      "POST",
      PRODUCT_PAYMENT_API,
      {
        products,
        payable
      },
      {
        Authorization: `Bearer ${token}`,
      }
    )

    if (!orderResponse.data.success) {
      throw new Error(orderResponse.data.message)
    }
    //   console.log("PAYMENT RESPONSE FROM BACKEND............", orderResponse.data)
    // Opening the Razorpay SDK
    const options = {
      // key: process.env.RAZORPAY_KEY,
      key: "rzp_live_R5xi0RECsTXCsc",

      currency: orderResponse.data.data.currency,
      amount: `${orderResponse.data.data.amount}`,
      order_id: orderResponse.data.data.id,
      name: "NK Enterprises",
      description: "Thank you for Purchasing the Products.",
      image: rzpLogo,
      // prefill: {
      //   name: `${user_details.name} `,
      //   email: user_details.email,
      // },
      handler: function (response) {
        //   sendPaymentSuccessEmail(response, orderResponse.data.data.amount, token)
        verifyPayment({ ...response, products, address, payable }, token, navigate, dispatch)
      },
    }
    const paymentObject = new window.Razorpay(options)

    paymentObject.open()
    paymentObject.on("payment.failed", function (response) {
      toast.error("Oops! Payment Failed.")
      console.log(response.error)
    })
  } catch (error) {
    console.log("PAYMENT API ERROR............", error)
    toast.error("Could Not make Payment.")
  }
  toast.dismiss(toastId)
}


// Verify the Payment
async function verifyPayment(bodyData, token, navigate, dispatch) {
  const toastId = toast.loading("Verifying Payment...")
  console.log("enter verify")
  // dispatch(setPaymentLoading(true))
  try {
    const response = await apiConnector("POST", PRODUCT_VERIFY_API, bodyData, {
      Authorization: `Bearer ${token}`,
    })

    console.log("VERIFY PAYMENT RESPONSE FROM BACKEND............", response)

    if (!response.data.success) {
      throw new Error(response.data.message)
    }

    toast.success("Payment Successful. Order Placed ")

    navigate("/")


  } catch (error) {
    console.log("PAYMENT VERIFY ERROR............", error)
    toast.error("Could Not Verify Payment.")
  }
  toast.dismiss(toastId)
  // dispatch(setPaymentLoading(false))
}








export const getAllOrder = async (token) => {
  const toastId = toast.loading("Loading...");

  try {
    const response = await apiConnector("GET", GET_ALL_ORDER, null, {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    });

    console.log(response);

    if (!response?.data?.success) {
      throw new Error("Could Not Fetch Orders");
    }

    const result = response.data.orders;
    toast.dismiss(toastId);
    return result;
  } catch (error) {
    console.log("GET_ALL_ORDER_API ERROR:", error);
    toast.error(error.message || "Something went wrong");
    toast.dismiss(toastId);
    return [];
  }
};
export const getUserOrderApi = async (userId, token) => {
  const toastId = toast.loading("Loading...");

  try {
    const response = await apiConnector("GET", `${GET_ORDER_FOR_USER}/${userId}`, null, {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    });

    console.log(response);

    if (!response?.data?.success) {
      throw new Error("Could Not Fetch Orders");
    }

    const result = response.data.orders;
    toast.dismiss(toastId);
    return result;
  } catch (error) {
    console.log("GET_ALL_ORDER_API ERROR:", error);
    toast.error(error.message || "Something went wrong");
    toast.dismiss(toastId);
    return [];
  }
};


export const updateOrderStatusApi = async (id, orderStatus, token) => {
  const toastId = toast.loading("Loading...");

  try {
    const response = await apiConnector("PUT", `${UPDATE_ORDER_STATUS}/${id}`, { orderStatus }, {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    });

    console.log(response);

    if (!response?.data?.success) {
      throw new Error("Could Not Fetch Orders");
    }
    toast.success(response?.data?.message)

    const result = response.data.order;
    toast.dismiss(toastId);
    return result;
  } catch (error) {
    console.log("update order ERROR:", error);
    toast.error(error.message || "Something went wrong");
    toast.dismiss(toastId);
    return [];
  }
};
