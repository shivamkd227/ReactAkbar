import React from 'react';
import { VictoryLine, VictoryChart, VictoryTheme, VictoryLegend } from 'victory';


export class LineGraph extends React.Component {
    processData(dataObject) {
        return Object.entries(dataObject).map(([key, value]) => {
          return { x: key, y: value };
        });
    }

    render() {

      const data1 = [
        { "x": 1, "y": 2 },
        { "x": 2, "y": 1 },
        { "x": 3, "y": 0 },
        { "x": 4, "y": 2 },
        { "x": 5, "y": 3 },
        { "x": 6, "y": 1 },
        { "x": 7, "y": 2 },
        { "x": 8, "y": 0 },
        { "x": 9, "y": 1 },
        { "x": 10, "y": 3 },
        { "x": 11, "y": 2 },
        { "x": 12, "y": 0 },
        { "x": 13, "y": 3 },
        { "x": 14, "y": 1 },
        { "x": 15, "y": 2 },
        { "x": 16, "y": 0 },
        { "x": 17, "y": 3 },
        { "x": 18, "y": 2 },
        { "x": 19, "y": 1 },
        { "x": 20, "y": 0 },
        { "x": 21, "y": 3 },
        { "x": 22, "y": 2 },
        { "x": 23, "y": 1 },
        { "x": 24, "y": 0 },
        { "x": 25, "y": 3 },
        { "x": 26, "y": 2 },
        { "x": 27, "y": 1 },
        { "x": 28, "y": 0 },
        { "x": 29, "y": 3 },
        { "x": 30, "y": 2 }
        
        
      ];
    
      const data2 = [
        { x: 1, y: 0 },
        { x: 2, y: 3 },
        { x: 3, y: 2 },
        { x: 4, y: 1 },
        { x: 5, y: 0 },
      ];
      

      
      // Process the incoming data prop
      // let processedData = this.processData(this.props.data);
        let title = this.props.title;
        return (
            <div>
             <h1>{title}</h1>   
             <VictoryChart theme={VictoryTheme.material}>
      <VictoryLine data={data1} style={{ data: { stroke: 'blue' } }} />
      <VictoryLine data={data2} style={{ data: { stroke: 'red' } }} />
      <VictoryLegend
        x={10}
        y={10}
        orientation="horizontal"
        data={[
          { name: 'Line 1', symbol: { fill: 'blue' } },
          { name: 'Line 2', symbol: { fill: 'red' } },
        ]}
      />
    </VictoryChart>
        </div>
        );
    }
}

export default LineGraph;
