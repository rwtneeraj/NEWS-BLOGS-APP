import { useState } from "react";
import React from "react";
import "./Calender.css";

export default function Calender() {
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const MonthOfYear = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const currentDate = new Date();
  const [currentMonth, setCurrenMonth] = useState(currentDate.getMonth());
  const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  
  const previousMonth = () => {
    setCurrenMonth((prev) => (prev === 0 ? 11 : prev -1));
    setCurrentYear((prev) => (currentMonth === 0? prev -1 : prev));
  }

  const nextMonth = () => {
    setCurrenMonth((prev) => (prev === 11 ? 0 : prev + 1));
    setCurrentYear((prev) => (currentMonth === 11 ? prev + 1 :  prev));
  }
  
  
  return (
    <div className="calender">
      <div className="navigate-date">
        <h2 className="month">{MonthOfYear[currentMonth]}</h2>
        <h2 className="year">{currentYear}</h2>
        <div className="buttons">
          <i className="bx bx-chevron-left" onClick={previousMonth}></i>
          <i className="bx bx-chevron-right" onClick={nextMonth}></i>
        </div>
      </div>

      <div className="weekdays">
        {daysOfWeek.map((day) => {
          return (
            <span key={day} className="">
              {day}
            </span>
          );
        })}
      </div>

      <div className="days">
        {[...Array(firstDayOfMonth).keys()].map((_, index) => {
          return <span key={`empty ${index}`} className=""></span>;
        })}

        {[...Array(daysInMonth).keys()].map((day) => {
          return (
            <span
              key={day + 1}
              className={
                day + 1 === currentDate.getDate() &&
                currentMonth === currentDate.getMonth() &&
                currentYear === currentDate.getFullYear()
                  ? "current-day"
                  : ""
              }
            >
              {day + 1}
            </span>
          );
        })}
      </div>
    </div>
  );
}
