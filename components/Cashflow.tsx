import React from 'react';
import { useStore } from '../context/StoreContext';
import { TransactionType, ClientStatus } from '../types';
import { ArrowDown, ArrowUp, DollarSign, Activity } from 'lucide-react';

export const Cashflow: React.FC = () => {
  const { transactions, clients, debts } = useStore();

  const totalIncome = transactions
    .filter(t => t.type === TransactionType.INCOME)
    .reduce((acc, t) => acc + t.amount, 0);

  const totalExpenses = transactions
    .filter(t => t.type === TransactionType.EXPENSE)
    .reduce((acc, t) => acc + t.amount, 0);

  const receivables = clients.reduce((acc, c) => acc + (c.projectValue - c.paidAmount), 0);
  const liabilities = debts.reduce((acc, d) => acc + d.amount, 0);

  const netCashPosition = totalIncome - totalExpenses;
  const theoreticalNet = netCashPosition + receivables - liabilities;

  return (
    <div className="space-y-6 animate-fade-in">
      <h2 className="text-2xl font-bold text-slate-900">Cashflow & Position Statement</h2>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100">
          <div className="flex items-center text-emerald-800 font-bold mb-1">
            <ArrowUp size={16} className="mr-2" /> Total Income
          </div>
          <div className="text-2xl font-bold text-emerald-900">₹{totalIncome.toLocaleString()}</div>
        </div>
        <div className="bg-rose-50 p-4 rounded-xl border border-rose-100">
          <div className="flex items-center text-rose-800 font-bold mb-1">
            <ArrowDown size={16} className="mr-2" /> Total Expenses
          </div>
          <div className="text-2xl font-bold text-rose-900">₹{totalExpenses.toLocaleString()}</div>
        </div>
        <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
           <div className="flex items-center text-blue-800 font-bold mb-1">
            <Activity size={16} className="mr-2" /> Net Operating Cash
          </div>
          <div className="text-2xl font-bold text-blue-900">₹{netCashPosition.toLocaleString()}</div>
        </div>
        <div className="bg-slate-900 text-white p-4 rounded-xl shadow-lg">
           <div className="flex items-center text-slate-300 font-bold mb-1">
            <DollarSign size={16} className="mr-2" /> Projected Net Position
          </div>
          <div className="text-2xl font-bold">₹{theoreticalNet.toLocaleString()}</div>
          <div className="text-[10px] text-slate-400 mt-1">Includes receivables & liabilities</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Income Stream */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="bg-emerald-500 p-3 text-white font-bold flex justify-between">
            <span>Income Stream</span>
            <span>₹{totalIncome.toLocaleString()}</span>
          </div>
          <div className="max-h-80 overflow-y-auto p-4 space-y-3">
             {transactions.filter(t => t.type === TransactionType.INCOME).map(t => (
               <div key={t.id} className="flex justify-between items-center border-b border-slate-50 pb-2">
                 <div>
                   <div className="font-medium text-slate-800">{t.description}</div>
                   <div className="text-xs text-slate-400">{t.date} • {t.category}</div>
                 </div>
                 <div className="text-emerald-600 font-bold">+₹{t.amount.toLocaleString()}</div>
               </div>
             ))}
          </div>
        </div>

        {/* Expense Stream */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="bg-rose-500 p-3 text-white font-bold flex justify-between">
            <span>Expense Stream</span>
            <span>₹{totalExpenses.toLocaleString()}</span>
          </div>
          <div className="max-h-80 overflow-y-auto p-4 space-y-3">
             {transactions.filter(t => t.type === TransactionType.EXPENSE).map(t => (
               <div key={t.id} className="flex justify-between items-center border-b border-slate-50 pb-2">
                 <div>
                   <div className="font-medium text-slate-800">{t.description}</div>
                   <div className="text-xs text-slate-400">{t.date} • {t.category}</div>
                 </div>
                 <div className="text-rose-600 font-bold">-₹{t.amount.toLocaleString()}</div>
               </div>
             ))}
          </div>
        </div>

        {/* Receivables (Debtors) */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="bg-indigo-500 p-3 text-white font-bold flex justify-between">
            <span>Receivables (Debtors)</span>
            <span>₹{receivables.toLocaleString()}</span>
          </div>
          <div className="p-4 space-y-3">
             {clients.filter(c => c.projectValue > c.paidAmount).map(c => (
               <div key={c.id} className="flex justify-between items-center border-b border-slate-50 pb-2">
                 <div>
                   <div className="font-medium text-slate-800">{c.company}</div>
                   <div className="text-xs text-slate-400">{c.name}</div>
                 </div>
                 <div className="text-indigo-600 font-bold">₹{(c.projectValue - c.paidAmount).toLocaleString()}</div>
               </div>
             ))}
             {receivables === 0 && <div className="text-center text-slate-400 text-sm">No outstanding receivables.</div>}
          </div>
        </div>

        {/* Liabilities */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="bg-slate-600 p-3 text-white font-bold flex justify-between">
            <span>Liabilities</span>
            <span>₹{liabilities.toLocaleString()}</span>
          </div>
          <div className="p-4 space-y-3">
             {debts.map(d => (
               <div key={d.id} className="flex justify-between items-center border-b border-slate-50 pb-2">
                 <div>
                   <div className="font-medium text-slate-800">{d.creditor}</div>
                   <div className="text-xs text-slate-400">Due: {d.dueDate}</div>
                 </div>
                 <div className="text-slate-700 font-bold">₹{d.amount.toLocaleString()}</div>
               </div>
             ))}
              {liabilities === 0 && <div className="text-center text-slate-400 text-sm">No active liabilities.</div>}
          </div>
        </div>
      </div>
    </div>
  );
};
