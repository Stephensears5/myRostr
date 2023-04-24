import React, { useEffect, useState } from "react";
// import "../App.css";
import Events from "../components/events/Events";
import * as ioIcons from "react-icons/io";
import useHttpEvent from "../hooks/event-http";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../css/EventsPage.css";


const EventByCategoryPage = () => {
  const [events, setEvents] = useState([]);
  const [containsData, setContainsData] = useState(true);
  const {isLoading, error, sendRequest: getHttpEvent} = useHttpEvent();
  const params = useParams();
  const navigate = useNavigate();
  const url = "https://group-15dfe-default-rtdb.firebaseio.com/events.json";
  const method = "GET";
  const body = ``;

  useEffect(() => {
    const transformEvents = (eventsObj) => {
      const loadedEvents = [];

      for(const eventsKey in eventsObj){
        // console.log("test", eventsObj[eventsKey].eventType.toLowerCase(), params.category);
        if(eventsObj[eventsKey].eventType.toLowerCase()  === params.category){
          loadedEvents.push({
            id: eventsKey,
            attendees: eventsObj[eventsKey].attendees,
            subId: eventsObj[eventsKey].subId,
            subProfileName: eventsObj[eventsKey].subProfileName, 
            title: eventsObj[eventsKey].title, 
            date: eventsObj[eventsKey].date, 
            eventType: eventsObj[eventsKey].eventType,
            location: eventsObj[eventsKey].location,
            time: eventsObj[eventsKey].time,
          })
        }
      }

      if(loadedEvents.length <= 0){
        setContainsData(false);
      }
      
      setEvents(loadedEvents);
  }
    getHttpEvent(
      {
        url: url,
        method: method,
        body: body,
        params: params,
      },
      transformEvents
    );

    
  }, [getHttpEvent]);

  const backPageHandler = () => {
    navigate(-1)
  }

  return (
    <div className="page">
      <ioIcons.IoMdArrowRoundBack className="back-arrow" onClick={backPageHandler}/>\
      <div>
      <h1 className="h1">{params.category} events</h1>
        {containsData && isLoading && !error && <p>Loading...</p>}
        {containsData && !isLoading && error && <p>{error}</p>}
        {containsData && !isLoading && !error && <Events items={events} />}
        {!containsData && <p>No events were found. Create one by clicking <Link to={'/createeventpage'}>here</Link></p>}
      </div>
    </div>
  );
};

export default EventByCategoryPage;
