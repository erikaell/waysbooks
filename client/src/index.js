import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './styles/styles.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import { BrowserRouter as Router } from 'react-router-dom'
import reportWebVitals from './reportWebVitals'
import { UserContextProvider } from './context/userContext'
import { QueryClient, QueryClientProvider } from 'react-query'
import { CartProvider } from 'use-shopping-cart'

const client = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserContextProvider>
      <QueryClientProvider client={client}>
      <CartProvider
    mode="payment"
    cartMode="checkout-session"
    stripe="pk_test_51LKOTKFxhaEHaIUuPZJ0LKY9n3Tubpnd3Nw1QZglWplU8sEJ2pKxvSjjFCSIsxYhsCNa5AHLYRIpZPxfv8AMxJp800OTfLJ69w"
    currency="USD"
  >
        <Router>
          <App />
        </Router>
        </CartProvider>
      </QueryClientProvider>
    </UserContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
