import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "authors",
  initialState: {
    dataSachTheoTacGia: [],
    dataAthor: [],
    totalPage: 0,
    curentPage: 1,
  },
  reducers: {
    setDataSachTheoTacGiaSuccess: (state, action) => {
      state.dataAthor = action.payload.author;
      state.dataSachTheoTacGia = action.payload.books.data;
      state.totalPage = action.payload.books.meta.total;
      state.curentPage = action.payload.books.meta.current_page;
    },
  },
});
export default slice.reducer;

const { setDataSachTheoTacGiaSuccess } = slice.actions;

export const setDataSachTheoTacGia = ({ author, books }) =>
  async (dispatch) => {
    try {
      dispatch(setDataSachTheoTacGiaSuccess({ author, books }));
    } catch (e) {
      return console.error(e.message);
    }
};
;
