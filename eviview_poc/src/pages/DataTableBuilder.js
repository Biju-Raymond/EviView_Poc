import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Paper,
  MenuItem,
  Select,
  Snackbar,
  Alert,
  FormControl,
  InputLabel,
  RadioGroup,
  Radio,
  FormControlLabel,
} from '@mui/material';

const DataTableBuilder = () => {
  const navigate = useNavigate();

  const [dataTables, setDataTables] = useState([
    {
      id: 1,
      title: 'Sales Data',
      dataSource: 'API',
      lastUpdated: '20-Nov-2024 12:00',
      status: true,
    },
    {
      id: 2,
      title: 'Inventory Data',
      dataSource: 'SQL Query',
      lastUpdated: '19-Nov-2024 16:30',
      status: false,
    },
  ]);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    dataType: 'Automated',
    dataset: '',
    columns: [],
    status: true,
  });
  const [datasets] = useState(['Dataset 1', 'Dataset 2', 'Dataset 3']);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: '' });

  // Open Dialog
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setFormData({
      title: '',
      dataType: 'Automated',
      dataset: '',
      columns: [],
      status: true,
    });
  };

  // Form Input Change Handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Add Column
  const addColumn = () => {
    setFormData({
      ...formData,
      columns: [...formData.columns, { name: '', dataType: '', width: '' }],
    });
  };

  // Update Column
  const updateColumn = (index, field, value) => {
    const updatedColumns = [...formData.columns];
    updatedColumns[index][field] = value;
    setFormData({ ...formData, columns: updatedColumns });
  };

  // Remove Column
  const removeColumn = (index) => {
    const updatedColumns = formData.columns.filter((_, i) => i !== index);
    setFormData({ ...formData, columns: updatedColumns });
  };

  // Submit Form
  const handleSubmit = () => {
    if (!formData.title) {
      setSnackbar({ open: true, message: 'Title is required!', severity: 'error' });
      return;
    }
    setDataTables([
      ...dataTables,
      {
        id: dataTables.length + 1,
        title: formData.title,
        dataSource: formData.dataset || 'Manual',
        lastUpdated: new Date().toLocaleString(),
        status: formData.status,
      },
    ]);
    handleClose();
    setSnackbar({ open: true, message: 'Data Table created successfully!', severity: 'success' });
  };

  // Delete Data Table
  const handleDelete = (id) => {
    setDataTables(dataTables.filter((table) => table.id !== id));
    setSnackbar({ open: true, message: 'Data Table deleted successfully!', severity: 'info' });
  };

  return (
    <Container>
      <Button
        variant="outlined"
        color="primary"
        onClick={() => navigate('/visualization-builder')}
        style={{ marginTop: '20px' }}
      >
        Visualization Builder
      </Button>

      <br></br>
      <br></br>

      <Typography variant="h4" gutterBottom>
        Data Table Builder
      </Typography>

      <Button variant="contained" color="primary" onClick={handleOpen} style={{ marginBottom: '20px' }}>
        New Data Table
      </Button>

      {/* Data Table List */}
      <Paper elevation={10}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Data Source</TableCell>
              <TableCell>Last Updated</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dataTables.map((table) => (
              <TableRow key={table.id}>
                <TableCell>{table.title}</TableCell>
                <TableCell>{table.dataSource}</TableCell>
                <TableCell>{table.lastUpdated}</TableCell>
                <TableCell>{table.status ? 'Enabled' : 'Disabled'}</TableCell>
                <TableCell>
                  <Button color="secondary" onClick={() => handleDelete(table.id)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      {/* New Data Table Dialog */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Data Table</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Title"
            name="title"
            fullWidth
            variant="outlined"
            onChange={handleChange}
            value={formData.title}
          />
          <FormControl component="fieldset" margin="dense">
            <RadioGroup
              row
              name="dataType"
              value={formData.dataType}
              onChange={handleChange}
            >
              <FormControlLabel value="Automated" control={<Radio />} label="Automated" />
              <FormControlLabel value="Manual" control={<Radio />} label="Manual" />
            </RadioGroup>
          </FormControl>
          {formData.dataType === 'Automated' && (
            <FormControl fullWidth margin="dense">
              <InputLabel>Dataset</InputLabel>
              <Select
                name="dataset"
                value={formData.dataset}
                onChange={handleChange}
              >
                {datasets.map((dataset, idx) => (
                  <MenuItem key={idx} value={dataset}>
                    {dataset}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
          <Button variant="outlined" onClick={addColumn} style={{ margin: '10px 0' }}>
            Add Column
          </Button>
          {formData.columns.map((col, idx) => (
            <div key={idx} style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
              <TextField
                label="Column Name"
                value={col.name}
                onChange={(e) => updateColumn(idx, 'name', e.target.value)}
              />
              <TextField
                label="Data Type"
                value={col.dataType}
                onChange={(e) => updateColumn(idx, 'dataType', e.target.value)}
              />
              <TextField
                label="Width"
                value={col.width}
                onChange={(e) => updateColumn(idx, 'width', e.target.value)}
              />
              <Button color="secondary" onClick={() => removeColumn(idx)}>
                Remove
              </Button>
            </div>
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for Notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity={snackbar.severity} onClose={() => setSnackbar({ ...snackbar, open: false })}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default DataTableBuilder;
