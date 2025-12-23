import React, { useState } from 'react';
import { Asset, Debt, AssetType } from '../types';
import { DollarSign, Landmark, CreditCard, TrendingUp, Wallet, Plus, Coins, BarChart3, Briefcase, Trash2 } from 'lucide-react';
import { useStore } from '../context/StoreContext';

const AssetCard: React.FC<{ asset: Asset, onDelete: (id: string) => void }> = ({ asset, onDelete }) => {
  let icon = <DollarSign size={20} />;
  let color = 'bg-slate-50 text-slate-600';

  switch(asset.type) {
    case 'BANK': icon = <Landmark size={20} />; color = 'bg-blue-50 text-blue-600'; break;
    case 'CRYPTO': icon = <TrendingUp size={20} />; color = 'bg-purple-50 text-purple-600'; break;
    case 'BANK_FD': icon = <Briefcase size={20} />; color = 'bg-amber-50 text-amber-600'; break;
    case 'SIP': icon = <BarChart3 size={20} />; color = 'bg-green-50 text-green-600'; break;
    case 'CASH': icon = <Coins size={20} />; color = 'bg-emerald-50 text-emerald-600'; break;
  }

  return (
    <div className="group flex items-center justify-between p-4 bg-white border border-slate-100 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 relative">
      <div className="flex items-center space-x-4">
        <div className={`p-3 rounded-full ${color}`}>
          {icon}
        </div>
        <div>
          <h4 className="font-semibold text-slate-800">{asset.name}</h4>
          <p className="text-xs text-slate-500 capitalize">{asset.type.replace('_', ' ').toLowerCase()} • Updated {asset.lastUpdated}</p>
        </div>
      </div>
      <div className="text-right flex items-center gap-4">
        <div className="font-bold text-slate-900">₹{asset.value.toLocaleString()}</div>
        <button 
          onClick={(e) => { e.stopPropagation(); onDelete(asset.id); }}
          className="text-slate-300 hover:text-rose-500 transition opacity-0 group-hover:opacity-100"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
};

const DebtCard: React.FC<{ debt: Debt, onDelete: (id: string) => void }> = ({ debt, onDelete }) => (
  <div className="group p-5 bg-white border border-slate-100 rounded-lg shadow-sm relative overflow-hidden hover:shadow-md transition-all duration-300 hover:-translate-y-1">
    <div className="absolute top-0 right-0 w-20 h-20 bg-rose-50 rounded-bl-full -mr-10 -mt-10 z-0"></div>
    <div className="relative z-10">
      <div className="flex justify-between items-start mb-4">
        <CreditCard className="text-rose-500" size={24} />
        <div className="flex items-center gap-2">
            <span className="bg-rose-100 text-rose-700 text-xs px-2 py-1 rounded font-medium">{debt.status}</span>
            <button 
                onClick={(e) => { e.stopPropagation(); onDelete(debt.id); }}
                className="text-slate-300 hover:text-rose-500 transition opacity-0 group-hover:opacity-100"
            >
                <Trash2 size={16} />
            </button>
        </div>
      </div>
      <h3 className="font-bold text-slate-800 text-lg mb-1">{debt.creditor}</h3>
      <div className="flex justify-between items-end mt-4">
        <div>
          <p className="text-xs text-slate-500">Amount Due</p>
          <p className="text-xl font-bold text-rose-600">₹{debt.amount.toLocaleString()}</p>
        </div>
        <div className="text-right">
           <p className="text-xs text-slate-500">Due Date</p>
           <p className="text-sm font-medium text-slate-700">{debt.dueDate}</p>
        </div>
      </div>
    </div>
  </div>
);

export const Financials: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'ASSETS' | 'DEBTS'>('ASSETS');
  const [showAssetModal, setShowAssetModal] = useState(false);
  const [showDebtModal, setShowDebtModal] = useState(false);
  
  const { assets, debts, addAsset, addDebt, deleteAsset, deleteDebt } = useStore();

  const [newAsset, setNewAsset] = useState({ name: '', value: '', type: 'BANK' as AssetType });
  const [newDebt, setNewDebt] = useState({ creditor: '', amount: '', dueDate: '' });

  const totalAssets = assets.reduce((sum, item) => sum + item.value, 0);
  const totalDebts = debts.reduce((sum, item) => sum + item.amount, 0);
  const netWorth = totalAssets - totalDebts;

  const handleAddAsset = () => {
    if (!newAsset.name || !newAsset.value) return;
    addAsset({
      name: newAsset.name,
      value: parseFloat(newAsset.value),
      type: newAsset.type,
      lastUpdated: 'Just now'
    });
    setShowAssetModal(false);
    setNewAsset({ name: '', value: '', type: 'BANK' });
  };

  const handleAddDebt = () => {
    if (!newDebt.creditor || !newDebt.amount) return;
    addDebt({
      creditor: newDebt.creditor,
      amount: parseFloat(newDebt.amount),
      dueDate: newDebt.dueDate,
      interestRate: 0,
      status: 'PENDING'
    });
    setShowDebtModal(false);
    setNewDebt({ creditor: '', amount: '', dueDate: '' });
  };

  return (
    <div className="space-y-6 animate-fade-in relative">
      {/* Overview Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-3 bg-slate-900 text-white p-8 rounded-2xl shadow-xl flex flex-col md:flex-row justify-between items-center relative overflow-hidden hover:shadow-2xl transition-all duration-500">
          <div className="absolute top-0 left-0 w-64 h-64 bg-emerald-500 opacity-10 rounded-full filter blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-blue-500 opacity-10 rounded-full filter blur-3xl translate-x-1/2 translate-y-1/2"></div>
          
          <div className="relative z-10 mb-6 md:mb-0">
            <h2 className="text-slate-400 font-medium mb-1">Total Net Worth</h2>
            <div className="text-5xl font-bold tracking-tight">₹{netWorth.toLocaleString()}</div>
            <div className="flex items-center mt-2 text-emerald-400 text-sm font-medium">
               <TrendingUp size={16} className="mr-1" /> +₹4,200 this month
            </div>
          </div>
          
          <div className="flex space-x-8 relative z-10">
             <div className="text-right">
               <div className="text-slate-400 text-sm mb-1">Total Assets</div>
               <div className="text-2xl font-bold text-white">₹{totalAssets.toLocaleString()}</div>
             </div>
             <div className="w-px bg-slate-700 h-12"></div>
             <div className="text-right">
               <div className="text-slate-400 text-sm mb-1">Total Liabilities</div>
               <div className="text-2xl font-bold text-rose-400">₹{totalDebts.toLocaleString()}</div>
             </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <div className="flex space-x-1 bg-slate-100 p-1 rounded-lg w-fit">
          <button 
            onClick={() => setActiveTab('ASSETS')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition ${activeTab === 'ASSETS' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
          >
            Money & Assets
          </button>
          <button 
            onClick={() => setActiveTab('DEBTS')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition ${activeTab === 'DEBTS' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
          >
            Debts & Creditors
          </button>
        </div>
        
        {activeTab === 'ASSETS' ? (
          <button onClick={() => setShowAssetModal(true)} className="flex items-center px-4 py-2 bg-slate-900 text-white rounded-lg text-sm hover:bg-slate-800 transition shadow hover:shadow-lg">
            <Plus size={16} className="mr-2" /> Add Asset
          </button>
        ) : (
          <button onClick={() => setShowDebtModal(true)} className="flex items-center px-4 py-2 bg-rose-600 text-white rounded-lg text-sm hover:bg-rose-700 transition shadow hover:shadow-lg">
            <Plus size={16} className="mr-2" /> Record Debt
          </button>
        )}
      </div>

      {activeTab === 'ASSETS' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
           <div className="space-y-4">
             <h3 className="font-bold text-slate-800 flex items-center"><Wallet className="mr-2" size={18} /> Accounts & Holdings</h3>
             {assets.map(asset => <AssetCard key={asset.id} asset={asset} onDelete={deleteAsset} />)}
           </div>
           
           <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm h-fit">
             <h3 className="font-bold text-slate-800 mb-4">Distribution</h3>
             <div className="space-y-4">
                {assets.map(asset => (
                   <div key={asset.id}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-slate-600">{asset.name}</span>
                        <span className="font-medium text-slate-900">{Math.round((asset.value / totalAssets) * 100)}%</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${asset.type === 'CASH' ? 'bg-emerald-400' : 'bg-blue-500'}`} 
                          style={{ width: `${(asset.value / totalAssets) * 100}%` }}
                        ></div>
                      </div>
                   </div>
                ))}
             </div>
           </div>
        </div>
      )}

      {activeTab === 'DEBTS' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {debts.map(debt => <DebtCard key={debt.id} debt={debt} onDelete={deleteDebt} />)}
        </div>
      )}

      {/* Asset Modal */}
      {showAssetModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-in">
          <div className="bg-white rounded-xl p-6 w-96 shadow-2xl">
            <h3 className="text-lg font-bold mb-4">Add New Asset</h3>
            <div className="space-y-4">
              <input type="text" placeholder="Asset Name" className="w-full p-2 border rounded-lg" value={newAsset.name} onChange={e => setNewAsset({...newAsset, name: e.target.value})} />
              <input type="number" placeholder="Value (₹)" className="w-full p-2 border rounded-lg" value={newAsset.value} onChange={e => setNewAsset({...newAsset, value: e.target.value})} />
              <select className="w-full p-2 border rounded-lg" value={newAsset.type} onChange={e => setNewAsset({...newAsset, type: e.target.value as AssetType})}>
                <option value="BANK">Bank Account</option>
                <option value="BANK_FD">Bank FD</option>
                <option value="SIP">SIP</option>
                <option value="INVESTMENT">Stock/ETF</option>
                <option value="CRYPTO">Crypto</option>
                <option value="CASH">Cash</option>
                <option value="LONG_TERM">Long Term</option>
                <option value="SHORT_TERM">Short Term</option>
              </select>
              <button onClick={handleAddAsset} className="w-full py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition">Save Asset</button>
              <button onClick={() => setShowAssetModal(false)} className="w-full py-2 text-slate-500 text-sm hover:bg-slate-50 transition">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Debt Modal */}
      {showDebtModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-in">
          <div className="bg-white rounded-xl p-6 w-96 shadow-2xl">
            <h3 className="text-lg font-bold mb-4">Add Liability</h3>
            <div className="space-y-4">
              <input type="text" placeholder="Creditor Name" className="w-full p-2 border rounded-lg" value={newDebt.creditor} onChange={e => setNewDebt({...newDebt, creditor: e.target.value})} />
              <input type="number" placeholder="Amount (₹)" className="w-full p-2 border rounded-lg" value={newDebt.amount} onChange={e => setNewDebt({...newDebt, amount: e.target.value})} />
              <input type="date" className="w-full p-2 border rounded-lg" value={newDebt.dueDate} onChange={e => setNewDebt({...newDebt, dueDate: e.target.value})} />
              <button onClick={handleAddDebt} className="w-full py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition">Save Debt</button>
              <button onClick={() => setShowDebtModal(false)} className="w-full py-2 text-slate-500 text-sm hover:bg-slate-50 transition">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
