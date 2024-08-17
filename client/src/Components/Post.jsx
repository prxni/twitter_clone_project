import { useState } from "react"
import { Link } from "react-router-dom"
import { axiosJwt } from "../Auth/useAxios"

function Post({ id, username, name, text, likes, liked }){

    const [ hasLiked, setHasLiked ] = useState(liked)
    const [ likeNo, setLikeNo ] = useState(likes)

    const unlike = () => {
        axiosJwt.post('posts/unlike', { postId: id })
        .then(() => {
            setHasLiked(false)
            setLikeNo(num => num - 1)
        })
    }

    const like = () => {
        axiosJwt.post('posts/like', { postId: id })
        .then(() => {
            setHasLiked(true)
            setLikeNo(num => num + 1)
        })
    }

    return (
        <div className="bg-white rounded-lg shadow-sm hover:shadow-[0_0_10px_2px] hover:shadow-cyan-200 duration-150 p-3 px-10 m-3 selection:bg-slate-200">
            <div>
            <Link className="italic text-sm font-semibold text-rose-400 hover:underline decoration-2 duration-100">@{username}</Link>
            <span className="text-gray-400 px-2 text-xs font-semibold">({name})</span>
            </div>

            <p className="px-1 my-3">{text}</p>
            <div className="flex flex-row gap-2 mt-2 text-slate-600 items-center select-none">
                {hasLiked ? 
                    <div onClick={unlike} className="flex flex-row justify-center items-center text-rose-500 duration-150">
                        <span className="material-symbols-outlined p-1 [font-variation-settings:'FILL'1]">favorite</span>
                        <p className="min-w-3">{likeNo}</p>
                    </div>
                :
                    <div onClick={like} className="flex flex-row justify-center items-center hover:text-rose-500 duration-150">
                        <span className="material-symbols-outlined p-1">favorite</span>
                        <p className="min-w-3">{likeNo}</p>
                    </div>
                }

                <div className="flex flex-row justify-center items-center hover:text-cyan-400 duration-150">
                    <span className="material-symbols-outlined p-1">chat_bubble</span>
                </div>

                <span className="material-symbols-outlined text-xl hover:text-cyan-400 duration-150">share</span>
                <p className="text-slate-400">5hr ago</p>
            </div>
            
        </div>
    )
}
export default Post