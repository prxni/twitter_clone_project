import { Link } from "react-router-dom"
function Post()
{
    return(
        <div className="bg-white border-2 rounded-lg shadow-sm  shadow-teal-200 p-3 px-10 m-3 ">
            <Link className="italic text-sm font-semibold text-rose-400 hover:underline duration-100">@username</Link>
            <h1 className="text-cyan-400">Name</h1>
            <p className="p-3">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Temporibus maxime esse accusantium non et, dolores blanditiis minima sunt nemo eaque mollitia, dolorum cupiditate ipsam animi natus reprehenderit exercitationem consequuntur cum!
            </p>
            <div className="flex flex-row gap-3 mt-2 text-slate-600 items-center">
                <div className="flex flex-row justify-center items-center hover:text-red-500">
                    <span className="material-symbols-outlined p-1 ">favorite</span>
                    <p>5.3k</p>
                </div>
                <div className="flex flex-row justify-center items-center hover:text-cyan-400 ">
                    <span className="material-symbols-outlined p-1">chat_bubble</span>
                    <p>265</p>
                </div>
                <span className="material-symbols-outlined text-xl hover:text-cyan-400">share</span>
                <p className="text-slate-400">5hr ago</p>
            </div>
            
        </div>
    )
}
export default Post