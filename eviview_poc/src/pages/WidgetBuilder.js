import React, { useState, useEffect } from 'react';
import {
    Container,
    Typography,
    TextField,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Paper,
    FormControlLabel,
    RadioGroup,
    Radio,
    Grid,
    Box,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
} from '@mui/material';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line, Bar, Pie } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend);

// Dummy data for different data tables
const dataTables = {
    salesData: {
        columns: ['Month', 'Revenue', 'Profit'],
        rows: [
            { Month: 'Jan', Revenue: 10000, Profit: 4000 },
            { Month: 'Feb', Revenue: 15000, Profit: 7000 },
            { Month: 'Mar', Revenue: 20000, Profit: 9000 },
            { Month: 'Apr', Revenue: 25000, Profit: 12000 },
            { Month: 'May', Revenue: 30000, Profit: 15000 },
            { Month: 'Jun', Revenue: 35000, Profit: 17000 },
            { Month: 'Jul', Revenue: 40000, Profit: 20000 },
            { Month: 'Aug', Revenue: 45000, Profit: 22000 },
            { Month: 'Sep', Revenue: 50000, Profit: 25000 },
            { Month: 'Oct', Revenue: 55000, Profit: 28000 },
            { Month: 'Nov', Revenue: 60000, Profit: 30000 },
            { Month: 'Dec', Revenue: 65000, Profit: 32000 },
        ],
    },
    employeeData: {
        columns: ['Department', 'Employees', 'Satisfaction Score'],
        rows: [
            { Department: 'HR', Employees: 50, 'Satisfaction Score': 80 },
            { Department: 'IT', Employees: 200, 'Satisfaction Score': 75 },
            { Department: 'Sales', Employees: 100, 'Satisfaction Score': 85 },
            { Department: 'Marketing', Employees: 70, 'Satisfaction Score': 90 },
            { Department: 'Operations', Employees: 150, 'Satisfaction Score': 88 },
            { Department: 'Finance', Employees: 80, 'Satisfaction Score': 92 },
            { Department: 'Support', Employees: 60, 'Satisfaction Score': 77 },
            { Department: 'Logistics', Employees: 40, 'Satisfaction Score': 80 },
        ],
    },
};

// Initial dummy chart data
const initialChartData = {
    labels: [],
    datasets: [],
};

const WidgetBuilder = () => {
    const [formData, setFormData] = useState({
        title: '',
        widgetType: 'Graph',
        dataTable: '',
        graphType: 'Multiple Line Chart',
        xAxisData: '',
        yAxisData: '',
    });
    const [chartData, setChartData] = useState(initialChartData);
    const [tableData, setTableData] = useState({ columns: [], rows: [] });

    // Updates form state when user changes input
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Dynamically updates chart data or table data based on user selections
    useEffect(() => {
        const { dataTable, xAxisData, yAxisData, widgetType } = formData;

        // Handle table preview
        if (dataTable) {
            const selectedTable = dataTables[dataTable];
            if (selectedTable) {
                setTableData(selectedTable);
            }
        }

        // Handle chart preview
        if (widgetType === 'Graph' && dataTable && xAxisData && yAxisData) {
            const selectedTable = dataTables[dataTable];
            if (selectedTable) {
                const labels = selectedTable.rows.map((row) => row[xAxisData]);
                const values = selectedTable.rows.map((row) => row[yAxisData]);

                // Update chart data dynamically based on selected graph type
                const newChartData = {
                    labels,
                    datasets: [
                        {
                            label: `${yAxisData} by ${xAxisData}`,
                            data: values,
                            backgroundColor:
                                formData.graphType === 'Pie Chart' ? ['#FF6384', '#36A2EB', '#FFCE56'] : 'rgba(75, 192, 192, 0.2)',
                            borderColor: 'rgba(75, 192, 192, 1)',
                            borderWidth: 2,
                        },
                    ],
                };

                setChartData(newChartData);
            }
        }
    }, [formData]);

    return (
        <Container
            maxWidth={false}
            sx={{
                padding: 2,
                margin: 0,
                width: '100%',
                minHeight: '100vh',
                backgroundColor: '#f5f5f5',
            }}
        >
            <Typography variant="h4" gutterBottom>
                Widget Builder
            </Typography>

            <Grid container spacing={4}>
                {/* Widget Editor Section */}
                <Grid item xs={12} md={4}>
                    <Paper elevation={10} sx={{ padding: 2 }}>
                        <Typography variant="h6" gutterBottom>
                            Widget Editor
                        </Typography>

                        {/* Widget Title */}
                        <FormControl fullWidth margin="normal">
                            <TextField
                                label="Widget Title"
                                name="title"
                                value={formData.title}
                                onChange={handleInputChange}
                                variant="outlined"
                                required
                            />
                        </FormControl>

                        {/* Widget Type */}
                        <FormControl component="fieldset" margin="normal">
                            <Typography variant="subtitle1" sx={{ marginBottom: 1 }}>
                                Widget Type
                            </Typography>
                            <RadioGroup
                                row
                                name="widgetType"
                                value={formData.widgetType}
                                onChange={handleInputChange}
                            >
                                <FormControlLabel value="Graph" control={<Radio />} label="Graph" />
                                <FormControlLabel value="Table" control={<Radio />} label="Table" />
                            </RadioGroup>
                        </FormControl>

                        {/* Data Table */}
                        <FormControl fullWidth margin="normal">
                            <InputLabel id="data-table-label">Select Data Table</InputLabel>
                            <Select
                                labelId="data-table-label"
                                name="dataTable"
                                value={formData.dataTable}
                                onChange={handleInputChange}
                                label="Select Data Table"
                            >
                                <MenuItem value="salesData">Sales Data</MenuItem>
                                <MenuItem value="employeeData">Employee Data</MenuItem>
                            </Select>
                        </FormControl>

                        {/* Graph Specific Inputs */}
                        {formData.widgetType === 'Graph' && (
                            <>
                                <FormControl fullWidth margin="normal">
                                    <InputLabel id="graph-type-label">Graph Type</InputLabel>
                                    <Select
                                        labelId="graph-type-label"
                                        name="graphType"
                                        value={formData.graphType}
                                        onChange={handleInputChange}
                                        label="Graph Type"
                                    >
                                        <MenuItem value="Multiple Line Chart">Multiple Line Chart</MenuItem>
                                        <MenuItem value="Bar Chart">Bar Chart</MenuItem>
                                        <MenuItem value="Pie Chart">Pie Chart</MenuItem>
                                    </Select>
                                </FormControl>

                                <FormControl fullWidth margin="normal">
                                    <InputLabel id="x-axis-data-label">X-Axis Data</InputLabel>
                                    <Select
                                        labelId="x-axis-data-label"
                                        name="xAxisData"
                                        value={formData.xAxisData}
                                        onChange={handleInputChange}
                                        label="X-Axis Data"
                                    >
                                        {formData.dataTable &&
                                            dataTables[formData.dataTable].columns.map((col) => (
                                                <MenuItem key={col} value={col}>
                                                    {col}
                                                </MenuItem>
                                            ))}
                                    </Select>
                                </FormControl>

                                <FormControl fullWidth margin="normal">
                                    <InputLabel id="y-axis-data-label">Y-Axis Data</InputLabel>
                                    <Select
                                        labelId="y-axis-data-label"
                                        name="yAxisData"
                                        value={formData.yAxisData}
                                        onChange={handleInputChange}
                                        label="Y-Axis Data"
                                    >
                                        {formData.dataTable &&
                                            dataTables[formData.dataTable].columns.map((col) => (
                                                <MenuItem key={col} value={col}>
                                                    {col}
                                                </MenuItem>
                                            ))}
                                    </Select>
                                </FormControl>
                            </>
                        )}
                    </Paper>
                </Grid>

                {/* Widget Preview Section */}
                <Grid item xs={12} md={8}>
                    <Paper elevation={3} sx={{ padding: 3 }}>
                        <Typography variant="h6" gutterBottom>
                            Widget Preview
                        </Typography>

                        {formData.widgetType === 'Graph' ? (
                            <Box sx={{ height: '400px', position: 'relative' }}>
                                {formData.graphType === 'Multiple Line Chart' && <Line data={chartData} />}
                                {formData.graphType === 'Bar Chart' && <Bar data={chartData} />}
                                {formData.graphType === 'Pie Chart' && <Pie data={chartData} />}
                            </Box>
                        ) : (
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        {tableData.columns.map((col) => (
                                            <TableCell key={col}>{col}</TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {tableData.rows.map((row, idx) => (
                                        <TableRow key={idx}>
                                            {tableData.columns.map((col) => (
                                                <TableCell key={col}>{row[col]}</TableCell>
                                            ))}
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        )}
                    </Paper>
                </Grid>
            </Grid>

            {/* Data Section */}
            <Box mt={4}>
                <Paper elevation={10} sx={{ padding: 3 }}>
                    <Typography variant="h6" gutterBottom>
                        Data
                    </Typography>
                    <Table>
                        <TableHead>
                            <TableRow>
                                {tableData.columns.map((col) => (
                                    <TableCell key={col}>{col}</TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {tableData.rows.map((row, idx) => (
                                <TableRow key={idx}>
                                    {tableData.columns.map((col) => (
                                        <TableCell key={col}>{row[col]}</TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Paper>
            </Box>
        </Container>
    );
};

export default WidgetBuilder;
