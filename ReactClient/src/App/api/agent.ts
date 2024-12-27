/* eslint-disable @typescript-eslint/no-explicit-any */

import axios, { AxiosResponse } from "axios";


axios.defaults.baseURL = import.meta.env.VITE_API_URL;
axios.defaults.withCredentials = true;

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
    get:(url:string, params?:URLSearchParams) => axios.get(url,{params}).then(responseBody),
    post:(url:string, body:object) => axios.post(url,body).then(responseBody),
    put:(url:string, body:object) => axios.put(url,body).then(responseBody),
    del:(url:string) => axios.delete(url).then(responseBody),
    postForm:(url:string, data:FormData) => axios.post(url,data,{
        headers:{'Content-Type' : 'multipart/form-data'}
    }).then(responseBody),
    putForm:(url:string, data:FormData) => axios.put(url,data,{
        headers:{'Content-Type': 'multipart/form-data'}
    }).then(responseBody)
}

const Catalog = {
    list:() => requests.get('Products'),
    details:(id:number) => requests.get(`Product/${id}`),
}

const Basket = {
    get:()=>requests.get('Basket'),
    addItem:(productId:number, quantity:number)=> requests.post(`Basket?productId=${productId}&quantity=${quantity}`,{}),
    removeItem:(productId:number, quantity:number)=> requests.del(`Basket?productId=${productId}&quantity=${quantity}`)
}

const Account = {
    login:(values:any) => requests.post('Account/login',values),
    register:(values:any) => requests.post('Account/register', values),
    currentUser:() => requests.get('Account/currentUser')
}

const Orders = {
    list:() => requests.get('Order/Getorderlist'),
    fetch:(id:number) => requests.get(`Order/${id}`),
    create:(values:any) => requests.post('Order',values)
}



const agent = {
    Catalog,
    Basket,
    Account,
    Orders
}

export default agent;