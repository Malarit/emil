import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getJustFeedback, isMeGet } from "../../../services/req";

type feedBack = {
  user_id: number;
  vacancy_id: number;
  state: boolean;
  createdAt?: string;
};

export const fetchFeedback = createAsyncThunk<feedBack[]>(
  "Feedback/fetchFeedback",
  async () => {
    return getJustFeedback();
  }
);

const initialState: { data: feedBack[] } = {
  data: [],
};

export const feedbackSlice = createSlice({
  name: "Feedback",
  initialState,
  reducers: {
    addFeedBack: (
      state,
      action: PayloadAction<{ user_id: number; vacancy_id: number }>
    ) => {
      state.data.push({ state: false, ...action.payload });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeedback.fulfilled, (state, action) => {
        state.data = action.payload;
        console.log(state);
      })
      .addCase(fetchFeedback.rejected, (state, action) => {});
  },
});

export const { addFeedBack } = feedbackSlice.actions;

export default feedbackSlice.reducer;
