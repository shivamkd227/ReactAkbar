import React, { Component } from 'react';
import Spinner from './Spinner';
import './App.css';
import LineChart from './LineChart';
import BarGraph from './BarGraph';

class Popup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      linechartJsonData: [],
      categorizedMealStatusJsonData: {},
      categorizedMealTypeJsonData: {}
    };
  }

  componentDidMount() {
    // Simulate an API call
    this.fetchData();
  }

  fetchData = () => {
    // Replace this with your actual API call
    setTimeout(() => {
      this.setState({ isLoading: false, linechartJsonData:  [
        {"2023-11-1":"0"},{"2023-11-2":"0"},{"2023-11-3":"0"},{"2023-11-4":"2.7"},{"2023-11-5":"2.7"},{"2023-11-6":"2.7"},{"2023-11-7":"2.7"},{"2023-11-8":"2.7"},{"2023-11-9":"2.7"},{"2023-11-10":"2.7"},{"2023-11-11":"6.8"},{"2023-11-12":"6.8"},{"2023-11-13":"6.8"},{"2023-11-14":"6.8"},{"2023-11-15":"6.8"},{"2023-11-16":"6.8"},{"2023-11-17":"6.8"},{"2023-11-18":"9.6"},{"2023-11-19":"9.6"},{"2023-11-20":"9.6"},{"2023-11-21":"9.6"},{"2023-11-22":"11"},{"2023-11-23":"11"},{"2023-11-24":"11"},{"2023-11-25":"15.1"},{"2023-11-26":"15.1"},{"2023-11-27":"15.1"},{"2023-11-28":"15.1"},{"2023-11-29":"15.1"}
        ],
        categorizedMealStatusJsonData :  {"Unknown":0,"Completed":62,"Canceled":11,"Pending":2},
        categorizedMealTypeJsonData : {}
    });
    }, 2000); // simulate an API call delay
  };

  render() {
    const { isLoading, jsonData } = this.state;

    return (
      <div className="popup">
        <div className="popup-content">
            {isLoading ? 
            <div style={{ height: '100px', position: 'relative' }}>
                <Spinner />
            </div>
            : 
            <div>
                <BarGraph data={this.state.categorizedMealStatusJsonData}/>
                <BarGraph data={this.state.categorizedMealTypeJsonData}/>
                <LineChart data={this.state.linechartJsonData}/>
            </div>
            }
            <button onClick={this.props.onClose}>Close</button>
        </div>
      </div>
    );
  }
}

export default Popup;
