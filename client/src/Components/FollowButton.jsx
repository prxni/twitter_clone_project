import { useEffect, useState } from "react"
import { axiosJwt, useAxios } from "../Auth/useAxios"

export default function FollowButton({ user, username }) {

    const [ searchLoading, setSearchLoading ] = useState(true)
    const [ follows, setFollows ] = useState(null)
    const axios = useAxios()

    useEffect(() => {
        axios.get(`user/${user}/follows/${username}`)
        .then(res => {
            setFollows(res.data)
            setSearchLoading(false)
        })
    })

    const follow = () => {
        axiosJwt.post('user/follow/', { username })
        .then(() => setFollows(true))
        
    }
    
    const unfollow = () => {
        axiosJwt.post('user/unfollow/', { username })
        .then(() => setFollows(false))
    } 

    return (
        <div>
            {!searchLoading && !follows && user!==username &&
            <button onClick={follow} className="text-cyan-400 font-medium border-2 border-cyan-400 rounded-full w-fit justify-self-end px-3 py-1 hover:bg-cyan-400 hover:text-white duration-150">
                <span>Follow</span>
            </button>}

            {!searchLoading && follows && user!==username &&
            <button onClick={unfollow} className="text-emerald-400 font-medium border-2 border-emerald-400 rounded-full w-fit justify-self-end px-3 py-1 hover:bg-emerald-400 hover:text-white duration-150">
                <span>Following</span>
            </button>}
        </div>
    )
}