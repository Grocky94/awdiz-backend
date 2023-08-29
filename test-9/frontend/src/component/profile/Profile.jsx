import React, { useContext, useEffect, useState } from 'react'
// import axios from 'axios';
import { toast } from 'react-hot-toast';
import { MyContext } from '../../context/AuthContext';
import AuthProtected from "../../common/AuthProtected";
import "./Profile.css"
import api from '../ApiConfig';

const Profile = () => {
    const { state } = useContext(MyContext)
    // console.log(state , "profile")
    const [number, setNumber] = useState(); // to store number
    const [otp, setOtp] = useState() // to store otp
    const [isNumberVerified, setIsNumberVerified] = useState(true) // to cross verify number
    console.log(isNumberVerified)
    const [isotpSend, setIsOtpSent] = useState(false); // to cross check send otp


    const sendOtp = async () => {
        try {
            const response = await api.post("/send-otp", { userId: state?.user?._id })

            if (response?.data?.success) {
                setIsOtpSent(true)
                toast.success("otp has sent to your number, please verify")
            }
        } catch (error) {
            console.log(error)
        }
    }

    const verifyOtp = async () => {
        if (otp) {
            try {
                const response = await api.post("/verify-otp", { userId: state?.user?._id, otp })
                if (response?.data?.success) {
                    // console.log(response.data, "from verify OTP")
                    setIsOtpSent(false);
                    setIsNumberVerified(response.data.isNumberVerified)
                    toast.success("OTP is verified")
                }
                else {
                    toast.error(response.data.message)
                    setIsNumberVerified(false)
                }
            } catch (error) {
                console.log(error)
            }
        } else {
            toast.error("enter otp")
        }
    }
    useEffect(() => {

        const getNumber = async () => {
            // alert("app running")
            try {
                const response = await api.post("/get-number", { userId: state?.user?._id })
                if (response?.data?.success) {
                    setNumber(response.data.number)
                    setIsNumberVerified(response.data.isNumberVerified)
                }
            } catch (error) {
                console.log(error);
            }
        }
        if (state?.user?.userId) {
            getNumber()
        }
    }, [state])

    return (
        <AuthProtected>
            <div id="body-of-profile">
                <div id="form-of-profile">
                    <p>Your Profile</p>
                    <p>Complete Your Verification</p>
                    <p>Your Number:{state?.user?.number}</p>
                    {isNumberVerified ? (<p>Your number has been Verified.</p>) : (<button id='verify-btn' onClick={() => { setIsOtpSent(true); sendOtp() }}>Verify Your Number</button>)}<br />
                    {isotpSend ? <><input id="otp-input" onChange={(event) => setOtp(event.target.value)} placeholder='Type your otp' /><br />
                        <button id="submit-otp-check-btn" onClick={verifyOtp} >Submit Otp</button></> : " "}
                </div>
            </div>
        </AuthProtected>
    )
}

export default Profile
