import React from 'react'
import { Helmet } from 'react-helmet'
import './Index.scss'
import TestimonialsTable from '../../../components/Admin/TestimonialsTable/Index'
import TestimonialTableTop from '../../../components/Admin/TestimonialTableTop/Index'
const Testimonials = () => {
    return (
        <main className='testimonialsAdmin'>
            <Helmet>
                <title>Testimonials</title>
            </Helmet>
            <div className="testimonialsAdminInside">
                <TestimonialTableTop />
                <TestimonialsTable />
            </div>
        </main>
    )
}

export default Testimonials
