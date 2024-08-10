import MenuItems from "./MenuItems";

export default function SideBar()
{
    return(
        <div className="flex w-72  h-screen bg-black top-2 px-10">
            <div className="mt-10 space-y-7 flex select-none flex-col text-2xl text-yellow-100 font-serif">
                <MenuItems  symbol="home" name="Home"/>
                <MenuItems  symbol="search" name="Search"/>
                <MenuItems  symbol="favorite" name="Likes"/>
                <MenuItems  symbol="notifications" name="Notifications"/>
                <MenuItems  symbol="bookmark" name="Saved"/>
                <button className=" bg-blue-500 hover:bg-blue-400 rounded-md border-2 w-full font-mono font-bold">Post</button>

            </div>
        </div>
    )
}