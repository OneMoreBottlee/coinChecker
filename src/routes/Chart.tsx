import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import Apexchart from "react-apexcharts"
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../atoms";

interface IHistoricalData {
    time_open: number;
    time_close: number;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
    market_cap: number;
}
interface ChartProps {
    coinId: string;
}
interface ICandleChartItem {
    x: Date,
    y: number[];
}
function Chart({ coinId }: ChartProps) {
    const isDark = useRecoilValue(isDarkAtom);
    const { isLoading, data } = useQuery<IHistoricalData[]>(["ohlcv", coinId], () => fetchCoinHistory(coinId))
    return (
        <div>{isLoading ? "Loading..." :
            <>
                <Apexchart
                    type="line"
                    series={[
                        {
                            name: "price",
                            data: data?.map((price => price.close)) ?? [],
                        },
                    ]}
                    options={{
                        theme: {
                            mode: isDark ? "dark" : "light",
                        },
                        chart: {
                            height: 300,
                            width: 500,
                            toolbar: {
                                show: false
                            },
                            background: "#2c3e50"
                        },
                        stroke: {
                            curve: "smooth",
                            width: 5,
                        },
                        yaxis: {
                            show: false
                        },
                        xaxis: {
                            labels: { show: false },
                            axisTicks: { show: false },
                            axisBorder: { show: false },
                            type: "datetime",
                            categories: data?.map((price) => new Date(price.time_close * 1000).toISOString()),
                        },
                        fill: { type: "gradient", gradient: { gradientToColors: ["#0be881"], stops: [0, 100] } },
                        colors: ["#0fbcf9"],
                        tooltip: {
                            y: { formatter: (value) => `$ ${value.toFixed(2)}` },
                        },
                    }} />

                <Apexchart
                    type="candlestick"
                    series={[
                        {
                            name: "price",
                            data: data?.map((price) => {
                                return {
                                    x: new Date(price.time_open * 1000),
                                    y: [
                                        price.open,
                                        price.high,
                                        price.low,
                                        price.close,
                                    ],
                                };
                            }
                            ) as ICandleChartItem[],
                        },
                    ]}
                    options={{
                        theme: {
                            mode: isDark ? "dark" : "light",
                        },
                        chart: {
                            height: 300,
                            width: 500,
                            toolbar: {
                                show: false
                            },
                            background: "#2c3e50"
                        },
                        stroke: {
                            curve: "smooth",
                            width: 5,
                        },
                        yaxis: {
                            show: false
                        },
                        xaxis: {
                            labels: { show: false },
                            axisTicks: { show: false },
                            axisBorder: { show: false },
                            type: "datetime",
                            categories: data?.map((price) => new Date(price.time_close * 1000).toISOString()),
                        },
                        colors: ["#0fbcf9"],
                        
                    }} />
            </>
        }
        </div>
    )
}

export default Chart;