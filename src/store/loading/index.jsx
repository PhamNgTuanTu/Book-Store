import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "loading",
  initialState: {
    loadingPage: true,
  },
  reducers: {
    setLoadingSuccess: (state, action) => {
      state.loadingPage = action.payload;
    },
  },
});
export default slice.reducer;

const { setLoadingSuccess } = slice.actions;

export const setLoadingPage = (status) => async (dispatch) => {
  try {
    dispatch(setLoadingSuccess(status));
  } catch (e) {
    return console.error(e.message);
  }
};
