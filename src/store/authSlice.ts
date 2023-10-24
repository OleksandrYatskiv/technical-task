import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserData, fetchTableData } from './thunks';

interface AuthState {
  username: string | null;
  password: string | null;
  tableData: UserData[];
  loading: 'idle' | 'pending' | 'fulfilled' | 'rejected';
}

const initialState: AuthState = {
  username: 'testuser',
  password: 'testpassword123',
  tableData: [],
  loading: 'idle',
};

// Initializing slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{ username: string; password: string }>) => {
      state.username = action.payload.username;
      state.password = action.payload.password;
    },
    clearCredentials: (state) => {
      state.username = null;
      state.password = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTableData.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(fetchTableData.fulfilled, (state, { payload }) => {
        state.tableData = payload;
        state.loading = 'fulfilled';
      })
      .addCase(fetchTableData.rejected, (state) => {
        state.loading = 'rejected';
      });
},
});

export const { setCredentials, clearCredentials } = authSlice.actions;

export default authSlice.reducer;
