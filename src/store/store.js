import { configureStore } from "@reduxjs/toolkit";
import FinancialInstrumentsSlice from "../features/InstrumentsTable/FinancialInstrumentsSlice";

export const store = configureStore({
    reducer: { instruments: FinancialInstrumentsSlice }
});