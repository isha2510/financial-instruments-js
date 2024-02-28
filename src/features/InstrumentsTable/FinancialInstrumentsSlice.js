import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { getData } from "../../services/DataService";


export const initialState = {
    instruments: []
}

export const fetchInstruments = createAsyncThunk('fetch/instruments', () => {
    console.log("calling api");
    return getData();
})

const instruments = createSlice({
    name: "instruments",
    initialState,
    reducers: {},
    extraReducers: (builder)=>{
        builder.addCase(fetchInstruments.pending,(state,action)=>{
           
        }).addCase(fetchInstruments.fulfilled,(state,action)=>{
            state.instruments=action.payload;
        });
    }
});

export default instruments.reducer;