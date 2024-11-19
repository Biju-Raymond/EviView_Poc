import React, { useState, useMemo } from 'react';
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
    InputLabel
} from '@mui/material';

const DataConnections = () => {
    const navigate = useNavigate();
    const [data, setData] = useState([
        { id: 1, title: 'API Connection', type: 'API', status: 'Connected', refreshRate: '00:15:00' },
        { id: 2, title: 'SQL Connection', type: 'SQL', status: 'Not Connected', refreshRate: '00:30:00' },
    ]);
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({ title: '', type: '', refreshRate: '' });
    const [searchQuery, setSearchQuery] = useState('');
    const [filterType, setFilterType] = useState('');
    const [deleteDialog, setDeleteDialog] = useState({ open: false, id: null });
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: '' });

    const handleDeleteClick = (id) => {
        setDeleteDialog({ open: true, id });
    };

    const handleDeleteDialogClose = () => {
        setDeleteDialog({ open: false, id: null });
    };

    const filteredData = useMemo(() => {
        return data.filter((row) => {
            return (
                row.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
                (filterType === '' || row.type === filterType)
            );
        });
    }, [data, searchQuery, filterType]);

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        setFormData({ title: '', type: '', refreshRate: '' });
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
        if (!formData.title || !formData.type || !formData.refreshRate) {
            setSnackbar({ open: true, message: 'All fields are required!', severity: 'error' });
            return;
        }
        setData([...data, { ...formData, id: data.length + 1, status: 'Connected' }]);
        handleClose();
        setSnackbar({ open: true, message: 'Connection added successfully!', severity: 'success' });
    };


    const handleDeleteConfirm = () => {
        setData(data.filter((row) => row.id !== deleteDialog.id));
        setDeleteDialog({ open: false, id: null });
        setSnackbar({ open: true, message: 'Connection Deleted!', severity: 'info' });
    };

    const handleTestConnection = (id) => {
        const connection = data.find((row) => row.id === id);
        if (connection) {
            // Simulate a successful connection test
            setSnackbar({ open: true, message: `${connection.title} tested successfully!`, severity: 'success' });
        }
    };

    return (
        <Container>
            <br></br>
            {/* Add navigation button */}
            <Button
                variant="outlined"
                color="secondary"
                onClick={() => navigate('/data-table-builder')}
                style={{ marginBottom: '20px' }}
            >
                Data Table Builder
            </Button>
            <br></br>
            <Typography variant="h4" gutterBottom>
                Data Connections
            </Typography>



            {/* Search and Filter */}
            <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                <TextField
                    variant="outlined"
                    placeholder="Search connections..."
                    fullWidth
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    displayEmpty
                    variant="outlined"
                    style={{ width: '200px' }}
                >
                    <MenuItem value="">All Types</MenuItem>
                    <MenuItem value="API">API</MenuItem>
                    <MenuItem value="SQL">SQL</MenuItem>
                </Select>
            </div>

            <Button variant="contained" color="primary" onClick={handleOpen} style={{ marginBottom: '20px' }}>
                Add New Connection
            </Button>

            {/* Connections Table */}
            <Paper elevation={10}>
                <Table sx={{ border: '1px solid #ddd', borderRadius: '8px' }}>

                    <TableHead sx={{ backgroundColor: '#f0f0f0' }}>

                        <TableRow>
                            <TableCell sx={{ fontWeight: 'bold' }}>Title</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Type</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Refresh Rate</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {filteredData.map((row) => (
                            <TableRow
                                key={row.id}
                                sx={{
                                    '&:hover': {
                                        backgroundColor: '#f5f5f5',
                                    },
                                }}
                            >

                                <TableCell>{row.title}</TableCell>
                                <TableCell>{row.type}</TableCell>
                                <TableCell>{row.refreshRate}</TableCell>
                                <TableCell>{row.status}</TableCell>
                                <TableCell>
                                    <Button color="secondary" onClick={() => handleDeleteClick(row.id)}>
                                        Delete
                                    </Button>
                                    <Button
                                        color="primary"
                                        onClick={() => handleTestConnection(row.id)}
                                        style={{ marginLeft: '10px' }}
                                    >
                                        Test Connection
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add New Connection</DialogTitle>
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
                    <FormControl fullWidth margin="dense" variant="outlined">
                        <InputLabel id="type-label">Type</InputLabel>
                        <Select
                            labelId="type-label"
                            name="type"
                            value={formData.type}
                            onChange={(e) => handleChange({ target: { name: 'type', value: e.target.value } })}
                            label="Type"
                        >
                            <MenuItem value="API">API</MenuItem>
                            <MenuItem value="SQL">SQL Query</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField
                        margin="dense"
                        label="Refresh Rate (HH:MM:SS)"
                        name="refreshRate"
                        fullWidth
                        variant="outlined"
                        onChange={handleChange}
                        value={formData.refreshRate}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} color="primary">
                        Add
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Delete Confirmation Dialog */}
            <Dialog
                open={deleteDialog.open}
                onClose={handleDeleteDialogClose}
                aria-labelledby="delete-confirmation-dialog"
            >
                <DialogTitle id="delete-confirmation-dialog">Confirm Delete</DialogTitle>
                <DialogContent>
                    Are you sure you want to delete the connection?
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDeleteDialogClose} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={handleDeleteConfirm} color="primary">
                        Confirm
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

export default DataConnections;
