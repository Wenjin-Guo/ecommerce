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

let lightTheme = createTheme({
  palette: {
    mode: 'light',
  },
});

let darkTheme = createTheme({
  palette: {
    mode: 'dark',
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
