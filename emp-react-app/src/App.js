import React from 'react';
import MealTable from './Table'; 
import constants from './constants.json';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showDropdown: false,
      showTable: false,
      selectedMonth: '' 
    };
  }

  handleEnterPortalClick = () => {
    this.setState({ showDropdown: true, showTable: false });
  };

  handleMonthSelect = (event) => {
    this.setState({ 
      showTable: false,
      selectedMonth: event.target.value // Update the selected month
    }, () =>{
      
    });

  };

  handleBackClick = () => {
    this.setState({ showDropdown: false, showTable: false });
  };

  render() {
    const { months } = constants;
    const { showDropdown, showTable } = this.state;
    return (
      <div className='App'>
        <h1 className='App-header'>Welcome to the Portal Page</h1>
        <div className='App-body'>
          {!showTable && !showDropdown && (
            <button className='App-button' onClick={this.handleEnterPortalClick}>Enter Portal</button>
          )}

          {showDropdown && (
            <select onChange={this.handleMonthSelect} defaultValue="">
              <option value="" disabled>Select a month</option>
              {months.map((month, index) => (
                <option key={index} value={month}>{month}</option>
              ))}
            </select>
          )}

          {showTable && ( <MealTable month={this.state.selectedMonth} />)}

          {(showDropdown || showTable) && (
            <button onClick={this.handleBackClick}>Back to Previous</button>
          )}
        </div>
      </div>
    );
  }
}

export default App;
