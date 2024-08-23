
import { List } from "@mui/material";
import { Product } from "../../App/Models/Product";
import ProductCard from "./ProductCard";

interface Props{
    products:Product[];
}


export default function ProductList({products}:Props){
    return( 
    <>
        <List>
            {products.map(item=>
            (
                <ProductCard item={item} />
            ))}
        </List>
    </>
    )
    
}