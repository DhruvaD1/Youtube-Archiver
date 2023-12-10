import './App.js';
import React, {useState, useEffect} from "react";
import Axios from 'axios';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
//import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
// import DatePicker from 'react-datepicker'
// import 'react-datepicker/dist/react-datepicker.css';
// npm install react-datepicker was needed in the terminal...

// Calendar Component for picking range
function DateRangePicker() {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
  
    const handleStartDateChange = (date) => {
      setStartDate(date);
    };
  
    const handleEndDateChange = (date) => {
      setEndDate(date);
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      // Handle the form submission, e.g., send data to the server
      // Should replace with a specific backend query req to database
      // like SELECT * FROM Entries WHERE Date < && Date > ...
      console.log('Start Date:', startDate);
      console.log('End Date:', endDate);
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <div>
          {/* Currently disabled React DatePicker Unless Use Needed */}
          {/* <label>Start Date:</label>
          <DatePicker
            selected={startDate}
            onChange={handleStartDateChange}
            dateFormat="MMMM d, yyyy"
            placeholderText="Select start date"
          />

          <label>End Date:</label>
          <DatePicker
            selected={endDate}
            onChange={handleEndDateChange}
            dateFormat="MMMM d, yyyy"
            placeholderText="Select end date"
          /> */}
        </div>
  
        <Button type="submit">Submit</Button>
      </form>
    );
  }

// Overlay screen that handles input options
const TrendOptionsComponent = () => {
    const [isTrendOptionsOpen, setTrendOptionsOpen] = useState(false);

    const openTrendOptions = () => {
      setTrendOptionsOpen(true);
    }
    const closeTrendOptions = () => {
      setTrendOptionsOpen(false);
    }

    return (
      <div>
        <Button onClick={openTrendOptions}>Input Options</Button>

        {isTrendOptionsOpen && (
          <div className = "overlay">
            <div className = "mini-screen">
              <h2> Input Options</h2>
              <DateRangePicker/>
              <h3> Input text here that tests the limits and 
                boundaries of this overlay screen. </h3>
              <Button onClick={closeTrendOptions}>Close</Button>
            </div>
          </div>
        )}
      </div>
    );
  }

  export default TrendOptionsComponent;