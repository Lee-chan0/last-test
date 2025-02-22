import React from 'react';
import ReactDOM from 'react-dom/client';
import Main from './Main';
import { ThemeContextProvider } from './Contexts/ThemeContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ThemeContextProvider>
    <Main />
  </ThemeContextProvider>
);

