import axios from "axios";
import { toast } from "react-toastify";
import jwt_decode from "jwt-decode";
import Cookies from "js-cookie";

export const SignUp = async (data) => {
  // email, password
  const useData = await axios.post("http://localhost:5001/auth/signup", data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  console.log(useData);
  if (useData.status === 200) {
    window.location.href = "/login";
  } else {
    window.location.href = "/register";
  }
};

export const Login = async (data) => {
  try {
    console.log(data);
    //email, password
    const response = await axios.post(
      "http://localhost:5001/auth/login",
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200) {
      const { token } = response.data;
      const decodedToken = jwt_decode(token);
      localStorage.setItem("token", token);
      Cookies.set("token", token, { expires: 1 });

      // Cookies.set("role", decodedToken.role, { expires: 1 });

      if (decodedToken.role === "admin") {
        window.location.href = "/private/geezbank/dashboard";
      } else if (decodedToken.role === "user") {
        window.location.href = "/dashboard";
      } else {
        window.location.href = "/login";
      }
    }
  } catch (error) {
    toast.error(error.response.data.msg);
    toast.error(error.response.data.error);
    console.error("Login Error:", error);
  }
};

export const forgotPassword = async (data) => {
  // email
  const useData = await axios.post(
    "http://localhost:5001/auth/forgotPassword",
    data,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  console.log(useData);
  if (useData.status === 200) {
    window.location.href = "/";
  } else {
    window.location.href = "/register";
  }
};