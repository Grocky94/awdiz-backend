import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { MyContext } from '../context/AuthContext';

const AuthProtected = ({ children }) => {
    const { state } = useContext(MyContext)
    const router = useNavigate();

    useEffect(() => {
        if (!state?.user?.name) {
            router('/login')
        }
    }, [state])

    return state?.user?.name ? children : null;
}

export default AuthProtected