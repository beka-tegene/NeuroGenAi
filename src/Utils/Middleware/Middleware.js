import { call, put, takeLatest } from "redux-saga/effects";
import { toast } from "react-toastify";
import { setLoginData, setRegisterData } from "../Store/AuthStore";
import { Login, SignUp } from "../API/AuthAPI";
import { StrokeRecommendations, Strokepredictor } from "../API/PredictionApi";
import {
  setStrokeRecommendationsData,
  setStrokepredictorData,
} from "../Store/PredictionStore";

export function* watchFetchNeuro() {
  yield takeLatest("auth/setRegister", fetchSetRegister);
  yield takeLatest("auth/setLogin", fetchSetLogin);
  yield takeLatest("prediction/setStrokepredictor", fetchSetStrokepredictor);
  yield takeLatest(
    "prediction/setStrokeRecommendations",
    fetchSetStrokeRecommendations
  );
}

// Authentication and Authorization data

function* fetchSetRegister(action) {
  try {
    yield call(SignUp, action.payload.data);
    yield setRegisterData();
  } catch (error) {
    toast.error(error.response.data.msg);
    console.error("Saga Error:", error);
  }
}

function* fetchSetLogin(action) {
  try {
    yield call(Login, action.payload.data);
    yield setLoginData();
  } catch (error) {
    toast.error(error.response.data.msg);
    console.error("Saga Error:", error);
  }
}

function* fetchSetStrokeRecommendations(action) {
  try {
    yield call(StrokeRecommendations, action.payload.data);
    yield setStrokeRecommendationsData();
  } catch (error) {
    toast.error(error.response.data.msg);
    console.error("Saga Error:", error);
  }
}

function* fetchSetStrokepredictor(action) {
  try {
    yield call(Strokepredictor, action.payload.data);
    yield setStrokepredictorData();
  } catch (error) {
    toast.error(error.response.data.msg);
    console.error("Saga Error:", error);
  }
}
