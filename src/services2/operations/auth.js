import { apiConnector } from "../apiConnector";
import { endpoints } from "../apis";
import { setLoading, setToken, setUser } from "../../redux/authSlice";
import toast from "react-hot-toast";

const {
  LOGIN_API,
  SIGNUP_API,
  GET_USER_API,
  FETCH_MY_PROFILE_API,
} = endpoints;

export function login(email, password, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", LOGIN_API, {
        email,
        password,
      });

      console.log("LOGIN API RESPONSE............", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Login Successful");
      dispatch(setToken(response.data.token));
      dispatch(setUser({ ...response.data.user }));

      localStorage.setItem("token", JSON.stringify(response.data.token));
      localStorage.setItem("user", JSON.stringify(response.data.user));
      navigate("/profile");
    } catch (error) {
      console.log("LOGIN API ERROR............", error);
      toast.error("Login Failed");
    } finally {
      dispatch(setLoading(false));
      toast.dismiss(toastId);
    }
  };
}

export function signup(
  name,
  email,
  password,
  confirmPassword,
  phone,
  navigate
) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", SIGNUP_API, {
        name,
        email,
        password,
        confirmPassword,
        phone,
      });

      console.log("SIGNUP API RESPONSE............", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      toast.success("Signup Successful");
      navigate("/login");
    } catch (error) {
      console.log("SIGNUP API ERROR............", error);
      toast.error("Signup Failed");
      navigate("/signup");
    } finally {
      dispatch(setLoading(false));
      toast.dismiss(toastId);
    }
  };
}

export function getUserAPI(token) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading User Data...");
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("GET", GET_USER_API, null, {
        Authorization: `Bearer ${token}`,
      });

      console.log("GET_USER_API API RESPONSE............", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      const user = response.data.user;
      dispatch(setUser({ ...user }));
      toast.success("User Loaded Successfully");
    } catch (error) {
      console.log("GET_USER_API API ERROR............", error);
      toast.error("Could Not Load User Data");
    } finally {
      dispatch(setLoading(false));
      toast.dismiss(toastId);
    }
  };
}

export function getAllUsersAPI(token) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading Users...");
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("GET", GET_ALL_USERS_API, null, {
        Authorization: `Bearer ${token}`,
      });

      if (!response?.data?.success) {
        throw new Error(response?.data?.message);
      }

      toast.success("Users Loaded Successfully");
      return response.data.users;
    } catch (error) {
      console.log("GET_ALL_USERS_API ERROR............", error);
      toast.error("Could Not Load Users");
      return [];
    } finally {
      dispatch(setLoading(false));
      toast.dismiss(toastId);
    }
  };
}

export function updateUserStatusAPI(userId, status, token) {
  return async (dispatch) => {
    const toastId = toast.loading("Updating User Status...");
    try {
      const response = await apiConnector(
        "PUT", 
        `${UPDATE_USER_STATUS_API}/${userId}`, 
        { status }, 
        {
          Authorization: `Bearer ${token}`,
        }
      );

      if (!response?.data?.success) {
        throw new Error(response?.data?.message);
      }

      toast.success("User Status Updated Successfully");
      return response.data.user;
    } catch (error) {
      console.log("UPDATE_USER_STATUS_API ERROR............", error);
      toast.error("Could Not Update User Status");
      throw error;
    } finally {
      toast.dismiss(toastId);
    }
  };
}

export function fetchMyProfile(token) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await apiConnector(
        "GET",
        FETCH_MY_PROFILE_API,
        null,
        {
          Authorization: `Bearer ${token}`,
        }
      );
      console.log("FETCH_MY_PROFILE_API API RESPONSE............", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      dispatch(setUser(response.data.user));
    } catch (error) {
      console.log("FETCH_MY_PROFILE_API API ERROR............", error);
      toast.error("Could Not Load Profile Data");
    } finally {
      dispatch(setLoading(false));
    }
  };
}

export function logout(navigate) {
  return (dispatch) => {
    dispatch(setToken(null));
    dispatch(setUser(null));
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success("Logged Out");
    navigate("/");
  };
}

// Add missing API endpoints
const GET_ALL_USERS_API = endpoints.GET_ALL_MEMBER_API;
const UPDATE_USER_STATUS_API = endpoints.UPDATE_MEMBER_PERMISSION_API;
