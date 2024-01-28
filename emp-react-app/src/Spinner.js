import React from 'react';
import './App.css';

const Spinner = () => {
  return (
    <div>
         <div className="spinner">
            <div></div> {/* Inner spinner element */}
        </div>
        <div>Loading...</div>
    </div>
  );
};

export default Spinner;
