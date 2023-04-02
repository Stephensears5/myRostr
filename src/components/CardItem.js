import React from 'react'
import "../css/Cards.css";
import * as FaIcons from 'react-icons/fa';
import * as IoIcons from 'react-icons/io';
import * as TbIcons from 'react-icons/tb';
import * as GoIcons from 'react-icons/go';
import * as GiIcons from 'react-icons/gi';

const CardItem = (params) => {
    const manifestId = params.iconManifestId;
    let Icon;
    const iconName = params.icon;
    console.log(iconName);
    if(manifestId === 'fa'){
        Icon = FaIcons;
    }
    if(manifestId === 'io'){
        Icon = IoIcons;
    }
    if(manifestId === 'tb'){
        Icon = TbIcons;
    }
    if(manifestId === 'go'){
        Icon = GoIcons;
    }
    if(manifestId === 'gi'){
        Icon = GiIcons;
    }
    console.log(Icon)

  return (
    <a href="javajam/index.html" class="card-hover">
      <div className="card">
        <h4 className="card-title">{params.title}</h4>
        {React.createElement(Icon[iconName], {className: "card-icon" })}
        <p className="card-description">{params.description}</p>
      </div>
    </a>
  );
};

export default CardItem;
