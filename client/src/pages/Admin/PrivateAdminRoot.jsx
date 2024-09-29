import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, useNavigate } from "react-router";
import { getUserToken } from "../../redux/slices/userSlice";
import { jwtDecode } from "jwt-decode";

const PrivateAdminRoute = ({ element: Element, ...rest }) => {
    const { userToken } = useSelector(state => state.users);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {

        const checkAuthorization = async () => {
            try {
                const token = localStorage.getItem('token')

                if (!token) {
                    navigate('/');
                } else {
                    const decode = jwtDecode(token)
                    if (decode.isAdmin !== true) {
                        navigate('/*');
                    }
                }
            } catch (err) {
                setError(err)
            } finally {
                setLoading(false)
            }
        };

        checkAuthorization();
    }, [userToken]);
    if (loading) {
        return <div className={`bg-load myLoad  `}>
            <div className="load">
                <span className='load1'></span>
                <span className='load2'></span>
                <span className='load3'></span>
                <span className='load4'></span>
            </div>
        </div>;
    }

    return <Element />;
};

export default PrivateAdminRoute