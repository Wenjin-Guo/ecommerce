import { Avatar, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import { Product } from "../../App/Models/Product";

interface Props{
    item:Product;
}

export default function ProductCard({item}:Props){
    return(
        <ListItem key={item.id}>
            <ListItemAvatar>
                <Avatar src={item.pictureUrl}></Avatar>
            </ListItemAvatar>
            <ListItemText>
                {item.name} - ${item.price}
            </ListItemText>   
        </ListItem>
    )
}