import React from 'react';
import SingleLineChart from './ApexCharts/SingleLineChart';
import MultipleLineChart from './ApexCharts/MultipleLineChart';
import BarChart from './ApexCharts/BarChart';
import PieChart from './ApexCharts/PieChart'; // Import PieChart

const ChartFactory = ({ type, ...props }) => {
    switch (type) {
        case 'SingleLineChart':
            return <SingleLineChart {...props} />;
        case 'MultipleLineChart':
            return <MultipleLineChart {...props} />;
        case 'BarChart':
            return <BarChart {...props} />;
        case 'PieChart': // Add PieChart case
            return <PieChart {...props} />;
        default:
            return <div>Unsupported chart type</div>;
    }
};

export default ChartFactory;
