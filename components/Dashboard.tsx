import React, { useState } from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell 
} from 'recharts';
import { ArrowUpRight, ArrowDownRight, DollarSign, Wallet, Users, Activity, Plus, Download, X, Eye } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { BrandId, TransactionType, Asset } from '../types';

const COLORS = ['#10b981', '#6366f1', '#f97316', '#ec4899', '#64748b'];

const StatCard = ({ title, value, subtext, trend, icon: Icon, trendUp, onClick }: any) => (
  <div 
    onClick={onClick}
    className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-all cursor-pointer group"
  >
    <div className="flex justify-between items-start mb-4">
      <div className="p-2 bg-slate-50 rounded-lg text-slate-600 group-hover:bg-slate-100 transition">
        <Icon size={20} />
      </div>
      {trend && (
        <div className={`flex items-center text-sm font-medium ${trendUp ? 'text-emerald-600' : 'text-rose-600'}`}>
          {trendUp ? <ArrowUpRight size={16} className="mr-1" /> : <ArrowDownRight size={16} className="mr-1" />}
          {trend}
        </div>
      )}
    </div>
    <h3 className="text-slate-500 text-sm font-medium mb-1">{title}</h3>
    <div className="text-2xl font-bold text-slate-800">{value}</div>
    {subtext && <div className="text-slate-400 text-xs mt-2">{subtext}</div>}
  </div>
);

export const Dashboard: React.FC = () => {
  const { assets, clients, debts, brands, transactions, addTransaction } = useStore();
  const [showAddModal, setShowAddModal] = useState(false);
  
  // Drill-down Modal State
  const [activeModal, setActiveModal] = useState<'NONE' | 'CLIENTS' | 'DEBTS' | 'ASSETS' | 'ASSET_DETAIL'>('NONE');
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);

  // Modal State for New Transaction
  const [newTrans, setNewTrans] = useState({
    amount: '',
    description: '',
    type: TransactionType.INCOME,
    brandId: BrandId.MISC,
    category: 'General'
  });

  const totalAssets = assets.reduce((acc, curr) => acc + curr.value, 0);
  const totalDebts = debts.reduce((acc, curr) => acc + curr.amount, 0);
  const activeClients = clients.filter(c => c.status === 'ACTIVE');
  const pipelineValue = clients.filter(c => c.status === 'LEAD').reduce((acc, c) => acc + c.projectValue, 0);
  const totalPipelinePotential = clients.filter(c => ['LEAD', 'ACTIVE'].includes(c.status)).reduce((acc, c) => acc + (c.projectValue - c.paidAmount), 0);
  
  const pieData = brands.map((b, index) => {
    const value = transactions
      .filter(t => t.brandId === b.id && t.type === TransactionType.INCOME)
      .reduce((acc, curr) => acc + curr.amount, 0);
    return {
      name: b.name,
      value: value || 1000, 
      color: COLORS[index % COLORS.length]
    };
  });

  const handleAddTransaction = () => {
    if (!newTrans.amount || !newTrans.description) return;
    addTransaction({
      amount: parseFloat(newTrans.amount),
      description: newTrans.description,
      type: newTrans.type,
      brandId: newTrans.brandId,
      category: newTrans.category,
      date: new Date().toISOString().split('T')[0]
    });
    setShowAddModal(false);
    setNewTrans({ amount: '', description: '', type: TransactionType.INCOME, brandId: BrandId.MISC, category: 'General' });
  };

  const openAssetDetail = (asset: Asset) => {
    setSelectedAsset(asset);
    setActiveModal('ASSET_DETAIL');
  };

  const data = [
      { name: 'Jan', income: 40000, expense: 24000 },
      { name: 'Feb', income: 30000, expense: 13980 },
      { name: 'Mar', income: 20000, expense: 98000 },
      { name: 'Apr', income: 27800, expense: 39080 },
      { name: 'May', income: 18900, expense: 48000 },
      { name: 'Jun', income: 23900, expense: 38000 },
      { name: 'Jul', income: 34900, expense: 43000 },
      { name: 'Aug', income: 84900, expense: 41000 },
  ];

  return (
    <div className="space-y-6 animate-fade-in relative">
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Command Center</h1>
          <p className="text-slate-500 mt-1">Welcome back, Boss. Here is your financial intelligence.</p>
        </div>
        <div className="flex space-x-3">
          <button 
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 bg-slate-900 text-white rounded-lg text-sm font-medium hover:bg-slate-800 transition shadow-lg shadow-slate-200 flex items-center"
          >
            <Plus size={16} className="mr-2" />
            Add Transaction
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Net Worth" 
          value={`₹${(totalAssets - totalDebts).toLocaleString()}`} 
          trend="+12.5%" 
          trendUp={true}
          icon={Wallet}
          subtext="Click for Asset breakdown"
          onClick={() => setActiveModal('ASSETS')}
        />
        <StatCard 
          title="Pipeline Potential" 
          value={`₹${totalPipelinePotential.toLocaleString()}`} 
          trend="Future Revenue" 
          trendUp={true}
          icon={Activity}
          subtext="Value in pipeline & active"
        />
        <StatCard 
          title="Active Clients" 
          value={activeClients.length} 
          trend="+2 new" 
          trendUp={true}
          icon={Users}
          subtext="Click to view list"
          onClick={() => setActiveModal('CLIENTS')}
        />
        <StatCard 
          title="Outstanding Debt" 
          value={`₹${totalDebts.toLocaleString()}`} 
          trend="-5.1%" 
          trendUp={true} 
          icon={DollarSign}
          subtext="Click to view creditors"
          onClick={() => setActiveModal('DEBTS')}
        />
      </div>

      {/* Main Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-slate-800">Cash Flow & Burn Rate</h3>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} tickFormatter={(val) => `₹${val/1000}k`} />
                <CartesianGrid vertical={false} stroke="#f1f5f9" />
                <Tooltip formatter={(value) => `₹${value.toLocaleString()}`} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Area type="monotone" dataKey="income" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorIncome)" />
                <Area type="monotone" dataKey="expense" stroke="#f43f5e" strokeWidth={2} fillOpacity={1} fill="url(#colorExpense)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
          <h3 className="text-lg font-bold text-slate-800 mb-6">Revenue by Brand</h3>
          <div className="h-64">
             <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `₹${value.toLocaleString()}`} />
                </PieChart>
             </ResponsiveContainer>
          </div>
          <div className="space-y-3 mt-4">
             {brands.map((brand, i) => (
               <div key={brand.id} className="flex justify-between items-center text-sm">
                 <div className="flex items-center">
                   <div className={`w-3 h-3 rounded-full mr-2`} style={{ backgroundColor: pieData[i]?.color || '#ccc' }}></div>
                   <span className="text-slate-600">{brand.name}</span>
                 </div>
                 <span className="font-semibold text-slate-800">
                   {Math.floor((pieData[i].value / (pieData.reduce((a,b)=>a+b.value,0) || 1)) * 100)}%
                 </span>
               </div>
             ))}
          </div>
        </div>
      </div>

      {/* Money Location Snapshot - Clickable */}
       <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 shadow-lg text-white">
        <h3 className="text-lg font-bold mb-4 flex items-center">
           <Wallet className="mr-2 text-emerald-400" size={20} />
           Money Location (Click for Info)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {assets.filter(a => ['BANK', 'CASH', 'BANK_FD'].includes(a.type)).slice(0, 6).map((asset) => (
            <div 
              key={asset.id} 
              onClick={() => openAssetDetail(asset)}
              className="flex justify-between items-center bg-slate-800 p-3 rounded-lg border border-slate-700 hover:bg-slate-700 cursor-pointer transition"
            >
              <div className="flex flex-col">
                <span className="text-sm font-medium text-slate-200">{asset.name}</span>
                <span className="text-xs text-slate-500 uppercase tracking-wider">{asset.type.replace('_', ' ')}</span>
              </div>
              <span className="font-mono text-emerald-400 font-medium">₹{asset.value.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>

      {/* --- DRILL DOWN MODALS --- */}

      {/* Clients Modal */}
      {activeModal === 'CLIENTS' && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-in">
          <div className="bg-white rounded-xl p-6 w-[600px] shadow-2xl max-h-[80vh] overflow-y-auto">
             <div className="flex justify-between items-center mb-4 border-b border-slate-100 pb-2">
                <h3 className="text-xl font-bold text-slate-900">Active Clients List</h3>
                <button onClick={() => setActiveModal('NONE')}><X className="text-slate-400 hover:text-slate-800" /></button>
             </div>
             <div className="space-y-2">
                {activeClients.map(c => (
                  <div key={c.id} className="flex justify-between p-3 bg-slate-50 rounded-lg">
                    <div>
                      <div className="font-bold text-slate-800">{c.company}</div>
                      <div className="text-xs text-slate-500">{c.name}</div>
                    </div>
                    <div className="text-right">
                       <div className="font-medium text-slate-900">₹{c.projectValue.toLocaleString()}</div>
                       <div className="text-xs text-emerald-600">Paid: ₹{c.paidAmount.toLocaleString()}</div>
                    </div>
                  </div>
                ))}
                {activeClients.length === 0 && <p className="text-slate-500 text-center">No active clients.</p>}
             </div>
          </div>
        </div>
      )}

      {/* Debts Modal */}
      {activeModal === 'DEBTS' && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-in">
          <div className="bg-white rounded-xl p-6 w-[500px] shadow-2xl max-h-[80vh] overflow-y-auto">
             <div className="flex justify-between items-center mb-4 border-b border-slate-100 pb-2">
                <h3 className="text-xl font-bold text-slate-900">Outstanding Debts</h3>
                <button onClick={() => setActiveModal('NONE')}><X className="text-slate-400 hover:text-slate-800" /></button>
             </div>
             <div className="space-y-2">
                {debts.map(d => (
                  <div key={d.id} className="flex justify-between p-3 bg-rose-50 rounded-lg border border-rose-100">
                    <div>
                      <div className="font-bold text-rose-900">{d.creditor}</div>
                      <div className="text-xs text-rose-600">Due: {d.dueDate}</div>
                    </div>
                    <div className="text-right">
                       <div className="font-bold text-rose-700">₹{d.amount.toLocaleString()}</div>
                       <div className="text-xs text-rose-500">{d.status}</div>
                    </div>
                  </div>
                ))}
             </div>
          </div>
        </div>
      )}

      {/* Assets List Modal */}
      {activeModal === 'ASSETS' && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-in">
          <div className="bg-white rounded-xl p-6 w-[600px] shadow-2xl max-h-[80vh] overflow-y-auto">
             <div className="flex justify-between items-center mb-4 border-b border-slate-100 pb-2">
                <h3 className="text-xl font-bold text-slate-900">All Assets & Investments</h3>
                <button onClick={() => setActiveModal('NONE')}><X className="text-slate-400 hover:text-slate-800" /></button>
             </div>
             <div className="space-y-2">
                {assets.map(a => (
                  <div key={a.id} className="flex justify-between p-3 bg-emerald-50 rounded-lg border border-emerald-100 items-center hover:bg-emerald-100 cursor-pointer" onClick={() => openAssetDetail(a)}>
                    <div>
                      <div className="font-bold text-emerald-900">{a.name}</div>
                      <div className="text-xs text-emerald-600 uppercase">{a.type}</div>
                    </div>
                    <div className="font-bold text-emerald-800">₹{a.value.toLocaleString()}</div>
                  </div>
                ))}
             </div>
          </div>
        </div>
      )}

      {/* Asset Detail/Source Modal */}
      {activeModal === 'ASSET_DETAIL' && selectedAsset && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-in">
          <div className="bg-white rounded-xl p-6 w-[500px] shadow-2xl">
             <div className="flex justify-between items-center mb-6">
                <div>
                   <h3 className="text-xl font-bold text-slate-900">{selectedAsset.name}</h3>
                   <span className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded mt-1 inline-block">{selectedAsset.type}</span>
                </div>
                <button onClick={() => setActiveModal('NONE')}><X className="text-slate-400 hover:text-slate-800" /></button>
             </div>
             
             <div className="bg-slate-50 p-4 rounded-xl text-center mb-6">
                <div className="text-sm text-slate-500 mb-1">Current Balance</div>
                <div className="text-3xl font-bold text-slate-900">₹{selectedAsset.value.toLocaleString()}</div>
             </div>

             <div>
                <h4 className="font-bold text-slate-800 mb-2 text-sm">Source / Related Inflow</h4>
                <div className="text-xs text-slate-400 mb-2">Recent transactions contributing to wealth:</div>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                   {transactions
                      .filter(t => t.type === TransactionType.INCOME)
                      .slice(0, 5)
                      .map(t => (
                        <div key={t.id} className="flex justify-between text-sm border-b border-slate-100 pb-1">
                           <span className="text-slate-600">{t.description}</span>
                           <span className="text-emerald-600">+₹{t.amount.toLocaleString()}</span>
                        </div>
                   ))}
                   <div className="text-center text-xs text-slate-400 mt-2 italic">
                     * Shown as representative sources
                   </div>
                </div>
             </div>
          </div>
        </div>
      )}

      {/* Add Transaction Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-96 shadow-2xl">
            <h3 className="text-lg font-bold mb-4">Add Transaction</h3>
            <div className="space-y-4">
              <input 
                type="text" placeholder="Description" 
                className="w-full p-2 border rounded-lg text-sm"
                value={newTrans.description} onChange={e => setNewTrans({...newTrans, description: e.target.value})}
              />
              <input 
                type="number" placeholder="Amount (₹)" 
                className="w-full p-2 border rounded-lg text-sm"
                value={newTrans.amount} onChange={e => setNewTrans({...newTrans, amount: e.target.value})}
              />
              <div className="flex space-x-2">
                <select 
                  className="w-1/2 p-2 border rounded-lg text-sm"
                  value={newTrans.type} onChange={e => setNewTrans({...newTrans, type: e.target.value as TransactionType})}
                >
                  <option value={TransactionType.INCOME}>Income</option>
                  <option value={TransactionType.EXPENSE}>Expense</option>
                </select>
                <select 
                  className="w-1/2 p-2 border rounded-lg text-sm"
                  value={newTrans.brandId} onChange={e => setNewTrans({...newTrans, brandId: e.target.value as BrandId})}
                >
                  {brands.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
                </select>
              </div>
              <div className="flex space-x-2 mt-4">
                <button onClick={() => setShowAddModal(false)} className="flex-1 py-2 bg-slate-100 rounded-lg text-slate-600 text-sm">Cancel</button>
                <button onClick={handleAddTransaction} className="flex-1 py-2 bg-slate-900 text-white rounded-lg text-sm">Save</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
