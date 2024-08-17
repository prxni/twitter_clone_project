import { useContext, useEffect, useState } from "react"
import Post from "./Post"
import { AuthContext } from "../Auth/AuthContext"
import { axiosJwt, useAxios } from "../Auth/useAxios"

function Card() {

    const { name } = useContext(AuthContext)
    const [ postList, setPostList ] = useState([])
    const axios = useAxios()
    
    useEffect(() => {
        axiosJwt.get('/user/feed')
        .then(res => {
            const promises = res.data.map(async post => {
                return(await axios.get(`/user/id/${post.userId}`)
                .then(user => {
                    return { ...post, username: user.data.username, name: user.data.name }
                }))
            })

            Promise.all(promises).then((posts) => {
                setPostList(posts)
            })
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className="m-5 flex flex-col gap-3 min-h-svh">
            <div className="h-[6vh] flex items-center bg-white select-none rounded-lg hover:shadow hover:shadow-cyan-200 duration-150">
                <p className="text-slate-400 p-3 text-lg outline-none rounded-lg">What&apos;s on your mind, {name}?</p>
            </div>

            {postList.length>0 && postList.map(post => {
                return <Post key={post.id} id={post.id} username={post.username} name={post.name} text={post.text} likes={post.likes} liked={post.liked} />
            })}
        </div>
    )
}
export default Card