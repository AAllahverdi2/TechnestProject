import React, { useState } from 'react'
import './Index.scss'
import { useSelector } from 'react-redux'
import RingLoader from "react-spinners/RingLoader";
import TestimonialsTableItem from '../TestimonialsTableItem/Index'
import { Pagination } from '@mui/material';
const TestimonialsTable = () => {
  const { testimonial, loading } = useSelector(state => state.testimonial)
  const itemsPerPage = 7;
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = testimonial?.slice(indexOfFirstItem, indexOfLastItem);
  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };
  return (
    <div className='container'>
      <div className="row">
        {
          loading == true ? <p className='spinnerTestimonail'>
            <RingLoader color="#36d7b7" />
          </p> : <div className='col-lg-12 testimonailsTableCol'>
            <div className="testimonailsTableColInside">
              <div className="testimonailsTableColInsideBox">
                <div className="resTestimonialTable">
                  <table className='table table-hover' >
                    <thead>
                      <tr>
                        <th>Id</th>
                        <th>Image</th>
                        <th>User Title</th>
                        <th>Testimonial Title</th>
                        <th>Detail</th>
                        <th>Update</th>
                        <th>Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        currentItems?.map((item, index) => {
                          return <TestimonialsTableItem key={index} index={indexOfFirstItem + index} item={item} />
                        })
                      }
                    </tbody>
                  </table>

                
                </div>
                <div className="testimonialPagination" style={{ display: testimonial.length > 7 ? "" : "none" }}>
                    <Pagination
                      count={Math.ceil(testimonial.length / itemsPerPage)}
                      page={currentPage}
                      onChange={handlePageChange}
                      color="primary" />
                  </div>
              </div>
            </div>
          </div>
        }

      </div>
    </div>
  )
}

export default TestimonialsTable
