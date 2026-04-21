import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import '@styles/index.css'
// import App from './App'
import App from './app/'

import { HelmetProvider } from 'react-helmet-async';
import { AppContextProvider } from '@context/AppContext';
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')!).render(
  <HelmetProvider>
    <AppContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AppContextProvider>
  </HelmetProvider>
)
