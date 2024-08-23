import { useContext } from "react"
import { AuthContext } from "../Auth/AuthContext"
import { Link } from "react-router-dom"
import { axiosJwt } from "../Auth/useAxios"

export default function NewPost({ setVisibility }) {

    const { user, name } = useContext(AuthContext)

    const post = () => {
        const text = document.querySelector("#new-post-text").value
        axiosJwt.post('posts/new', { text })
        .then(() => {
            setVisibility(false)
        })
    }

    return (
        <div className="fixed w-full h-full flex justify-center items-center bg-black bg-opacity-80">
            <div className="bg-white rounded-lg py-5 px-10 w-[40%] h-fit flex flex-col">
                <div>
                    <Link className="text-sm font-semibold text-rose-600 italic hover:underline decoration-2">@{user}</Link>
                    <span className="text-gray-400 px-2 text-xs not-italic font-medium">({name})</span>
                </div>

                <textarea id="new-post-text" autoFocus spellCheck="false" className="border-2 w-full h-[25svh] rounded border-cyan-200 resize-none py-2 px-3 my-3 outline-none focus-within:border-cyan-300 hover:border-cyan-300 duration-150 caret-slate-500" />

                <div className="self-end px-3 mb-1 mt-2">
                    <button onClick={() => setVisibility(false)} className="px-3 py-1 mx-2 text-white rounded-md text-sm bg-rose-400 font-medium">Cancel</button>
                    <button onClick={post} className="px-5 py-1 mx-2 text-white font-medium rounded-md bg-sky-500">Post</button>
                </div>
            </div>
        </div>
    )
}