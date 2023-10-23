import { Alchemy, Network } from 'alchemy-sdk';
import { BrowserRouter, Routes, Route, Switch, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './App.css';
import BlockDetails from './BlockDetails';
import Navbar from './Navbar';
// Refer to the README doc for more information about using API
// keys in client-side code. You should never do this in production
// level code.
const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

// In this week's lessons we used ethers.js. Here we are using the
// Alchemy SDK is an umbrella library with several different packages.
//
// You can read more about the packages here:
//   https://docs.alchemy.com/reference/alchemy-sdk-api-surface-overview#api-surface
const alchemy = new Alchemy(settings);

function App() {
  const [blockNumber, setBlockNumber] = useState();

  useEffect(() => {
    async function getBlocks() {
      try {
        const blockNumber = await alchemy.core.getBlockNumber();
        setBlockNumber(blockNumber);
      } catch (err) {
        console.log("Cannot get recent block", err);
      }
    }
    getBlocks();
    //eslint-disable-next-line
  }, [blockNumber]);

  return (
    <BrowserRouter>
      <div className='App'>
        <Navbar blockNumber={blockNumber}/>
        <div className='content'>
          <Switch>
            <Route exact path="/">
              {blockNumber}
            </Route>
            <Route path="/BlockDetails/:blockNumber">
            <BlockDetails />
            </Route>
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  )
}
export default App;