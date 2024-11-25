import React from 'react';
import '../../cssss/Home_css/Leftside.css';
const ApplicationBanner = () => {
  return (
    <div className="application-banner">
      <div className="content-container">
        <h3>Applications for</h3>
        <h1>BE/ BTech Programs 2024</h1>
        <p className="now-open">NOW OPEN</p>
        <button className="apply-btn" >APPLY NOW</button>
        <p className="subtext">Apply on the basis of 10+2 PCB/ NEET Scores</p>
        <div className="discover-section">
          <h3>DISCOVER</h3>
          <h2 className="countless-possibilities">Countless Possibilities</h2>
          <div className="color-dots">
            <span className="dot" style={{ backgroundColor: '#F44336' }}></span>
            <span className="dot" style={{ backgroundColor: '#FF9800' }}></span>
            <span className="dot" style={{ backgroundColor: '#FFEB3B' }}></span>
            <span className="dot" style={{ backgroundColor: '#4CAF50' }}></span>
            <span className="dot" style={{ backgroundColor: '#00BCD4' }}></span>
            <span className="dot" style={{ backgroundColor: '#9C27B0' }}></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationBanner;
