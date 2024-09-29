import React from 'react'
import './Index.scss'
import women from '../../../assets/side-man.png'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
const FaqBottomSection = () => {
    const { questions } = useSelector(state => state.questions)
    const { t } = useTranslation()
    return (
        <section className='faqBottomSection'>

            <div className="faqBottomSectionImage animate__animated wow animate animate__fadeInLeft">
                <img src={women} alt="women" />
            </div>
            <div className="container">
                <div className='row justify-content-center'>
                    <div className='col-lg-8'>
                        <div className="faqHead wow animate__animated animate__fadeInDown">
                            <h2>
                                {
                                    t('pages.faq.faqBottomSection.h2')
                                }
                            </h2>
                            <p>
                                {
                                    t('pages.faq.faqBottomSection.p')
                                }
                            </p>
                        </div>


                        <div className="faqBottom">
                            <div className="faqBottomBox">
                                <div className="accordion accordion-flush" id="accordionFlushExample">
                                    {
                                        questions?.map((item, index) => {
                                            return <React.Fragment key={index}>
                                                <div className="accordion-item">
                                                    <h2 className="accordion-header">
                                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#flush-collapseOne${index}`} aria-expanded="false" aria-controls="flush-collapseOne">
                                                            {item?.questionTitle}
                                                        </button>
                                                    </h2>
                                                </div>
                                                <div id={`flush-collapseOne${index}`} className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                                                    <div className="accordion-body">
                                                        <p style={{ paddingLeft: "7px" }}>
                                                            {item?.questionContent}
                                                        </p>
                                                    </div>
                                                </div>
                                            </React.Fragment>
                                        })
                                    }





                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </section>
    )
}

export default FaqBottomSection
