import React from "react";
import { Link } from "react-router-dom";
import "../../css/CardCategory.css";

const EventCategoryItem = (props) => {
  // console.log(props);
  return (
    <li className="card-category">
      <Link to={props.id} style={{textDecoration:'none'}}>
          <p className={"title-category"}>{props.name}</p>
      </Link>
    </li>
  );
};
export default EventCategoryItem;
