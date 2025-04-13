import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "../features/todo/todoSlice";
import userReducer from "../features/user/userSlice";
export const store = configureStore({
    reducer: {
        todos: todoReducer, // this is why we exported the todoSlice.reducer by default
        user: userReducer
    }
});