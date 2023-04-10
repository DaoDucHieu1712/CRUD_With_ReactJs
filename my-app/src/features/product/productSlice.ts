import { createSlice } from "@reduxjs/toolkit";
import { Product } from "../../models/Product";
import { RootState } from "../../app/store";

export interface ProductState {
  loading: boolean;
  error: string;
  list: Product[];
  total: number;
  skip: number;
  limit: number;
}

const initialState: ProductState = {
  loading: true,
  list: [],
  error: "",
  total: 0,
  skip: 0,
  limit: 0,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
});

// Actions
export const studentActions = productSlice.actions;

// Selectors
export const productSelector = (state: RootState) => state.product;

// Reducer
const productReducer = productSlice.reducer;
export default productReducer;
