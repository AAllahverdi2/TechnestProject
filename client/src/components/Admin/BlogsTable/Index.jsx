import React, { useState } from 'react'
import './Index.scss'
import { useSelector } from 'react-redux'
import RingLoader from "react-spinners/RingLoader";
import { Pagination } from '@mui/material';
import OrderTableItem from '../OrderTableItem/Index';
import BlogTableItem from '../BlogTableItem/Index';

const BlogsTable = () => {
  const { blogs, loading } = useSelector(state => state.blogs)
  const itemsPerPage = 7;
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = blogs?.slice(indexOfFirstItem, indexOfLastItem);
  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };
  return (
    <div className='container'>
      <div className="row">
        {
          loading == true ? <p className='orderSpinner'>
            <RingLoader color="#36d7b7" />
          </p> : <div className='col-lg-12 orderTableCol'>
            <div className="orderTableColInside">
              <div className="orderTableColInsideBox">
                <div className="resOrderTable">
                  <table className='table table-hover' >
                    <thead>
                      <tr>
                        <th>Id</th>
                        <th>Blog Image</th>
                        <th>Blog Title</th>
                        <th>Poster User Title</th>
                        <th>Watchers</th>
                        <th>Created At</th>
                        <th>Info</th>
                        <th>Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        currentItems?.map((item, index) => {
                          return <BlogTableItem key={index} index={indexOfFirstItem + index} item={item} />
                        })
                      }
                    </tbody>
                  </table>


                </div>
                <div className="orderPagination" style={{ display: blogs.length > 7 ? "" : "none" }}>
                  <Pagination
                    count={Math.ceil(blogs.length / itemsPerPage)}
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

export default BlogsTable
