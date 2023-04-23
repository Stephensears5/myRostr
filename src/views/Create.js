import React, { useContext, useRef, useState } from "react";
// import "../App.css";
import useHttpEvent from "../hooks/event-http";
import '../css/CreateEventPage.css';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
// import 'react-dropdown/style.css';
import AuthContext from "../store/auth-context";
import useInput from '../hooks/use-input.js';

const validateText = (text) => {
  return text !== '';
}

const Create = () => {
    const [startDate, setStartDate] = useState(new Date());
    const [success, setSuccess] = useState(false);
    const [selection, setSelection] = useState(false);
    const {isLoading, error, sendRequest: postHttpEvent} = useHttpEvent()
    const authCtx = useContext(AuthContext);
    const url = "https://group-15dfe-default-rtdb.firebaseio.com//events.json";
    const method = "POST";
    const navigate = useNavigate();
    let formIsValid = false;
  
    const titleRef = useRef();
    const eventRef = useRef();
    const dateRef = useRef();
    const timeRef = useRef();
    const locationRef = useRef();
  
    let userID = authCtx.userId;
    if(userID === undefined){
      userID = localStorage.getItem('userId');
    }
    const submitterProfileName = authCtx.userEmail;
  
    const day = startDate.getDate();
    const month = startDate.getMonth();
    const year = startDate.getFullYear();
  
    const {
      value: titleValue,
      isValid: titleIsValid,
      hasError: titleHasError,
      valueChangeHandler: titleChangeHandler,
      inputBlurHandler: titleBlurHandler,
      reset: titleReset
  } = useInput(validateText);
  const {
      value: locationValue,
      isValid: locationIsValid,
      hasError: locationHasError,
      valueChangeHandler: locationChangeHandler,
      inputBlurHandler: locationBlurHandler,
      reset: locationReset
  } = useInput(validateText);
  
  if (titleIsValid && locationIsValid) {
      formIsValid = true;
  };
  
    const onFormSubmit = async (event) => {
      event.preventDefault();
      if(!formIsValid){
        alert("there were errors with your inputs that need to be fixed before we can create an event.")
        return;
      }
      const eTitle = titleRef.current.value;
      const eEventType = eventRef.current.value;
      const eDate = `${month+1}/${day}/${year}`;
      const eTime = timeRef.current.value;
      const eLocation = locationRef.current.value;
      
  
      const bodyArray = {
        subId: userID, 
        subProfileName: submitterProfileName,
        title: eTitle,
        eventType: eEventType,
        date: eDate,
        time: eTime, 
        location: eLocation,
        attendees: [userID],
      }
  
      console.log(bodyArray);
      postHttpEvent({
        url: url,
        method: method,
        body: bodyArray,
      }
      )
        titleRef.current.value = "";
        eventRef.current.value = "";
        dateRef.current.value = "";
        timeRef.current.value = "";
        locationRef.current.value = "";
  
        setSuccess(true);
    };
  
    const onClickHandler = () => {
      setSuccess(false);
      navigate("/myeventspage")
    }
  
      let titleStyle = titleHasError ? {top: '-5px', color: 'red'} : {};
      let titleError = titleHasError ? 'Title is invalid' : '';
      let locationStyle = locationHasError ? {top: '-5px', color: 'red'} : {};
      let locationError = locationHasError ? 'Location is invalid' : '';
return(
    <div className="createcontainer" style={{overflow: "auto"}}>
    {!error && !success &&
      <form id="event" onSubmit={onFormSubmit}>
        <h1>Create Event</h1>
        <label style={titleStyle}>Title:</label>
        <input type="text" ref={titleRef} onChange={titleChangeHandler} onBlur={titleBlurHandler}/>
        <span style={{color: 'red'}}>{titleError}</span>
        <label>Event Type:</label>
        <select className="dropdown" ref={eventRef}>
          <option value="Football">Football</option>
          <option value="Soccer">Soccer</option>
          <option value="Skiing">Skiing</option>
          <option value="Gym">Gym</option>
        </select>
        <label>Date:</label>
        <DatePicker minDate={new Date()} selected={startDate} ref={dateRef} onChange={(date) => setStartDate(date)}/>
        <label>Time:</label>
        <input type="time" ref={timeRef} defaultValue="10:00"/>
        <label style={locationStyle}>Location:</label>
        <input type="text" ref={locationRef}  onChange={locationChangeHandler} onBlur={locationBlurHandler}/>
        <span style={{color: 'red'}}>{locationError}</span>
        <button type="submit" id="event-submit" className={"submitButton"}>Create Event</button>
      </form>
    } 
      {error && <p>There was an Error submitting your request {error}</p>}
      {!error && success && <div id="event"><h3>Your Event Was Successfully Created!</h3><button type="button" id="event-submit" className={"submitButton"} onClick={onClickHandler}>OK</button></div>}
    </div>
)
}

export default Create;