import React from 'react';
import constants from './constants.json';
import { fetchPost } from './helpers/apihelpers';
import WarningBox from './warningBox';

export class MealTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      meals: [] ,
      fine: 0,
      showWarning: false
    };
  }

  componentDidMount() {
    
    // let dummyMeals = [
    //     {
    //         "breakFast": 0,
    //         "lunch": 2,
    //         "fine": 300,
    //         "dateString": "2023-11-1",
    //         "localDate": [
    //           2023,
    //           11,
    //           1
    //         ],
    //         "dinner": 2
    //       },
    //       {
    //         "breakFast": 0,
    //         "lunch": 2,
    //         "fine": 300,
    //         "dateString": "2023-11-2",
    //         "localDate": [
    //           2023,
    //           11,
    //           2
    //         ],
    //         "dinner": 2
    //       }    
    // ];
    // this.setState({ meals: dummyMeals, fine : 600, showWarning: true});
    
    const {base_api, fetchMonthlyDataEndpoint , fineForMonth, dayWiseReportEndpoint } = constants;
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

    api_url = base_api + fineForMonth;
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
    return monthIndex >= 0 ? String(monthIndex + 1) : null;
  }

  convertDataToReportFormat(data) {
    const reportArray = Object.values(data);
    return { "report": reportArray };
  }

  getStatusColor(status) {
    const statusColors = {
      1: 'green', // Completed
      2: 'yellow', // Canceled
      3: 'red',    // Pending
      4: 'grey'    // Unknown
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
                <td style={{ backgroundColor: this.getStatusColor(meal.breakFast) }}>{meal.breakFast}</td>
                <td style={{ backgroundColor: this.getStatusColor(meal.lunch) }}>{meal.lunch}</td>
                <td style={{ backgroundColor: this.getStatusColor(meal.dinner) }}>{meal.dinner}</td>
                <td>{meal.fine}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className='App-button' onClick={this.handleDownloadReport}>
            Download Excel
        </button>
      </div>
    );
  }
}

export default MealTable;
