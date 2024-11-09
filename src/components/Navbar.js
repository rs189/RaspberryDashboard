import './Navbar.css';
import React, { useState, useEffect } from 'react';

const Navbar = () => {
  const [time, setTime] = useState({ hours: "00", minutes: "00" });
  const [day, setDay] = useState("Monday");
  const [date, setDate] = useState("January 1 2024");
  
  useEffect(() => {
    const updateClock = () => {
      var currentTime = new Date();
      var hours = currentTime.getHours();
      var minutes = currentTime.getMinutes();

      if (hours < 10) hours = "0" + hours;
      if (minutes < 10) minutes = "0" + minutes;

      var dayIndex = currentTime.getDay();
      var dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      var dayName = dayNames[dayIndex];
    
      var dateValue = currentTime.getDate();

      var monthIndex = currentTime.getMonth();
      var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      var monthName = monthNames[monthIndex];
    
      var year = currentTime.getFullYear();

      setTime({ hours, minutes });
      setDay(dayName);
      setDate(`${monthName} ${dateValue} ${year}`);
    };

    updateClock();

    const intervalId = setInterval(updateClock, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const [className, setClassName] = useState('navbar navbar-expand-lg navbar-dark bg-dark fixed-top');

  useEffect(() => {
    fetch('/config.json')
      .then(response => response.json())
      .then(data => {
        if (data.blurEnabled) {
          setClassName(prevClassName => `${prevClassName} navbar-blur`);
        }
      })
      .catch(error => console.error("Error loading config:", error));
  }, []);

  return (
    <nav className={className}>
      <ul className="nav-center mr-auto">   
      </ul>
      <div className="row">
      <span className="navbarDate pull-right">{day}</span>
        <div className="w-25"></div>
        <span className="navbarDate float-right">{date}</span>
      </div>
      <span className="navbarClock">
      <span>{time.hours}:{time.minutes}</span>
      </span>
    </nav>
  );
}

export default Navbar;
