import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAddress, getPosition } from "../../services/apiGeocoding";

const initialState = {
  name: "",
  status: "idle",
  position: "",
  address: "",
  error: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signin(state, action) {
      state.name = action.payload;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchAddress.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAddress.fulfilled, (state, action) => {
        state.position = action.payload.position;
        state.address = action.payload.address;
        state.status = "idle";
      })
      .addCase(fetchAddress.rejected, (state, action) => {
        state.error = action.error.message;
        state.status = "idle";
      }),
});

export const fetchAddress = createAsyncThunk(
  "user/fetchAddress",
  async function () {
    const position = await getPosition().then((position) => position);
    const address = await getAddress({
      latitude: position.latitude,
      longitude: position.longitude,
    });
    return { position, address }; //action payload
  },
);

export default userSlice.reducer;
export const { signin } = userSlice.actions;
