import React, { useState } from 'react';
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom';

const Example = (props) => {
  const [dropdownOpen, setOpen] = useState(false);
  const links = [
    {
      "name": "Sales & clearance",
      "submenu": [
        {
          "name": "Women's offers",
          "subcat": ["20% OFF Dresses", "20-55% Off Micheal Kors"]
        },
        {
          "name": "Men's offer",
          "subcat": ["65-85% Off Men's Suiting Event", "25-55% Off Michael Kors"]
        },
      ]

    },
    {
      "name": "Women"

    },
    {
      "name": "Men"

    },
    {
      "name": "Kids & baby"

    },

  ]


  const toggle = () => setOpen(!dropdownOpen);

  return (

    <div className="dropdown">

      <button className="dropbtn"> SHOP BY DEPARTMENT <FontAwesomeIcon icon={faCaretDown} /></button>
      <div className="dropdown-content"> {links.map(link => (link.submenu ? <a href="#" className="dropdownLinks hover-3 ">{link.name}<div className="dropdown-content2"><a href="#">{link.submenu.name}</a></div></a>
        : <a href="#" className="dropdownLinks hover-3 ">{link.name}</a>))
      }

      </div>



    </div>
  );
}

export default Example;