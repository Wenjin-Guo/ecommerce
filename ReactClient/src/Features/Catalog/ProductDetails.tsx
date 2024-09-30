import { Button, Divider, Grid2, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import {  useParams } from "react-router-dom";
import { Product } from "../../app/models/product";
import NotFound from "../../app/errors/NotFound";
import { Basket } from "../../app/models/basket";

function ProductDetails(){
    const {id} = useParams<{id:string}>();
    
    const [product,setProduct] = useState<Product|null>(null);
    const [loading,setLoading] = useState(true);
    //const [submitting, setSubmitting] = useState(false);
    const [basket, setBasket] = useState<Basket|null>(null);

    useEffect(()=>{
        axios.get(`http://localhost:5000/api/products/${id}`)
            .then(response=>setProduct(response.data))
            .catch(error => console.log(error))
            .finally(()=>setLoading(false))
    },[id])

    useEffect(()=>{
        const fetchBasket = async()=>{
            try {
                const response = await axios('http://localhost:5000/api/Basket',{
                    method:"get",
                    withCredentials: true
                });
                setBasket(response.data)
            } catch (error) {
                console.error('Error fetching Basket',error)
            }
            
        }
        fetchBasket();
    },[basket])

    function handleAddItem(id:number){
        
        axios(`http://localhost:5000/api/Basket?productId=${id}&quantity=1`,{ 
            method:"post",
            withCredentials: true 
        })
        .catch(error=>console.log(error))
        
    }
    
    if(loading) return <h3>Loading....</h3>
    if(!product) return <NotFound />

    return(
        <Grid2 container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12}}>
            <Grid2 size={{ xs: 4, sm: 4, md: 6 }}>
                <img src={product.pictureUrl} alt={product.name} style={{width:'100%'}}/>
            </Grid2>
            <Grid2 size={{ xs: 4, sm: 4, md: 6 }}>
                <Typography variant='h3'>{product.name}</Typography>
                <Divider sx={{ mb: 2 }} />
                <Typography variant='h4' color='secondary'>${(product.price / 100).toFixed(2)}</Typography>
                <TableContainer>
                    <Table>
                        <TableBody sx={{ fontSize: '1.1em' }}>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>{product.name}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Description</TableCell>
                                <TableCell>{product.description}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Type</TableCell>
                                <TableCell>{product.type}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Brand</TableCell>
                                <TableCell>{product.brand}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Quantity in stock</TableCell>
                                <TableCell>{product.quantityInStock}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
                
                    
                <Grid2>
                    <Button 
                    onClick={()=>handleAddItem(product.id)}
                    color="primary"
                    size="medium"
                    variant="contained"
                    fullWidth>
                        Add to Cart
                    </Button>
                </Grid2>
                
            </Grid2>
        </Grid2>
    )
}

export default ProductDetails;