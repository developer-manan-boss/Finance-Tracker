import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { TransactionType, BrandId } from '../types';
import { Trash2, Plus, Filter } from 'lucide-react';

export const TransactionsPage: React.FC = () => {
  const { transactions, brands, addTransaction, deleteTransaction } = useStore();
  const [filterMonth, setFilterMonth] = useState(new Date().toISOString().slice(0, 7)); // YYYY-MM
  const [showAdd, setShowAdd] = useState(false);
  
  const [newTrans, setNewTrans] = useState({
    amount: '',
    description: '',
    type: TransactionType.INCOME,
    brandId: BrandId.MISC,
    category: '',
    date: new Date().toISOString().split('T')[0]
  });

  const filteredTransactions = transactions.filter(t => t.date.startsWith(filterMonth));

  const handleAdd = () => {
    if (!newTrans.amount || !newTrans.description) return;
    addTransaction({
      amount: parseFloat(newTrans.amount),
      description: newTrans.description,
      type: newTrans.type,
      brandId: newTrans.brandId,
      category: newTrans.category || 'General',
      date: newTrans.date
    });
    setShowAdd(false);
    setNewTrans({ amount: '', description: '', type: TransactionType.INCOME, brandId: BrandId.MISC, category: '', date: new Date().toISOString().split('T')[0] });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
           <h2 className="text-2xl font-bold text-slate-900">Transaction History</h2>
           <p className="text-sm text-slate-500">Manage all inflows and outflows</p>
        </div>
        <button onClick={() => setShowAdd(true)} className="px-4 py-2 bg-slate-900 text-white rounded-lg text-sm flex items-center">
          <Plus size={16} className="mr-2" /> Add New
        </button>
      </div>

      <div className="bg-white p-4 rounded-xl border border-slate-100 flex items-center space-x-4">
         <Filter size={18} className="text-slate-400" />
         <span className="text-sm font-medium text-slate-700">Filter Period:</span>
         <input 
           type="month" 
           className="border rounded-md p-1 text-sm text-slate-600"
           value={filterMonth}
           onChange={(e) => setFilterMonth(e.target.value)}
         />
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="p-4 text-sm font-semibold text-slate-600">Date</th>
              <th className="p-4 text-sm font-semibold text-slate-600">Description</th>
              <th className="p-4 text-sm font-semibold text-slate-600">Brand</th>
              <th className="p-4 text-sm font-semibold text-slate-600">Category</th>
              <th className="p-4 text-sm font-semibold text-slate-600">Amount</th>
              <th className="p-4 text-sm font-semibold text-slate-600">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredTransactions.map(t => {
              const brand = brands.find(b => b.id === t.brandId);
              return (
                <tr key={t.id} className="hover:bg-slate-50 transition">
                  <td className="p-4 text-sm text-slate-500">{t.date}</td>
                  <td className="p-4 text-sm font-medium text-slate-800">{t.description}</td>
                  <td className="p-4">
                     <span className={`text-[10px] px-2 py-1 rounded text-white ${brand?.color}`}>{brand?.name}</span>
                  </td>
                  <td className="p-4 text-sm text-slate-500">{t.category}</td>
                  <td className={`p-4 text-sm font-bold ${t.type === 'INCOME' ? 'text-emerald-600' : 'text-rose-600'}`}>
                    {t.type === 'INCOME' ? '+' : '-'}₹{t.amount.toLocaleString()}
                  </td>
                  <td className="p-4">
                    <button onClick={() => deleteTransaction(t.id)} className="text-slate-300 hover:text-rose-500 transition">
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              );
            })}
            {filteredTransactions.length === 0 && (
              <tr>
                <td colSpan={6} className="p-8 text-center text-slate-400">No transactions found for this period.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showAdd && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-96 shadow-2xl">
            <h3 className="text-lg font-bold mb-4">Record Transaction</h3>
            <div className="space-y-3">
               <input type="date" className="w-full p-2 border rounded-lg text-sm" value={newTrans.date} onChange={e => setNewTrans({...newTrans, date: e.target.value})} />
               <input type="text" placeholder="Description" className="w-full p-2 border rounded-lg text-sm" value={newTrans.description} onChange={e => setNewTrans({...newTrans, description: e.target.value})} />
               <input type="number" placeholder="Amount" className="w-full p-2 border rounded-lg text-sm" value={newTrans.amount} onChange={e => setNewTrans({...newTrans, amount: e.target.value})} />
               <input type="text" placeholder="Category (e.g., Sales, Tools)" className="w-full p-2 border rounded-lg text-sm" value={newTrans.category} onChange={e => setNewTrans({...newTrans, category: e.target.value})} />
               <select className="w-full p-2 border rounded-lg text-sm" value={newTrans.type} onChange={e => setNewTrans({...newTrans, type: e.target.value as TransactionType})}>
                 <option value="INCOME">Income</option>
                 <option value="EXPENSE">Expense</option>
               </select>
               <select className="w-full p-2 border rounded-lg text-sm" value={newTrans.brandId} onChange={e => setNewTrans({...newTrans, brandId: e.target.value as BrandId})}>
                 {brands.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
               </select>
               <div className="flex gap-2 mt-2">
                 <button onClick={handleAdd} className="flex-1 bg-slate-900 text-white py-2 rounded-lg text-sm">Save</button>
                 <button onClick={() => setShowAdd(false)} className="flex-1 bg-slate-100 text-slate-600 py-2 rounded-lg text-sm">Cancel</button>
               </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
