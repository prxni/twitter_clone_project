import { useContext } from "react"
import Post from "./Post"
import { AuthContext } from "../Auth/AuthContext"

function Card() {
    const { name } = useContext(AuthContext)

    return (
        <div className="m-5 flex flex-col gap-3">
            <div className="h-[6vh] flex items-center bg-white select-none rounded-lg hover:shadow hover:shadow-cyan-200 duration-150">
                <p className="text-slate-400 p-3 text-lg outline-none rounded-lg">What&apos;s on your mind, {name}?</p>
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