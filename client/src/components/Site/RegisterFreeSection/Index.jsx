import React from 'react'
import './Index.scss'
import { Link } from 'react-router-dom'
import boyImage from '../../../assets/boyImage.png'
import { useDataContext } from '../../../context/context'
import { useTranslation } from 'react-i18next'
const RegisterFreeSection = () => {
    const { handleOpenRegisterModal } = useDataContext()
    const { t, i18n } = useTranslation()

    return (
        <section className='registerFreeSection'>
            <div className="container">
                <div className="registerFreeSectionInside wow animate__animated animate__fadeInUp" data-wow-delay='0.9s'>
                    <div className='row align-items-center'>
                        <div className='col-lg-6 col-md-8'>
                            <div className="registerFreeSectionFirstBox">
                                <h3>
                                    {
                                        t('pages.home.registerFreeSection.h3')
                                    }
                                </h3>
                                <button onClick={handleOpenRegisterModal} className='blueBtn'>
                                    {
                                        t('pages.home.registerFreeSection.btn')
                                    }
                                </button>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-4">
                            <div className="registerFreeSectionSecondBox">
                                <img src={boyImage} alt="boyImage" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default RegisterFreeSection
