import { Container, Paper, Typography } from "@mui/material";

export default function NotFound(){
    return(
        <Container component={Paper} >
            <Typography gutterBottom variant="h3">
                404 Error
            </Typography>
        </Container>
    )
}