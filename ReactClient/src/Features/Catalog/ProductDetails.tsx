import { Typography } from "@mui/material";
import { useParams } from "react-router-dom";

function ProductDetails(){
    const {id} = useParams<{id:string}>();
    console.log(id);
    
    
    return(
        <Typography variant="h2">
            product details
        </Typography>
    )
}

export default ProductDetails;