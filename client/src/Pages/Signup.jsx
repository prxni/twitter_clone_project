import { useState } from "react"
import { useNavigate } from 'react-router-dom'
import { useAxios } from "../Auth/useAxios"

function Login(){

    const axios = useAxios()
    const navigate = useNavigate()
    const [ errorMsg, setErrorMsg ] = useState("")
    const [ usernameTaken, setUsernameTaken ] = useState(false)

    const handleUsernameChange = (evt) => {
        const username = evt.target.value

        if(username) axios.get(`/user/${evt.target.value}`)
        .then(res => {
            setUsernameTaken(res.data?.username!=null)
        })
    }

    const signup = (evt) => {
        evt.preventDefault()
        const username = evt.target[0].value
        const password = evt.target[1].value
        const email = evt.target[2].value
        const confirm = evt.target[3].value

        // TODO
        // handle invalid username or name values

        if(!username) setErrorMsg("Username is required");
        else if(usernameTaken) setErrorMsg("Username is already taken");
        else if(!password) setErrorMsg("Password is required");
        else if(confirm!=password) setErrorMsg("Password does not match");
        else {
            axios.post('/auth/signup', { username, password, email })
            .then((res) => {
                if(res.data.errorCode!=null) return;
                document.cookie = `auth= ${res.data.accessToken};`
                document.cookie = `token= ${res.data.refreshToken};`
                navigate('/home')
            })
            .catch(err => setErrorMsg(err.message))
        }
    }

    return(
        <div className="bg-gradient-to-r from-purple-100 via-cyan-100 to-purple-100 flex flex-col font-poppins absolute justify-center items-center h-svh w-full border-2">
        <div className="flex flex-col items-center hover:shadow-md bg-white hover:shadow-teal-300 duration-150  gap-5 text-[20px] justify-center py-9 text-center border-blue-200 border-2 shadow-teal-300 shadow-sm rounded-xl w-[30%] h-fit ">
        <h1 className="text-3xl font-semibold select-none ">Sign Up</h1>
        <div className="w-[70%] min-h-6">
            {errorMsg && <div className="flex justify-center items-center gap-x-1 text-rose-500 border-rose-400 border-2 rounded w-full"><span className="material-symbols-outlined inline text-sm select-none">error</span><p className="inline text-sm">{errorMsg}</p></div>}
        </div>
        <form onSubmit={signup} className="flex flex-col items-center gap-5 w-[70%]" >
            <input autoFocus onChange={handleUsernameChange} autoComplete="off" spellCheck="false" className={"text-base border-b-2 outline-none w-full bg-transparent duration-150 " + (usernameTaken ? "border-rose-400" : "hover:border-teal-300 focus-within:border-teal-400")} placeholder="Username"/>
            <input type="password" autoComplete="off" spellCheck="false" className="text-base border-b-2 outline-none w-full hover:border-teal-300 focus-within:border-teal-300 bg-transparent duration-150"  placeholder="Password"/>
            <input autoComplete="off" spellCheck="false" className="text-base border-b-2 outline-none w-full hover:border-teal-300 focus-within:border-teal-300 bg-transparent duration-150" placeholder="Email"/>
            <input type="password" autoComplete="off" spellCheck="false" className="text-base border-b-2 outline-none w-full hover:border-teal-300 focus-within:border-teal-300 bg-transparent duration-150" placeholder="Confirm Password"/>
            <button className="text-base p-3 font-semibold border-2 my-3 rounded-lg px-5 py-1 shadow-md hover:shadow-md hover:bg-slate-800 duration-150 bg-black text-white ">Sign Up</button>
        </form>
        </div>
        </div>
    )
}
export default Login