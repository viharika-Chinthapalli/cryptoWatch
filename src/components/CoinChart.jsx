import { Button, CircularProgress, createTheme, styled, ThemeProvider } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { HistoricalChart } from '../config/api';
import { CryptoState } from '../CryptoContext';
import { chartPeriods } from '../config/data'

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const CoinChart = ({ id }) => {
    const [historicalData, setHistoricalData] = useState([]);
    const [period, setPeriod] = useState(1);
    const [flag, setFlag] = useState(false);

    const { currency, symbol } = CryptoState();

    const fetchChartData = async () => {

        //fetch chart data here
        const { data } = await axios.get(HistoricalChart(id, period, currency));
        setHistoricalData(data.prices);
        setFlag(true);
    }

    useEffect(() => {
        fetchChartData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currency, period])


    // styling starts here

    const darkTheme = createTheme({
        palette: {
            primary: {
                main: "#fff",
            },
            mode: "dark",
        }
    })

    const StyledContainer = styled('div')(({ theme }) => ({
        width: "75%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 25,
        padding: 40
    }))

    const ColorButton = styled(Button)(({ theme }) => ({
        margin: "10px",
        color: "#000",
        backgroundColor: "gold",
        '&:hover': {
            backgroundColor: "yellow",
        },
    }));

    //styling ends here

    return (
        <ThemeProvider theme={darkTheme}>
            <StyledContainer>
                {
                    !historicalData | flag === false ? (
                        <CircularProgress
                            style={{ color: "gold" }}
                            size={250}
                            thickness={1}
                        />
                    ) : (
                        <>
                            {/* <Line ></Line> */}
                            <Line data={{
                                labels: historicalData.map((coin) => {
                                    console.log(coin)
                                    let date = new Date(coin[0]);
                                    let time = `${date.getHours()}:${date.getMinutes()}`;

                                    return period === 1 ? time : date.toLocaleDateString()
                                }),
                                datasets: [
                                    {
                                        data: historicalData.map((coin) => coin[1]),
                                        label: `Price ( Past ${period} Days ) in ${symbol}`,
                                        borderColor: '#EEBC1D',
                                    }
                                ]
                            }}
                                options={{
                                    elements: {
                                        point: {
                                            radius: 1
                                        }
                                    }
                                }}
                            />
                            <div>
                                {chartPeriods.map((period) => (
                                    <ColorButton key={period.value} variant="contained" onClick={() => { setPeriod(period.value); setFlag(false) }}>
                                        {period.label}
                                    </ColorButton>
                                ))}
                            </div>
                        </>
                    )
                }
            </StyledContainer>

        </ThemeProvider>
    )
}

export default CoinChart