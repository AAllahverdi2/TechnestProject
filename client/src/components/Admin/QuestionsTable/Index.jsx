import React, { useState } from 'react'
import './Index.scss'
import { useSelector } from 'react-redux'
import RingLoader from "react-spinners/RingLoader";
import { Pagination } from '@mui/material';
import QuestionsTableItem from '../QuestionsTableItem/Index';
const QuestionsTable = () => {
  const { questions, questionsLoading } = useSelector(state => state.questions)
  const itemsPerPage = 7;
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = questions?.slice(indexOfFirstItem, indexOfLastItem);
  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };
  return (
    <div className='container'>
      <div className="row">
        {
          questionsLoading == true ? <p className='spinnerQuestion'>
            <RingLoader color="#36d7b7" />
          </p> : <div className='col-lg-12 questionTableCol'>
            <div className="questionTableColInside">
              <div className="questionTableColInsideBox">
                <div className="resQuestionTable">
                  <table className='table table-hover' >
                    <thead>
                      <tr>
                        <th>Id</th>
                        <th>Questions Title</th>
                        <th>Questions Content</th>
                        <th>Detail</th>
                        <th>Update</th>
                        <th>Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        currentItems?.map((item, index) => {
                          return <QuestionsTableItem key={index} index={indexOfFirstItem + index} item={item} />
                        })
                      }
                    </tbody>
                  </table>

                  <div className="questionPagination" style={{ display: questions.length > 7 ? "" : "none" }}>
                    <Pagination
                      count={Math.ceil(questions.length / itemsPerPage)}
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

export default QuestionsTable
