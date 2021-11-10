import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "home",
  initialState: {
    dataSachMoiCapNhat: [],
    dataMenuTacGia: [],
    dataMenuTheLoai: [],
    dataSachRanDom: [],
    dataDisMost: [],
    dataSlider: [],
    dataAuthor: [],
    dataBookOfAuthor: [],

    loading: true,
    loadingMenu: true,
    loadingSlider: true,
    loadingUpdate: true,
    loadingSachRanDom: true,
    loadingDisMost: true,
    loadingAuthor: true,
  },
  reducers: {
    setDataSuccess: (state, action) => {
      state.dataSachMoiCapNhat = action.payload;
    },
    setDataSliderSuccess: (state, action) => {
      state.dataSlider = action.payload;
    },
    setDataTheLoaiSuccess: (state, action) => {
      state.dataMenuTheLoai = action.payload;
    },
    setDataTacGiaSuccess: (state, action) => {
      state.dataMenuTacGia = action.payload;
    },
    setDataSachRanDomSuccess: (state, action) => {
      state.dataSachRanDom = action.payload;
    },
    setDataDisMostSuccess: (state, action) => {
      state.dataDisMost = action.payload;
    },
    setDataAuthorSuccess: (state, action) => {
      state.dataAuthor = action.payload.author;
      state.dataBookOfAuthor = action.payload.books;
    },

    setLoadingSuccess: (state, action) => {
      state.loading = action.payload;
    },
    setLoadingMenuSuccess: (state, action) => {
      state.loadingMenu = action.payload;
    },
    setLoadingSliderSuccess: (state, action) => {
      state.loadingSlider = action.payload;
    },
    setLoadingSachUpdateSuccess: (state, action) => {
      state.loadingUpdate = action.payload;
    },
    setLoadingSachRanDomSuccess: (state, action) => {
      state.loadingSachRanDom = action.payload;
    },
    setLoadingDisMostSuccess: (state, action) => {
      state.loadingDisMost = action.payload;
    },
    setLoadingAuthorSuccess: (state, action) => {
      state.loadingAuthor = action.payload;
    },
  },
});
export default slice.reducer;

const {
  setDataSuccess,
  setLoadingSuccess,
  setDataTheLoaiSuccess,
  setDataTacGiaSuccess,
  setDataSliderSuccess,
  setLoadingMenuSuccess,
  setLoadingSliderSuccess,
  setLoadingSachUpdateSuccess,
  setLoadingSachRanDomSuccess,
  setDataSachRanDomSuccess,
  setLoadingDisMostSuccess,
  setDataDisMostSuccess,
  setLoadingAuthorSuccess,
  setDataAuthorSuccess,
} = slice.actions;

export const setData = (data) => async (dispatch) => {
  try {
    dispatch(setDataSuccess(data));
  } catch (e) {
    return console.error(e.message);
  }
};

export const setDataTheLoai = (data) => async (dispatch) => {
  try {
    dispatch(setDataTheLoaiSuccess(data));
  } catch (e) {
    return console.error(e.message);
  }
};

export const setDataSlider = (data) => async (dispatch) => {
  try {
    dispatch(setDataSliderSuccess(data));
  } catch (e) {
    return console.error(e.message);
  }
};

export const setDataTacGia = (data) => async (dispatch) => {
  try {
    dispatch(setDataTacGiaSuccess(data));
  } catch (e) {
    return console.error(e.message);
  }
};

export const setLoading = (status) => async (dispatch) => {
  try {
    dispatch(setLoadingSuccess(status));
  } catch (e) {
    return console.error(e.message);
  }
};

export const setLoadingMenu = (status) => async (dispatch) => {
  try {
    dispatch(setLoadingMenuSuccess(status));
  } catch (e) {
    return console.error(e.message);
  }
};

export const setLoadingSilder = (status) => async (dispatch) => {
  try {
    dispatch(setLoadingSliderSuccess(status));
  } catch (e) {
    return console.error(e.message);
  }
};

export const setLoadingSachUpdate = (status) => async (dispatch) => {
  try {
    dispatch(setLoadingSachUpdateSuccess(status));
  } catch (e) {
    return console.error(e.message);
  }
};

export const setLoadingSachRanDom = (status) => async (dispatch) => {
  try {
    dispatch(setLoadingSachRanDomSuccess(status));
  } catch (e) {
    return console.error(e.message);
  }
};

export const setDataSachRanDom = (params) => async (dispatch) => {
  try {
    dispatch(setDataSachRanDomSuccess(params));
  } catch (e) {
    return console.error(e.message);
  }
};

export const setLoadingDisMost = (status) => async (dispatch) => {
  try {
    dispatch(setLoadingDisMostSuccess(status));
  } catch (e) {
    return console.error(e.message);
  }
};

export const setDataDisMost = (params) => async (dispatch) => {
  try {
    dispatch(setDataDisMostSuccess(params));
  } catch (e) {
    return console.error(e.message);
  }
};

export const setLoadingAuthor = (status) => async (dispatch) => {
  try {
    dispatch(setLoadingAuthorSuccess(status));
  } catch (e) {
    return console.error(e.message);
  }
};

export const setDataAuthor =
  ({ author, books }) =>
  async (dispatch) => {
    try {
      dispatch(setDataAuthorSuccess({ author, books }));
    } catch (e) {
      return console.error(e.message);
    }
  };
