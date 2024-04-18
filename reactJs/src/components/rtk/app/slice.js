import { createSlice } from "@reduxjs/toolkit";

let initialState={strValue:''}

const slice = createSlice({
    name: 'token',
    initialState,
    reducers: {
        setToken: (state, action) => {
            state.strValue = action.payload;
        },
    }
});

export default slice.reducer;
export const {setToken}=slice.actions;

                    