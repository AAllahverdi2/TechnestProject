import React from 'react'
import './Index.scss'
import ManagementCard from '../Cards/ManagementCard/Index'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
const ManagementSection = () => {
    const { t, i18n } = useTranslation()

    const { management } = useSelector(state => state.management)
    return (
        <section className='managementSection'>
            <div className="container">
                <div className="managementSectionTop wow animate__animated animate__fadeInDown">
                    <h2>

                        {
                            t('pages.home.managementSection.h2')
                        }
                    </h2>
                    <p>
                        {
                            t('pages.home.managementSection.p')
                        }
                    </p>
                </div>

                <div className="row g-4" >
                    {
                        management?.map((item, index) => {
                            return <div key={index} className='col-xl-4 col-lg-4 col-md-6 col-sm-6 wow  animate__animated animate__fadeInUp' data-wow-delay={`${(index / 10) + 0.1}s`}>
                                <ManagementCard item={item} />
                            </div>
                        })
                    }


                </div>
            </div>
        </section>
    )
}

export default ManagementSection
