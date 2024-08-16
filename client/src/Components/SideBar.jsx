import MenuItems from "./MenuItems";
import { Link } from "react-router-dom";

export default function SideBar({location}) {

    return(
        <div id='sidebar' className="flex flex-col w-[20%] pl-6 pr-12 py-14 h-screen fixed bg-gray-50">
            <div className="mt-10 space-y-8 flex select-none flex-col text-white w-full z-10">
                    <Link to='/home'><MenuItems location={location} symbol="home" name="Home"/></Link>
                    <Link to='/search'><MenuItems location={location} symbol="search" name="Search"/></Link>
                    <Link to='/'><MenuItems location={location} symbol="notifications" name="Notifications"/></Link>
                    <Link to='/'><MenuItems location={location} symbol="account_circle" name="Profile"/></Link>
                    <Link to='/'><MenuItems location={location} symbol="add" name="Post"/></Link>
            </div>
        </div>
    )
}