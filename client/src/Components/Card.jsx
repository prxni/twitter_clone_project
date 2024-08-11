import { useState } from "react"
import Post from "./Post"

function Card()
{
    const [name,setName]=useState("guest")
    return(
        <div className="m-5 flex flex-col gap-3">
            <div className="border-cyan-300 h-[6vh] flex items-center bg-white select-none rounded-lg hover:shadow-md hover:shadow-cyan-300 ">
                <p className="text-slate-400 p-3 text-lg outline-none rounded-lg">What's on your mind, {name}?</p>
            </div>
            <Post/>
            <Post/>
            <Post/>
            <Post/>
            <Post/>
            <Post/>
            <Post/>
            <Post/>
        </div>
    )
}
export default Card