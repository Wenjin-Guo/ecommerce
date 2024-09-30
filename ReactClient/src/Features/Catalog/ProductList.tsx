
import {  Grid2, } from "@mui/material";
import { Product } from "../../app/models/product";
import ProductCard from "./ProductCard";

interface Props{
    products:Product[];
}


export default function ProductList({products}:Props){
    return( 
    <>
        <Grid2 container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12, lg:12}}>
            {products.map(item=>
            (
                <Grid2 size={{ xs: 2, sm: 4, md: 4, lg:3 }} key={item.id}>
                    <ProductCard item={item} />
                </ Grid2>
            ))}
        </Grid2>
    </>
    )
}