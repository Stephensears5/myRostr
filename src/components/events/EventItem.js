import Card from "../UI/Card";
import EventDate from "./EventDate";
import React, { useContext, useEffect, useState } from "react";
import "./EventItem.css";
// import "../navbar/NavBar.css";
import useHttpEvent from "../../hooks/event-http";
import * as BsIcons from "react-icons/bs";
import AuthContext from "../../store/auth-context";

const EventItem = (props) => {
  const authCtx = useContext(AuthContext);
  const [isCreator, setIsCreator] = useState(false);
  const [itemDeleted, setItemDeleted] = useState(false);
  const [isAttending, setIsAttending] = useState(false);
  const { isLoading, error, sendRequest: httpEvent } = useHttpEvent();
  let userID = authCtx.userId;
  if (userID === undefined) {
    userID = localStorage.getItem("userId");
  }

  const signUpHandler = (event) => {
    event.preventDefault();
    console.log("signupClicked");
    const url = "https://group-15dfe-default-rtdb.firebaseio.com/events";
    const method = "UPDATE";
    const id = props.id;
    httpEvent({
      url: url,
      method: method,
      id: id,
      signUpAuthToken: userID,
    });
    setIsAttending(!isAttending);
  };

  const deleteHandler = (event) => {
    event.preventDefault();
    const url = "https://group-15dfe-default-rtdb.firebaseio.com/events";
    const method = "DELETE";
    const id = props.id;
    httpEvent({
      url: url,
      method: method,
      id: id,
    });
    setItemDeleted(true);
  };
  useEffect(() => {
    if (userID === props.creatorToken) {
      setIsCreator(true);
    } else {
      setIsCreator(false);
    }
    console.log(props);
    const attending = props.attendees;
    console.log(attending);
    if (attending.includes(userID)) {
      console.log(attending);
      setIsAttending(true);
    }
  }, [deleteHandler, signUpHandler]);

  return (
    <div>
      {!itemDeleted && (
        <li key={props.id}>
          <Card className="event-item">
            <EventDate date={props.date} />
            <div className="event-item__description">
              <div className="event-item__event">{props.eventType}</div>
              <div className="event-item__type">{props.title}</div>
              {isCreator && (
                <div className="event-deleteitem">
                  <button className={"delete-button"} onClick={deleteHandler}>
                    Delete
                  </button>
                </div>
              )}
              {!isCreator && !error && !isAttending && (
                <div className="event-notsignupcheck" title="click to sign up">
                  <BsIcons.BsCheckCircle
                    className="notsignup-check"
                    onClick={signUpHandler}
                  >
                    Sign-up
                  </BsIcons.BsCheckCircle>
                </div>
              )}
              {!isCreator && error && isAttending && <p>Already Signed Up.</p>}
              {isAttending && !error && !isCreator && (
                <div className="event-signupCheck" title="click to remove your sign up">
                  <BsIcons.BsCheckCircleFill
                    onClick={signUpHandler}
                    className="signup-check"
                  />
                </div>
              )}
            </div>
          </Card>
        </li>
      )}
    </div>
  );
};

export default EventItem;
