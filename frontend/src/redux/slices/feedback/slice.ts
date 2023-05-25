import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { isMeGet } from "../../../services/req";

export const fetchFeedback = createAsyncThunk<{ id: number }>(
  "user/fetchFeedback",
  async () => {
    return isMeGet();
  }
);

const initialState: { user_id: number | undefined } = {
  user_id: undefined,
};

export const feedbackSlice = createSlice({
  name: "Feedback",
  initialState,
  reducers: {
    set: (state, action: PayloadAction<number | undefined>) => {
      state.user_id = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeedback.fulfilled, (state, action) => {
        state.user_id = action.payload.id;
      })
      .addCase(fetchFeedback.rejected, (state, action) => {
        state.user_id = undefined;
      });
  },
});

export const { set } = feedbackSlice.actions;

export default feedbackSlice.reducer;
