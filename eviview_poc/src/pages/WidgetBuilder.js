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
import ChartWrapper from '../components/common/ChartWrapper';

const WidgetBuilder = () => {
    const [formData, setFormData] = useState({
        title: '',
        widgetType: 'Graph',
        graphType: 'SingleLineChart', // Default graph type
        xAxisData: '',
        yAxisData: '',
        yAxes: [''], // For Multiple Line Chart, initialize with one Y-axis
    });
    const [columns, setColumns] = useState([]);
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch API Data
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await fetch('http://192.168.2.9:3000/salaries', {
                    headers: { Accept: 'application/json' },
                });
                const data = await response.json();

                if (data && Array.isArray(data.columns) && Array.isArray(data.data)) {
                    setColumns(data.columns);
                    setRows(data.data);
                } else {
                    throw new Error('Invalid API response format.');
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

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
                                        <MenuItem value="SingleLineChart">Single Line Chart</MenuItem>
                                        <MenuItem value="MultipleLineChart">Multiple Line Chart</MenuItem>
                                        <MenuItem value="BarChart">Bar Chart</MenuItem>
                                        <MenuItem value="PieChart">Pie Chart</MenuItem>
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

                                {/* Y-Axis Selection Logic */}
                                {formData.graphType === 'SingleLineChart' ? (
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
                                ) : (
                                    <Box>
                                        {formData.yAxes.map((yAxis, index) => (
                                            <Box
                                                key={index}
                                                sx={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: 1,
                                                    marginBottom: 2,
                                                }}
                                            >
                                                <FormControl fullWidth>
                                                    <InputLabel id={`y-axis-data-label-${index}`}>
                                                        Y-Axis Data {index + 1}
                                                    </InputLabel>
                                                    <Select
                                                        labelId={`y-axis-data-label-${index}`}
                                                        value={yAxis}
                                                        onChange={(e) => {
                                                            const newYAxes = [...formData.yAxes];
                                                            newYAxes[index] = e.target.value;
                                                            setFormData({ ...formData, yAxes: newYAxes });
                                                        }}
                                                        label={`Y-Axis Data ${index + 1}`}
                                                    >
                                                        {columns.map((col) => (
                                                            <MenuItem key={col} value={col}>
                                                                {col}
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                </FormControl>
                                                <Typography
                                                    sx={{
                                                        cursor: 'pointer',
                                                        color: 'red',
                                                        fontWeight: 'bold',
                                                    }}
                                                    onClick={() => {
                                                        const newYAxes = formData.yAxes.filter(
                                                            (_, i) => i !== index
                                                        );
                                                        setFormData({ ...formData, yAxes: newYAxes });
                                                    }}
                                                >
                                                    X
                                                </Typography>
                                            </Box>
                                        ))}
                                        <Typography
                                            sx={{
                                                cursor: 'pointer',
                                                color: 'blue',
                                                fontWeight: 'bold',
                                                marginTop: 1,
                                            }}
                                            onClick={() =>
                                                setFormData({
                                                    ...formData,
                                                    yAxes: [...formData.yAxes, ''],
                                                })
                                            }
                                        >
                                            + Add Y-Axis
                                        </Typography>
                                    </Box>
                                )}
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

                        {loading ? (
                            <Box>Loading...</Box>
                        ) : error ? (
                            <Box>Error: {error}</Box>
                        ) : formData.widgetType === 'Graph' ? (
                            <Box sx={{ height: '400px', position: 'relative' }}>
                                <ChartWrapper
                                    type={formData.graphType}
                                    dataUrl="http://192.168.2.9:3000/salaries"
                                    xKey={formData.xAxisData}
                                    yKey={formData.yAxisData} // For Single Line Chart
                                    yKeys={
                                        formData.graphType === 'MultipleLineChart'
                                            ? formData.yAxes
                                            : undefined
                                    } // For Multiple Line Chart
                                />
                            </Box>
                        ) : (
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        {columns.map((col) => (
                                            <TableCell key={col} sx={{ fontWeight: 'bold' }}>
                                                {col}
                                            </TableCell>
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
                                    <TableCell key={col} sx={{ fontWeight: 'bold' }}>
                                        {col}
                                    </TableCell>
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
