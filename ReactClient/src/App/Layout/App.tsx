import { useState, useEffect} from 'react';
import { createTheme, responsiveFontSizes, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Container } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchCurrentUser } from '../../features/account/accountSlice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store/configureStore';
import { fetchBasketAsync } from '../../features/basket/basketSlice';

// Augment the palette to include an ochre color
declare module '@mui/material/styles' {
  interface Palette {
    ochre: Palette['primary'];
  }

  interface PaletteOptions {
    ochre?: PaletteOptions['primary'];
  }
}

// Update the Button's color options to include an ochre option
declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    ochre: true;
  }
}

let lightTheme = createTheme({
  palette: {
    mode: 'light',
    ochre: {
      main: '#E3D026',
      light: '#E9DB5D',
      dark: '#A29415',
      contrastText: '#242105',
    },
  },
});

let darkTheme = createTheme({
  palette: {
    mode: 'dark',
    ochre: {
      main: '#E3D026',
      light: '#E9DB5D',
      dark: '#A29415',
      contrastText: '#242105',
    },
  },
});

lightTheme = responsiveFontSizes(lightTheme);
darkTheme = responsiveFontSizes(darkTheme);

function App() {

  const dispatch = useDispatch<AppDispatch>();

  // Set initial theme based on localStorage
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  

  useEffect(() => {
    localStorage.setItem('theme', theme);
      dispatch(fetchCurrentUser());
      dispatch(fetchBasketAsync());
  }, [dispatch,theme])

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <CssBaseline />
      <Header theme={theme} toggleTheme={toggleTheme} />
      <Container >
        <Outlet />
      </Container>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        stacked 
        theme={theme}
      />
    </ThemeProvider>
  );
};

export default App;
