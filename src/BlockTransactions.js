import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';


import { Alchemy, Network } from 'alchemy-sdk';
const settings = {
    apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
    network: Network.ETH_MAINNET,
};
const alchemy = new Alchemy(settings);

const BlockTransactions = () => {
    const { hash } = useParams();
    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");
    const [success, setSuccess] = useState();

    useEffect(() => {
        async function transactionDetails() {
            const tx = await alchemy.core.getTransactionReceipt(hash);
            setFrom(tx.from);
            setTo(tx.to);
            if (tx.status === 0) {
                setSuccess(0);
            }
            else {
                setSuccess(1);
            }
        }
        transactionDetails();
    }, [hash]);
    return (
        <>
            <div>
                <h2>Transaction Hash</h2>
                <p>{hash}</p>
                <h2>From</h2>
                <p>{from}</p>
                <h2>To</h2>
                <p>{to}</p>
                <h2>TX Status</h2>
                <p>{success ? "Success" : "Failure"}</p>
            </div>
        </>
    )
}

export default BlockTransactions;