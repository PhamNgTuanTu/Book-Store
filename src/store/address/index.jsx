import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "address",
  initialState: {
    dataTinh: [],
    dataHuyen: [],
    dataXa: [],
    formData: {},
    infoDv: [],
    mesDv: "",
    feeShip : 0,
    loading: true,
  },
  reducers: {
    setDataAllTinhSuccess: (state, action) => {
      state.dataTinh = action.payload;
    },
    setDataAllHuyenSuccess: (state, action) => {
      state.dataHuyen = action.payload;
    },
    setDataAllXaSuccess: (state, action) => {
      state.dataXa = action.payload;
    },
    setFormSuccess: (state, action) => {
      state.formData = action.payload;
    },
    setInFoSuccess: (state, action) => {
      state.infoDv = action.payload.data;
      state.mesDv = action.payload.code_message_value;
    },
    setFeeShipSuccess: (state, action) => {
      state.feeShip = action.payload;
    },
  },
});
export default slice.reducer;

const {
  setDataAllTinhSuccess,
  setDataAllHuyenSuccess,
  setDataAllXaSuccess,
  setFormSuccess,
  setInFoSuccess,
  setFeeShipSuccess
} = slice.actions;

export const setDataTinh = (params) => async (dispatch) => {
  try {
    dispatch(setDataAllTinhSuccess(params));
  } catch (e) {
    return console.error(e.message);
  }
};

export const setDataHuyen = (params) => async (dispatch) => {
  try {
    dispatch(setDataAllHuyenSuccess(params));
  } catch (e) {
    return console.error(e.message);
  }
};

export const setDataXa = (params) => async (dispatch) => {
  try {
    dispatch(setDataAllXaSuccess(params));
  } catch (e) {
    return console.error(e.message);
  }
};

export const setDataForm = (params) => async (dispatch) => {
  try {
    dispatch(setFormSuccess(params));
  } catch (e) {
    return console.error(e.message);
  }
};

export const setDV = ({data, code_message_value}) => async (dispatch) => {
  try {
    dispatch(setInFoSuccess({data, code_message_value}));
  } catch (e) {
    return console.error(e.message);
  }
};

export const setPhiShip = (num) => async (dispatch) => {
  try {
    dispatch(setFeeShipSuccess(num));
  } catch (e) {
    return console.error(e.message);
  }
};
