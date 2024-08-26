
import Catalog from "../../Features/Catalog/Catalog";
import Header from "./Header";
import { Container, CssBaseline } from "@mui/material";


function App() {

  

  return (
    
    <>
      <CssBaseline />
      <Header />
      <Container>
        <Catalog  />
      </Container>
      
    </>
      
   
  )
}

export default App
