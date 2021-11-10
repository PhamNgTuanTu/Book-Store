import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "categorys",
  initialState: {
    dataSachTheoTheLoai: [],
    dataCate: [],
    totalPage: 0,
    curentPage: 1,
  },
  reducers: {
    setDataSachTheoTheLoaiSuccess: (state, action) => {
      state.dataCate = action.payload.category;
      state.dataSachTheoTheLoai = action.payload.books.data;
      state.totalPage = action.payload.books.meta.total;
      state.curentPage = action.payload.books.meta.current_page;
    },
  },
});
export default slice.reducer;

const { setLoadingSuccess, setDataSachTheoTheLoaiSuccess } = slice.actions;

export const setDataSachTheoTheLoai = ({ category, books }) =>
  async (dispatch) => {
    try {
      dispatch(setDataSachTheoTheLoaiSuccess({ category, books }));
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
