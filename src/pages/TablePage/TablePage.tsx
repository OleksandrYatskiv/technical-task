import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  TextField,
  InputAdornment,
} from '@mui/material';
import { AppDispatch, RootState } from '../../store/store';
import { UserData, fetchTableData, updateTableData } from '../../store/thunks';
import { useDispatch, useSelector } from 'react-redux';
import ContactInfo from '../../components/ContactInfo';
import TableSortLabel from '@mui/material/TableSortLabel';
import SearchIcon from '@mui/icons-material/Search';

function TablePage() {
  const dispatch = useDispatch<AppDispatch>();
  const data = useSelector((state: RootState) => state.auth.tableData);
  const loading = useSelector((state: RootState) => state.auth.loading);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [orderBy, setOrderBy] = useState('name');
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [filter, setFilter] = useState('');

  const [editedItem, setEditedItem] = useState<UserData | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    dispatch(fetchTableData());
  }, []);

  const toggleEdit = (item: UserData) => {
    setIsEditing(!isEditing);
    setEditedItem(isEditing ? null : { ...item });
  };

  const handleEditChange = (event: React.ChangeEvent<HTMLInputElement>, field: string) => {
    const newValue = event.target.value;
    setEditedItem((prevItem: any) => ({
      ...prevItem,
      [field]: newValue,
    }));
  };

  const saveChanges = async () => {
    const inputBirthday = editedItem?.birthday_date as string | undefined;

    if (inputBirthday) {
      const parts = inputBirthday.split('-');
      const year = '20' + parts[2];
      const formattedBirthday = `${year}-${parts[1]}-${parts[0]}`;

      if (editedItem) {
        editedItem.birthday_date = formattedBirthday;
        console.log(formattedBirthday);
      } else {
        console.log('editedItem is null or undefined.');
      }
    } else {
      console.log('Input birthday date is missing or undefined.');
    }

    try {
      if (editedItem) {
        dispatch(updateTableData(editedItem))
          .then((response) => {
            if (response) {
              dispatch(fetchTableData());
              setIsEditing(false);
              setEditedItem(null);
            }
            console.log('POST request successful');
            console.log('Response:', response);
          });
      }
    } catch (error) {
      console.error('Error saving changes:', error);
    }
  };

  const handleSort = (column: string) => {
    if (orderBy === column && order === 'asc') {
      setOrder('desc');
    } else {
      setOrderBy(column);
      setOrder('asc');
    }
  };

  const handleFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value);
  };

  const sortedData = data.slice().sort((a, b) => {
    const isAsc = order === 'asc';
    if (orderBy === 'name') {
      return isAsc ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
    }
    return 0;
  });

  const filteredData = sortedData.filter((item) =>
    item.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <>
      <div>
        <h1 style={{ textAlign: 'center' }}>TablePage</h1>
        <TextField
        sx={{display:'block', margin:'0 auto'}}
          label="Filter Name"
          value={filter}
          onChange={handleFilter}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          style={{ margin: '10px' }}
        />
        {filteredData ? (
          <div>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <TableSortLabel
                        active={orderBy === 'name'}
                        direction={orderBy === 'name' ? order : 'asc'}
                        onClick={() => handleSort('name')}
                      >
                        Name
                      </TableSortLabel>
                    </TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredData
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>
                          {isEditing && editedItem && editedItem.id === item.id ? (
                            <input
                              type="text"
                              value={editedItem.name}
                              onChange={(e) => handleEditChange(e, 'name')}
                            />
                          ) : (
                            item.name
                          )}
                        </TableCell>
                        <TableCell>
                          {isEditing && editedItem && editedItem.id === item.id ? (
                            <input
                              type="text"
                              value={editedItem.email}
                              onChange={(e) => handleEditChange(e, 'email')}
                            />
                          ) : (
                            item.email
                          )}
                        </TableCell>
                        <TableCell>
                          {isEditing && editedItem && editedItem.id === item.id ? (
                            <button onClick={() => saveChanges()}>Save</button>
                          ) : (
                            <button onClick={() => toggleEdit(item)}>Edit</button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              component="div"
              count={filteredData.length}
              page={page}
              onPageChange={(_, newPage) => setPage(newPage)}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={(event) => {
                setRowsPerPage(parseInt(event.target.value, 10));
                setPage(0);
              }}
              rowsPerPageOptions={[5, 10, 25, 50]}
            />
          </div>
        ) : loading === 'pending' ? (
          <p>Loading data...</p>
        ) : (
          <p>Error loading data.</p>
        )}
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '50px' }}>
        <ContactInfo />
      </div>
    </>
  );
}

export default TablePage;
