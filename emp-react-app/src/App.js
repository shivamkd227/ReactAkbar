import React from 'react';
import MealTable from './Table'; 
import constants from './constants.json';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showDropdown: true,
      showTable: false,
      selectedMonth: '' 
    };
  }

  handleEnterPortalClick = () => {
    this.setState({ showDropdown: true, showTable: false });
  };

  handleMonthSelect = (event) => {
    this.setState({ 
      showTable: true,
      selectedMonth: event.target.value // Update the selected month
    }, () =>{
      
    });

  };

  handleBackClick = () => {
    this.setState({ showTable: false , selectedMonth: '' }, ()=>{});
  };

  render() {
    const { months } = constants;
    const { showDropdown, showTable } = this.state;
    return (
      <div className='App'>
        <h1 className='App-header'>Welcome to your Employee-meal-tracker page</h1>
        <div className='App-body'>
          {!showTable && !showDropdown && (
            <button className='App-button' onClick={this.handleEnterPortalClick}>Enter Portal</button>
          )}

          {showDropdown && (
            <div className='select-container'>
              <select
                className="select-dropdown"
                onChange={this.handleMonthSelect}
                value={this.state.selectedMonth} // Control the dropdown's value
              >
                <option value="" disabled>Select a month</option>
                {months.map((month, index) => (
                  <option key={index} value={month}>{month}</option>
                ))}
              </select>
            </div>
          )}
          {( showTable) && (
            <button className='App-button-secondary' onClick={this.handleBackClick}>Back to Previous</button>
          )}
          {showTable && ( <MealTable month={this.state.selectedMonth} />)}

        </div>
      </div>
    );
  }
}

export default App;
