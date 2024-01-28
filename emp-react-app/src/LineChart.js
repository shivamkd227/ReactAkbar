import React from 'react';
import { VictoryChart, VictoryLine, VictoryAxis, VictoryTheme } from 'victory';

class LineChart extends React.Component {
  processData = (jsonData) => {
    // Convert JSON data to the format required by VictoryBar
    return jsonData.map((item) => {
      const date = Object.keys(item)[0];
      const value = parseFloat(item[date]);
      const day = new Date(date).getDate(); // Extract the day from the date
      return { x: day, y: value };
    });
  };

  render() {
    // Process the incoming data prop
    const processedData = this.processData(this.props.data);

    return (
      <VictoryChart
        theme={VictoryTheme.material}
        domainPadding={20}
      >
        <VictoryLine
          data={processedData}
          style={{
            data: { stroke: "#a4a3a3" },
            parent: { border: "1px solid #ccc"}
          }}
        />
        <VictoryAxis
          // Configure the axis if needed
        />
        <VictoryAxis
          dependentAxis
          // Configure the axis if needed
        />
      </VictoryChart>
    );
  }
}

export default LineChart;
