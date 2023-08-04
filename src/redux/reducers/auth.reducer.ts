import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { decodeToken } from "react-jwt";

import { IAction, IAuthReducer, IUserInfo } from "../../types/interfaces";
import { RootState } from "../store";

const initialState: IAuthReducer = {
  userInfo: null,
  token: "",
  action: {
    type: null,
    loading: false,
  },
  isModalVisible: false,
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
    manageModal(state) {
      state.isModalVisible = !state.isModalVisible;
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
    refreshAuthToken(state) {
      if (!state.userInfo && !state.token) {
        const token = localStorage.getItem("token");
        const decodedToken = decodeToken(token!);
        // // Verify the token and extract the payload (user data) if valid
        // const decoded: any = Jwt.verify(token!, secretKey!);
        state.userInfo = decodedToken as any;
        state.token = token;
      }
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
  manageModal,
  refreshAuthToken,
} = authSlice.actions;

export default authSlice.reducer;
export const auth = (state: RootState) => state.auth;
