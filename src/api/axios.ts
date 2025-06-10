import axios, { isAxiosError } from 'axios'
// https://gaming-shop-5846.onrender.com
export const api = axios.create({
  withCredentials: true,
  baseURL: 'https://gaming-shop-5846.onrender.com'
})
