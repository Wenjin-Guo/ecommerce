import { useEffect, useState } from "react"
import { Basket } from "../../App/Models/Basket";
import axios from "axios";
import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { Add, DeleteForever, Remove } from "@mui/icons-material";

export function BasketPage(){

    const TAX_RATE = 0.13;

    function ccyFormat(num: number) {
        return `${num.toFixed(2)}`;
    }

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

    const invoiceSubtotal = basket?.items.reduce((total,item)=>{;
        return total +  item.price*item.quantity/100 ;
    },0)||0;
    const invoiceTaxes = TAX_RATE * invoiceSubtotal;
    const invoiceTotal = invoiceTaxes + invoiceSubtotal;

    if(loading) return <Typography>Loading....</Typography>
    if(!basket) return <Typography>Basket is empty</Typography>



    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="spanning table">
                <TableHead>
                    <TableRow>
                        <TableCell >Product</TableCell>
                        <TableCell align="right">Price</TableCell>
                        <TableCell align="right">Quantity</TableCell>
                        <TableCell align="right">Subtotal</TableCell>
                        <TableCell align="right"></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {basket.items.map((item) => (
                        <TableRow key={item.productId}>
                            <TableCell>{item.name}</TableCell>
                            <TableCell align="right">${ccyFormat(item.price/100)}</TableCell>
                            <TableCell align="right">
                                <IconButton >
                                    <Add/>
                                </IconButton>  
                                {item.quantity}
                                <IconButton >
                                    <Remove/>
                                </IconButton> 
                            </TableCell>
                            <TableCell align="right">{ccyFormat((item.price/100)*item.quantity)}</TableCell>
                            <TableCell align="center">
                                <IconButton color="error">
                                    <DeleteForever fontSize="small" />
                                </IconButton>   
                            </TableCell>
                        </TableRow>
                    ))}
                    <TableRow>
                        <TableCell rowSpan={3} />
                        <TableCell colSpan={2}>Subtotal</TableCell>
                        <TableCell align="right">{ccyFormat(invoiceSubtotal)}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell colSpan={2}>Tax</TableCell>
                        <TableCell align="right">{ccyFormat(invoiceTaxes)}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell colSpan={2}>Total</TableCell>
                        <TableCell align="right">{ccyFormat(invoiceTotal)}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    )
}