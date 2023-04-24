import NavBar from "./components/NavBar";
import React, { useContext } from "react";
import HomePage from "./views/homepage";
import AuthContext from "./store/auth-context";
import "./css/Homepage.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Events from "./views/Events";
import Banner from "./components/Banner";
import Create from "./views/Create";
import MyEventsPage from "./views/MyEventsPage";
import Find from "./views/Find";
import EventByCategoryPage from "./views/EventByCategoryPage";
import AuthPage from "./views/AuthPage";
// import AdditionalInfo from "./components/login/AdditionalInfo";
import EventDetails from './views/EventDetails';

function App() {
  const authCtx = useContext(AuthContext);

  let isUser;
  if (authCtx.isAuthenticated && !authCtx.isSignUp) {
    isUser = true;
  }

  return (
    <Router>
      <Banner />
      <NavBar />
      <Routes>
        {/* {!authCtx.isAuthenticated && !authCtx.isSignUp && (
          <Route path="/" element={<AuthPage />} />
        )}

        {authCtx.isAuthenticated && authCtx.isSignUp && (
          <Route path="/additional-info" element={<AdditionalInfo />} />
        )}
        {authCtx.isAuthenticated && authCtx.isSignUp && (
          <Route
            path="/"
            element={<Navigate replace to="/additional-info" />}
          />
        )} */}
        <Route path="/" element={<Navigate replace to="/home" />} />
        <Route path="/myRostr" element={<Navigate replace to="/home" />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/events" element={<Events />} />
        <Route path="/create" element={<Create />} />
        <Route path="/find" element={<Find />} />
        <Route path="/myeventspage" element={<MyEventsPage />} />
        <Route path="/myeventspage/:id" element={<EventDetails />} />
        <Route path="/find/:category" element={<EventByCategoryPage />} />
        <Route path="/login" element={<AuthPage/>} />
        <Route path="*" element={<Navigate replace to="/" />} />
        <Route path="/find/:category/:id" element={<EventDetails/>} />
      </Routes>
    </Router>
  );
}

export default App;
