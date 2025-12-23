import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { BusinessView } from './components/BusinessView';
import { CRM } from './components/CRM';
import { Financials } from './components/Financials';
import { Workings } from './components/Workings';
import { PnL } from './components/PnL';
import { Projections } from './components/Projections';
import { Cashflow } from './components/Cashflow';
import { TransactionsPage } from './components/TransactionsPage';
import { SelfDevelopment } from './components/SelfDevelopment';
import { Settings } from './components/Settings';
import { Contacts } from './components/Contacts';
import { StoreProvider, useStore } from './context/StoreContext';

const AppContent: React.FC = () => {
  const [activeTab, setActiveTab] = useState('DASHBOARD');
  const [selectedBrandId, setSelectedBrandId] = useState<string | null>(null);
  const { brands } = useStore();

  const renderContent = () => {
    if (selectedBrandId) {
      const brand = brands.find(b => b.id === selectedBrandId);
      if (brand) return <BusinessView brand={brand} />;
    }

    switch (activeTab) {
      case 'DASHBOARD':
        return <Dashboard />;
      case 'CASHFLOW':
        return <Cashflow />;
      case 'TRANSACTIONS':
        return <TransactionsPage />;
      case 'CRM':
        return <CRM />;
      case 'FINANCIALS':
        return <Financials />;
      case 'WORKINGS':
        return <Workings />;
      case 'PNL':
        return <PnL />;
      case 'PROJECTIONS':
        return <Projections />;
      case 'SELF_DEV':
        return <SelfDevelopment />;
      case 'SETTINGS':
        return <Settings />;
      case 'CONTACTS':
        return <Contacts />;
      default:
        return <div className="flex items-center justify-center h-full text-slate-400">Module Under Construction</div>;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans text-slate-900">
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        selectedBrand={selectedBrandId}
        setSelectedBrand={setSelectedBrandId}
      />
      
      <main className="flex-1 ml-64 p-8 h-screen overflow-y-auto custom-scrollbar">
        <div className="max-w-7xl mx-auto h-full">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <StoreProvider>
      <AppContent />
    </StoreProvider>
  );
};

export default App;
