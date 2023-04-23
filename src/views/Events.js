import { Link } from "react-router-dom";
import Cards from "../components/Cards";
import '../css/Events.css'

const CardParams = [
  {
    id: 1,
    title: "Football",
    icon: "FaFootballBall",
    iconManifestId: "fa",
    description: "Create an event so that others can join!",
  },
  {
    id: 2,
    title: "Soccer",
    icon: "GiSoccerBall",
    iconManifestId: "gi",
    description: "Search for events in your area!",
  },
];

const Events = () => {
return(
    <div className="background">
      <Cards items={CardParams}/>
    </div>
)
};

export default Events;
