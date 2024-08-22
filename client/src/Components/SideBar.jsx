import MenuItems from "./MenuItems";
import { Link } from "react-router-dom";

export default function SideBar({ location, setVisibility }) {

    return(
        <div id='sidebar' className="flex flex-col w-[20%] pl-6 pr-12 py-14 h-screen fixed bg-gray-50">
            <div className="mt-10 space-y-8 flex select-none flex-col items-center text-white w-full z-10">
                    <Link to='/home' className="w-full" ><MenuItems location={location} symbol="home" name="Home"/></Link>
                    <Link to='/search' className="w-full" ><MenuItems location={location} symbol="search" name="Search"/></Link>
                    <Link to='/' className="w-full" ><MenuItems location={location} symbol="notifications" name="Notifications"/></Link>
                    <Link to='/' className="w-full" ><MenuItems location={location} symbol="account_circle" name="Profile"/></Link>
                    <button onClick={() => setVisibility(true)} className="border-2 font-medium text-lg rounded-full border-cyan-300 text-cyan-300 w-[80%] py-1 px-3 hover:bg-cyan-300 hover:text-white duration-150 flex items-center justify-center" >
                        <span className="material-symbols-outlined">add</span>New Post
                    </button>
            </div>
        </div>
    )
}