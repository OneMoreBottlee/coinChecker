import { Link } from "react-router-dom";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { fetchCoins } from "../api";
import { useQuery } from "react-query";
import { Helmet } from "react-helmet";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { isDarkAtom } from "../atoms";
import { NavigationContainer, NavigationIcon } from "./Coin";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Container = styled.div`
    padding: 0px 20px;
    max-width: 480px;
    margin: 0 auto;
`;

const Header = styled.header`
    height: 10vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const CoinsList = styled.ul`
    
`;

const Coin = styled.li`
    background-color: #ffffff;
    color:${props => props.theme.bgColor};
    border-radius: 10px;
    margin-bottom: 10px;
    border: 1px solid black;

    a {
        padding: 20px;
        transition: color 0.2s ease-in;
        align-items: center;
        display: flex;
    }
    &:hover {
        a{
            color:${props => props.theme.accentColor};
        }
    }
`;

const Title = styled.h1`
    font-size: 48px;
    color:${(props) => props.theme.accentColor};
`

const Loader = styled.span`
    text-align: center;
    display: block;
`

const Img = styled.img`
    width: 35px;
    height: 35px;
    margin-right: 10px;
`

interface ICoin {
    id: string,
    name: string,
    symbol: string,
    rank: number,
    is_new: boolean,
    is_active: boolean,
    type: string,
}

function Coins() {
    // const [coins, setCoins] = useState<CoinInterface[]>([]);
    // const [loading, setLoading] = useState(true);
    // useEffect(() => {
    //     (async () => {
    //         const response = await fetch("https://api.coinpaprika.com/v1/coins");
    //         const json = await response.json();
    //         setCoins(json.slice(0, 100));
    //         setLoading(false);
    //     })();
    // }, [])
    const { isLoading, data } = useQuery<ICoin[]>("allCoins", fetchCoins);
    const isDark = useRecoilValue(isDarkAtom);
    const setDarkAtom = useSetRecoilState(isDarkAtom);
    const toggleDarkAtom = () => setDarkAtom((prevMode) => !prevMode);
    return (
        <Container>
            <NavigationContainer>
                {isDark ? (
                    <NavigationIcon onClick={toggleDarkAtom}>
                        <FontAwesomeIcon icon={faSun} />
                    </NavigationIcon>
                ) : (
                    <NavigationIcon onClick={toggleDarkAtom}>
                        <FontAwesomeIcon icon={faMoon} />
                    </NavigationIcon>
                )}
            </NavigationContainer>
            <Header>
                <Title>Coins</Title>
            </Header>
            {isLoading ? (<Loader>"Loading..."</Loader>
            ) : (
                <CoinsList>
                    {data?.slice(0, 100).map((coin) => (
                        <Coin key={coin.id}>
                            <Link to={`/${coin.id}`} state={coin}>
                                <Img src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`} />
                                {coin.name} &rarr;</Link >
                        </Coin>))}
                </CoinsList>)}
        </Container>
    )
}

export default Coins;