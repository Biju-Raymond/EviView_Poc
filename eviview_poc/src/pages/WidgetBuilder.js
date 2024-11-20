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

const WidgetBuilder = () => {
    const [formData, setFormData] = useState({
        title: '',
        widgetType: 'Graph',
        graphType: 'Multiple Line Chart',
        xAxisData: '',
        yAxisData: '',
    });
    const [columns, setColumns] = useState([]);
    const [rows, setRows] = useState([]);
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [],
    });

    // Fetch API Data
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://192.168.2.9:3000/salaries', {
                    headers: { Accept: 'application/json' },
                });
                const data = await response.json();

                if (data && Array.isArray(data.columns) && Array.isArray(data.data)) {
                    setColumns(data.columns);
                    setRows(data.data);
                } else {
                    console.error('Invalid API response format.');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    // Update chart data dynamically
    useEffect(() => {
        const { xAxisData, yAxisData, widgetType } = formData;

        if (widgetType === 'Graph' && xAxisData && yAxisData && rows.length > 0) {
            const labels = rows.map((row) => row[xAxisData] || 'N/A'); // Handle missing data safely
            const values = rows.map((row) => parseFloat(row[yAxisData]) || 0); // Parse numerical values safely

            setChartData({
                labels,
                datasets: [
                    {
                        label: `${yAxisData} by ${xAxisData}`,
                        data: values,
                        backgroundColor:
                            formData.graphType === 'Pie Chart'
                                ? ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0']
                                : 'rgba(75, 192, 192, 0.2)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 2,
                    },
                ],
            });
        }
    }, [formData, rows]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

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
                                        {columns.map((col) => (
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
                                        {columns.map((col) => (
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
                                        {columns.map((col) => (
                                            <TableCell key={col}>{col}</TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rows.map((row, idx) => (
                                        <TableRow key={idx}>
                                            {columns.map((col) => (
                                                <TableCell key={col}>{row[col] || 'N/A'}</TableCell>
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
                                {columns.map((col) => (
                                    <TableCell key={col}>{col}</TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row, idx) => (
                                <TableRow key={idx}>
                                    {columns.map((col) => (
                                        <TableCell key={col}>{row[col] || 'N/A'}</TableCell>
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
