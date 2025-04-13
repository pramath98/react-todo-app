import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn: false,
    userName: '',
    userID: null,
    token:null
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action) => {
            state.isLoggedIn = true;
            state.userName = action.payload.userName;
            state.userID=action.payload.id;
            state.token = action.payload.token;
        },
        loginFailure: (state) => {
            state.isLoggedIn = false;
            state.userName = '';
            state.userID = null;
            state.token=null;
        },
        logout: (state) => {
            state.isLoggedIn = false;
            state.userName = '';
            state.userID = null;
            state.token=null;
        }
    }
});
export const { login, loginFailure, logout } = userSlice.actions;

export default userSlice.reducer;