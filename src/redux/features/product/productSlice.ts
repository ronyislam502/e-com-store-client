import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FilterState {
  category: string;
  brand: string;
  price: string;
  search: string;
}

const initialState: FilterState = {
  category: "",
  brand: "",
  price: "",
  search: "",
};

const productFilterSlice = createSlice({
  name: "productFilter",
  initialState,
  reducers: {
    setCategory: (state, action: PayloadAction<string>) => {
      state.category = action.payload;
    },
    setBrand: (state, action: PayloadAction<string>) => {
      state.brand = action.payload;
    },
    setPrice: (state, action: PayloadAction<string>) => {
      state.price = action.payload;
    },
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    resetFilters: () => initialState,
  },
});

export const { setCategory, setBrand, setPrice, setSearch, resetFilters } =
  productFilterSlice.actions;

export default productFilterSlice.reducer;
