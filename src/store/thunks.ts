import { createAsyncThunk } from '@reduxjs/toolkit';
import { table } from '../api/table/table';

export interface UserData {
  id: number;
  name: string;
  email: string;
  birthday_date: string;
  phone_number: string;
  address: string;
}

export const fetchTableData = createAsyncThunk<UserData[], void>(
  'table/fetchData',
  async () => {
    const response = await table.get();
    return response.results;
  }
);

export const updateTableData = createAsyncThunk('table/updateData', async (editedItem: any) => {
  const response = await table.post(editedItem);
  return response;
});

