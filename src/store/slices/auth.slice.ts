import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type IUserInfo = {
  _id: string;
  name: string;
  email: string;
};
interface IAuthReducer {
  userInfo: IUserInfo | null;
  token: null | string;
}

const initialState: IAuthReducer = {
  userInfo: null,
  token: null,
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
  },
});
export const { setCredentials, signout, setToken, clearToken } =
  authSlice.actions;
export default authSlice.reducer;
