import React from 'react'
import './Index.scss'
import { FaStar } from "react-icons/fa";
import comment from '../../../../assets/comment.png'
import { useSelector } from 'react-redux';
const OwlCaruselCard = ({ item }) => {
    return (
        <div className='owlCard'>
            <div className="owlCardInside">
                <ul className="owlStars d-flex">
                    <li>
                        <FaStar />
                    </li>
                    <li>
                        <FaStar />
                    </li>
                    <li>
                        <FaStar />
                    </li>
                    <li>
                        <FaStar />
                    </li>
                    <li>
                        <FaStar />
                    </li>
                </ul>
                <h5>
                    {item.testimonialTitle}
                </h5>
                <p>
                    {item.description}
                </p>
                <div className="owlCardInsideBottom">
                    <div className="owlCardInsideBottomLeft">
                        <img src={`http://localhost:5050/public/${item.userImage}`} alt="comment" />
                    </div>
                    <div className="owlCardInsideBottomRight">
                        <h5>
                            {item.userTitle}                        </h5>
                        <p>{item.userProfession}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OwlCaruselCard
