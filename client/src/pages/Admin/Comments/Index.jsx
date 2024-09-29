import React from 'react'
import { Helmet } from 'react-helmet'
import './Index.scss'
import CommentsTop from '../../../components/Admin/CommentsTop/Index'
import CommentTable from '../../../components/Admin/CommentTable/Index'
const Comments = () => {
  return (
    <main className='comments'>
      <Helmet>
        <title>Comments</title>
      </Helmet>
      <div className="commentsAdmin">
        <CommentsTop />
        <CommentTable />
      </div>
    </main>
  )
}

export default Comments
