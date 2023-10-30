import { Alchemy, Network } from 'alchemy-sdk';
import { BrowserRouter, Routes, Route, Switch, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BlockDetails from './BlockDetails';

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

const BlockList = (props) => {
    const lastBlockNumber = props.blockNumber;

    const [blockList, setBlockList] = useState([]);

    useEffect(() => {
        async function getBlockList() {
           /*  With this I create an iterative array thar goes backwards from blockNumber
            to blockNumber-20 (20 items length). Then I filter to ensure that none of 
            the blocks are negative. */

            const newBlocks = Array.from({ length: 20 }, (item, index) => lastBlockNumber - index).filter(block => block >= 0);
            setBlockList(newBlocks);
        }
        getBlockList();
    }, [lastBlockNumber]);

    /* If you try to render an array directly as a child element, 
    you will trigger the “Objects Are Not Valid as a React Child” error.
    Instead, you should use the map() method to convert each item in 
    the array to a valid React child element. */

    return (
        <ul>
            {blockList.map((blockNumber, index) => (
                <div key={index}>
                    <Link to={`/BlockDetails/${blockNumber}`}>
                        {blockNumber}
                    </Link>
                </div>
            ))}
        </ul>

    );
}

export default BlockList;