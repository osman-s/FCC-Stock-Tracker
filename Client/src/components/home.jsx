import React, { Component } from "react";
import { getStocks } from "../services/stockService";
import SearchStockForm from "./searchStockForm";
import Plotly from "plotly.js-basic-dist";
import createPlotlyComponent from "react-plotly.js/factory";
const Plot = createPlotlyComponent(Plotly);

class Home extends Component {
  state = {
    stockSymbol: "NFLX",
    xValues: [],
    yValues: []
  };

  async componentDidMount() {
    await this.handleStocks(this.state.stockSymbol);
    console.log(this.state);
  }

  handleStocks = async stock => {
    const { data: stockData } = await getStocks(stock);
    console.log(stockData);
    let stockSymbol = stockData["Meta Data"]["2. Symbol"];
    let xValues = [];
    let yValues = [];
    for (var key in stockData["Time Series (Daily)"]) {
      // data.push({
      //   x: key,
      //   y: parseInt(stockData["Time Series (Daily)"][key]["1. open"])
      xValues.push(key);
      yValues.push(stockData["Time Series (Daily)"][key]["1. open"]);
    }
    this.setState({ xValues, yValues, stockSymbol });
  };

  setStock = async stock => {
    // await this.setState({ stockSymbol: stock });
    await this.handleStocks(stock);
  };

  render() {
    const { xValues, yValues, stockSymbol } = this.state;
    return (
      <div className="container1">
        <div className="">
          <SearchStockForm setStock={this.setStock} />
          <Plot
            data={[
              {
                x: xValues,
                y: yValues,
                type: "scatter",
                mode: "lines+markers",
                marker: { color: "red" }
              }
            ]}
            layout={{ width: 720, height: 440, title: stockSymbol }}
          />
        </div>
      </div>
    );
  }
}

export default Home;
