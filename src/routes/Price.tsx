import { useQuery } from "react-query";
import { fetchCoinTickers } from "../api";
import styled from "styled-components";

const PBox = styled.section`
    border: 1px solid black;
    display: flex;
    justify-content: center;
`

const PriceBox = styled.div`
    border: 1px solid black;
    width: 40%;
    background-color: ${props => props.theme.accentColor};
    color:${props => props.theme.textColor};
`

interface PriceData {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    circulating_supply: number;
    total_supply: number;
    max_supply: number;
    beta_value: number;
    first_data_at: string;
    last_updated: string;
    quotes: {
        USD: {
            ath_date: string;
            ath_price: number;
            market_cap: number;
            market_cap_change_24h: number;
            percent_change_1h: number;
            percent_change_1y: number;
            percent_change_6h: number;
            percent_change_7d: number;
            percent_change_12h: number;
            percent_change_15m: number;
            percent_change_24h: number;
            percent_change_30d: number;
            percent_change_30m: number;
            percent_from_price_ath: number;
            price: number;
            volume_24h: number;
            volume_24h_change_24h: number;
        }
    };
}

interface PriceProps {
    coinId: string;
}

function Price( {coinId}: PriceProps){
    const { isLoading, data } = useQuery<PriceData>(["ohl", coinId], () => fetchCoinTickers(coinId))
    return (
        <div>{isLoading ? "Loading..." :
            <PBox>
            <PriceBox>{data?.id}</PriceBox>
            <PriceBox>{data?.quotes.USD.percent_change_15m}</PriceBox>
            <PriceBox>{data?.quotes.USD.percent_change_30m}</PriceBox>
            <PriceBox>{data?.quotes.USD.percent_change_1h}</PriceBox>
            <PriceBox>{data?.quotes.USD.percent_change_6h}</PriceBox>
            <PriceBox>{data?.quotes.USD.percent_change_12h}</PriceBox>
            <PriceBox>{data?.quotes.USD.percent_change_24h}</PriceBox>
            <PriceBox>{data?.quotes.USD.percent_change_7d}</PriceBox>
            <PriceBox>{data?.quotes.USD.percent_change_30d}</PriceBox>
            <PriceBox>{data?.quotes.USD.percent_change_1y}</PriceBox>
            <PriceBox>{data?.quotes.USD.market_cap_change_24h}</PriceBox>

            </PBox>
    }</div>
    )
}

export default Price;