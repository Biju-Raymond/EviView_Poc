import React, { useState } from 'react';
import {
    Container,
    Typography,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    TextField,
    Paper,
    Box,
} from '@mui/material';
import { Line, Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const VisualizationBuilder = () => {
    const [dataTables] = useState([
        { id: 1, title: 'Sales Data' },
        { id: 2, title: 'Inventory Data' },
    ]);
    const [selectedTable, setSelectedTable] = useState('');
    const [visualizationType, setVisualizationType] = useState('');
    const [xAxis, setXAxis] = useState('');
    const [yAxis, setYAxis] = useState('');
    const [chartData, setChartData] = useState(null);

    // Example data for preview (would be dynamic based on the selected data table)
    const exampleData = {
        labels: ['January', 'February', 'March', 'April', 'May'],
        datasets: [
            {
                label: 'Dataset 1',
                data: [10, 20, 30, 40, 50],
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: 'rgba(75,192,192,1)',
                borderWidth: 1,
            },
        ],
    };

    // Handle Generate Chart
    const handleGenerateChart = () => {
        if (!selectedTable || !visualizationType || !xAxis || !yAxis) {
            alert('Please complete all fields to generate the chart.');
            return;
        }
        // Generate chart data dynamically based on the selected table and columns
        setChartData(exampleData);
    };

    return (
        <Container>
            <br></br>
            <Typography variant="h4" gutterBottom>
                Visualization Builder
            </Typography>

            <Paper elevation={10} style={{ padding: '20px', marginBottom: '20px' }}>
                <FormControl fullWidth margin="normal">
                    <InputLabel>Select Data Table</InputLabel>
                    <Select
                        value={selectedTable}
                        onChange={(e) => setSelectedTable(e.target.value)}
                    >
                        {dataTables.map((table) => (
                            <MenuItem key={table.id} value={table.title}>
                                {table.title}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl fullWidth margin="normal">
                    <InputLabel>Select Visualization Type</InputLabel>
                    <Select
                        value={visualizationType}
                        onChange={(e) => setVisualizationType(e.target.value)}
                    >
                        <MenuItem value="Bar">Bar Chart</MenuItem>
                        <MenuItem value="Line">Line Chart</MenuItem>
                        <MenuItem value="Pie">Pie Chart</MenuItem>
                    </Select>
                </FormControl>

                <TextField
                    fullWidth
                    label="X-Axis"
                    margin="normal"
                    placeholder="Enter column name for X-Axis"
                    value={xAxis}
                    onChange={(e) => setXAxis(e.target.value)}
                />
                <TextField
                    fullWidth
                    label="Y-Axis"
                    margin="normal"
                    placeholder="Enter column name for Y-Axis"
                    value={yAxis}
                    onChange={(e) => setYAxis(e.target.value)}
                />

                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleGenerateChart}
                    style={{ marginTop: '20px' }}
                >
                    Generate Chart
                </Button>
            </Paper>

            {/* Chart Preview */}
            {chartData && (
                <Box>
                    <Typography variant="h6" gutterBottom>
                        Chart Preview
                    </Typography>
                    <Paper elevation={10} style={{ padding: '20px' }}>
                        {visualizationType === 'Bar' && <Bar data={chartData} />}
                        {visualizationType === 'Line' && <Line data={chartData} />}
                        {visualizationType === 'Pie' && <Pie data={chartData} />}
                    </Paper>
                </Box>
            )}
        </Container>
    );
};

export default VisualizationBuilder;
