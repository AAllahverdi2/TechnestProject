import React, { useEffect } from 'react'
import './Index.scss'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import PacmanLoader from "react-spinners/PacmanLoader";
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { getOneManagement } from '../../../redux/slices/managementSlice'
import Icon from '@mdi/react';
import { mdiFacebook, mdiInstagram, mdiLinkedin, mdiTwitter } from '@mdi/js';


const ManagementDetail = () => {
  const dispatch = useDispatch()
  const { oneManagement, managementLoading } = useSelector(state => state.management)
  const { id } = useParams()
  useEffect(() => {
    dispatch(getOneManagement(id))
  }, [id])
  return (
    <main className='managementDetail'>
      <Helmet>
        <title>Management Detail</title>
      </Helmet>
      <div className="managementDetailInside">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div className="managementDetailInsideCard">
                {
                  managementLoading == true ? <p className='managementDetailSpinner'>
                    <PacmanLoader color="#6c7293 " /></p> : <div className="managementDetailInsideCardBox">
                    <div className="managementDetailCardBoxTop">
                      <img src={`http://localhost:5050/public/${oneManagement?.managementImage}`} alt="" />
                      <div className="managementAbout">
                        <p>
                          {oneManagement?.managementTitle}
                        </p>
                        <span>
                          {oneManagement?.managementProfession}
                        </span>
                      </div>
                    </div>
                    <div className="managementDetailCardBoxBottom">


                      <p className="managementContent">
                        {oneManagement?.managementContent}
                      </p>
                      <div className="socialButtonsInDetail">
                        <a href={oneManagement?.managementInstagram} style={{ display: oneManagement?.managementInstagram != "" ? "" : "none" }} className="socialIconInDetail socialIconInDetail--instagram" aria-label="instagram">
                          <Icon path={mdiInstagram} size={1} />

                        </a>
                        <a href={oneManagement?.managementFacebook} style={{ display: oneManagement?.managementFacebook != "" ? "" : "none" }} className="socialIconInDetail socialIconInDetail--facebook" aria-label="facebook">
                          <Icon path={mdiFacebook} size={1} />

                        </a>
                        <a href={oneManagement?.managementTwitter} style={{ display: oneManagement?.managementTwitter != "" ? "" : "none" }} className="socialIconInDetail socialIconInDetail--twitter" aria-label="twitter">
                          <Icon path={mdiTwitter} size={1} />
                        </a>
                        <a href={oneManagement?.managementLinkedin} style={{ display: oneManagement?.managementLinkedin != "" ? "" : "none" }} className="socialIconInDetail socialIconInDetail--linkedin" aria-label="linkedin">
                          <Icon path={mdiLinkedin} size={1} />
                        </a>

                      </div>
                    </div>
                    <button className="managementGoBackBtn btn btn-dark">
                      <Link to={'/admin/managementTable'}>
                        Go Back
                      </Link>
                    </button>


                  </div>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default ManagementDetail
