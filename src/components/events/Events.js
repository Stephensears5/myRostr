import Card from "../UI/Card";
import "../../css/EventsPage.css";
import React, { useState } from "react";
import EventsList from "./EventsList";
import { Link } from "react-router-dom";

const Events = (props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = props.items.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(props.items.length / itemsPerPage);

  const handleClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <Card className="card-events">
      <EventsList items={currentItems} />
      <div className="pagination">
        {Array.from({ length: totalPages }).map((_, i) => (
          <button key={i} onClick={() => handleClick(i + 1)} className="pagination-buttons">
            {i + 1}
          </button>
        ))}
      </div>
      <p style={{color: "white"}} className="event-paragraph">click<Link to={'/create'}> here </Link>to create another event</p>
    </Card>
  );
};

export default Events;


// import Card from "../UI/Card";
// import "../../css/EventsPage.css";
// import React from "react";
// import EventsList from "./EventsList";

// const Events = (props) => {
//   return (
//     <Card className="card-events">
//       <EventsList items={props.items}/>
//     </Card>
//   );
// };
// export default Events;
