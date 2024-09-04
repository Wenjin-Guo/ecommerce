import { Container, Paper, Typography } from "@mui/material";

export default function ServerError(){
    return(
        <Container component={Paper}>
            <Typography gutterBottom variant="h5">
                Server error
            </Typography>
        </Container>
    )
}