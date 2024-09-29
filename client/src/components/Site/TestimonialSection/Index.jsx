import React, { Component, useEffect, useRef, useState } from 'react';
import './Index.scss'
import OwlCaruselCard from '../Cards/OwlCaruselCard/Index';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import { useDispatch, useSelector } from 'react-redux';
import { getAllTestimonial } from '../../../redux/slices/testimonialSlice';
import { useTranslation } from 'react-i18next';
const TestimonialSection = () => {
    const dispatch = useDispatch()
    const { t, i18n } = useTranslation()

    useEffect(() => {
        dispatch(getAllTestimonial())
    }, [])
    const { testimonial } = useSelector(state => state.testimonial)
    return (
        <section className='testimonialSection'>
            <div className="container">
                <div className="testimonialSectionTop wow animate__animated animate__fadeInDown">
                    <h2>

                        {
                            t('pages.home.testimonialSection.h2')
                        }
                    </h2>
                    <p>
                        {
                            t('pages.home.testimonialSection.p')
                        }
                    </p>

                </div>
            </div>
            <OwlCarousel
                className="testimonialSectionBottom owl-theme owl-carousel"
                items={3}
                loop={true}
                margin={20}
                nav
                center
                responsiveClass
                autoplay
                autoplayTimeout={4000}
                autoplayHoverPause={false}
                responsive={{
                    0: {
                        items: 1,
                    },
                    700: {
                        items: 2,
                    },
                    1100: {
                        items: 3,
                    }
                }}

            >
                {
                    testimonial?.map((item, index) => {
                        return <OwlCaruselCard item={item} key={index} />
                    })
                }

            </OwlCarousel>

        </section>
    )
}

export default TestimonialSection
