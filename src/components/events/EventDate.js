import './EventDate.css'
import React from 'react'
const EventDate = (props) => {
    const date = new Date(props.date);
    const month = date.getMonth() + 1;
    const monthName = getMonthName(month);
    const day = date.getDate();
    const year = date.getFullYear();


    function getMonthName(monthNumber) {
        const date = new Date();
        date.setMonth(monthNumber - 1);
      
        return date.toLocaleString('en-US', { month: 'long' });
      }

    return (
        <div className="event-date">
            <div className="event-date__month">{monthName}</div>
            <div className="event-date__day">{day}</div>
            <div className="event-date__year">{year}</div>  
        </div>
    );
}
export default EventDate;