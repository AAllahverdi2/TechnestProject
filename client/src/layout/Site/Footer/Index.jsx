import React, { useEffect, useRef } from 'react'
import SubscribeSection from '../../../components/Site/SubscribeSection/Index'
import './Index.scss'
import footArrow from '../../../assets/footArrow.png'
import { Link, useLocation } from 'react-router-dom'
import { FaMessage } from "react-icons/fa6";
import { FaPhoneAlt, FaTwitch, FaTwitter, FaYoutube } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import logo from '../../../assets/LOGO.png'
import { MdKeyboardDoubleArrowUp } from "react-icons/md";
import i18n from '../../../i18next/i18n'
import { useTranslation } from 'react-i18next'

const Footer = () => {
  const scrollRef = useRef()
  const location = useLocation()
  const { t, i18n } = useTranslation()

  const locales = {
    en: { title: 'English' },
    rus: { title: 'Russian' },
    az: { title: 'Azərbaycan' },
  }
  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    if (scrollPosition > 100) {
      scrollRef.current.classList.add("visible-window")
    }
    else {
      scrollRef.current.classList.remove("visible-window")

    }
  };
  useEffect(() => {
    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <>
      <SubscribeSection />
      <footer className='footer' style={{ display: location.pathname == '/*' ? "none " : "" }}>
        <div className="container">
          <div className="footerTop">
            <div className="row g-5 " >
              <div className='col-xl-3 col-lg-4 col-md-6 col-sm-6 ' >
                <div className="footerTopInside">
                  <div className="footerTopInsideHead">
                    <h5 className="footTitle">

                      Quick Links

                    </h5>

                  </div>
                  <div className="footerTopInsideBottom">
                    <div className="footLinks">
                      <ul >
                        <li>
                          <Link onClick={() => {
                            window.scrollTo({
                              top: 0,
                              behavior: 'smooth',
                            });
                          }} to={'/dashboard'}>
                            <img src={footArrow} alt="footArrow" />
                            My Account
                          </Link>
                        </li>
                        <li>
                          <Link to={'/'} onClick={() => {
                            window.scrollTo({
                              top: 0,
                              behavior: 'smooth',
                            });
                          }}>
                            <img src={footArrow} alt="footArrow" />
                            Affiliate Program
                          </Link>
                        </li>
                        <li>
                          <Link to={'/'} onClick={() => {
                            window.scrollTo({
                              top: 0,
                              behavior: 'smooth',
                            });
                          }}>
                            <img src={footArrow} alt="footArrow" />
                            Lawyer Consulting
                          </Link>
                        </li>
                        <li>
                          <Link to={'/'} onClick={() => {
                            window.scrollTo({
                              top: 0,
                              behavior: 'smooth',
                            });
                          }}>
                            <img src={footArrow} alt="footArrow" />
                            Privacey Policy
                          </Link>
                        </li>
                        <li>
                          <Link to={'/'} onClick={() => {
                            window.scrollTo({
                              top: 0,
                              behavior: 'smooth',
                            });
                          }}>
                            <img src={footArrow} alt="footArrow" />
                            Term & Condition
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className='col-xl-3 col-lg-4 col-md-6 col-sm-6 '  >
                <div className="footerTopInside">
                  <div className="footerTopInsideHead">
                    <h5 className="footTitle">
                      Help Center

                    </h5>

                  </div>
                  <div className="footerTopInsideBottom">
                    <div className="footLinks">
                      <ul >
                        <li>
                          <Link to={'/contacts'} onClick={() => {
                            window.scrollTo({
                              top: 0,
                              behavior: 'smooth',
                            });
                          }}>
                            <img src={footArrow} alt="footArrow" />
                            Contact Us
                          </Link>
                        </li>
                        <li>
                          <Link to={'/faq'} onClick={() => {
                            window.scrollTo({
                              top: 0,
                              behavior: 'smooth',
                            });
                          }}>
                            <img src={footArrow} alt="footArrow" />
                            FAQ
                          </Link>
                        </li>
                        <li>
                          <Link to={'/product'} onClick={() => {
                            window.scrollTo({
                              top: 0,
                              behavior: 'smooth',
                            });
                          }}>
                            <img src={footArrow} alt="footArrow" />
                            Sell You Product
                          </Link>
                        </li>
                        <li>
                          <Link to={'/about'} onClick={() => {
                            window.scrollTo({
                              top: 0,
                              behavior: 'smooth',
                            });
                          }}>
                            <img src={footArrow} alt="footArrow" />
                            About Us
                          </Link>
                        </li>
                        <li>
                          <Link to={'/blog'} onClick={() => {
                            window.scrollTo({
                              top: 0,
                              behavior: 'smooth',
                            });
                          }}>
                            <img src={footArrow} alt="footArrow" />
                            Blog
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className='col-xl-3 col-lg-4 col-md-6 col-sm-6 '  >
                <div className="footerTopInside">
                  <div className="footerTopInsideHead">
                    <h5 className="footTitle">
                      Contact Us
                    </h5>

                  </div>
                  <div className="footerTopInsideBottom">
                    <div className="footAbout">
                      <ul>
                        <li>
                          <FaPhoneAlt />
                          <span>
                            +994513236262
                          </span>
                        </li>
                        <li>
                          <FaMessage />
                          <span>
                            agamaliyevallahverdi@gmail.com
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className='col-xl-3 col-lg-4 col-md-6 col-sm-6 '  >
                <div className="footerTopInside">
                  <div className="footerTopInsideHead">
                    <h5 className="footTitle">
                      Follow Us
                    </h5>

                  </div>
                  <div className="footerTopInsideBottom">
                    <div className="followLinks">
                      <ul>
                        <li>
                          <a href="#">
                            <div className="followLinksIcon footFacebook">
                              <FaFacebookF />
                            </div>
                            <span>Facebook</span>
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <div className="followLinksIcon footTwitter">
                              <FaTwitter />
                            </div>
                            <span>Twitter</span>
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <div className="followLinksIcon footTwitch">
                              <FaTwitch />
                            </div>
                            <span>Twitch</span>
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <div className="followLinksIcon footYoutube">
                              <FaYoutube />
                            </div>
                            <span>Youtube</span>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="footerMiddle">
            <div className="footerMiddleLogo">
              <Link to={'/'} onClick={() => {
                window.scrollTo({
                  top: 0,
                  behavior: 'smooth',
                });
              }}>
                <img src={logo} alt="logo" />
              </Link>
            </div>
            <ul className="footerMiddleLinks">
              <li>
                <Link onClick={() => {
                  window.scrollTo({
                    top: 0,
                    behavior: 'smooth',
                  });
                }} to={'/'}>Home</Link>
              </li>
              <li>
                <Link onClick={() => {
                  window.scrollTo({
                    top: 0,
                    behavior: 'smooth',
                  });
                }} to={'/about'}>About</Link>
              </li>
              <li>
                <Link onClick={() => {
                  window.scrollTo({
                    top: 0,
                    behavior: 'smooth',
                  });
                }} to={'/'}>Predict</Link>
              </li>
              <li>
                <Link onClick={() => {
                  window.scrollTo({
                    top: 0,
                    behavior: 'smooth',
                  });
                }} to={'/product'}>Auction</Link>
              </li>
            </ul>
          </div>
          <div className="footerBottom">
            <p>
              Copyright © 2022 Techbid | Designed by <a href="#0">Softivus</a>
            </p>
            <ul>
              <li>Select your language:</li>
              <li>
                <select className='form-select' onChange={(e) => {
                  const selectedLanguage = e.target.value;
                  i18n.changeLanguage(selectedLanguage);
                }}>
                  {
                    Object.keys(locales).map((locale) => {
                      return <option selected={i18n.resolvedLanguage == locale} style={{ fontWeight: i18n.resolvedLanguage == locale ? ' bold' : '' }} key={locale} value={locale}>{locales[locale].title}</option>
                    })
                  }




                </select>
              </li>
            </ul>
          </div>
        </div>
      </footer>
      <div ref={scrollRef} className="scroolIcons animate__bounceInDown animate__animated  animate__delay-2s" data-wow-delay="0.2s" onClick={() => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
      }}>
        <div className="footArrowI">
          <MdKeyboardDoubleArrowUp />
        </div>
      </div>
    </>
  )
}

export default Footer
