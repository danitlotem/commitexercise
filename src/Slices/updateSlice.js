import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Promise from "promise";
const initialState = {
  name: "",
  phone: "",
};

export const getUpdater = createAsyncThunk("updater", async () => {
  // eslint-disable-next-line no-undef
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return "simulatedAsyncAwait";
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
