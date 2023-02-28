import React from 'react'
import { createTheme, LinearProgress, Table, TableCell, TableContainer, TableHead, TableBody, TableRow, TablePagination, TextField, ThemeProvider, Typography, Container } from '@mui/material';
import millify from 'millify';
import { Link } from 'react-router-dom';

const SearchTable = ({ filteredCoins, loading, symbol, handleSearchChange }) => {
    // State for Pagination
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const darkTheme = createTheme({
        palette: {
            primary: {
                main: "#fff",
            },
            mode: "dark",
        }
    })

    return (
        <ThemeProvider theme={darkTheme}>
            <Container>
                <Typography variant='h4' style={{ margin: 18, fontFamily: "Roboto" }}>
                    Cryptocurrency Prices by Market Cap
                </Typography>

                <TextField
                    label="Search for a Crypto Currency"
                    variant='outlined'
                    style={{ marginBottom: 20, width: "100%" }}
                    onChange={(e) => handleSearchChange(e)} />

                <TableContainer>
                    {
                        loading ? (
                            <LinearProgress style={{ backgroundColor: "gold" }} />
                        ) : (
                            <Table>
                                <TableHead style={{ backgroundColor: "#EEBC1D" }}>
                                    <TableRow>
                                        {["Coin", "Price", "24h Change", "Market Cap"].map((head) => (
                                            <TableCell
                                                style={{
                                                    color: "black",
                                                    fontWeight: "700",
                                                    fontFamily: "Roboto",
                                                }}
                                                key={head}
                                            >
                                                {head}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {filteredCoins
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map(({ id, name, current_price, price_change_percentage_24h, market_cap }) =>
                                        (
                                            <TableRow hover role="checkbox" key={id} component={Link} to={`/coins/${id}`}>
                                                <TableCell>{name}</TableCell>
                                                <TableCell>{`${symbol} ${current_price}`}</TableCell>
                                                <TableCell><span style={{ color: price_change_percentage_24h >= 0 ? '#03DAC5' : 'red' }}>{`${price_change_percentage_24h.toFixed(2)}%`}</span></TableCell>
                                                <TableCell>{`${symbol} ${millify(market_cap)}`}</TableCell>
                                            </TableRow>
                                        ))
                                    }
                                </TableBody>
                            </Table>
                        )
                    }
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={filteredCoins.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Container>
        </ThemeProvider>
    )
}

export default SearchTable