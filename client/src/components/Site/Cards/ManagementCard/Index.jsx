import React from 'react'
import './Index.scss'
import managment from '../../../../assets/managment.png'
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import { FaTwitter } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";

const ManagementCard = ({ item }) => {
  return (
    <div className='managementCard'>
      <div className="managementCardTop">
        <img src={`http://localhost:5050/public/${item.managementImage}`} alt="managment" />
      </div>
      <div className="managementCardBottom">
        <h5>
          {item.managementTitle}
        </h5>
        <span>
          {item.managementProfession}

        </span>
        <p>
          {item.managementContent}
        </p>
      </div>
      <div className="managementCardHover">
        <div className="managementCardHoverInside">
          <h5>
            {item.managementTitle}

          </h5>
          <span>
            {item.managementProfession}


          </span>
          <p>
            {item.managementContent}

          </p>
          <ul className="socialCard">
            <li style={{ display: item.managementFacebook == '' ? "none" : "" }} className='cardFb'><a href={item.managementFacebook}><FaFacebookF /></a></li>
            <li style={{ display: item.managementInstagram == '' ? "none" : "" }} className='cardIns'><a href={item.managementInstagram}><FaInstagram /></a></li>
            <li style={{ display: item.managementTwitter == '' ? "none" : "" }} className='cardTw'><a href={item.managementTwitter}><FaTwitter /></a></li>
            <li style={{ display: item.managementLinkedin == '' ? "none" : "" }} className='cardLn'><a href={item.managementLinkedin}><FaLinkedinIn /></a></li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default ManagementCard
