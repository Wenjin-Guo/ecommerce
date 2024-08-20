import { Avatar, Button, List, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import { Product } from "../../App/Models/Product";

interface Props{
    products:Product[];
    addProduct:()=>void;
}


export default function Catalog(props:Props){
    return ( 
        <>    
            <List>
                {props.products.map((item,index)=>
                    (<ListItem key={index}>
                        <ListItemAvatar>
                            <Avatar src={item.pictureUrl}></Avatar>
                        </ListItemAvatar>
                        <ListItemText>
                            {item.name} - ${item.price}
                        </ListItemText>
                        
                    </ListItem>))}
            </List>
            <Button variant="contained" onClick={props.addProduct}>Add Product</Button>
        </>
    )
}