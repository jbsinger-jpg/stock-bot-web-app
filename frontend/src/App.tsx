import { useEffect, useState } from 'react';

interface StockData {
  stock_symbol: string;
  accuracy_score: number;
  per_score: number;
  f1_score: number;
  prediction: boolean;
}

export default function App() {
  const [qb, setQb] = useState<StockData[]>([]);

  // Function to fetch the data from the backend
  const getData = async () => {
    try {
      const response = await fetch('http://localhost:8081/stock_results/top_10_bullish_stocks');
      const data = await response.json();

      setQb(data);  // Assuming data is an array
    } catch (error) {
      console.log(error);
    }
  };

  // React Hook to fetch data on the first render
  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      {/* Render each stock result */}
      {qb.map((stock, index) => (
        <div key={index} style={{ marginBottom: '10px', border: '1px solid #ccc', padding: '10px' }}>
          <p><strong>Stock Symbol:</strong> {stock.stock_symbol}</p>
        </div>
      ))}
    </>
  );
}
