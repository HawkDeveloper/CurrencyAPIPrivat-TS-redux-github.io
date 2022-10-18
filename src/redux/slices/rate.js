import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    rate: 0,
}
const rateSlice = createSlice({
    name: 'rate',
    initialState: initialState,
    reducers: {
        setRateReducer: (state, action) => {
            state.rate = action.payload;
        }
    }
});

export const rateSelector = {
    getRate: (state) => state.rate
}

export const {setRateReducer} = rateSlice.actions;

export default rateSlice;