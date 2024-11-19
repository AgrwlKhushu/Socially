import { configureStore } from "@reduxjs/toolkit";
import { userAuthReducer } from "./Reducers/userReducers";

const store = configureStore({
    reducer: {
        userAuth: userAuthReducer
    }
})


export default store;