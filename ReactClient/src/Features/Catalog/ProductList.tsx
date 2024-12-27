
import { Grid } from "@mui/material";
import ProductCard from "./ProductCard";
import { Product } from "../../app/models/product";

interface Props{
    products:Product[];
}


export default function ProductList({products}:Props){
    return( 
    <>
        <Grid container spacing={2}>
            {products.map(item=>
            (
                <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
                    <ProductCard item={item} />
                </ Grid>
            ))}
        </Grid>
    </>
    )
}