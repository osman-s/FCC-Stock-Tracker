import React, {Component} from 'react';
import {Bar, Line, Pie, Scatter} from 'react-chartjs-2';

class Chart extends Component{
  state = {
  };

  static defaultProps = {
    displayTitle:true,
    displayLegend: true,
    legendPosition:'right',
    location:'City'
  }

  render(){
    const { chartData, stockXValues, stockYValues } = this.props.data
    const data = [{x:stockXValues, y: stockYValues}]
    return (
      <div className="chart">
        <Scatter
          data={{datasets:[{label: "scatter Dataset", data: [{
                x: -10,
                y: 0
            }, {
                x: 0,
                y: 10
            }, {
                x: 10,
                y: 5
            }]}]}}
          options={{}}
        />
        <Bar
          data={chartData}
          options={{
            title:{
              display:this.props.displayTitle,
              text:'Largest Cities In '+this.props.location,
              fontSize:25
            },
            legend:{
              display:this.props.displayLegend,
              position:this.props.legendPosition
            }
          }}
        />

        <Line
          data={chartData}
          options={{
            title:{
              display:this.props.displayTitle,
              text:'Largest Cities In '+this.props.location,
              fontSize:25
            },
            legend:{
              display:this.props.displayLegend,
              position:this.props.legendPosition
            }
          }}
        />

        <Pie
          data={chartData}
          options={{
            title:{
              display:this.props.displayTitle,
              text:'Largest Cities In '+this.props.location,
              fontSize:25
            },
            legend:{
              display:this.props.displayLegend,
              position:this.props.legendPosition
            }
          }}
        />
      </div>
    )
  }
}

export default Chart;
