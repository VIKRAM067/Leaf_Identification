import { configureStore } from "@reduxjs/toolkit";
import { articleApi } from "./article";

export const store = configureStore({
    reducer: {
        [articleApi.reducerPath]:articleApi.reducer
    }, /*sole job of reducer is to accept two things (the action and the current state of the application)
     return a new updated instance of the state */
    middleware:(getDefaultMiddleware) => getDefaultMiddleware().concat(articleApi.middleware)
})