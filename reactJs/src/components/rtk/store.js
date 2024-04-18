import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from './app/api';
import slice from './app/slice'

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        token:slice,
        
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true
})


// export const RootState = () => store.getState();
// export const AppDispatch=store.dispatch;


