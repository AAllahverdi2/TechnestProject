import React, { useEffect } from 'react'
import 'odometer/themes/odometer-theme-default.css'; // Import odometer styles
import Odometer from 'odometer';
import './Index.scss'
import { useLocation } from 'react-router';
import { useTranslation } from 'react-i18next';
const AboutOdometrSection = () => {
    const { t } = useTranslation()
    const location = useLocation()
    useEffect(() => {
        const odometer = new Odometer({
            el: document.querySelector('.odometer'),
            value: 0,
            format: '(,ddd)',
        });

        const handleScroll = () => {
            const scrollY = window.scrollY;
            if (scrollY >= 850) {
                odometer.update(45);
            }
        };
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };

    }, []);
    useEffect(() => {
        const odometer = new Odometer({
            el: document.querySelector('.odometer1'),
            value: 0,
            format: '(,d)',
        });
        const handleScroll = () => {
            const scrollY = window.scrollY;
            if (scrollY >= 850) {
                setTimeout(() => {
                    odometer.update(18);

                }, 400)
            }
        };
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };


    }, []);
    useEffect(() => {
        const odometer = new Odometer({
            el: document.querySelector('.odometer2'),
            value: 0,
            format: '(dd,d)',
        });
        const handleScroll = () => {
            const scrollY = window.scrollY;
            if (scrollY >= 850) {
                setTimeout(() => {
                    odometer.update(306);
                }, 500)
            }
        };
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };


    }, []);
    useEffect(() => {
        const odometer = new Odometer({
            el: document.querySelector('.odometer3'),
            value: 0,
            format: '(,ddd)',
        });

        const handleScroll = () => {
            const scrollY = window.scrollY;
            if (scrollY >= 850) {
                setTimeout(() => {
                    odometer.update(787);

                }, 750)
            }
        };
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };

    }, []);
    return (
        <section className='aboutOdometrSection'>
            <div className="container">
                <div className='row g-4'>
                    <div className='col-xl-3 col-lg-4 col-md-6 col-sm-6 animate__animated wow animate__fadeInUp' data-wow-delay="0.1s">
                        <div className="odometrCard">
                            <div className="odometrCardInside">
                                <div className="odometrCardInsideTop justify-content-center d-flex align-items-center">

                                    <h2 data-odometer-final="45" className='odometer-auto-theme odometer'>0</h2>
                                    <h2>M</h2>
                                </div>
                                <p>
                                    {
                                        t('pages.aboutUs.odometerSection.first')
                                    }
                                </p>
                            </div>
                        </div>

                    </div>
                    <div className='col-xl-3 col-lg-4 col-md-6 col-sm-6 animate__animated wow animate__fadeInUp' data-wow-delay="0.4s">
                        <div className="odometrCard">
                            <div className="odometrCardInside">
                                <div className="odometrCardInsideTop justify-content-center d-flex align-items-center">

                                    <h2 data-odometer-final="18" className='odometer-auto-theme odometer1'>0</h2>
                                    <h2>M</h2>
                                </div>
                                <p>
                                    {
                                        t('pages.aboutUs.odometerSection.second')
                                    }
                                </p>
                            </div>
                        </div>

                    </div>
                    <div className='col-xl-3 col-lg-4 col-md-6 col-sm-6 animate__animated wow animate__fadeInUp' data-wow-delay="0.7s">
                        <div className="odometrCard">
                            <div className="odometrCardInside">
                                <div className="odometrCardInsideTop justify-content-center d-flex align-items-center">

                                    <h2 data-odometer-final="306" className='odometer-auto-theme odometer2'>0</h2>
                                    <h2>M</h2>
                                </div>
                                <p>
                                    {
                                        t('pages.aboutUs.odometerSection.third')
                                    }
                                </p>
                            </div>
                        </div>

                    </div>
                    <div className='col-xl-3 col-lg-4 col-md-6 col-sm-6 animate__animated wow animate__fadeInUp' data-wow-delay="0.9s">
                        <div className="odometrCard">
                            <div className="odometrCardInside">
                                <div className="odometrCardInsideTop justify-content-center d-flex align-items-center">
                                    <h2>$</h2>
                                    <h2 data-odometer-final="787" className='odometer-auto-theme odometer3'>0</h2>
                                    <h2>M</h2>
                                </div>
                                <p>
                                    {
                                        t('pages.aboutUs.odometerSection.fourth')
                                    }
                                </p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    )
}

export default AboutOdometrSection
