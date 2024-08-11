import MenuItems from "./MenuItems";

export default function SideBar({location}) {

    return(
        <div id='sidebar' className="flex flex-col w-[20%] pl-6 pr-12 py-14 font-poppins h-screen fixed bg-gray-50">
            <div className="mt-10 space-y-8 flex select-none flex-col text-white w-full z-10">
                    <MenuItems location={location} symbol="home" name="Home"/>
                    <MenuItems location={location} symbol="search" name="Search"/>
                    <MenuItems location={location} symbol="notifications" name="Notifications"/>
                    <MenuItems location={location} symbol="account_circle" name="Profile"/>
                    <MenuItems location={location} symbol="add" name="Post"/>
            </div>
        </div>
    )
}