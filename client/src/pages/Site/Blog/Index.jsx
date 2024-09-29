import React, { useState } from 'react'
import { Helmet } from 'react-helmet'
import BlogHeroSection from '../../../components/Site/BlogHeroSection/Index'
import './Index.scss'
import calender from '../../../assets/calender.png'
import { Link } from 'react-router-dom'
import { IoIosArrowForward } from "react-icons/io";
import BlogSecondCol from '../../../components/Site/BlogSecondCol/Index'
import { useDispatch, useSelector } from 'react-redux'
import { deleteBlog, getOneBlog, updateBlogWatchers } from '../../../redux/slices/blogSlice'
import moment from 'moment'
import Pagination from '@mui/material/Pagination';
import { Stack } from '@mui/material'
import { mdiDelete, mdiDeleteEmpty, mdiFileEdit } from '@mdi/js'
import Icon from '@mdi/react'
import { useDataContext } from '../../../context/context'
import { getAllBlogsComment } from '../../../redux/slices/commentSlice'
import { useTranslation } from 'react-i18next'
const Blog = () => {
  const dispatch = useDispatch()
  const { handleOpenBlogEdit } = useDataContext()
  const { blogs } = useSelector(state => state.blogs)
  const itemsPerPage = 3;
  const [currentPage, setCurrentPage] = useState(1);
  const { userToken } = useSelector(state => state.users)
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = blogs?.slice(indexOfFirstItem, indexOfLastItem);
  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };
  const { t } = useTranslation()

  return (
    <main>
      <Helmet>
        <title>Blog</title>
      </Helmet>
      <BlogHeroSection />

      <section className='blogBottom'>
        <div className="container">
          <div className="blogBottomInside">
            <div className='row justify-content-center'>
              <div className='col-xl-8 col-lg-10'>
                <div className="blogFirstCol mb-2 ">
                  {
                    currentItems?.map((item, index) => {
                      return <div key={index} className="blogFirstColItem">
                        <div className="blogFirstColItemTop">
                          <img src={`http://localhost:5050/public/${item.blogImage}`} alt="" />
                        </div>
                        <div className="blogFirstColItemBottom">
                          <div className="blogButtonBox">
                            <button style={{ display: userToken && userToken?.id == item.posterId ? '' : 'none' }} onClick={() => {
                              dispatch(deleteBlog(item._id))
                            }} className='blogDeleteBtn' >
                              <span className='testimonialFirstDelete'>
                                <Icon path={mdiDelete} size={1} />
                              </span>
                              <span className='testimonialSecondDelete'>
                                <Icon path={mdiDeleteEmpty} size={1} />

                              </span>
                            </button>
                            <button onClick={async () => {
                              await dispatch(getOneBlog(item._id))
                              handleOpenBlogEdit()
                            }} className="editBlogBtn" style={{ display: userToken && userToken?.id == item.posterId ? '' : 'none' }}>
                              <Icon path={mdiFileEdit} size={1} />

                            </button>
                          </div>
                          <ul className="posterInfo">
                            <li>
                              <div className="posterInfoImage">
                                <img src={`http://localhost:5050/public/${item.posterImage}`} alt="" />
                              </div>
                              <span className="posterInfoContent">
                                {item.posterName}
                              </span>
                            </li>
                            <li>
                              <div className="posterInfoImage2">
                                <img src={calender} alt="" />
                              </div>
                              <span className="posterInfoContent">
                                {moment(item.createdAt).format('MMMM D, YYYY')}
                              </span>
                            </li>
                          </ul>
                          <h4>
                            <Link to={`/blog/${item._id}`} onClick={async () => {
                              await dispatch(updateBlogWatchers(item._id))
                              await dispatch(getOneBlog(item._id))
                              await dispatch(getAllBlogsComment(item._id))

                              window.scroll({
                                top: 0,
                                left: 0,
                                behavior: 'smooth'
                              });
                            }} >

                              {item?.blogTitle}
                            </Link>
                          </h4>
                          <p>

                            {item.blogSmallContent}
                          </p>
                          <Link className=' readMoreLink d-flex align-items-center' to={`/blog/${item._id}`} onClick={async () => {
                            await dispatch(updateBlogWatchers(item._id))
                            await dispatch(getOneBlog(item._id))
                            await dispatch(getAllBlogsComment(item._id))
                            window.scroll({
                              top: 0,
                              left: 0,
                              behavior: 'smooth'
                            });
                          }} >

                            <span>
                              Read More
                            </span>
                            <div className="readMoreIc">
                              <IoIosArrowForward />
                            </div>
                          </Link>
                        </div>

                      </div>
                    })
                  }
                </div>
                <div style={{ display: blogs.length > 3 ? '' : "none" }} className="blogSecondCol23">
                  <Stack spacing={2}>
                    <Pagination
                      count={Math.ceil(blogs.length / itemsPerPage)}
                      page={currentPage}
                      onChange={handlePageChange}
                      variant="outlined"
                      shape="rounded"

                    />
                  </Stack>
                </div>
              </div>
              <div className='col-xl-4 col-lg-8'>
                <BlogSecondCol />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Blog
