import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "details",
  initialState: {
    data: [],
    loading: true,
  },
  reducers: {
    setDataSuccess: (state, action) => {
      state.data = action.payload;
    },
    setLoadingSuccess: (state, action) => {
      state.loading = action.payload;
    },
  },
});
export default slice.reducer;

const { setDataSuccess, setLoadingSuccess } = slice.actions;

export const setDataDetails = (data) => async (dispatch) => {
  try {
    dispatch(setDataSuccess(data));
  } catch (e) {
    return console.error(e.message);
  }
};

export const setLoadingDetails = (status) => async (dispatch) => {
  try {
    dispatch(setLoadingSuccess(status));
  } catch (e) {
    return console.error(e.message);
  }
};
