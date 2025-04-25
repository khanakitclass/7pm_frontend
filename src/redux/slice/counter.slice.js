import { createSlice } from "@reduxjs/toolkit"

const initialStates = {
    count: 0
}

const counterSlice = createSlice({
    name: "counter",
    initialState: initialStates,
    reducers: {
        increment: (state, action) => {
            state.count = state.count + 1
        },
        decrement: (state, action) => {
            state.count = state.count - 1
        }
    }
});

export const { increment, decrement} = counterSlice.actions;
export default counterSlice.reducer;