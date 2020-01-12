import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl;

export function getStocks() {
    const API_KEY = 'HGJWFG4N8AQ66ICD';
    let StockSymbol = 'NFLX';
    let API_Call = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${StockSymbol}&outputsize=compact&apikey=${API_KEY}`;
  return http.get(API_Call);
}
