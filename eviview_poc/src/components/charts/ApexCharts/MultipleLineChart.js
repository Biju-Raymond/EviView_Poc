import React from 'react';
import Chart from 'react-apexcharts';

const MultipleLineChart = ({ data, xKey, yKeys }) => {
    // Transform data into the format ApexCharts requires
    const series = yKeys.map((key) => ({
        name: key, // Dataset name
        data: data.map((item) => ({
            x: item[xKey] || 'N/A',
            y: parseFloat(item[key]) || 0,
        })),
    }));

    const options = {
        chart: {
            type: 'line',
            zoom: { enabled: true },
        },
        xaxis: {
            type: 'category',
            title: { text: xKey },
        },
        yaxis: {
            title: { text: 'Values' },
        },
        tooltip: {
            shared: true,
            intersect: false,
        },
    };

    return <Chart options={options} series={series} type="line" height={400} />;
};

export default MultipleLineChart;
