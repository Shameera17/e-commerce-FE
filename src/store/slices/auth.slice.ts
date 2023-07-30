import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const localStorageData = localStorage.getItem("userInfo");
type IUserInfo = {
  _id: string;
  name: string;
  email: string;
};
interface InitialState {
  userInfo: IUserInfo | null;
}

const initialState: InitialState = {
  userInfo: localStorageData ? JSON.parse(localStorageData) : null,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<IUserInfo>) => {
      state.userInfo = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
    },
    signout: (state, action: PayloadAction<null>) => {
      state.userInfo = null;
      localStorage.removeItem("userInfo");
    },
  },
});
export const { setCredentials, signout } = authSlice.actions;
export default authSlice.reducer;
