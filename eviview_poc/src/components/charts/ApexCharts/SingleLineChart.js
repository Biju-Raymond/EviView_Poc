import React from 'react';
import Chart from 'react-apexcharts';

const SingleLineChart = ({ data, xKey, yKey }) => {
    // Transform data into the format ApexCharts requires
    const seriesData = data.map((item) => ({
        x: item[xKey] || 'N/A',
        y: parseFloat(item[yKey]) || 0,
    }));

    const options = {
        chart: {
            type: 'line',
            zoom: { enabled: true },
        },
        xaxis: {
            type: 'category',
        },
        yaxis: {
            title: { text: yKey },
        },
        tooltip: {
            x: { formatter: (val) => val },
        },
    };

    const series = [
        {
            name: yKey,
            data: seriesData,
        },
    ];

    return <Chart options={options} series={series} type="line" height={400} />;
};

export default SingleLineChart;
