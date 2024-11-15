import { Basket } from "./basket"

export interface User{
    email:string
    token:string
    firstName:string
    basket?:Basket
}