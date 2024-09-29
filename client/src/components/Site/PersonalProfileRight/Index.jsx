import React, { useEffect, useState } from 'react'
import './Index.scss'
import updateImage from '../../../assets/updateImage.png'
import { useDispatch, useSelector } from 'react-redux'
import { useDataContext } from '../../../context/context'
import { getOneUser } from '../../../redux/slices/userSlice'
import { useTranslation } from 'react-i18next'

const PersonalProfileRight = () => {
    const { handleOpenProfUpdate, handleUpdatePassword, handleUpdateGmail, handleUpdatePhone, handleOpenUpdateSettings } = useDataContext()

    const { userToken, oneUser } = useSelector(state => state.users)
    const dispatch = useDispatch()
    const { t } = useTranslation()
    return (
        <div className='personalProfileRight'>
            <div className="persoProfInside">
                <div className="persoProfInsideBox">
                    <h5 className="persoProfTitle">
                        {
                            t('pages.personalProfile.firstBox.title')
                        }
                    </h5>
                    <ul className="persoProfBoxL">
                        <li className="updateData">
                            <button onClick={() => {
                                dispatch(getOneUser(userToken?.id))
                                handleOpenProfUpdate()
                            }
                            }>
                                <img src={updateImage} alt="updateImage" />
                            </button>
                        </li>
                        <li>
                            <span className="prProfLeft">   {
                                t('pages.personalProfile.firstBox.span1')
                            }</span>
                            <span className="prProfRight">  {userToken?.firstName} {userToken?.lastName}</span>
                        </li>
                        <li>
                            <span className="prProfLeft">
                                {
                                    t('pages.personalProfile.firstBox.span2')
                                }
                            </span>
                            <span className="prProfRight">
                                {userToken?.birthdayDay}-{userToken?.birthdayMonth}-{userToken?.birthdayYear}</span>
                        </li>
                        <li>
                            <span className="prProfLeft">

                                {
                                    t('pages.personalProfile.firstBox.span3')
                                }
                            </span>
                            <span className="prProfRight">{userToken?.address}</span>
                        </li>
                    </ul>
                </div>
                <div className="persoProfInsideBox">
                    <h5 className="persoProfTitle">
                        {
                            t('pages.personalProfile.secondBox.title')
                        }
                    </h5>
                    <ul className="persoProfBoxL">
                        <li className="updateData">
                            <button onClick={() => {
                                dispatch(getOneUser(userToken?.id))

                                handleOpenUpdateSettings()
                            }}>
                                <img src={updateImage} alt="updateImage" />
                            </button>
                        </li>
                        <li>
                            <span className="prProfLeft">
                                {
                                    t('pages.personalProfile.secondBox.span1')
                                }
                            </span>
                            <span className="prProfRight">
                                {
                                    userToken?.language == 'Azərbaycan' ? " Azərbaycan" :
                                        userToken?.language == 'english' ? ' English' :
                                            userToken?.language == 'russian' ? 'Russian' : ''

                                }
                            </span>
                        </li>
                        <li>
                            <span className="prProfLeft">
                                {
                                    t('pages.personalProfile.secondBox.span3')
                                }
                            </span>
                            <span className="prProfRight">
                                {
                                    userToken?.language == 'Azərbaycan' ? t('pages.personalProfile.secondBox.timeZone1') :
                                        userToken?.language == 'english' ? t('pages.personalProfile.secondBox.timeZone2') :
                                            userToken?.language == 'russian' ? t('pages.personalProfile.secondBox.timeZone3') : ''

                                }
                            </span>
                        </li>
                        <li>
                            <span className="prProfLeft">
                                {
                                    t('pages.personalProfile.secondBox.span2.title')
                                }
                            </span>
                            <div className="prProfRightCheck form-check">
                                <input className="form-check-input" readOnly checked={userToken?.status == true} type="checkbox" id="flexCheck" />
                                <label className="form-check-label" htmlFor="flexCheck">
                                    {
                                        t('pages.personalProfile.secondBox.span2.text')
                                    }
                                </label>
                            </div>
                        </li>
                    </ul>
                </div>

                <div className="persoProfInsideBox">
                    <h5 className="persoProfTitle">
                        {
                            t('pages.personalProfile.thirdBox.title')
                        }
                    </h5>
                    <div className="emailUpdateBox">
                        <span>
                            {
                                t('pages.personalProfile.thirdBox.span')
                            } : {userToken?.userGmail}
                        </span>
                        <div className="updateBtnInPR">
                            <button onClick={() => {
                                dispatch(getOneUser(userToken?.id))

                                handleUpdateGmail()
                            }}>
                                <img src={updateImage} alt="updateImage" />
                            </button>
                        </div>
                    </div>
                </div>


                <div className="persoProfInsideBox">
                    <h5 className="persoProfTitle">
                        {
                            t('pages.personalProfile.fourthBox.title')
                        }
                    </h5>
                    <div className="emailUpdateBox">
                        <span>
                            {
                                t('pages.personalProfile.fourthBox.span')
                            } : {userToken?.phoneNumber}
                        </span>
                        <div className="updateBtnInPR">
                            <button onClick={() => {
                                dispatch(getOneUser(userToken?.id))

                                handleUpdatePhone()
                            }}>
                                <img src={updateImage} alt="updateImage" />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="persoProfInsideBox">
                    <h5 className="persoProfTitle">
                        {
                            t('pages.personalProfile.fifthBox.title')
                        }
                    </h5>
                    <div className="emailUpdateBox">
                        <span>
                            {
                                t('pages.personalProfile.fifthBox.span')
                            } : xxxxxxxxxxx
                        </span>
                        <div className="updateBtnInPR">
                            <button onClick={() => {
                                dispatch(getOneUser(userToken?.id))
                                handleUpdatePassword()
                            }}>
                                <img src={updateImage} alt="updateImage" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PersonalProfileRight 
