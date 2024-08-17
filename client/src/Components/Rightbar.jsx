import { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { AuthContext } from "../Auth/AuthContext"
import { useAxios } from "../Auth/useAxios"

function Rightbar() {

    const { user } = useContext(AuthContext)
    const [ following, setFollowing ] = useState([])
    const [ followers, setFollowers ] = useState([])
    const axios = useAxios()

    useEffect(() => {
        axios.get(`user/following/${user}`)
        .then((res) => {
            setFollowing(res.data);
        })

        axios.get(`user/followers/${user}`)
        .then((res) => {
            setFollowers(res.data);
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return(
        <div className="fixed bg-white h-svh w-[20%] selection:bg-slate-200">
            <Link className="text-3xl m-4 flex flex-row text-sky-400 hover:text-sky-500 duration-150 select-none items-center cursor-default">Profile <span className="material-symbols-outlined">arrow_forward_ios</span></Link>
            
            <div className="text-xl flex flex-col items-left gap-0">
            
                <div className="flex flex-col rounded-md my-1 mx-3 p-4 text-base">
                    {following.length!=0 &&
                        <div>
                            <p className="text-md text-rose-400 font-semibold">Following</p>  
                                {following.map(user => {
                                    return <p key={user.id} className="px-6 py-2 flex gap-2 cursor-default item-center hover:bg-gray-100 rounded-md items-center group"><span className="material-symbols-outlined select-none">person</span>{user.username}<span className="text-gray-400 text-xs group-hover:opacity-100 opacity-0 duration-150 select-none">({user.name})</span></p>
                                })}
                            <button className="p-2 flex gap-2 text-md items-center hover:text-sky-500 duration-150 select-none">See More <span className="material-symbols-outlined text-lg">arrow_forward_ios</span></button>
                        </div>
                    }
                </div> 
                <div className="flex flex-col rounded-md my-1 mx-3 p-4 text-base">
                    {followers.length!=0 &&
                        <div>
                            <p className="text-md text-rose-400 font-semibold">Followers</p>  
                                {followers.map(user => {
                                    return <p key={user.id} className="px-6 py-2 flex gap-2 cursor-default item-center hover:bg-gray-100 rounded-md items-center group"><span className="material-symbols-outlined select-none">person</span>{user.username}<span className="text-gray-400 text-xs group-hover:opacity-100 opacity-0 duration-150 select-none">({user.name})</span></p>
                                })}
                            <button className="p-2 flex gap-2 text-md items-center hover:text-sky-500 duration-150 select-none">See More <span className="material-symbols-outlined text-lg select-none">arrow_forward_ios</span></button>
                        </div>
                    }
                </div> 
            </div>
        </div>
    )
}
export default Rightbar