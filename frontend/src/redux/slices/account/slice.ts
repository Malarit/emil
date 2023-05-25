import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { isMeGet } from "../../../services/req";
import { role } from "./types";

export const fetchItsMe = createAsyncThunk<{ id: number; role: role }>(
  "user/fetchUserStatus",
  async () => {
    return isMeGet();
  }
);

const initialState: {
  user_id: number | undefined;
  role: role;
} = {
  user_id: undefined,
  role: undefined,
};

export const userSlice = createSlice({
  name: "User",
  initialState,
  reducers: {
    setUserId: (state, action: PayloadAction<number | undefined>) => {
      state.user_id = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchItsMe.fulfilled, (state, action) => {
        state.user_id = action.payload.id;
        state.role = action.payload.role;
      })
      .addCase(fetchItsMe.rejected, (state, action) => {
        state.user_id = undefined;
        state.role = undefined;
      });
  },
});

export const { setUserId } = userSlice.actions;

export default userSlice.reducer;
