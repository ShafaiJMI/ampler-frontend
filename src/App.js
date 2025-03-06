import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './utils/ProtectedRoute';
import Layout from './Layout';
import HomePage from './pages/HomePage';
import SearchInvoicesPage from './pages/SearchInvoicesPage';
import CreateInvoicePage from './pages/CreateInvoicePage';
import ViewInvoice from './pages/ViewInvoice';
import SellerBuyer from './pages/SellerBuyer';
import Stats from './pages/Stats';
import Login from './pages/Login';

function App() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
            <Route path="login" element={<Login />} />
            <Route path="invoices" element={<ProtectedRoute><SearchInvoicesPage /></ProtectedRoute>} />
            <Route path="create/invoice" element={<ProtectedRoute><CreateInvoicePage /></ProtectedRoute>} />
            <Route path="edit/invoice/:invoiceNumber/" element={<ProtectedRoute><CreateInvoicePage /></ProtectedRoute>} />
            <Route path="profiles" element={<ProtectedRoute><SellerBuyer /></ProtectedRoute>} />
            <Route path="stats" element={<ProtectedRoute><Stats /></ProtectedRoute>} /> 
          </Route>
          <Route path="view/invoice/:invoiceNumber" element={<ProtectedRoute><ViewInvoice /></ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
    );
  }
  
  export default App;