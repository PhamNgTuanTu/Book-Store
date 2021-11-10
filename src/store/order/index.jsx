import { createSlice, current } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "orders",
  initialState: {
    data: [],
    dataOrder: [],
    loading: true,
    totalPage: 0,
    curentPage: 1,
    loadingPage: false,
  },
  reducers: {
    setDataOrderSuccess: (state, action) => {
      state.data = action.payload;
    },
    setDataOrderProfileSuccess: (state, action) => {
      state.dataOrder = action.payload;
    },
    setLoadingOrderSuccess: (state, action) => {
      state.loading = action.payload;
    },
    setStatusSuccess: (state, action) => {
      const { id, status } = action.payload;
      const data = current(state);
      const orderIndex = data.dataOrder.findIndex((ord) => ord.id === id);
      if (orderIndex >= 0) {
        let newStatus = [
          {
            ...data.dataOrder[orderIndex],
            status: status,
          },
        ];
        state.dataOrder[orderIndex] = newStatus[0];
      }
    },
    setPageOrderSuccess: (state, action) => {
      state.totalPage = action.payload.total;
      state.curentPage = action.payload.current_page;
    },
    setLoadingPageSuccess: (state, action) => {
      state.loadingPage = action.payload;
    },
  },
});
export default slice.reducer;

const {
  setLoadingOrderSuccess,
  setDataOrderSuccess,
  setDataOrderProfileSuccess,
  setStatusSuccess,
  setPageOrderSuccess,
  setLoadingPageSuccess,
} = slice.actions;

export const setDataOrder = (params) => async (dispatch) => {
  try {
    dispatch(setDataOrderSuccess(params));
  } catch (e) {
    return console.error(e.message);
  }
};

export const setDataOrderProfile = (params) => async (dispatch) => {
  try {
    dispatch(setDataOrderProfileSuccess(params));
  } catch (e) {
    return console.error(e.message);
  }
};

export const setLoadingOrder = (status) => async (dispatch) => {
  try {
    dispatch(setLoadingOrderSuccess(status));
  } catch (e) {
    return console.error(e.message);
  }
};

export const setStatusOder = (status, id) => async (dispatch) => {
  try {
    dispatch(setStatusSuccess({ status, id }));
  } catch (e) {
    return console.error(e.message);
  }
};

export const setPageOder = (params) => async (dispatch) => {
  try {
    dispatch(setPageOrderSuccess(params));
  } catch (e) {
    return console.error(e.message);
  }
};

export const setLoadingPage = (status) => async (dispatch) => {
  try {
    dispatch(setLoadingPageSuccess(status));
  } catch (e) {
    return console.error(e.message);
  }
};
