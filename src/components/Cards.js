import CardItem from "./CardItem";
import '../css/Cards.css';

const Cards = (CardParams) => {
    CardParams.items.map(x => console.log(x))
    const cards = CardParams.items.map(x=>{return <CardItem title={x.title} icon={x.icon} iconManifestId={x.iconManifestId} description={x.description} />})
  return (
    <div className="container">
      {cards}
    </div>
  );
};

export default Cards;
