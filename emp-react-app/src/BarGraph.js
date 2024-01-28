import React from 'react';
import { VictoryChart, VictoryBar, VictoryAxis, VictoryTheme } from 'victory';

export class BarGraph extends React.Component {
    processData(dataObject) {
        return Object.entries(dataObject).map(([key, value]) => {
          return { x: key, y: value };
        });
    }

    render() {
        // Process the incoming data prop
        let processedData = this.processData(this.props.data);
        return (
        <VictoryChart
            theme={VictoryTheme.material}
            domainPadding={20}
        >
            <VictoryBar
            data={processedData}
            style={{
                data: { fill: "#a4a3a3" },
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

export default BarGraph;
