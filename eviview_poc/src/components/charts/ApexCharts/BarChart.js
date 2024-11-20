import React from 'react';
import Chart from 'react-apexcharts';

const BarChart = ({ data, xKey, yKey }) => {
    // Prepare data for ApexCharts
    const categories = data.map((item) => item[xKey] || 'N/A');
    const seriesData = data.map((item) => parseFloat(item[yKey]) || 0);

    const options = {
        chart: {
            type: 'bar',
            toolbar: { show: true },
        },
        xaxis: {
            categories,
            title: { text: xKey },
        },
        yaxis: {
            title: { text: yKey },
        },
        plotOptions: {
            bar: {
                horizontal: false,
                borderRadius: 5,
            },
        },
        tooltip: {
            y: { formatter: (val) => val.toFixed(2) },
        },
    };

    const series = [
        {
            name: yKey,
            data: seriesData,
        },
    ];

    return <Chart options={options} series={series} type="bar" height={400} />;
};

export default BarChart;
