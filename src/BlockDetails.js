import { Alchemy, Network } from 'alchemy-sdk';
import { BrowserRouter, Routes, Route, Switch, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BlockTransactions from './BlockTransactions';
 
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
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        async function getBlockDetails() {
            try {
                const blockDetails = await alchemy.core.getBlockWithTransactions(parseInt(blockNumber));
                setBlockDetails(blockDetails);
                setHash(blockDetails.hash);
                setTransactions(blockDetails.transactions);
            } catch (err) {
                console.log("Cannot get recent block", err);
            }
        }
        getBlockDetails();
    }, [blockNumber]);

            /* If you try to render an array directly as a child element, 
    you will trigger the “Objects Are Not Valid as a React Child” error.
    Instead, you should use the map() method to convert each item in 
    the array to a valid React child element. */

    return (
        <div>
            <h2>Block Number</h2>
            <p>{blockNumber}</p>
            <h2>Block Hash</h2>
            <p>{hash}</p>
            <h2>Block Transactions {transactions.length}</h2>
            <>
                {transactions.map((transac,index) => (
                    <div key={index}>
                        <Link to={`/BlockTransactions/${transac.hash}`} element={<BlockTransactions/>}>{transac.hash}</Link>
                    </div>
                ))}
            </>
        </div>
    )
}


export default BlockDetails;