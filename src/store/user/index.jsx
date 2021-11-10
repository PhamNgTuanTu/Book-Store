import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "user",
  initialState: {
    user: JSON.parse(localStorage.getItem("user")) || null,
    dataUser: [],
    page: 10,
    loadingPage: true,
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    signupSuccess: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    logoutSuccess: (state, action) => {
      state.user = null;
      localStorage.removeItem("user");
    },
    setDataSuccess: (state, action) => {
      state.dataUser = action.payload;
    },
    editUserSuccess: (state, action) => {
      state.dataUser = action.payload;
    },
    setLoadingDataSuccess: (state, action) => {
      state.loadingPage = action.payload;
    },
  },
});
export default slice.reducer;
const {
  loginSuccess,
  logoutSuccess,
  setDataSuccess,
  setLoadingDataSuccess,
  signupSuccess,
  editUserSuccess
} = slice.actions;

export const login = ({ name, token }) => async (dispatch) => {
    try {
      dispatch(loginSuccess({ name, token }));
    } catch (e) {
      return console.error(e.message);
    }
  };
export const setSignup = ({ name, token }) => async (dispatch) => {
    try {
      dispatch(signupSuccess({ name, token }));
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
export const setDataUser = (data) => async (dispatch) => {
  try {
    return dispatch(setDataSuccess(data));
  } catch (e) {
    return console.error(e.message);
  }
};
export const setLoadingData = (status) => async (dispatch) => {
  try {
    dispatch(setLoadingDataSuccess(status));
  } catch (e) {
    return console.error(e.message);
  }
};
export const editUserData = (data) => async (dispatch) => {
  try {
    return dispatch(editUserSuccess(data));
  } catch (e) {
    return console.error(e.message);
  }
};
