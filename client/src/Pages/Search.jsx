import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../Auth/AuthContext"
import Layout from "../Layouts/Layout"
import { useAxios } from "../Auth/useAxios"
import FollowButton from "../Components/FollowButton"


export default function Search() {

    const { authorize, user, isLoading } = useContext(AuthContext)
    const [ userList, setUserList ] = useState([])
    const axios = useAxios()

    useEffect(() => {
        authorize()
    })

    const search = (evt) => {
        axios.get(`user/search/${evt.target.value}`)
        .then(res => {
            setUserList(res.data)
        })
    }

    return (
        <div>
            {!isLoading &&
                <Layout>
                    <div className="min-h-svh h-fit flex flex-col gap-y-10 py-[3svh] items-center">
                        <input onChange={search} className="p-2 px-3 rounded-lg outline-none w-[70%]" type="text"placeholder="Search..." />
                        <div className="w-full flex flex-col gap-8 items-center">
                            {userList.length>0 && userList.map( resUser => {
                                return (
                                    <div className="bg-white px-8 rounded-full w-[80%] grid grid-cols-3 gap-2 h-[8svh] items-center cursor-default shadow-[0_0_2px] shadow-cyan-400 hover:shadow-[0_0_4px] hover:shadow-cyan-400 duration-150" key={resUser.username}>
                                        <span className="grid-start-1 col-span-2 font-semibold text-center flex items-center justify-start gap-2">
                                            <span className="material-symbols-outlined select-none">person</span>
                                            <span className="text-cyan-400 italic max-w-[40%] truncate">@{resUser.username}</span>
                                            <span className="p-2 font-normal max-w-[50%] truncate">{resUser.name}</span>
                                        </span>
                                        <FollowButton user={user} username={resUser.username}/>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </Layout>
            }
        </div>
    )
}