

import './App/Layout/styles.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { StrictMode } from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './App/Router/Routes';
import ReactDOM from 'react-dom/client';



const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
);
