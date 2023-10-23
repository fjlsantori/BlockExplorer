import { Alchemy, Network } from 'alchemy-sdk';
import { BrowserRouter, Routes, Route, Switch, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

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

const BlockDetails = () => {
    const { blockNumber } = useParams();
    const [blockDetails, setBlockDetails] = useState();
    const [hash, setHash] = useState();

    console.log("This is the BN "+blockNumber);
    useEffect(() => {
        async function getBlockDetails(){
            const blockDetails = await Alchemy.core.getBlock(blockNumber);
            setHash(blockDetails.hash);;
        }
        getBlockDetails();
    },[blockNumber]);

    return (
        <div>
            <h1>{blockNumber}</h1>
            <div>Hash: {hash}</div>
        </div>
    )
}
 

export default BlockDetails;