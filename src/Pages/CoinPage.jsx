import { styled, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { SingleCoin } from '../config/api';
import parse from 'html-react-parser';
import { CryptoState } from '../CryptoContext';
import millify from 'millify';

import CoinChart from '../components/CoinChart';

const CoinPage = () => {

    const { id } = useParams();
    const [coin, setCoin] = useState([]);

    const { currency, symbol } = CryptoState()

    const fetchSingleCoin = async () => {
        
        //fetch the coin data here
        const { data } = await axios.get(SingleCoin(id));
        setCoin(data);
    }

    useEffect(() => {
        fetchSingleCoin();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    

    //styling starts here


    const StyledContainer = styled('div')(({ theme }) => ({
        display: "flex",
        [theme.breakpoints.down("md")]: {
            flexDirection: "column",
            alignItems: "center",
        },
    }))

    const StyledSidebar = styled('aside')(({ theme }) => ({
        width: "30%",
        [theme.breakpoints.down("md")]: {
            width: "100%",
        },
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: 25,
        borderRight: "2px solid grey",
    }))

    const StyledDescription = styled(Typography)(({ theme }) => ({
        width: "100%",
        fontFamily: "Roboto",
        padding: 25,
        paddingBottom: 15,
        paddingTop: 0,
        textAlign: "justify",
    }))

    const StyledData = styled(Typography)(({ theme }) => ({
        alignSelf: "start",
        padding: 25,
        paddingTop: 10,
        width: "100%",
        [theme.breakpoints.down("md")]: {
            display: "flex",
            justifyContent: "space-around",
        },
        [theme.breakpoints.down("sm")]: {
            flexDirection: "column",
            alignItems: "center",
        },
        [theme.breakpoints.down("xs")]: {
            alignItems: "start",
        },
    })
    )

    //styling ends here

    return (
        <>
            <StyledContainer>
                <StyledSidebar>
                    <img src={coin?.image?.large} alt={coin?.id} height="150" />
                    <Typography variant='h3'>
                        {coin?.name}
                    </Typography>
                    <StyledDescription variant='subtitle'>
                        {parse(`${coin?.description?.en.split(". ")[0]}.`)}
                    </StyledDescription>
                    <StyledData variant='h5'>
                        {`Rank: ${coin?.market_cap_rank}`}<br />
                        {`Current Price: ${symbol} ${coin?.market_data?.current_price[currency.toLowerCase()]}`}<br />
                        {`Market Cap: ${symbol} ${millify(coin?.market_data?.market_cap[currency.toLowerCase()])}`}
                    </StyledData>
                </StyledSidebar>
                <CoinChart id={id} />
            </StyledContainer>
        </>
    )
}

export default CoinPage