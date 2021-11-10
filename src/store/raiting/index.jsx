import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "raiting",
  initialState: {
    data: [],
    loading: true,
  },
  reducers: {
    setDataRatingSuccess: (state, action) => {
      state.data = action.payload;
    },
    setLoadingRatingSuccess: (state, action) => {
      state.loading = action.payload;
    },
  },
});
export default slice.reducer;

const { setDataRatingSuccess, setLoadingRatingSuccess } = slice.actions;

export const setDataRating = (data) => async (dispatch) => {
  try {
    dispatch(setDataRatingSuccess(data));
  } catch (e) {
    return console.error(e.message);
  }
};

export const setLoadingRating = (status) => async (dispatch) => {
  try {
    dispatch(setLoadingRatingSuccess(status));
  } catch (e) {
    return console.error(e.message);
  }
};
