import { createContext, useState } from "react";
import { axiosJwt } from "./useAxios";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext()

export default function AuthProvider({ children }) {

    const [ user, setUser ] = useState(null)
    const [ isLoading, setisLoading ] = useState(true)
    const navigate = useNavigate()

    const authorize = async () => {
        axiosJwt.get('user')
        .then(res => {
            setUser(res.data.username)
            setisLoading(false)
        })
        .catch(() => {
            navigate('/')
        })
    }
    
    const context = { user, isLoading, authorize }

    return (
        <AuthContext.Provider value={context}>
            { children }
        </AuthContext.Provider>
    )
}