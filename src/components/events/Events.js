import Card from "../UI/Card";
import "./Events.css";
import React from "react";
import EventsList from "./EventsList";

const Events = (props) => {
  return (
    <Card className="events">
      <EventsList items={props.items}/>
    </Card>
  );
};
export default Events;
