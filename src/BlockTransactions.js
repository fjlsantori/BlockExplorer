import { useEffect, useState } from 'react';

const BlockTransactions = (props) => {
    const transactions = props;
    return (
        <div>
           HOLA {typeof{transactions}}
        </div>
    )
}

export default BlockTransactions;