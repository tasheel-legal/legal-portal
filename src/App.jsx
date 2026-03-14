import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import { useTranslation } from 'react-i18next';
import { formatCurrency } from './utils/formatCurrency';
import ClientDashboard from './pages/ClientDashboard';

function Home() {
  const { t } = useTranslation();
  return (
    <div className="bg-white p-6 rounded shadow-sm">
      <h2 className="text-2xl font-semibold mb-4 text-secondary">{t('services')}</h2>
      <p className="text-gray-600 mb-4">Sample price: {formatCurrency(1500.50)}</p>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="client/dashboard" element={<ClientDashboard />} />
      </Route>
    </Routes>
  );
}

export default App;
