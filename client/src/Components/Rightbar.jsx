import { Link } from "react-router-dom"
function Rightbar()
{
    return(
        <div className="fixed bg-white h-svh w-[20%]">
            <Link className="text-3xl p-4 flex flex-row text-sky-500 select-none items-center cursor-default">Profile <span class="material-symbols-outlined">arrow_forward_ios</span></Link>
            
            <div className="text-xl flex flex-col items-left gap-0">
            
                <div className="flex flex-col rounded-md my-1 mx-3 p-4 text-base">
                    <p className="text-md text-rose-400 font-semibold">Followers</p>   
                    <p className="px-6 py-2 flex gap-2 cursor-default item-center hover:bg-gray-100 rounded-sm "><span class="material-symbols-outlined">person</span>Kulli</p>
                    <p className="px-6 py-2 flex gap-2 cursor-default item-center hover:bg-gray-100 rounded-sm "><span class="material-symbols-outlined">person</span>Raman</p>
                    <p className="px-6 py-2 flex gap-2 cursor-default item-center hover:bg-gray-100 rounded-sm "><span class="material-symbols-outlined">person</span>Prani</p>
                    <button className="p-2 flex gap-2 text-md items-center hover:text-sky-500 duration-150">See More <span className="material-symbols-outlined text-lg">arrow_forward_ios</span></button>
                </div> 
                <div className="flex flex-col rounded-md my-1 mx-3 p-4 text-base">
                    <p className="text-md text-rose-400 font-semibold">Following</p>   
                    <p className="px-6 py-2 flex gap-2 cursor-default item-center hover:bg-gray-100 rounded-sm "><span class="material-symbols-outlined">person</span>Kulli</p>
                    <p className="px-6 py-2 flex gap-2 cursor-default item-center hover:bg-gray-100 rounded-sm "><span class="material-symbols-outlined">person</span>Raman</p>
                    <p className="px-6 py-2 flex gap-2 cursor-default item-center hover:bg-gray-100 rounded-sm "><span class="material-symbols-outlined">person</span>Prani</p>
                    <button className="p-2 flex gap-2 text-md items-center hover:text-sky-500 duration-150">See More <span className="material-symbols-outlined text-lg">arrow_forward_ios</span></button>
                </div> 
            </div>
        </div>
    )
}
export default Rightbar