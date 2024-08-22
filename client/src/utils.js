export const getCookie = (key) => {
    const arr = document.cookie?.split(";")
    const cookies = arr?.map(cookie => {
        let vals = cookie.split('=')

        return {
            type: vals[0]?.trim(),
            value: vals[1]?.trim()
        }
    })

    const token = cookies?.find(cookie => cookie.type===key)
    return token?.value
}

export const getTime = (str) => {
    const current = new Date()
    const time = new Date(str)
    if(time=="Invalid Date") throw new Error("Cannot cast value to type date: ", time);

    if(current.getFullYear() - time.getFullYear()!=0) return (current.getFullYear() - time.getFullYear() + "y");
    if(current.getDate() - time.getDate()>7) return (parseInt(((current.getMonth() - time.getMonth())*30 + (current.getDate() - time.getDate()))/7) + "w");
    if(current.getDate() - time.getDate()!=0) return (current.getDate() - time.getDate() + "d");
    if(current.getMinutes() - time.getMinutes()!=0) return (current.getMinutes() - time.getMinutes() + "m");
    if(current.getSeconds() - time.getSeconds()!=0) return (current.getSeconds() - time.getSeconds() + "s");

    return ''
}