import React from 'react';
import { VictoryChart, VictoryBar, VictoryAxis, VictoryTheme,VictoryContainer,VictoryPie,VictoryTooltip } from 'victory';

export class PieGraph extends React.Component {
    processData(dataObject) {
        return Object.entries(dataObject).map(([key, value]) => {
          return { x: key, y: value };
        });
    }

    render() {
        // Process the incoming data prop
       let processedData = this.processData(this.props.data);
        let title = this.props.title;
        return (
            <div>
             <h1>{title}</h1>   
             <VictoryPie
      colorScale={["rgba(255, 29, 79, 0.8)", "rgba(79, 255, 81, 0.8)", "rgba(241, 242, 53, 0.8)"]}
      data={processedData}
     
      labels={({ datum }) => `${datum.x}: ${datum.y}%`}
    />
        </div>
        );
    }
}

export default PieGraph;
