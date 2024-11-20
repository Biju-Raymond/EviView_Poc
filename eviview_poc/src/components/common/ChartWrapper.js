import React, { useEffect, useState } from 'react';
import ChartFactory from '../charts/ChartFactory';

const ChartWrapper = ({ type, dataUrl, xKey, yKey, ...additionalProps }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await fetch(dataUrl, {
                    headers: { Accept: 'application/json' },
                });

                if (!response.ok) {
                    throw new Error(`Error fetching data: ${response.statusText}`);
                }

                const result = await response.json();
                if (Array.isArray(result.data)) {
                    setData(result.data);
                } else {
                    throw new Error('Invalid API response format');
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [dataUrl]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    // Pass the fetched data and props to the ChartFactory
    return (
        <ChartFactory
            type={type}
            data={data}
            xKey={xKey}
            yKey={yKey}
            {...additionalProps}
        />
    );
};

export default ChartWrapper;
