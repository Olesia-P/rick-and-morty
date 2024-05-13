import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CharactersState } from "../../types/types";

const initialState: CharactersState = {
  charactersParams: {
    name: "",
    gender: "",
    status: "",
    page: "",
  },
};

const charactersSlice = createSlice({
  name: "characters",
  initialState,
  reducers: {
    changeName: (state, action: PayloadAction<string>) => {
      state.charactersParams.name = action.payload;
    },
    changeGender: (state, action: PayloadAction<string>) => {
      state.charactersParams.gender = action.payload;
    },
    changeStatus: (state, action: PayloadAction<string>) => {
      state.charactersParams.status = action.payload;
    },
    changePage: (state, action: PayloadAction<string>) => {
      state.charactersParams.page = action.payload;
    },
  },
});

export default charactersSlice.reducer;
export const { changeGender, changeName, changeStatus, changePage } =
  charactersSlice.actions;
