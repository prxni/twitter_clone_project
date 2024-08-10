export default function MenuItems({symbol,name})
{
    return(
            <div className="flex items-center w-[80%]">
                <span className="material-symbols-outlined">{symbol}</span>
                <span >{name}</span>
            </div>
    )
}