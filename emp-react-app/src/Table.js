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
    // let dummyResponseMeals = {
    //         "1": {
    //           "breakFast": 1,
    //           "lunch": 1,
    //           "fine": 0,
    //           "dateString": "2023-11-1",
    //           "localDate": [
    //             2023,
    //             11,
    //             1
    //           ],
    //           "dinner": 1
    //         },
    //         "2": {
    //           "breakFast": 1,
    //           "lunch": 1,
    //           "fine": 0,
    //           "dateString": "2023-11-2",
    //           "localDate": [
    //             2023,
    //             11,
    //             2
    //           ],
    //           "dinner": 1
    //         },
    //         "3": {
    //           "breakFast": 1,
    //           "lunch": 1,
    //           "fine": 0,
    //           "dateString": "2023-11-3",
    //           "localDate": [
    //             2023,
    //             11,
    //             3
    //           ],
    //           "dinner": 1
    //         },
    //         "4": {
    //           "breakFast": 2,
    //           "lunch": 1,
    //           "fine": 0,
    //           "dateString": "2023-11-4",
    //           "localDate": [
    //             2023,
    //             11,
    //             4
    //           ],
    //           "dinner": 2
    //         },
    //         "5": {
    //           "breakFast": 4,
    //           "lunch": 4,
    //           "fine": 0,
    //           "dateString": "2023-11-5",
    //           "localDate": [
    //             2023,
    //             11,
    //             5
    //           ],
    //           "dinner": 4
    //         },
    //         "6": {
    //           "breakFast": 3,
    //           "lunch": 1,
    //           "fine": 100,
    //           "dateString": "2023-11-6",
    //           "localDate": [
    //             2023,
    //             11,
    //             6
    //           ],
    //           "dinner": 1
    //         },
    //         "7": {
    //           "breakFast": 1,
    //           "lunch": 1,
    //           "fine": 0,
    //           "dateString": "2023-11-7",
    //           "localDate": [
    //             2023,
    //             11,
    //             7
    //           ],
    //           "dinner": 1
    //         },
    //         "8": {
    //           "breakFast": 1,
    //           "lunch": 1,
    //           "fine": 0,
    //           "dateString": "2023-11-8",
    //           "localDate": [
    //             2023,
    //             11,
    //             8
    //           ],
    //           "dinner": 1
    //         },
    //         "9": {
    //           "breakFast": 1,
    //           "lunch": 1,
    //           "fine": 0,
    //           "dateString": "2023-11-9",
    //           "localDate": [
    //             2023,
    //             11,
    //             9
    //           ],
    //           "dinner": 1
    //         },
    //         "10": {
    //           "breakFast": 1,
    //           "lunch": 1,
    //           "fine": 100,
    //           "dateString": "2023-11-10",
    //           "localDate": [
    //             2023,
    //             11,
    //             10
    //           ],
    //           "dinner": 3
    //         },
    //         "11": {
    //           "breakFast": 2,
    //           "lunch": 2,
    //           "fine": 0,
    //           "dateString": "2023-11-11",
    //           "localDate": [
    //             2023,
    //             11,
    //             11
    //           ],
    //           "dinner": 2
    //         },
    //         "12": {
    //           "breakFast": 4,
    //           "lunch": 4,
    //           "fine": 0,
    //           "dateString": "2023-11-12",
    //           "localDate": [
    //             2023,
    //             11,
    //             12
    //           ],
    //           "dinner": 4
    //         },
    //         "13": {
    //           "breakFast": 1,
    //           "lunch": 1,
    //           "fine": 0,
    //           "dateString": "2023-11-13",
    //           "localDate": [
    //             2023,
    //             11,
    //             13
    //           ],
    //           "dinner": 1
    //         },
    //         "14": {
    //           "breakFast": 1,
    //           "lunch": 1,
    //           "fine": 0,
    //           "dateString": "2023-11-14",
    //           "localDate": [
    //             2023,
    //             11,
    //             14
    //           ],
    //           "dinner": 1
    //         },
    //         "15": {
    //           "breakFast": 1,
    //           "lunch": 1,
    //           "fine": 0,
    //           "dateString": "2023-11-15",
    //           "localDate": [
    //             2023,
    //             11,
    //             15
    //           ],
    //           "dinner": 1
    //         },
    //         "16": {
    //           "breakFast": 1,
    //           "lunch": 1,
    //           "fine": 0,
    //           "dateString": "2023-11-16",
    //           "localDate": [
    //             2023,
    //             11,
    //             16
    //           ],
    //           "dinner": 1
    //         },
    //         "17": {
    //           "breakFast": 1,
    //           "lunch": 1,
    //           "fine": 0,
    //           "dateString": "2023-11-17",
    //           "localDate": [
    //             2023,
    //             11,
    //             17
    //           ],
    //           "dinner": 1
    //         },
    //         "18": {
    //           "breakFast": 2,
    //           "lunch": 1,
    //           "fine": 0,
    //           "dateString": "2023-11-18",
    //           "localDate": [
    //             2023,
    //             11,
    //             18
    //           ],
    //           "dinner": 2
    //         },
    //         "19": {
    //           "breakFast": 4,
    //           "lunch": 4,
    //           "fine": 0,
    //           "dateString": "2023-11-19",
    //           "localDate": [
    //             2023,
    //             11,
    //             19
    //           ],
    //           "dinner": 4
    //         },
    //         "20": {
    //           "breakFast": 1,
    //           "lunch": 1,
    //           "fine": 0,
    //           "dateString": "2023-11-20",
    //           "localDate": [
    //             2023,
    //             11,
    //             20
    //           ],
    //           "dinner": 1
    //         },
    //         "21": {
    //           "breakFast": 1,
    //           "lunch": 1,
    //           "fine": 0,
    //           "dateString": "2023-11-21",
    //           "localDate": [
    //             2023,
    //             11,
    //             21
    //           ],
    //           "dinner": 1
    //         },
    //         "22": {
    //           "breakFast": 1,
    //           "lunch": 1,
    //           "fine": 0,
    //           "dateString": "2023-11-22",
    //           "localDate": [
    //             2023,
    //             11,
    //             22
    //           ],
    //           "dinner": 2
    //         },
    //         "23": {
    //           "breakFast": 1,
    //           "lunch": 1,
    //           "fine": 0,
    //           "dateString": "2023-11-23",
    //           "localDate": [
    //             2023,
    //             11,
    //             23
    //           ],
    //           "dinner": 1
    //         },
    //         "24": {
    //           "breakFast": 1,
    //           "lunch": 1,
    //           "fine": 0,
    //           "dateString": "2023-11-24",
    //           "localDate": [
    //             2023,
    //             11,
    //             24
    //           ],
    //           "dinner": 1
    //         },
    //         "25": {
    //           "breakFast": 2,
    //           "lunch": 2,
    //           "fine": 0,
    //           "dateString": "2023-11-25",
    //           "localDate": [
    //             2023,
    //             11,
    //             25
    //           ],
    //           "dinner": 2
    //         },
    //         "26": {
    //           "breakFast": 4,
    //           "lunch": 4,
    //           "fine": 0,
    //           "dateString": "2023-11-26",
    //           "localDate": [
    //             2023,
    //             11,
    //             26
    //           ],
    //           "dinner": 4
    //         },
    //         "27": {
    //           "breakFast": 1,
    //           "lunch": 1,
    //           "fine": 0,
    //           "dateString": "2023-11-27",
    //           "localDate": [
    //             2023,
    //             11,
    //             27
    //           ],
    //           "dinner": 1
    //         },
    //         "28": {
    //           "breakFast": 1,
    //           "lunch": 1,
    //           "fine": 0,
    //           "dateString": "2023-11-28",
    //           "localDate": [
    //             2023,
    //             11,
    //             28
    //           ],
    //           "dinner": 1
    //         },
    //         "29": {
    //           "breakFast": 1,
    //           "lunch": 1,
    //           "fine": 0,
    //           "dateString": "2023-11-29",
    //           "localDate": [
    //             2023,
    //             11,
    //             29
    //           ],
    //           "dinner": 1
    //         }
    //       };
    // let dummyMeals = this.convertDataToReportFormat(dummyResponseMeals);
    // this.setState({ meals: dummyMeals.report, fine : 100, showWarning: true});
    const {base_api, fetchMonthlyDataEndpoint , fineForMonthEndpoint, dayWiseReportEndpoint } = constants;
    let api_url = base_api + fetchMonthlyDataEndpoint;
    let payload = this.getMonthNumber(this.props.month);
    //fetchMonthlyData
    fetchPost(api_url, {
        method: 'POST', 
        headers: {
            'Content-Type': 'text/plain'
        }
    },
    payload)
    .then(data => console.log(data))
    .catch(error => console.error(error));

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
    const {base_api , monthlyExcelReportEndpoint } = constants;
    let api_url = base_api + monthlyExcelReportEndpoint;
    let payload = this.getMonthNumber(this.props.month);
    fetchPost(api_url, {
      method: 'POST', 
      headers: {
          'Content-Type': 'text/plain'
      }
    },
    payload)
    .then(data =>{
         console.log(data)
        })
    .catch(error => console.error(error));
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
      1: 'Completed', // Completed
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
        { this.state.showLineChart && (
          <div>
            <LineChart/>
          </div>
        ) }
        { this.state.showBarGraph && (
          <div>
            <BarGraph/>
          </div>
        ) }
      </div>
    );
  }
}

export default MealTable;
