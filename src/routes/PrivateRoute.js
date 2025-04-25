import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { checkAuth } from '../redux/slice/auth.slice';

function PrivateRoute(props) {
    const [loading, setLoading] = useState(true);       //1

    const auth = useSelector(state => state.auth);

    console.log(auth);

    const dispatch = useDispatch();

    const navigate = useNavigate();

    //3
    useEffect(() => {
        const checkAuthState = async() => {
            try {
                await dispatch(checkAuth());
            } catch (error) {
                console.log("ssddssdds", error);
                
                navigate("/");
            } finally {
                setLoading(false)
            }
        }
        
        checkAuthState();
    }, [navigate, dispatch])

    //2
    if (loading) {
        return (
            <p>Loading...</p>
        )
    }

    return (
        auth.isValidate ? <Outlet /> : <Navigate to={"/"} replace />
    );
}

export default PrivateRoute;