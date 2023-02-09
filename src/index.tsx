import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
// **************************JS**************************
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.js"
// **************************CSS**************************
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import './index.scss';
import GlobalProvider from './context/Provider';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Router>
      <GlobalProvider>
        <App />
      </GlobalProvider>

    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
