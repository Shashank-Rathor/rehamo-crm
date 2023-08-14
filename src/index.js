import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthContextProvider } from './components/context/AuthContext';
import { DataProvider } from './components/context/DataContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <DataProvider>
          <App />
      </DataProvider>
    </AuthContextProvider>
  </React.StrictMode>
);

