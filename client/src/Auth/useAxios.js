import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import { getCookie } from '../utils';

const base = 'http://localhost:3000/api/';

export const useAxios = () => {
    const axiosInstance = axios.create({
        baseURL: base
    })

    return axiosInstance
}

export const axiosJwt = axios.create({
    baseURL: base
})

axiosJwt.interceptors.request.use( async config => {
    const token = getCookie('auth')
    const date = new Date()
    if(!token) {
        const controller = new AbortController()
        controller.abort()
    };

    const decodedToken = jwtDecode(token)
    if(decodedToken.exp*1000 < date.getTime()) {
        await refresh()
    }

    config.headers.Authorization = `BEARER ${getCookie("auth")}`
    return config;
}, err => Promise.reject(err))

async function refresh() {
    const token = getCookie('token')
    await axios.post(base+"auth/refresh", { token })
    .then(res => {
        document.cookie = `auth= ${res.data.accessToken};`
        document.cookie = `token= ${res.data.refreshToken};`
    })
    .catch(err => console.log(err))
}