import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  InputRegister: [],
};

const AuthStore = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setRegisterData(state) {},
    setRegister(state, action) {
      const newData = action.payload;
      state.InputRegister.push({
        email: newData.email,
        password: newData.password,
      });
    },
  },
});

export const {
  setRegister,
  setRegisterData,
  setLoginData,
  setLogin,
  setChangePasswordData,
  setChangePassword,
  setContactUsData,
  setContactUs,
} = AuthStore.actions;

export default AuthStore.reducer;
