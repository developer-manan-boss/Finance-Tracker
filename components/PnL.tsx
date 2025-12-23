import React from 'react';
import { useStore } from '../context/StoreContext';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, CartesianGrid } from 'recharts';
import { TransactionType } from '../types';

export const PnL: React.FC = () => {
  const { brands, transactions } = useStore();

  const pnlData = brands.filter(b => b.id !== 'MISC').map(brand => {
    const revenue = transactions
      .filter(t => t.brandId === brand.id && t.type === TransactionType.INCOME)
      .reduce((sum, t) => sum + t.amount, 0);
    
    const expenses = transactions
      .filter(t => t.brandId === brand.id && t.type === TransactionType.EXPENSE)
      .reduce((sum, t) => sum + t.amount, 0);

    const profit = revenue - expenses;
    // Mock productivity score based on random for now, ideally based on task completion rate
    const productivity = Math.floor(Math.random() * (98 - 70) + 70); 

    return {
      name: brand.name,
      revenue,
      expenses,
      profit,
      productivity
    };
  });

  const topPerformer = [...pnlData].sort((a,b) => b.revenue - a.revenue)[0];
  const lowestPerformer = [...pnlData].sort((a,b) => a.productivity - b.productivity)[0];

  return (
    <div className="space-y-6 animate-fade-in">
      <h2 className="text-2xl font-bold text-slate-900">Profit & Loss Analysis</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-emerald-50 border border-emerald-100 p-6 rounded-xl">
          <h3 className="text-emerald-800 font-bold mb-2">Top Revenue Driver</h3>
          <div className="text-3xl font-bold text-emerald-900">{topPerformer?.name}</div>
          <div className="text-emerald-700 mt-2">₹{topPerformer?.revenue.toLocaleString()} Revenue</div>
        </div>
        <div className="bg-rose-50 border border-rose-100 p-6 rounded-xl">
          <h3 className="text-rose-800 font-bold mb-2">Productivity Alert</h3>
          <div className="text-3xl font-bold text-rose-900">{lowestPerformer?.name}</div>
          <div className="text-rose-700 mt-2">{lowestPerformer?.productivity}% Efficiency Score</div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
        <h3 className="text-lg font-bold text-slate-800 mb-6">Business Comparison</h3>
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={pnlData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" />
              <YAxis tickFormatter={(val) => `₹${val/1000}k`} />
              <Tooltip formatter={(val) => `₹${val.toLocaleString()}`} cursor={{fill: 'transparent'}} />
              <Legend />
              <Bar dataKey="revenue" name="Revenue" fill="#10b981" radius={[4, 4, 0, 0]} />
              <Bar dataKey="expenses" name="Expenses" fill="#f43f5e" radius={[4, 4, 0, 0]} />
              <Bar dataKey="profit" name="Net Profit" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
        <h3 className="text-lg font-bold text-slate-800 mb-4">Detailed Breakdown</h3>
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-slate-100 text-slate-500 text-sm">
              <th className="pb-3 font-medium">Business</th>
              <th className="pb-3 font-medium">Revenue</th>
              <th className="pb-3 font-medium">Expenses</th>
              <th className="pb-3 font-medium">Net Profit</th>
              <th className="pb-3 font-medium">Margin</th>
              <th className="pb-3 font-medium">Efficiency</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {pnlData.map((row, i) => (
              <tr key={i} className="text-sm">
                <td className="py-3 font-medium text-slate-800">{row.name}</td>
                <td className="py-3 text-emerald-600">₹{row.revenue.toLocaleString()}</td>
                <td className="py-3 text-rose-500">₹{row.expenses.toLocaleString()}</td>
                <td className="py-3 font-bold text-slate-900">₹{row.profit.toLocaleString()}</td>
                <td className="py-3 text-slate-600">{Math.round((row.profit / row.revenue) * 100)}%</td>
                <td className="py-3">
                  <div className="flex items-center">
                    <div className="w-16 bg-slate-100 rounded-full h-1.5 mr-2">
                      <div className={`h-1.5 rounded-full ${row.productivity > 90 ? 'bg-emerald-500' : 'bg-amber-500'}`} style={{width: `${row.productivity}%`}}></div>
                    </div>
                    <span className="text-xs text-slate-500">{row.productivity}%</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
