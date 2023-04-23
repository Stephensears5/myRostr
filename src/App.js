import NavBar from "./components/NavBar";
import HomePage from "./views/homepage";
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
import MyEventsPage from './views/MyEventsPage';
import Find from './views/Find';

function App() {
  return (
    <Router>
      <Banner/>
      <NavBar />
      <Routes>
        <Route path="/" element={<Navigate replace to="/home" />} />
        <Route path="/myRostr" element={<Navigate replace to="/home" />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/events" element={<Events/>} />
        <Route path="/create" element={<Create/>} />
        <Route path="/find" element={<Find/>} />
        <Route path="/myeventspage" element={<MyEventsPage/>}/>

      </Routes>
    </Router>
  );
}

export default App;
