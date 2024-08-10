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