import React, { Component } from "react";
import { getStocks } from "../services/stockService";
import SearchStockForm from "./searchStockForm";
import Plotly from "plotly.js-basic-dist";
import createPlotlyComponent from "react-plotly.js/factory";
const Plot = createPlotlyComponent(Plotly);

class Home extends Component {
  state = {
    data: [
      { stockSymbol: "NFLX", xValues: [], yValues: [] },
      { stockSymbol: "FB", xValues: [], yValues: [] },
      { stockSymbol: "GOOG", xValues: [], yValues: [] }
    ],
    dataset: 0
  };

  async componentDidMount() {
    await this.handleStocks(this.state.data[this.state.dataset].stockSymbol);
    await this.handleStocks(this.state.data[1].stockSymbol,1);
    await this.handleStocks(this.state.data[2].stockSymbol,2);
    console.log(this.state);
  }

  handleStocks = async (stock, dataset=this.state.dataset) => {
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
    let data = [...this.state.data];
    data[dataset] = { stockSymbol, xValues, yValues };
    this.setState({ data: data });
    console.log("This be data", this.state.data);
  };

  setStock = async stock => {
    await this.handleStocks(stock);
  };
  setDataset = async dataset => {
    await this.setState({ dataset })
    console.log("setdataset",this.state)
  };

  render() {
    const data1 = this.state.data[0];
    const data2 = this.state.data[1];
    const data3 = this.state.data[2];
    // console.log("Xvaru", data3)
    return (
      <div className="container1 border">
        <div className="">
          <SearchStockForm setStock={this.setStock} setDataset={this.setDataset} />
          <Plot
            data={[
              {
                x: data1.xValues,
                y: data1.yValues,
                type: "scatter",
                mode: "lines+markers",
                marker: { color: "red" }
              },
              {
                x: data2.xValues,
                y: data2.yValues,
                type: "scatter",
                mode: "lines+markers",
                marker: { color: "blue" }
              },
              {
                x: data3.xValues,
                y: data3.yValues,
                type: "scatter",
                mode: "lines+markers",
                marker: { color: "green" }
              },
            ]}
            layout={{ width: 720, height: 440, title: data1.stockSymbol }}
          />
        </div>
      </div>
    );
  }
}

export default Home;
