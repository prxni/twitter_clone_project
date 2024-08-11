import { Link, useNavigate } from "react-router-dom"
import { useAxios } from '../Auth/useAxios'
import { useContext, useEffect } from "react"
import { AuthContext } from "../Auth/AuthContext"

function Login() {

    const axios = useAxios()
    const navigate = useNavigate()
    const { authorize, user, isLoading } = useContext(AuthContext)

    useEffect(() => {
        authorize()
        .then(() => {
            if(user) navigate('/home');
        })
    })

    const login = (evt) => {
        evt.preventDefault()
        const username = evt.target[0].value
        const password = evt.target[1].value
        
        axios.post('/auth/login', { username, password })
        .then(res => {
            document.cookie = `auth= ${res.data.accessToken};`
            document.cookie = `token= ${res.data.refreshToken};`
            navigate('/home')
        })
    }

    return(
        <div className="bg-gradient-to-r from-purple-100 via-cyan-100 to-purple-100 flex flex-col font-poppins absolute justify-center items-center h-svh w-full border-2">
            {!isLoading && !user && <div className="flex flex-col items-center hover:shadow-md duration-150 bg-white hover:shadow-teal-300 gap-5 text-[20px] justify-center py-9 text-center border-blue-200 border-2 shadow-teal-300 shadow-sm rounded-xl w-[30%] h-fit ">
                <h1 className="text-3xl font-semibold select-none ">Login</h1>
                <form onSubmit={login} className="flex flex-col pt-6 items-center gap-3 w-[70%]" >
                    <input autoComplete="off" spellCheck="false" className="text-lg border-b-2 w-[80%] outline-none focus-within:border-teal-300 hover:border-teal-300 bg-transparent duration-150" placeholder="Username"/>
                    <input autoComplete="off" spellCheck="false" className="text-lg border-b-2 w-[80%] outline-none focus-within:border-teal-300 hover:border-teal-300 bg-transparent duration-150"  placeholder="Password"/>
                    <button className="cursor-default text-base font-semibold border-2 mt-5 mb-2 rounded-lg hover:bg-slate-900 duration-200 hover:text-cyan-100 px-5 py-1 bg-black text-white">Login</button>
                </form>

                <p className="text-sm space-x-1">
                    <span>Don&apos;t have an account?</span>
                    <Link className="group border-b-2 border-transparent font-medium hover:border-teal-300 duration-200" to="/signup">Sign Up 
                    <span className="material-symbols-outlined relative top-[2px] font-semibold group-hover:text-teal-300 text-base duration-200">open_in_new</span>
                    </Link>
                </p>
            </div>}
        </div>
    )
}
export default Login