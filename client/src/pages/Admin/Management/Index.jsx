import React from 'react'
import { Helmet } from 'react-helmet'
import './Index.scss'
import ManagementTop from '../../../components/Admin/ManagementTop/Index'
import ManagementTable from '../../../components/Admin/ManagementTable/Index'
const Management = () => {
  return (
    <main className='managementAdmin'>
      <Helmet>
        <title>Management</title>
      </Helmet>
      <div className="managementAdminInside">
        <ManagementTop />
        <ManagementTable />
      </div>
    </main>
  )
}

export default Management
