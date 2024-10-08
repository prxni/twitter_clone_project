import { createContext, useState } from "react";
import { axiosJwt } from "./useAxios";
import { useNavigate, useLocation } from "react-router-dom";

export const AuthContext = createContext()

export default function AuthProvider({ children }) {

    const [ user, setUser ] = useState(null)
    const [ name, setName ] = useState(null)
    const [ id, setId ] = useState(null)
    const [ isLoading, setisLoading ] = useState(true)
    const navigate = useNavigate()
    const location = useLocation()

    const authorize = async () => {
        axiosJwt.get('user')
        .then(res => {
            setUser(res.data.username)
            setName(res.data.name)
            setId(res.data.id)
            setisLoading(false)
        })
        .catch(() => {
            if(location.pathname!='/') navigate('/', { replace: true })
            setisLoading(false)
        })
    }
    
    const context = { id, user, name, isLoading, authorize }

    return (
        <AuthContext.Provider value={context}>
            { children }
        </AuthContext.Provider>
    )
}