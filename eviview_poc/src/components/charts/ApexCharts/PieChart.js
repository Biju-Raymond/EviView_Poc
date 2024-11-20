import React from 'react';
import Chart from 'react-apexcharts';

const PieChart = ({ data, xKey, yKey }) => {
    // Transform data into the format ApexCharts requires
    const labels = data.map((item) => item[xKey] || 'N/A');
    const seriesData = data.map((item) => parseFloat(item[yKey]) || 0);

    const options = {
        chart: {
            type: 'pie',
        },
        labels,
        tooltip: {
            y: {
                formatter: (value) => `${value.toFixed(2)}`,
            },
        },
        legend: {
            position: 'bottom',
        },
    };

    return <Chart options={options} series={seriesData} type="pie" height={400} />;
};

export default PieChart;
