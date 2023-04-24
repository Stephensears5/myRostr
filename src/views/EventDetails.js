import React from 'react';
import { useParams } from 'react-router-dom';
import EventDetail from '../components/events/EventDetail';


const EventDetails = (props) => {
    const params = useParams();
    return(
        <>
        <EventDetail id={params.id}/>
        </>
    )
}

export default EventDetails;