import http from "./httpService";
// import { apiUrl } from "../config.json";
// const apiEndpoint = apiUrl;

export function getStocks(StockSymbol) {
    const API_KEY = 'IKP514JTWD9SWLHV';
    let API_Call = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${StockSymbol}&outputsize=compact&apikey=${API_KEY}`;
  return http.get(API_Call);
}
