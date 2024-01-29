import React from 'react';
import constants from './constants.json';
import { fetchPost } from './helpers/apihelpers';
import WarningBox from './warningBox';
import LineChart from './LineChart';
import BarGraph from './BarGraph';
import Popup from './Popup';
import './App.css';

export class MealTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      meals: [] ,
      fine: 0,
      showWarning: false,
      showLineChart : false,
      showBarGraph : false,
      showPopup: false
    };
  }

  componentDidMount() {   
    const {base_api, fetchMonthlyDataEndpoint , fineForMonthEndpoint, dayWiseReportEndpoint } = constants;
    let api_url = base_api + fetchMonthlyDataEndpoint;
    let payload = this.getMonthNumber(this.props.month);
    //fetchMonthlyData i.e call Benzy's API to get all food order data for given month
    fetchPost(api_url, {
        method: 'POST', 
        headers: {
            'Content-Type': 'text/plain'
        }
    },
    payload)
    .then(data => console.log(data))
    .catch(error => console.error(error));//No processing; capture no response. Later, extract and show employee name.

    api_url = base_api + fineForMonthEndpoint;
    fetchPost(api_url, {
      method: 'POST', 
      headers: {
          'Content-Type': 'text/plain'
      }
    },
    payload)
    .then(data =>{
         console.log(data)
         let totalFine = data.fine;
         if(totalFine != 0){
            this.setState({ fine: totalFine, showWarning: true });
         }
        })
    .catch(error => console.error(error));
    
    api_url = base_api + dayWiseReportEndpoint;
    fetchPost(api_url, {
      method: 'POST', 
      headers: {
          'Content-Type': 'text/plain'
      }
    },
    payload)
    .then(data =>{
         console.log(data)
         let mealsReport = this.convertDataToReportFormat(data);
         this.setState({ meals: mealsReport.report });
        })
    .catch(error => console.error(error));
  }

  convertDataToReportFormat(data) {
    const reportArray = Object.values(data);
    return { "report": reportArray };
  }

  handleDownloadReport = () => {
    const url = "http://localhost:8080/monthlyExcelReport";
    window.open(url, '_blank');
  }

  getMonthNumber(monthName) {
    const months = constants.months;
    const monthIndex = months.indexOf(monthName);
    return monthIndex >= 0 ? (monthIndex + 1) : null;
  }

  hanlderAnalysisGeneration = () =>{
    // this.setState({showPopup : true, showBarGraph: true});
    this.togglePopup();
  }

  togglePopup = () => {
    this.setState((prevState) => ({ showPopup: !prevState.showPopup }));
  };


  getMealStatus(status) {
    const mealstatus = {
      1: 'Delivered', // Delivered
      2: 'Canceled', // Canceled
      3: 'Pending',    // Pending
      4: 'Unknown'    // Unknown
    };
    return mealstatus[status] || ''; 
  }

  getStatusColor(status) {
    const statusColors= {
      1: 'rgba(0, 128, 0, 0.2)', // Completed (Light translucent green)
      2: 'rgba(255, 255, 0, 0.2)', // Canceled (Light translucent yellow)
      3: 'rgba(255, 0, 0, 0.2)', // Pending (Light translucent red)
      4: 'rgba(128, 128, 128, 0.2)' // Unknown (Light translucent grey)
    };
    return statusColors[status] || 'white'; // Default color if status is not recognized
  }

  render() {
    const { month } = this.props; 
    return (
      <div className='App-body'>
         {this.state.showWarning && (
          <WarningBox 
            text={`Total fine for the month of ${month} is ${this.state.fine}.`}
          />
        )}
        <h2>Meal Summary for {month}</h2>
        <div className='table-container'>
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Breakfast</th>
                <th>Lunch</th>
                <th>Dinner</th>
                <th>Fine</th>
              </tr>
            </thead>
            <tbody>
              {this.state.meals.map((meal, index) => (
                <tr key={index}>
                  <td>{meal.dateString}</td>
                  <td style={{ backgroundColor: this.getStatusColor(meal.breakFast) }}>{this.getMealStatus(meal.breakFast)}</td>
                  <td style={{ backgroundColor: this.getStatusColor(meal.lunch) }}>{this.getMealStatus(meal.lunch)}</td>
                  <td style={{ backgroundColor: this.getStatusColor(meal.dinner) }}>{this.getMealStatus(meal.dinner)}</td>
                  <td>{meal.fine}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button className='App-button' onClick={this.handleDownloadReport}>
            Download Excel
        </button>
        <button className='App-button' onClick={this.hanlderAnalysisGeneration}>
            Run Analytics
        </button>
        {this.state.showPopup && <Popup onClose={this.togglePopup} />}
      </div>
    );
  }
}

export default MealTable;
