import { call, put, takeLatest } from "redux-saga/effects";
import { toast } from "react-toastify";
import { setRegisterData } from "../Store/AuthStore";
import { SignUp } from "../API/AuthAPI";

export function* watchFetchNeuro() {
  yield takeLatest("auth/setRegister", fetchSetRegister);
}

// Authentication and Authorization data

function* fetchSetRegister(action) {
  try {
    yield call(SignUp, action.payload);
    yield setRegisterData();
  } catch (error) {
    toast.error(error.response.data.msg);
    console.error("Saga Error:", error);
  }
}
