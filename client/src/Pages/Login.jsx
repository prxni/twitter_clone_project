import { Link } from "react-router-dom"
function Login()
{
    return(
        <div className="bg-gradient-to-r from-purple-100 via-cyan-100 to-purple-100 flex flex-col font-poppins absolute justify-center items-center h-svh w-full border-2">
        <div className="flex flex-col items-center hover:shadow-md bg-white hover:shadow-teal-300 gap-5 text-[20px] justify-center py-9 text-center border-blue-200 border-2 shadow-teal-300 shadow-sm rounded-xl w-[30%] h-fit ">
        <h1 className="text-3xl font-semibold select-none ">Login</h1>
        <form className="flex flex-col pt-6 items-center gap-3 w-[70%]" >
            <input className="text-lg border-b-2 focus-within:outline-none hover:border-teal-300 bg-transparent duration-150" placeholder="Username"/>
            <input className="text-lg  border-b-2 focus-within:outline-none hover:border-teal-300 bg-transparent duration-150"  placeholder="Password"/>
            <button className="text-base font-semibold border-2 my-3 rounded-lg hover:bg-slate-900 hover:text-cyan-100 px-5 py-1 shadow-md hover:shadow-md hover:shadow-teal-300 bg-black text-white">Login</button>
        </form>
        <p className="text-sm">Don't have an account <Link className=" border-b-2 border-transparent hover:border-b-2 hover:border-teal-300 duration-150" to="/signup">Sign Up</Link></p>
        </div>
        </div>
    )
}
export default Login