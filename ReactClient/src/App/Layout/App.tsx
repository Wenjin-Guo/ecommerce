
import { useCallback, useState } from "react";
import Header from "./Header";
import { Container, createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { Outlet } from "react-router-dom";



function App() {

  const [darkMode, setDarkMode] = useState(false);
  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
  });

  const setViewMode = useCallback(() => {
    setDarkMode(prevMode => !prevMode);
  }, []);
  
  return (
    
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header setViewMode={setViewMode} />
      
      <Container>
        <Outlet />
      </Container>
      
    </ThemeProvider>
  )
}

export default App;
