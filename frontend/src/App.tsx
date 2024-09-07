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
      {/* Display the raw JSON data for debugging */}
      <pre>{JSON.stringify(qb, null, 2)}</pre>

      {/* Render each stock result */}
      {qb.map((stock, index) => (
        <div key={index} style={{ marginBottom: '10px', border: '1px solid #ccc', padding: '10px' }}>
          <p><strong>Stock Symbol:</strong> {stock.stock_symbol}</p>
          <p><strong>Accuracy Score:</strong> {stock.accuracy_score}</p>
          <p><strong>PER Score:</strong> {stock.per_score}</p>
          <p><strong>F1 Score:</strong> {stock.f1_score}</p>
          <p><strong>Prediction:</strong> {stock.prediction ? 'True' : 'False'}</p>
        </div>
      ))}
    </>
  );
}
