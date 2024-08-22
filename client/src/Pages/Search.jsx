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

        // TODO
        // handle invalid search values which disrupt regex

        const val = evt.target.value.trim().toLowerCase()
        if(!val) return setUserList([]);
        axios.get(`user/search/${val}`)
        .then(res => {
            setUserList(res.data)
        })
    }

    return (
        <div className="selection:bg-slate-200">
            {!isLoading &&
                <Layout location="search">
                    <div className="min-h-svh h-fit flex flex-col gap-y-10 py-[3svh] items-center">
                        <input onChange={search} autoFocus autoComplete="off" spellCheck="false" className="p-2 px-4 rounded-lg outline-none w-[70%] select-text caret-slate-400" type="text"placeholder="Search..." />

                        {userList.length!=0 && <div className="flex flex-col items-center bg-white rounded-xl w-[80%] shadow px-6 py-5">
                            {userList.length>0 && userList.map( resUser => {
                                return (
                                    <div className="bg-white hover:bg-slate-100 px-4 py-2 rounded-sm w-full grid grid-cols-3 gap-2 items-center cursor-default duration-150" key={resUser.username}>
                                        <span className="grid-start-1 col-span-2 font-semibold text-center flex items-center justify-start gap-2">
                                            <span className="material-symbols-outlined select-none">person</span>
                                            <span className="text-cyan-400 italic max-w-[40%] truncate">@{resUser.username}</span>
                                            <span className="p-2 text-slate-400 font-normal max-w-[50%] truncate">{resUser.name}</span>
                                        </span>
                                        <FollowButton user={user} username={resUser.username}/>
                                    </div>
                                )
                            })}
                        </div>}
                    </div>
                </Layout>
            }
        </div>
    )
}