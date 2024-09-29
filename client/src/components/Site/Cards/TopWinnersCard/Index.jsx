import React from 'react'
import './Index.scss'
import winner1 from '../../../../assets/winner1.png'
const TopWinnersCard = ({ item }) => {
  return (
    <div className='topWinnerCard'>
      <div className="topWinnerCardTop">
        <div className="winnerImageBox">
          <img src={`http://localhost:5050/public/${item.winnerImage}`} alt='winner1' />
        </div>
      </div>
      <div className="topWinnerCardBottom">
        <h5>
          {item.winnerTitle}
        </h5>
      </div>
    </div>
  )
}

export default TopWinnersCard
