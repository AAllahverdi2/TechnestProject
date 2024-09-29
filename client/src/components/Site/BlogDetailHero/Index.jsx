import React from 'react'
import './Index.scss'
import { Link } from 'react-router-dom'
import { MdKeyboardDoubleArrowRight } from 'react-icons/md'
import { useTranslation } from 'react-i18next'

const BlogDetailHero = () => {
    const { t } = useTranslation()
    return (
        <section className='blogHero'>
            <div className="container">
                <div className="row">
                    <div className="col-lg-6 col-md-6">
                        <div className="blogHeroLeft">
                            <h1>
                                {
                                    t('pages.blogDetail.blogDetailHero.h1')
                                }
                            </h1>
                            <ul>
                                <li>
                                    <Link to={'/'}>
                                        {
                                            t('pages.blogDetail.blogDetailHero.li1')
                                        }
                                    </Link>

                                </li>
                                <li>
                                    <MdKeyboardDoubleArrowRight />
                                </li>
                                <li>
                                    {
                                        t('pages.blogDetail.blogDetailHero.li2')
                                    }
                                </li>
                                <li>
                                    <MdKeyboardDoubleArrowRight />
                                </li>
                                <li>
                                    {
                                        t('pages.blogDetail.blogDetailHero.li3')
                                    }
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6">
                        <div className="blogHeroRight"></div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default BlogDetailHero
