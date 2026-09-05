import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import '@styles/index.css'
// import App from './App'
import App from './app/'

import { HelmetProvider } from 'react-helmet-async';
import { AppContextProvider } from '@context/AppContext';
import { BrowserRouter } from 'react-router-dom'
import { AbstractApiService } from './app/services/AbstractApiService';

AbstractApiService.setForceLogoutHandler(() => {
  localStorage.removeItem('user')
  localStorage.removeItem('userWindow')
  window.location.href='/asqueue'
});

createRoot(document.getElementById('root')!).render(
  <HelmetProvider>
    <AppContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AppContextProvider>
  </HelmetProvider>
)
