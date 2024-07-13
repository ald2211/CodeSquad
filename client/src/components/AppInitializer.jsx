import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetch_user } from '../Redux/user/userSlice';
import spinner from '../assets/loader.gif'

const AppInitializer = ({ children }) => {
    const dispatch = useDispatch();
    const { loading, currentUser } = useSelector((state) => state.user);
    const [initialized, setInitialized] = useState(false);
    useEffect(() => {
        const initializeApp = async () => {
            const token = localStorage.getItem('accessToken');
            if (token) {
                 dispatch(fetch_user());
                 
            }
            setInitialized(true);
        };
        initializeApp();
    }, []);

    if (loading || !initialized) {
        return <div className="w-full h-screen flex items-center justify-center">
        <img className="w-[60px]" src={spinner} alt="spinner" />
      </div>
    }

    return <>{children}</>;
};

export default AppInitializer;
