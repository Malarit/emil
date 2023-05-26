import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";

import userReducer from "./slices/account/slice";
import windowReducer from "./slices/screen/slice";
import feedbackReducer from "./slices/feedback/slice";

export const store = configureStore({
  reducer: {
    userReducer,
    windowReducer,
    feedbackReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
