import React, { useContext, useEffect } from 'react'
import { MyContext } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const SellerProcted = ({ children }) => {
    const { state } = useContext(MyContext)
    const Route = useNavigate

    useEffect(() => {
        if (state?.user?.role != "Seller") {
            Route("/")
        }
    }, [state])

    return state?.user?.role == "Seller" ? children : null
}

export default SellerProcted
