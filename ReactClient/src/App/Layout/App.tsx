
import { useState } from "react";
import Catalog from "../../Features/Catalog/Catalog";
import Header from "./Header";
import { Container, createTheme, CssBaseline, ThemeProvider } from "@mui/material";



function App() {

  const [darkMode, setDarkMode] = useState(false);
  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
  });

  const setViewMode =  ()=>{
    setDarkMode(prevMode => !prevMode)
  };

  return (
    
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header setViewMode={setViewMode} />
      
      <Container>
        <Catalog  />
      </Container>
      
    </ThemeProvider>
      
   
  )
}

export default App
