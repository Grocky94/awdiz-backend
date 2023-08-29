import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { MyContext } from '../../context/AuthContext';
import AuthProtected from "../../common/AuthProtected";
import "./Profile.css"

const Profile = () => {
    const { state } = useContext(MyContext)
    // console.log(state)
    const [number, setNumber] = useState(); // to store number
    const [otp, setOtp] = useState() // to store otp
    const [isNumberVerified, setIsNumberVerified] = useState(false) // to cross verify number
    const [isotpSend, setIsOtpSent] = useState(false); // to cross check send otp


    const sendOtp = async () => {
        try {
            const response = await axios.post("http://localhost:5000/send-otp", { userId: state?.user?._id })

            if (response?.data?.success) {
                setIsOtpSent(true)
                toast.success("otp has sent to your number, please verify")
            }
        } catch (error) {
            console.log(error)
        }
    }

    const verifyOtp = async () => {
        try {
            const response = await axios.post("http://localhost:5000/verify-otp", { userId: state?.user?._id, otp })
            if (response?.data?.success) {
                console.log(response.data, "from verify OTP")
                setIsOtpSent(false);
                setIsNumberVerified(response.data.isNumberVerified)
                toast.success("OTP is verified")
            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        try {
            const getNumber = async () => {
                // alert("app running")
                const response = await axios.post("http://localhost:5000/get-number", { userId: state?.user?._id })
                if (response?.data?.success) {
                    console.log(response.data.number)
                    setNumber(response.data.number)
                    setIsNumberVerified(response.data.isNumberVerified)
                }
            }
            if (state?.user?.userId) {
                getNumber()
            }
        }
        catch (error) {
            console.log(error)
        }
    }, [state])

    return (
        <AuthProtected>
            <div id="body-of-profile">
                <div id="form-of-profile">
                    <p>Your Profile</p>
                    <p>Complete Your Verification</p>
                    <p>Your Number:{state?.user?.number}</p>
                    {isNumberVerified ? <p>Your number has been Verified.</p> : <button id='verify-btn' onClick={() => { setIsOtpSent(true); sendOtp() }}>Verify Your Number</button>}<br />
                    {isotpSend ? <><input id="otp-input" onChange={(event) => setOtp(event.target.value)} placeholder='Type your otp' /><br />
                        <button id="submit-otp-check-btn" onClick={verifyOtp} >Submit Otp</button></> : " "}
                </div>
            </div>
        </AuthProtected>
    )
}

export default Profile
