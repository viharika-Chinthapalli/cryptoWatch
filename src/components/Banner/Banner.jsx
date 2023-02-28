// import Carousel from "./Carousel";
import { Container, Typography, styled } from "@mui/material";
import Carousel from "./Carousel";



//styling starts here


const ContainerBanner = styled(Container)(({ theme }) => ({
    height: 400,
    display: "flex",
    flexDirection: "column",
    paddingTop: 25,
    justifyContent: "space-around",
}))

const TagLine = styled('div')(({ theme }) => ({
    display: "flex",
    height: "40%",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center",
}))


//styling ends here

function Banner() {
    return (
            <ContainerBanner>
                <TagLine>
                    <Typography
                        variant="h2"
                        style={{
                            fontWeight: "bold",
                            marginBottom: 15,
                            fontFamily: "Roboto",
                        }}
                    >
                        Crypto Watch
                    </Typography>
                    <Typography
                        variant="subtitle2"
                        style={{
                            color: "darkgrey",
                            textTransform: "capitalize",
                            fontFamily: "Roboto",
                        }}
                    >
                        Get all the Info regarding your favorite Crypto Currency
                    </Typography>
                </TagLine>
                <Carousel />
            </ContainerBanner>
    );
}

export default Banner;