import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import './Index.scss'
import { Link, useParams } from 'react-router-dom'
import BlogDetailHero from '../../../components/Site/BlogDetailHero/Index'
import BlogSecondCol from '../../../components/Site/BlogSecondCol/Index'
import clock from '../../../assets/clock.png'
import eye from '../../../assets/eye (1).png'
import message from '../../../assets/message.png'
import calender from '../../../assets/calender.png'
import mes1 from '../../../assets/mes1.png'
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitch, FaTwitter, FaYoutube } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { getOneBlog } from '../../../redux/slices/blogSlice'
import moment from 'moment'
import { deleteComment, getAllBlogsComment, postComment, updateComment } from '../../../redux/slices/commentSlice'
import { useFormik } from 'formik'
import toast, { Toaster } from 'react-hot-toast'
import { Pagination, Stack } from '@mui/material'
import Icon from '@mdi/react'
import { mdiDelete, mdiDeleteEmpty, mdiFileEdit, mdiWindowClose } from '@mdi/js'
import { useTranslation } from 'react-i18next'

const BlogDetail = () => {
  const dispatch = useDispatch()
  const { oneBlog, loading } = useSelector(state => state.blogs)
  const { userToken } = useSelector(state => state.users)
  const { oneBlogAllComments, oneComment } = useSelector(state => state.comments)
  const { id } = useParams()
  useEffect(() => {
    dispatch(getOneBlog(id))
  }, [id])

  useEffect(() => {
    dispatch(getAllBlogsComment(id))
  }, [oneBlog?._id, id])
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = oneBlogAllComments?.slice(indexOfFirstItem, indexOfLastItem);
  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const formik = useFormik({
    initialValues: {
      blogId: '',
      addedComment: '',
      blogPosterUser: '',
      commentedName: '',
      commentedProfileImage: '',
      commentContent: '',
      posterUserGmail: '',
    },

    onSubmit: async (values) => {
      const userName = `${userToken?.firstName} ${userToken?.lastName}`

      const postedData = {
        blogId: oneBlog?._id,
        addedComment: userToken?.id,
        blogPosterUser: oneBlog?.posterId,
        commentedName: userName,
        commentedProfileImage: userToken?.profileImage,
        commentContent: values.commentContent,
        posterUserGmail: userToken?.userGmail,
      }
      if (userToken && userToken?.isLogin == true) {
        toast.success("🚀 Comment posted successfully! Keep the conversation going!", {
          style: {
            background: '#4CAF50',
            color: '#fff',
          },
        });
        dispatch(postComment(postedData))
        formik.resetForm()
      } else {
        toast.error("😓 Oops! Login to add your thoughts to the conversation.", {
          style: {
            background: '#f44336',
            color: '#fff',
          },
        });
        formik.resetForm()

      }
    },
  });


  const [editedCommentId, setEditedCommentId] = useState(null);
  const [updatedBlogContent, setUpdatedBlogContent] = useState('');

  const handleEditClick = (commentId, commentContent) => {
    setEditedCommentId((prevId) => (prevId === commentId ? null : commentId));

    setUpdatedBlogContent(commentContent);
  };

  const handleContentChange = (e) => {
    setUpdatedBlogContent(e.target.value);
    console.log(e.target.value)
  };

  const handleUpdateContent = () => {
    setEditedCommentId(null);
    setUpdatedBlogContent('');
  };
  const { t } = useTranslation()
  return (
    <main>
      <Helmet>
        <title>Blog Detail</title>
      </Helmet>
      <BlogDetailHero />
      <section className='blogDetailBottom'>
        <div className="container">
          <div className="blogDetailBottomInside">
            <div className='row justify-content-center'>
              <div className='col-xl-8'>
                <div className="blogDetailCol">
                  <div className="blogDetailColBox">
                    <div className="blogDetailColBoxTop">
                      <ul className="clock">
                        <li>
                          <img src={clock} alt="clock" />
                          <span>{moment(oneBlog?.createdAt).fromNow()}</span>
                        </li>
                        <li>
                          <img src={eye} alt="eye" />
                          <span>{oneBlog?.watchers}</span>
                        </li>
                      </ul>

                      <h3>

                        {oneBlog?.blogTitle2}

                      </h3>
                      <p>

                        {oneBlog?.blogSmallContent}
                      </p>
                    </div>
                    <div className="blogDetailColBoxMiddle">
                      <div className="row">
                        <div className='col-lg-2 col-md-2'>
                          <div className="blogDetailMiddleCol1">
                            <div className="blogDetailMiddleColTop">
                              <img src={`http://localhost:5050/public/${oneBlog?.posterImage}`} alt="" />
                            </div>
                            <div className="blogDetailMiddleColMiddle">
                              <div className="comBox">
                                <img src={message} alt="message" />
                              </div>
                              <span>  {
                                oneBlogAllComments?.length < 10 ? `0${oneBlogAllComments?.length}` : oneBlogAllComments?.length
                              }</span>
                            </div>
                            <div className="blogDetailMiddleColBottom"></div>
                          </div>
                        </div>
                        <div className='col-lg-10 col-md-10'>
                          <div className="blogDetailMiddleCol2">

                            {oneBlog?.blogContent?.slice(0, Math.ceil(oneBlog?.blogContent?.length / 2)).map((item, index) => {
                              return <p key={index} className={`p${index + 1} paraghraf`}>
                                {item}
                              </p>

                            })}

                            <div className="col10Image">
                              <img src={`http://localhost:5050/public/${oneBlog?.blogImage}`} alt="" />
                            </div>
                            {oneBlog?.blogContent?.slice(Math.ceil(oneBlog?.blogContent?.length / 2), oneBlog?.blogContent?.length).map((item, index) => {
                              return <p key={index} className={`p${index + (3 * 2)} paraghraf2`}>
                                {item}
                              </p>

                            })}

                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="blogDetailColBoxBottom">
                      <div className="blogDetailColBottomInside">
                        <ul className="blogDetailFootLeft">
                          <li>
                            <div className="blogDetailFootLeftImg">
                              <img src={calender} alt="calender" />

                            </div>
                            <span>                                {moment(oneBlog?.createdAt).format('MMMM D, YYYY')}
                            </span>
                          </li>
                          <li>
                            <div className="blogDetailFootLeftImg">
                              <img src={mes1} alt="message" />

                            </div>
                            <span>  {
                              oneBlogAllComments?.length < 10 ? `0${oneBlogAllComments?.length}` : oneBlogAllComments?.length
                            }</span>
                          </li>
                        </ul>
                        <ul className="blogDetailFootRight">
                          <li>
                            <a href="#">
                              <FaFacebookF />
                            </a>
                          </li>
                          <li><a href="#">
                            <FaInstagram />
                          </a>
                          </li>
                          <li><a href="#"><FaTwitter /></a></li>
                          <li><a href="#"><FaLinkedinIn /></a></li>
                        </ul>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
              <div className='col-xl-4 col-lg-8'>
                <BlogSecondCol />
              </div>
            </div>
          </div>
          <div className="commentBlog">
            <div className='row justify-content-center'>
              <div className="col-lg-8">
                <div className="commentBlogBox">
                  <h2 className='commentBlogBoxTitle'>
                    {
                      oneBlogAllComments?.length < 10 ? `0${oneBlogAllComments?.length}` : oneBlogAllComments?.length
                    }   {
                      t('pages.blogDetail.commentSection.title3')}

                  </h2>
                  {
                    currentItems?.map((item, index) => {
                      return <div key={index} className="commentBlogBoxItem">
                        <div className="commentBlogBoxItemTop">
                          <img src={`http://localhost:5050/public/${item.commentedProfileImage}`} alt="" />
                        </div>
                        <div className="commentBlogBoxItemBottom">
                          <div className="commentContentName">
                            <div style={{ display: userToken?.isLogin == true ? '' : 'none' }} className="buttonBoxComments"  >
                              <button style={{ display: userToken?.id == oneBlog.posterId || userToken.id == item.addedComment ? 'block' : 'none' }} onClick={async () => {
                                await dispatch(deleteComment(item._id))
                                toast.success(t('pages.blogDetail.commentSection.deleteMessage'));

                              }} className='commentDeleteBtn' >
                                <span className='testimonialFirstDelete'>
                                  <Icon path={mdiDelete} size={1} />
                                </span>
                                <span className='testimonialSecondDelete'>
                                  <Icon path={mdiDeleteEmpty} size={1} />

                                </span>
                              </button>

                              <button style={{ display: userToken.id == item.addedComment ? '' : 'none' }} className='mt-2 editBlogBtn' onClick={() => handleEditClick(item._id, item.commentContent)}
                              >
                                <Icon path={editedCommentId === item._id ? mdiWindowClose : mdiFileEdit} size={1} />

                              </button>
                            </div>
                            <h5>
                              {item.commentedName} :
                            </h5>
                            <span>  {moment(item?.createdAt).format('MMMM D, YYYY')}</span>

                          </div>
                          {editedCommentId === item._id ? (
                            <form className='updateCommentForm' onSubmit={(e) => {
                              e.preventDefault()
                              if (updatedBlogContent === '') {
                                toast.error(t('pages.blogDetail.commentSection.updateErrorComment'), {
                                  style: {
                                    background: '#f44336',
                                    color: '#fff',
                                  },
                                });
                              } else {
                                dispatch(updateComment({ id: item._id, newData: { commentContent: updatedBlogContent } }))
                                setTimeout(() => {
                                  toast.success(t('pages.blogDetail.commentSection.updateSuccessComment'), {
                                    style: {
                                      background: '#4CAF50',
                                      color: '#fff',
                                    },
                                  });

                                }, 500)
                                setEditedCommentId(null)
                                setUpdatedBlogContent('')
                              }
                            }}>
                              <div className='row  flex-wrap flex-column'>
                                <div className='col-lg-8'>
                                  <div className="textareaBox">

                                    <textarea
                                      name="updatedBlogContent"
                                      onChange={handleContentChange}
                                      value={updatedBlogContent}
                                      cols="30"
                                      rows="10"
                                      className='updateTextArea'
                                      placeholder={t('pages.blogDetail.commentSection.updateSuccessComment')}
                                    ></textarea>
                                  </div>
                                </div>
                                <div className="col-lg-4">
                                  <button type='submit' className="submitBtn">
                                    {
                                      t('pages.blogDetail.commentSection.btn')}
                                  </button>
                                </div>
                              </div>
                            </form>
                          ) : (
                            <p>{item.commentContent}</p>
                          )}

                        </div>
                      </div>

                    })
                  }
                </div>
                <div style={{ display: oneBlogAllComments.length > 5 ? '' : "none" }} className="blogSecondCol23">
                  <Stack spacing={2}>
                    <Pagination
                      count={Math.ceil(oneBlogAllComments.length / itemsPerPage)}
                      page={currentPage}
                      onChange={handlePageChange}
                      variant="outlined"
                      shape="rounded"

                    />
                  </Stack>
                </div>
              </div>
            </div>
          </div>
          <div className='row justify-content-center commentInputs'>
            <div className="col-lg-8">
              <div className="commentInputs2">
                <h2>
                  {
                    t('pages.blogDetail.commentSection.title')
                  }
                </h2>
                <form onSubmit={formik.handleSubmit}>
                  <div className='row g-4'>
                    <div className='col-lg-12'>
                      <label htmlFor=" comment">
                        {t('pages.blogDetail.commentSection.title2')}
                      </label>
                      <div className="textareaBox">
                        <textarea name='commentContent'
                          onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.commentContent} id="comment" cols="30" rows="10" placeholder={t('pages.blogDetail.commentSection.placeholder2')}></textarea>
                      </div>
                    </div>
                    <button type='submit' className="submitBtn">
                      {
                        t('pages.blogDetail.commentSection.btn2')
                      }
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main >
  )
}

export default BlogDetail
