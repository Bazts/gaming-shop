import axios from 'axios'

export const api = axios.create({
  withCredentials: true,
  baseURL: 'https://gaming-shop-5846.onrender.com'
})
// https://gaming-shop-5846.onrender.com