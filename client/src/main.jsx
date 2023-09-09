import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import { ExpenseContextProvider } from './context/expenseContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ExpenseContextProvider>
        <App />
      </ExpenseContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
