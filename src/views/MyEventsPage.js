import React, { useEffect, useState, useContext } from "react";
 import "../css/EventsPage.css";
import Events from "../components/events/Events";
import useHttpEvent from "../hooks/event-http";
import { Link } from "react-router-dom";
import AuthContext from "../store/auth-context";

const MyEventsPage = () => {
  const [events, setEvents] = useState([]);
  const {isLoading, error, sendRequest: getHttpEvent} = useHttpEvent();
  const url = "https://group-15dfe-default-rtdb.firebaseio.com/events.json";
  const method = "GET";
  const body = "";
  const authCtx = useContext(AuthContext);
  let userID = authCtx.userId;
  if(userID === undefined){
    userID = localStorage.getItem('userId');
  }
  


  useEffect(() => {
    const transformEvents = (eventsObj) => {
      const loadedEvents = [];
      for(const eventsKey in eventsObj){
        console.log(eventsObj[eventsKey].subId)
        if(eventsObj[eventsKey].subId === userID){
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
        }else{
          console.log(eventsObj[eventsKey].attendees.includes(userID))
          if(eventsObj[eventsKey].attendees.includes(userID)){
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
      setEvents(loadedEvents);
  }
}
    getHttpEvent(
      {
        url: url,
        method: method,
        body: body,
      },
      transformEvents
    );

    console.log(events);

    
  }, [getHttpEvent]);


if(events.length > 0){
  return (
    <div class="page">
      <div>
        <h1 class="h1">My Events</h1>
        {isLoading && !error && <p>Loading...</p>}
        {!isLoading && error && <p>{error}</p>}
        {!isLoading && !error && <Events items={events} />}
      </div>
    </div>
  );
}else{
  return(
  <div class="page">
    <h1 class="h1">My Events</h1>
    <p>No Events could be found... Please click <Link to={'/createeventpage'}>here</Link> to create an event.</p>
  </div>
  )
}

 
};

export default MyEventsPage;
