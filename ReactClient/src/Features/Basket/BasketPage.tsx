import { useEffect, useState } from "react"
import { Basket } from "../../App/Models/Basket";
import axios from "axios";
import { Typography } from "@mui/material";

export function BasketPage(){
    const [loading,setLoading] = useState(true);
    const [basket, setBasket] = useState<Basket|null>(null);
    
    useEffect(()=>{
        const fetchBasket = async()=>{
            try {
                const response = await axios('http://localhost:5000/api/Basket',{
                    method:"get",
                    withCredentials: true
                });
                setBasket(response.data)
                setLoading(false)
            } catch (error) {
                console.error('Error fetching Basket',error)
            }
            
        }
        fetchBasket();
    },[])

    if(loading) return <Typography>Loading....</Typography>
    if(!basket) return <Typography>Basket is empty</Typography>
    return (
        <h1>Buyer Id = {basket?.buyerId}</h1>
    )
}