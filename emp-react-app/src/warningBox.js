import React, { useState } from 'react';


const WarningBox = ({ text, popupText }) => {
  const [showPopup, setShowPopup] = useState(false);

  const handleOpenPopup = () => setShowPopup(true);
  const handleClosePopup = () => setShowPopup(false);

  return (
    <div className="warning-box">
      <p>{text}</p>
      {popupText && (
        <p>
          <a href="#" onClick={handleOpenPopup}>See More</a>
        </p>
      )}

      {showPopup && (
        <div className="popup-box">
          <div className="popup-content">
            <p>{popupText}</p>
            <button onClick={handleClosePopup}>OK</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default WarningBox;
