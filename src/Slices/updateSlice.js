import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  name: "",
  phone: "",
};

export const getUpdater = createAsyncThunk("updater", async () => {
  const res = await axios
    .get("http://example.com/movies.json")
    .then((res) => res.json());
  return res;
});

export const updateSlice = createSlice({
  name: "updater",
  initialState,
  reducers: {
    clear: (state) => {
      state.name = "";
      state.phone = "";
    },
    updateDetails: (state, action) => {
      state.name = action.payload.name;
      state.phone = action.payload.phone;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUpdater.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(getUpdater.fulfilled, (state, action) => {
      state.name = action.payload.name;
      state.phone = action.payload.phone;
      state.status = "updated";
    });
    builder.addCase(getUpdater.rejected, (state) => {
      state.status = "rejected";
    });
  },
});

export const {
  clear,
  updateDetails,
  setMessage,
  setConfirm,
  passwordValidity,
} = updateSlice.actions;

export default updateSlice.reducer;
