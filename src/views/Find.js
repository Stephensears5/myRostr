import React from 'react'
// import "../App.css";
import "../css/FindEventPage.css";
import EventCategories from '../components/events/EventCategories';

const Find = () => {
  return (
    <div className="page">
      <h1 className="h1">Find Event Page</h1>
    <EventCategories />
    </div>
  )
}

export default Find;