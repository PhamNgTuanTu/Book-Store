import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "allbooks",
  initialState: {
    data: [],
    totalPage: 0,
    curentPage: 1,
    loading: true,
  },
  reducers: {
    setDataAllBooksSuccess: (state, action) => {
      state.loading = true;
      state.data = action.payload.data;
      state.totalPage = action.payload.meta.total;
      state.curentPage = action.payload.meta.current_page;
      state.loading = false;
    },
  },
});
export default slice.reducer;

const { setDataAllBooksSuccess } = slice.actions;

export const setDataAllBook = ({ data, meta }) => async (dispatch) => {
    try {
      dispatch(setDataAllBooksSuccess({ data, meta }));
    } catch (e) {
      return console.error(e.message);
    }
  };
