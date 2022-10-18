import { configureStore } from "@reduxjs/toolkit";
import rateSlice from './slices/rate';

const store =  configureStore({
    reducer: {
        rate: rateSlice.reducer
    }
})

export default store;