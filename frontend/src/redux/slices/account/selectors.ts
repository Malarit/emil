import { RootState } from "../../";

export const selectUserId = (state: RootState) => state.userReducer.user_id;
export const selectUserRole = (state: RootState) => state.userReducer.role;
