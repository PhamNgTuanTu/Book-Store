import { createSlice, current } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "shipper",
  initialState: {
    shipper: JSON.parse(localStorage.getItem("shipper")) || null,
    dataShip: [],
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.shipper = action.payload;
      localStorage.setItem("shipper", JSON.stringify(action.payload));
    },
    logoutSuccess: (state, action) => {
      state.shipper = null;
      localStorage.removeItem("shipper");
    },
    setDataShipSuccess: (state, action) => {
      state.dataShip = action.payload;
    },
    setStatusSuccess: (state, action) => {
      const { id, status } = action.payload;
      const data = current(state);
      const orderIndex = data.dataShip.findIndex((ord) => ord.id === id);
      if (orderIndex >= 0) {
        let newStatus = [
          {
            ...data.dataShip[orderIndex],
            status: status,
          },
        ];
        state.dataShip[orderIndex] = newStatus[0];
      }
    },
  },
});
export default slice.reducer;
const { loginSuccess, logoutSuccess, setDataShipSuccess, setStatusSuccess } = slice.actions;

export const login =
  ({ name, token }) =>
  async (dispatch) => {
    try {
      dispatch(loginSuccess({ name, token }));
    } catch (e) {
      return console.error(e.message);
    }
  };

export const logout = () => async (dispatch) => {
  try {
    return dispatch(logoutSuccess());
  } catch (e) {
    return console.error(e.message);
  }
};

export const setDataShip = (params) => async (dispatch) => {
  try {
    return dispatch(setDataShipSuccess(params));
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
