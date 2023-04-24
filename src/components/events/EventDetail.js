import React, { useState, useEffect } from "react";
import useHttpEvent from "../../hooks/event-http";
import "./EventDetail.css";
import { Navigate, useNavigate } from "react-router-dom";
import * as ioIcons from "react-icons/io";

const EventDetail = (props) => {
  const [events, setEvents] = useState([]);
  const [numAttendees, setNumAttendees] = useState(1);
  const { isLoading, error, sendRequest: getHttpEvent } = useHttpEvent();
  let url = "https://group-15dfe-default-rtdb.firebaseio.com/events";
  const method = "GET";
  const id = props.id;
  const navigate = useNavigate();

  url = url + `/${id}.json`;

  console.log(url);

  useEffect(() => {
    const transformEvents = (eventsObj) => {
      const loadedEvents = [eventsObj];
      const countAttendees = loadedEvents[0].attendees.length;
      console.log(loadedEvents);
      setEvents(loadedEvents);
      setNumAttendees(countAttendees);
    };
    getHttpEvent(
      {
        url: url,
        method: method,
      },
      transformEvents
    );
  }, [getHttpEvent]);

  const backPageHandler = () => {
    navigate(-1)
  }
  console.log(events);
  const content = events.map((x) => {
    return (
      <div className="page">
        <ioIcons.IoMdArrowRoundBack className="back-arrow" onClick={backPageHandler}/>
        <div className="details-container" key={x.id}>
          <div id="details-event">
            <h1>{x.title}</h1>
            <h3>created by: {x.subProfileName}</h3>
            <label>Number Attending: {numAttendees}</label>
            <label>Location: {x.location}</label>
            <label>Event Type: {x.eventType}</label>
            <label> Date and Time: {x.date} {x.time}</label>
          </div>
        </div>
      </div>
    );
  });

  return <div className="centered">{content}</div>;
};

export default EventDetail;
