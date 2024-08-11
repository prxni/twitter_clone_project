
export default function MenuItems({symbol,name,location}) {

    return(
            <div className={"flex font-normal items-center justify-center w-full hover:bg-sky-500 hover:text-white duration-100 rounded-full px-8 py-2 text-xl gap-x-1 " + (location==name.toLowerCase() ? "bg-sky-500 text-white [font-variation-settings:'FILL'_1]" : "text-cyan-800")}>
                <span className="material-symbols-outlined">{symbol}</span>
                <span className="">{name}</span>
            </div>
    )
}