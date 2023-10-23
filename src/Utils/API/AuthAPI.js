import axios from "axios";
import { toast } from "react-toastify";
import jwt_decode from "jwt-decode";
import Cookies from "js-cookie";

export const SignUp = async (data) => {
  //     email,
    // password,
    // first_name,
    // last_name,
    // date_of_birth,
    // phone_number,
    // address,
    // city,
    // age, 
    // gender,
    // country,
  const useData = await axios.post("localhost:5000/api/v1/auth/register", data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  console.log(useData);
  if (useData.status === 201) {
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
      "localhost:5000/api/v1/auth/login",
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 201) {
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

