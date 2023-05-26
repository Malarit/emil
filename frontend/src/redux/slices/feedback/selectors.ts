import { RootState } from "../..";

export const selectFeedbacks = (state: RootState) => state.feedbackReducer.data;
