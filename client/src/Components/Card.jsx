import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../Auth/AuthContext"
import { axiosJwt, useAxios } from "../Auth/useAxios"
import Post from "./Post"
import LoadingCircles from "./LoadingCircles"

function Card() {

    const axios = useAxios()
    const { name } = useContext(AuthContext)
    const [ postList, setPostList ] = useState([])
    const [ lastPost, setLastPost ] = useState(null)
    const [ end, setEnd ] = useState(false)
    
    useEffect(() => {
        fetchFeed()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        const current = document.querySelectorAll('#post-list')[0].lastChild
        if(!current) return;

        const observer = new IntersectionObserver((entry) => {
            if(entry[0].isIntersecting) {
                fetchFeed()
                observer.unobserve(current)
            }
        }, { threshold: 0.1 })
        
        observer.observe(current)
        return () => {
            observer.disconnect()
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [postList])

    function fetchFeed() {
        if(end) return;

        axiosJwt.get(`/user/feed${lastPost?.time ? "?time=" + lastPost.time : ""}`)
        .then(res => {
            setLastPost({ id: res.data.last.id, time: res.data.last.timeStamp })
            if(!res.data.last?.id) return setEnd(true);
            
            const promises = res.data.posts.map(async post => {
                return(await axios.get(`/user/id/${post.userId}`)
                .then(user => {
                    return { ...post, username: user.data.username, name: user.data.name }
                }))
            })

            Promise.all(promises).then((posts) => {
                setPostList(curr => {
                    return curr.concat(posts)
                })
            })
        })
    }

    return (
        <div className="m-5 flex flex-col items-center gap-3 min-h-svh">
            <div className="h-[6vh] w-full flex items-center bg-white select-none rounded-lg hover:shadow hover:shadow-cyan-200 duration-150">
                <p className="text-slate-400 p-3 text-lg outline-none rounded-lg">What&apos;s on your mind, {name}?</p>
            </div>

            <div id="post-list" className="w-full flex flex-col items-center gap-3">
                {postList.length>0 && postList.map((post) => {
                    return <Post key={post.id} id={post.id} username={post.username} name={post.name} text={post.text} likes={post.likes} liked={post.liked} time={post.timeStamp} />
                })}
            </div>

            {lastPost && lastPost.id && <LoadingCircles />}
        </div>
    )
}
export default Card