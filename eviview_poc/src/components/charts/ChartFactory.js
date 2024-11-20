import React from 'react';
import SingleLineChart from './ApexCharts/SingleLineChart';
import MultipleLineChart from './ApexCharts/MultipleLineChart'; // Import the new chart

const ChartFactory = ({ type, ...props }) => {
    console.log('Rendering chart type:', type); // Debugging log

    switch (type) {
        case 'SingleLineChart':
            return <SingleLineChart {...props} />;
        case 'MultipleLineChart': // Add the new chart type
            return <MultipleLineChart {...props} />;
        default:
            console.error('Unsupported chart type:', type); // Debugging log
            return <div>Unsupported chart type</div>;
    }
};

export default ChartFactory;
