import React, { useState } from "react";
import {
    Container,
    Typography,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Paper,
    Box,
    Grid,
} from "@mui/material";
import { Line, Bar, Pie } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

// Register ChartJS components
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
);

const VisualizationBuilder = () => {
    const dataTables = [
        {
            id: 1,
            title: "Sales Data",
            columns: ["Month", "Revenue", "Profit"],
            rows: [
                { Month: "January", Revenue: 10000, Profit: 4000 },
                { Month: "February", Revenue: 15000, Profit: 7000 },
                { Month: "March", Revenue: 20000, Profit: 9000 },
                { Month: "April", Revenue: 25000, Profit: 12000 },
                { Month: "May", Revenue: 30000, Profit: 15000 },
            ],
        },
        {
            id: 2,
            title: "Inventory Data",
            columns: ["Category", "Stock", "Sales"],
            rows: [
                { Category: "Electronics", Stock: 500, Sales: 200 },
                { Category: "Clothing", Stock: 1000, Sales: 500 },
                { Category: "Groceries", Stock: 2000, Sales: 800 },
                { Category: "Books", Stock: 300, Sales: 150 },
                { Category: "Toys", Stock: 400, Sales: 200 },
            ],
        },
    ];

    const [selectedTableId, setSelectedTableId] = useState("");
    const [visualizationType, setVisualizationType] = useState("");
    const [xAxis, setXAxis] = useState("");
    const [yAxis, setYAxis] = useState("");
    const [chartData, setChartData] = useState(null);

    const handleGenerateChart = () => {
        if (!selectedTableId || !visualizationType || !xAxis || !yAxis) {
            alert("Please complete all fields to generate the chart.");
            return;
        }

        const selectedTable = dataTables.find((table) => table.id === selectedTableId);
        const labels = selectedTable.rows.map((row) => row[xAxis]);
        const values = selectedTable.rows.map((row) => row[yAxis]);

        setChartData({
            labels,
            datasets: [
                {
                    label: `${yAxis} by ${xAxis}`,
                    data: values,
                    backgroundColor: visualizationType === "Pie"
                        ? ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"]
                        : "rgba(75,192,192,0.4)",
                    borderColor: "rgba(75,192,192,1)",
                    borderWidth: 1,
                },
            ],
        });
    };

    return (
        <Container
            maxWidth={false}
            sx={{
                padding: 2,
                margin: 0,
                width: "100%",
                minHeight: "100vh",
                backgroundColor: "#f5f5f5",
            }}
        >
            <br />
            <Typography variant="h4" gutterBottom>
                Visualization Builder
            </Typography>

            <Grid container spacing={4}>
                {/* Input Section */}
                <Grid item xs={12} md={6}>
                    <Paper elevation={10} style={{ padding: "20px" }}>
                        <FormControl fullWidth margin="normal">
                            <InputLabel id="table-label">Select Data Table</InputLabel>
                            <Select
                                labelId="table-label"
                                value={selectedTableId}
                                onChange={(e) => {
                                    setSelectedTableId(e.target.value);
                                    setXAxis("");
                                    setYAxis("");
                                    setChartData(null);
                                }}
                                label="Select Data Table"
                            >
                                {dataTables.map((table) => (
                                    <MenuItem key={table.id} value={table.id}>
                                        {table.title}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <FormControl fullWidth margin="normal">
                            <InputLabel id="visualization-type-label">Select Visualization Type</InputLabel>
                            <Select
                                labelId="visualization-type-label"
                                value={visualizationType}
                                onChange={(e) => setVisualizationType(e.target.value)}
                                label="Select Visualization Type"
                            >
                                <MenuItem value="Bar">Bar Chart</MenuItem>
                                <MenuItem value="Line">Line Chart</MenuItem>
                                <MenuItem value="Pie">Pie Chart</MenuItem>
                            </Select>
                        </FormControl>

                        <FormControl fullWidth margin="normal">
                            <InputLabel id="x-axis-label">Select X-Axis</InputLabel>
                            <Select
                                labelId="x-axis-label"
                                value={xAxis}
                                onChange={(e) => setXAxis(e.target.value)}
                                disabled={!selectedTableId}
                                label="Select X-Axis"
                            >
                                {selectedTableId &&
                                    dataTables
                                        .find((table) => table.id === selectedTableId)
                                        .columns.map((column) => (
                                            <MenuItem key={column} value={column}>
                                                {column}
                                            </MenuItem>
                                        ))}
                            </Select>
                        </FormControl>

                        <FormControl fullWidth margin="normal">
                            <InputLabel id="y-axis-label">Select Y-Axis</InputLabel>
                            <Select
                                labelId="y-axis-label"
                                value={yAxis}
                                onChange={(e) => setYAxis(e.target.value)}
                                disabled={!selectedTableId}
                                label="Select Y-Axis"
                            >
                                {selectedTableId &&
                                    dataTables
                                        .find((table) => table.id === selectedTableId)
                                        .columns.map((column) => (
                                            <MenuItem key={column} value={column}>
                                                {column}
                                            </MenuItem>
                                        ))}
                            </Select>
                        </FormControl>

                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleGenerateChart}
                            style={{ marginTop: "20px" }}
                        >
                            Generate Chart
                        </Button>
                    </Paper>
                </Grid>

                {/* Chart Preview Section */}
                <Grid item xs={12} md={6}>
                    {chartData && (
                        <Box>
                            <Typography variant="h6" gutterBottom>
                                Chart Preview
                            </Typography>
                            <Paper
                                elevation={10}
                                style={{
                                    padding: "20px",
                                    maxWidth: "100%",
                                    height: "350px",
                                }}
                            >
                                {visualizationType === "Bar" && <Bar data={chartData} />}
                                {visualizationType === "Line" && <Line data={chartData} />}
                                {visualizationType === "Pie" && <Pie data={chartData} />}
                            </Paper>
                        </Box>
                    )}
                </Grid>
            </Grid>
        </Container>
    );
};

export default VisualizationBuilder;
