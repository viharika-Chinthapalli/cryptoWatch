import { styled } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import AliceCarousel from 'react-alice-carousel'
import { Link } from 'react-router-dom'
import { TrendingCoins } from '../../config/api'
import { CryptoState } from '../../CryptoContext'

const Carousel = () => {



    // Styling starts here


    const StyledCarousel = styled('div')(({ theme }) => ({
        height: "50%",
        display: "flex",
        alignItems: "center",
    }))

    const StyledCarouselLink = styled(Link)(({ theme }) => ({
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        cursor: "pointer",
        textTransform: "uppercase",
        color: "white",
    }))

    //styling ends here


    const [trending, setTrending] = useState([]);

    const { currency, symbol } = CryptoState();

    const fetchTrendingCoins = async () => {

        //fetch trending coins here and set it inside trending state
        const { data } = await axios.get(TrendingCoins(currency));
        setTrending(data);

    }

    useEffect(() => {
        fetchTrendingCoins();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currency])
    
    const items = trending.map((coin) => {
        const coin_change = coin?.price_change_percentage_24h.toFixed(2);
        return (
            <StyledCarouselLink className='' to={`/coins/${coin.id}`}>
                <img src={coin?.image} alt={coin.name} height="80" style={{ marginBottom: 10 }} />
                <span>
                    {coin?.symbol}&nbsp;
                    <span style={{ color: coin_change >= 0 ? '#03DAC5' : 'red' }}>
                        {`${coin_change}%`}
                    </span>
                </span>
                <span style={{ fontSize: 22, fontWeight: 500 }}>
                    {symbol} {coin?.current_price.toFixed(2)}
                </span>
            </StyledCarouselLink>
        )
    })

    const responsive = {
        0: {
            items: 2,
        },
        512: {
            items: 4
        }
    }




    return (
        <StyledCarousel>
            <AliceCarousel mouseTracking infinite autoPlayInterval={1000} animationDuration={1500} disableButtonsControls disableDotsControls responsive={responsive} autoPlay items={items} />
        </StyledCarousel>
    )
}

export default Carousel