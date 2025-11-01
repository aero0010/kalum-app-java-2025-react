import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth/authSlice";
import usersReducer from "./slices/users/userSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        users: usersReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;