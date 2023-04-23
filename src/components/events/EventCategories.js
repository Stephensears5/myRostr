import React, { useState, useEffect } from "react";
import useHttpEvent from "../../hooks/event-http";
import EventCategoryItem from "./EventCategoryItem";
import "../../css/CardCategory.css";
import "../../css/FindEventPage.css";


const EventCategories = (props) => {
    const [events, setEvents] = useState();
    const {isLoading, error, sendRequest: getHttpEvent} = useHttpEvent();
    const url = "https://group-15dfe-default-rtdb.firebaseio.com/categories.json";
    const method = "GET";
    const body = "";
    

    useEffect(() => {
        const transformEvents = (eventsObj) => {
          const loadedEvents = [];
    
          for(const eventsKey in eventsObj){
              loadedEvents.push({
                id: eventsKey, 
                name: eventsObj[eventsKey].name, 
                img: eventsObj[eventsKey].img, 
              })
          }
          setEvents(loadedEvents);
      }
        getHttpEvent(
          {
            url: url,
            method: method,
            body: body,
          },
          transformEvents
        );
      }, [getHttpEvent]);

    let content;
    if(events){
     content = events.map(x => {return <EventCategoryItem id={x.id} img={x.img} name={x.name} key={x.id}/>}) 
    }else{
      content = <p>Loading...</p>
    }
    

    return  (
    <div className="container-category">{content}</div>
    )
}
export default EventCategories;