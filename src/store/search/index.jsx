import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "search",
  initialState: {
    data: [],
    totalPage: 0,
    curentPage: 1,
    params: "",
  },
  reducers: {
    setDataSearchSuccess: (state, action) => {
      state.data = action.payload.data;
      state.totalPage = action.payload.meta.total;
      state.curentPage = action.payload.meta.current_page;
    },
    setParamsSearchSuccess: (state, action) => {
      state.params = action.payload;
    },
  },
});
export default slice.reducer;

const { setLoadingSuccess, setDataSearchSuccess, setParamsSearchSuccess } =
  slice.actions;

export const setDataSearch =
  ({ data, meta }) =>
  async (dispatch) => {
    try {
      dispatch(setDataSearchSuccess({ data, meta }));
    } catch (e) {
      return console.error(e.message);
    }
  };

export const setLoadingAllBooks = (status) => async (dispatch) => {
  try {
    dispatch(setLoadingSuccess(status));
  } catch (e) {
    return console.error(e.message);
  }
};

export const setParamsSearch = (params) => async (dispatch) => {
  try {
    dispatch(setParamsSearchSuccess(params));
  } catch (e) {
    return console.error(e.message);
  }
};
