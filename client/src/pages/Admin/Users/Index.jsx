import React from 'react'
import './Index.scss'
import { Helmet } from 'react-helmet'
import UserAdminTop from '../../../components/Admin/UserAdminTop/Index'
import UserAdminTable from '../../../components/Admin/UserAdminTable/Index'

const Users = () => {
    return (
        <main className='users'>
            <Helmet>
                <title>Users</title>
            </Helmet>
            <div className="usersAdmin">
                <UserAdminTop />
                <UserAdminTable />
            </div>
        </main>
    )
}

export default Users
