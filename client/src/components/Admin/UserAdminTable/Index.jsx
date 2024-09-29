import React, { useState } from 'react'
import './Index.scss'
import { useSelector } from 'react-redux'
import RingLoader from "react-spinners/RingLoader";
import { Pagination } from '@mui/material';
import UserAdminTableTop from '../UserAdminTableTop/Index';
const UserAdminTable = () => {
    const { users, userLoading, userToken } = useSelector(state => state.users)
    const itemsPerPage = 7;
    const [currentPage, setCurrentPage] = useState(1);

    const filteredUsers = users?.filter(user => user.superAdmin === false);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredUsers?.slice(indexOfFirstItem, indexOfLastItem);

    const handlePageChange = (event, newPage) => {
        setCurrentPage(newPage);
    };
    return (
        <div className='container'>
            <div className="row">
                {
                    userLoading == true ? <p className='usersSpinner'>
                        <RingLoader color="#36d7b7" />
                    </p> : <div className='col-lg-12 userTableCol'>
                        <div className="userTableColInside">
                            <div className="userTableColInsideBox">
                                <div className="resUsersTable">
                                    <table className='table table-hover' >
                                        <thead>
                                            <tr>
                                                <th>Id</th>
                                                <th>Image</th>
                                                <th>First Name</th>
                                                <th>Last Name</th>
                                                <th>Gmail</th>
                                                <th>Detail</th>
                                                <th style={{ display: userToken?.superAdmin == true ? '' : "none" }}>Delete</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                currentItems?.map((item, index) => {
                                                    return <UserAdminTableTop key={index} index={indexOfFirstItem + index} item={item} />
                                                })
                                            }
                                        </tbody>
                                    </table>


                                </div>
                                <div className="usersPagination" style={{ display: users.length > 7 ? "" : "none" }}>
                                    <Pagination
                                        count={Math.ceil(users.length / itemsPerPage)}
                                        page={currentPage}
                                        onChange={handlePageChange}
                                        color="primary" />
                                </div>
                            </div>
                        </div>
                    </div>
                }

            </div>
        </div>
    )
}

export default UserAdminTable
