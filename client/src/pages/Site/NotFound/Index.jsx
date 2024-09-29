import React from 'react'
import './Index.scss'
import errorpage1 from '../../../assets/errorpage1.png'
import cosmonaft from '../../../assets/cosmonaft.png'
import n404 from '../../../assets/n404.png'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { useTranslation } from 'react-i18next'

const NotFound = () => {
  const { t } = useTranslation()
  return (
    <main className='notFound'>
      <Helmet>
        <title>Not Found</title>
      </Helmet>
      <div className="cosmonaft1">
        <img src={errorpage1} alt="errorpage1" />
      </div>
      <div className="container">
        <div className='row justify-content-center'>
          <div className='col-lg-8'>
            <div className="notFoundInside">
              <div className="notFoundInsideTop">
                <img src={n404} alt="404" />
              </div>
              <div className="notFoundInsideBottom">
                <h3>

                  {
                    t('pages.error404.h3')
                  }

                </h3>
                <p>
                  {
                    t('pages.error404.p')
                  }
                </p>
                <Link to={'/'} className='goBack'>
                  {
                    t('pages.error404.btn')
                  }
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="cosmonaft2">
        <img src={cosmonaft} alt="cosmonaft" />
      </div>
    </main>
  )
}

export default NotFound
