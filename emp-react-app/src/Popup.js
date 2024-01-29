import React, { Component } from 'react';
import Spinner from './Spinner';
import './App.css';
import BarGraph from './BarGraph';
import PieGraph from './PieGraph';
import { fetchPost } from './helpers/apihelpers';
import constants from './constants.json';
import LineGraph from './LineGraph';

class Popup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      linechartJsonData: [],
      categorizedMealStatusJsonData: {},
      categorizedMealTypeJsonData: {},

      mealordercountJsonData :{},
      deliveredPendingCancelCountJsonObject :{},
      individualMealWastePercentageJsonObject :{},
      totalMealWastePercentageJsonObject :{}
    };
  }
  getMonthNumber() {
   
    return 1;
  }

  componentDidMount() {
    this.setState({isLoading:true})
    // Simulate an API call
    const {base_api, mealOrderCount , deliveredPendingCancelCount, individualMealWastePercentage,totalMealWastePercentage } = constants;
    //First API CALL 
    let api_url = base_api + mealOrderCount;
      let payload = this.getMonthNumber();
      fetchPost(api_url, {
        method: 'POST', 
        headers: {
            'Content-Type': 'text/plain'
        }
      },payload)
      .then(data =>{
           console.log(data)
           this.setState({ mealordercountJsonData: data});
          })
      .catch(error => console.error(error));
      

      //2 API CALL 
      api_url = base_api + deliveredPendingCancelCount;
      fetchPost(api_url, {
        method: 'POST', 
        headers: {
            'Content-Type': 'text/plain'
        }
      },payload)
      .then(data =>{
           console.log(data)
           this.setState({ deliveredPendingCancelCountJsonObject: data});
          })
      .catch(error => console.error(error));



      //3rd API CAll
      api_url = base_api + individualMealWastePercentage;
      fetchPost(api_url, {
        method: 'POST', 
        headers: {
            'Content-Type': 'text/plain'
        }
      },payload)
      .then(data =>{
           console.log(data)
           this.setState({ individualMealWastePercentageJsonObject: data});
          })
      .catch(error => console.error(error));



      //4th API Call
      api_url = base_api + totalMealWastePercentage;
      fetchPost(api_url, {
        method: 'POST', 
        headers: {
            'Content-Type': 'text/plain'
        }
      },payload)
      .then(data =>{
           console.log(data)
           this.setState({ totalMealWastePercentageJsonObject: data});
          })
      .catch(error => console.error(error));

    this.fetchData();
  }

  convertDataToReportFormat(data) {
    const reportArray = Object.values(data);
    return { "report": reportArray };
  }

  fetchData = () => {
    setTimeout(() => {
      this.setState({isLoading:false})
    }, 3000); 
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
                <BarGraph data={this.state.mealordercountJsonData} title={"Type of Meal Ordered"}/>
                <PieGraph data={this.state.deliveredPendingCancelCountJsonObject} title={"Monthly order Status Overview"}/>

                
                <LineGraph data={this.state.totalMealWastePercentageJsonObject}  title = {"Total Food Wastage"}/>
                <LineGraph data={this.state.individualMealWastePercentageJsonObject}  title = {"Individual Food Wastage"}/>
                
              
            </div>
            }
            <button onClick={this.props.onClose}>Close</button>
        </div>
      </div>
    );
  }
}

export default Popup;
