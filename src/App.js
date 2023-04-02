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

function App() {
  return (
    <Router>
      <Banner/>
      <NavBar />
      <Routes>
        <Route path="/" element={<Navigate replace to="/home" />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/events" element={<Events/>} />
        {/* <Route path="/create" element={<Create/>} /> */}
        {/* <Route path="/list" element={<List/>} /> */}

      </Routes>
    </Router>
  );
}

export default App;
