import axios from "axios"

// const token = JSON.parse(localStorage.getItem("token"));

const api = axios.create({
    baseURL: 'http://localhost:5000/api/v1',
    // headers: { "Authorization": `Bearer ${token}` }
})

export default api
