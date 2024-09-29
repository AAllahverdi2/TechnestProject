import React from 'react'
import { Helmet } from 'react-helmet'
import './Index.scss'
import BlogsTop from '../../../components/Admin/BlogsTop/Index'
import BlogsTable from '../../../components/Admin/BlogsTable/Index'
const Blogs = () => {
    return (
        <main className='blogs'>
            <Helmet>
                <title>Blogs</title>
            </Helmet>
            <div className="blogsAdmin">
                <BlogsTop />
                <BlogsTable />
            </div>
        </main>
    )
}

export default Blogs
