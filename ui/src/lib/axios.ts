import { MOCKAPI_URL } from "@/global";
import axios from "axios";

export const api = axios.create({
  baseURL: 'https://www.apireal.com/'
})

export const mockApi = axios.create({
  baseURL: MOCKAPI_URL
})

export const fetcherMockAPIGET = (url:string, options=null) => mockApi.get(url, {withCredentials:true}).then(res => res.data)

export const fetcherGET = (url:string, options=null) => api.get(url,{withCredentials:true}).then(res => res.data)
export const fetcherPOST = (url:string, data:object, options=null) => api.post(url, data, {withCredentials:true}).then(res => res.data)
