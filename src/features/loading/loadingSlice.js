import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  loading: false,
};
export const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    showLoading: state => {
      state.loading = true;
    },
    hideLoading: state => {
      state.loading = false;
    },
  },
});

export const {showLoading, hideLoading} = loadingSlice.actions;
export const {reducerPath} = loadingSlice;

export const loadingSelector = state => state.loading.loading;

export default loadingSlice;
