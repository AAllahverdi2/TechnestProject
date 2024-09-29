import React, { useState } from 'react'
import './Index.scss'
import { useSelector } from 'react-redux'
import RingLoader from "react-spinners/RingLoader";
import { Pagination } from '@mui/material';
import WinnerTableItem from '../WinnerTableItem/Index';
const WinnerTable = () => {
  const { winners, winnerLoading } = useSelector(state => state.winners)
  const itemsPerPage = 7;
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = winners?.slice(indexOfFirstItem, indexOfLastItem);
  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };
  return (
    <div className='container'>
      <div className="row">
        {
          winnerLoading == true ? <p className='spinnerWinner'>
            <RingLoader color="#36d7b7" />
          </p> : <div className='col-lg-12 winnerCol'>
            <div className="winnerColInside">
              <div className="winnerColInsideBox">
                <div className="resWinnerTable">
                  <table className='table table-hover' >
                    <thead>
                      <tr>
                        <th>Id</th>
                        <th>Winner Image</th>
                        <th>Winner Title</th>
                        <th>Detail</th>
                        <th>Update</th>
                        <th>Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        currentItems?.map((item, index) => {
                          return <WinnerTableItem key={index} index={indexOfFirstItem + index} item={item} />
                        })
                      }
                    </tbody>
                  </table>

                  <div className="winnerPagination" style={{ display: winners.length > 7 ? "" : "none" }}>
                    <Pagination
                      count={Math.ceil(winners.length / itemsPerPage)}
                      page={currentPage}
                      onChange={handlePageChange}
                      color="primary" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        }

      </div>
    </div>
  )
}

export default WinnerTable
