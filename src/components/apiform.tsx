import React, { useEffect, useState } from 'react';

const BinanceDashboard: React.FC = () => {
    const [data, setData] = useState<{ symbol: string, price: number }[] | null>(null);

    useEffect(() => {
        // Fetch data from Binance API
        const fetchData = async () => {
            try {
                const response = await fetch('https://api.binance.com/api/v3/ticker/price');
                const jsonData = await response.json();
                setData(jsonData);
            } catch (error) {
                console.error('Error fetching data from Binance API:', error);
            }
        };

        fetchData();

        // Update data every 5 seconds
        const interval = setInterval(fetchData, 5000);

        // Clean up interval on component unmount
        return () => clearInterval(interval);
    }, []);

    return (
        <div>
            <h1>Binance Dashboard</h1>
            {data ? (
                <table>
                    <thead>
                        <tr>
                            <th>Symbol</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item: { symbol: string, price: number }) => (
                            <tr key={item.symbol}>
                                <td>{item.symbol}</td>
                                <td>{item.price}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>Loading data...</p>
            )}
        </div>
    );
};

export default BinanceDashboard;