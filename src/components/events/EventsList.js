import React from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import EventItem from "./EventItem";

const EventsList = (props) => {
    const content = props.items.map((x) => {
        console.log(props.items);
        return (
          
            <Link to={x.id}>
            <EventItem
              creatorToken={x.subId}
              creatorName={x.subProfileName}
              attendees={x.attendees}
              title={x.title}
              date={x.date}
              location={x.location}
              time={x.time}
              eventType={x.eventType}
              id={x.id}
            />
          </Link>
        );
      });

  return (
    <>
     <ul className="events-list">{content}</ul>
     <p style={{color: "white"}}>click <Link to={'/createeventpage'}>here</Link> to create another event</p>
    </>
      

  );
}
export default EventsList;