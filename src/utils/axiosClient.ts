import axios from "axios"

let mainURL = 'https://api.themoviedb.org/3/discover'
export const axiosClient = axios.create({
    baseURL: mainURL
})