import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { IAction, IAuthReducer, IUserInfo } from "../../types/interfaces";
import { RootState } from "../store";

const initialState: IAuthReducer = {
  userInfo: null,
  token: "",
  action: {
    type: null,
    loading: false,
  },
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<IUserInfo>) => {
      state.userInfo = action.payload;
    },
    signout: (state) => {
      state.userInfo = null;
      localStorage.removeItem("userInfo");
    },
    setToken(state, action: PayloadAction<{ token: string }>) {
      localStorage.setItem("token", action.payload.token);
      state.token = action.payload.token;
    },
    clearToken(state) {
      state.token = null;
    },
    updateAction(state, action: PayloadAction<IAction>) {
      state.action = action.payload;
    },
    resetAction(state) {
      state.action = initialState.action;
    },
  },
});
export const {
  setCredentials,
  signout,
  setToken,
  clearToken,
  updateAction,
  resetAction,
} = authSlice.actions;

export default authSlice.reducer;
export const auth = (state: RootState) => state.auth;
