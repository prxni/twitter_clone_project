import SideBar from "../Components/SideBar"
import Rightbar from "../Components/Rightbar"
import NewPost from "../Pages/NewPost"
import { useState } from 'react'

export default function Layout({ children, location }) {

    const [ newPost, setNewPost ] = useState(false)

    return (
        <div className="bg-gradient-to-r from-purple-100 via-cyan-100 to-purple-100 flex justify-between gap-0">
            <div className="basis-1/5 shadow shadow-teal-300"><SideBar location={location} setVisibility={setNewPost}/></div>
            <div className="basis-1/2 ">{children}</div>
            <div className="basis-1/5 shadow shadow-teal-300"><Rightbar/></div>

            {newPost && <NewPost setVisibility={setNewPost}/>}
        </div>
    )
}