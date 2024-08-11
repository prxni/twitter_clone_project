import SideBar from "../Components/SideBar"
import Rightbar from "../Components/Rightbar"
export default function Layout({ children, location }) {

    return (
        <div className="bg-gradient-to-r from-purple-100 via-cyan-100 to-purple-100 flex justify-between gap-0">
            <div className="basis-1/5 shadow shadow-teal-300"><SideBar location={location}/></div>
            <div className="basis-1/2 ">{children}</div>
            <div className="basis-1/5 shadow shadow-teal-300"><Rightbar/></div>
        </div>
    )
}