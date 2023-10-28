import {configureStore} from "@reduxjs/toolkit";
import todoReducer from "../features/todo/todoSlice";

export const store = configureStore({

    reducer:todoReducer, // this is why we exported the todoSlice.reducer by default

});