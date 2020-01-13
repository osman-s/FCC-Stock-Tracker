import React, { Component } from "react";
import { getStocks } from "../services/stockService";
import SearchStockForm from "./searchStockForm";
import Plotly from "plotly.js-basic-dist";
import createPlotlyComponent from "react-plotly.js/factory";
const Plot = createPlotlyComponent(Plotly);

class Home extends Component {
  state = {
    data: [
      { stockSymbol: "NFLX", xValues: [], yValues: [], color: "red" },
      { stockSymbol: "FB", xValues: [], yValues: [], color: "blue" },
      { stockSymbol: "AAPL", xValues: [], yValues: [], color: "#33FFBD" }
    ],
    dataset: 0
  };

  async componentDidMount() {
    await this.handleStocks(this.state.data[this.state.dataset].stockSymbol);
    await this.handleStocks(this.state.data[1].stockSymbol, 1);
    await this.handleStocks(this.state.data[2].stockSymbol, 2);
    console.log(this.state);
  }

  handleStocks = async (stock, dataset = this.state.dataset) => {
    const { data: stockData } = await getStocks(stock);
    console.log(stockData);
    if (stockData["Meta Data"]) {
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
    } else if (stockData["Error Message"]) {
      alert(
        "Invalid stock symbol. Please enter a valid stock symbol. Thank You"
      );
    } else {
      console.log(`There was an error retrieving dataset ${dataset}`);
    }
  };

  setStock = async stock => {
    await this.handleStocks(stock);
  };
  setDataset = async dataset => {
    await this.setState({ dataset });
    console.log("setdataset", this.state);
  };
  setTitle = datasets => {
    const title = [];
    datasets.map(dataset => (
      title.push(dataset.stockSymbol)
    ));
    return title.join("-");
  };

  render() {
    const datasets = this.state.data;
    const title = this.setTitle(datasets);
    return (
      <div className="container1 border">
        <div className="">
          <SearchStockForm
            setStock={this.setStock}
            setDataset={this.setDataset}
          />
          <Plot
            data={datasets.map(dataset => ({
              x: dataset.xValues,
              y: dataset.yValues,
              type: "scatter",
              name: `${dataset.stockSymbol}`,
              mode: "lines+markers",
              marker: { color: `${dataset.color}` }
            }))}
            layout={{
              width: 720,
              height: 440,
              title: title
            }}
          />
        </div>
      </div>
    );
  }
}

export default Home;
