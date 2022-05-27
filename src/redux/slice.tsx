import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  loading: false,
  errors: false,
  records: []
}

export const classSlice = createSlice({
    name: 'records',
    initialState,
    reducers: { 
        startLoading: (state) => {
          state.loading = true;
          state.errors = false;
        },

        getRecordsSuccess: (state, { payload }) => {
          state.records = payload;
          state.loading = false;
          state.errors = false;
        },

        hasError: (state, { payload}) => {
          state.errors = payload;
          state.loading = false;
          state.errors = true;
        }
    }
});

export const { startLoading, getRecordsSuccess, hasError } = classSlice.actions;
export default classSlice.reducer;
