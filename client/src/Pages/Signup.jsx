import { Link } from "react-router-dom"
// import DatePicker from "react-datepicker"
// import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";

function Login()
{
    const [date,setDate]=useState(new Date());
    return(
        <div className="bg-gradient-to-r from-purple-100 via-cyan-100 to-purple-100 flex flex-col font-poppins absolute justify-center items-center h-svh w-full border-2">
        <div className="flex flex-col items-center hover:shadow-md bg-white hover:shadow-teal-300 duration-150  gap-5 text-[20px] justify-center py-9 text-center border-blue-200 border-2 shadow-teal-300 shadow-sm rounded-xl w-[30%] h-fit ">
        <h1 className="text-3xl font-semibold select-none ">Sign Up</h1>
        <form className="flex flex-col pt-6 items-center gap-5 w-[70%]" >
            <input className="text-sm border-b-2 focus-within:outline-none w-full hover:border-teal-300 bg-transparent duration-150" placeholder="Username"/>
            <input className="w-full text-sm border-b-2 focus-within:outline-none hover:border-teal-300 bg-transparent duration-150" placeholder="email"/>
            <input className="w-full text-sm  border-b-2 focus-within:outline-none hover:border-teal-300 bg-transparent duration-150"  placeholder="Password"/>
            <input className="text-sm border-b-2 focus-within:outline-none hover:border-teal-300 bg-transparent duration-150 w-full" placeholder="Confirm Password"/>
            <button className="text-base p-3 font-semibold border-2 my-3 rounded-lg  px-5 py-1 shadow-md hover:shadow-md  bg-black text-white ">Sign Up</button>
        </form>
        </div>
        </div>
    )
}
export default Login