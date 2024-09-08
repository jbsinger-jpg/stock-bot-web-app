import { InfoOutlineIcon } from '@chakra-ui/icons';
import { Center, Grid, GridItem, Tab, TabList, Tabs } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

interface StockData {
  stock_symbol: string;
  accuracy_score: number;
  per_score: number;
  f1_score: number;
  prediction: boolean;
}

const routeBase = 'http://localhost:8081/stock_results/'

const routes = [
  {'route': 'top_10_bullish_stocks', 'title': 'Top 10 Bullish' },
  {'route': 'top_10_bearish_stocks', 'title': 'Top 10 Bearish' }, 
  {'route': 'all_bearish_stocks', 'title': 'All Bearish' },
  {'route': 'all_bullish_stocks', 'title': 'All Bullish' }
]

export default function App() {
  const [stockSymbols, setStockSymbols] = useState<StockData[]>([]);
  const [stockData, setStockData] = useState<string>('')

  // Function to fetch the data from the backend
  const getData = async () => {
    try {
      const response = await fetch(stockData);
      const data = await response.json();

      setStockSymbols(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, [stockData]);

  return (
    <Grid style={{'width': '99vw'}}>
        <Tabs variant={'soft-rounded'} isFitted w={'99vw'} position={!stockData ? 'absolute' : 'sticky'} top={0} h={'70px'} bgColor={'white'}>
          <TabList>
            {routes && routes.map((route) => (
              <Tab onClick={() => setStockData(`${routeBase}${route.route}`)}>{route.title}</Tab>
            ))}
          </TabList>
      </Tabs>
        {stockData ? stockSymbols.map((stock, index) => (
          <div key={index} style={{ marginBottom: '10px', border: '1px solid #ccc', padding: '10px' }}>
            <p><strong>Stock Symbol:</strong> {stock.stock_symbol}</p>
          </div>
        )) :
          <GridItem>
            <Center display="flex" gap="8px">
              <InfoOutlineIcon />
              <div>Select a stock option!</div>
            </Center>
          </GridItem>
        }
    </Grid>
  );
}
