import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { CoinList } from '../../config/api';
import { CryptoState } from '../../CryptoContext';
import SearchTable from './SearchTable';

const CoinsTable = () => {

    // States for fetching ,storing and searching data
    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("");

    // Using Context api for currency
    const { currency, symbol } = CryptoState()

    // Fetching coins
    const fetchCoins = async () => {
        setLoading(true);
        const { data } = await axios.get(CoinList(currency));
        setCoins(data);
        setLoading(false);
    }

    // Use effect to fetch the coins
    useEffect(() => {
        fetchCoins();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    }

    const filteredCoins = coins.filter((coin) => coin.name.toLowerCase().includes(search.toLowerCase()))
    return (
        <SearchTable filteredCoins={filteredCoins} loading={loading} symbol={symbol} handleSearchChange={handleSearchChange} />
    )
}

export default CoinsTable