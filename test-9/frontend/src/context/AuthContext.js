import { createContext, useEffect, useReducer } from "react";
// import axios from "axios";
import api from "../component/ApiConfig";

export const MyContext = createContext()

const initialValue = { user: null }
const reduce = (state, action) => {
    switch (action.type) {
        case "Login":
            return { user: action.payload }
        case "Logout":
            return { user: null }
        default:
            return state
    }
}

const AuthContext = ({ children }) => {
    const [state, dispatch] = useReducer(reduce, initialValue)
    useEffect(() => {
        async function currentUser() {
            const token = JSON.parse(localStorage.getItem("token"))
            if (token) {
                const response = await api.post("/get-current-user", { token })
                if (response.data.success) {
                    dispatch({
                        type: "Login",
                        payload: response.data.user
                    })
                } else {
                    dispatch({
                        type: "Logout"
                    })
                }
            }
        }
        currentUser()
    }, [])

    return (
        <MyContext.Provider value={{ state, dispatch }}>
            {children}
        </MyContext.Provider>
    )
}
export default AuthContext;