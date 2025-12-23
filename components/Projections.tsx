import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, Target, ArrowUpRight } from 'lucide-react';

export const Projections: React.FC = () => {
  // Mock projection data
  const data = [
    { month: 'Nov', actual: 450000, projected: 460000 },
    { month: 'Dec', actual: null, projected: 520000 },
    { month: 'Jan', actual: null, projected: 580000 },
    { month: 'Feb', actual: null, projected: 610000 },
    { month: 'Mar', actual: null, projected: 650000 },
    { month: 'Apr', actual: null, projected: 720000 },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Future Projections</h2>
          <p className="text-slate-500 text-sm">AI-Modelled Growth Forecast</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-indigo-50 p-6 rounded-xl border border-indigo-100">
          <div className="flex items-center mb-2 text-indigo-800 font-bold">
            <Target className="mr-2" size={20} /> EOY Target
          </div>
          <div className="text-3xl font-bold text-indigo-900">₹6,500,000</div>
          <div className="text-sm text-indigo-600 mt-1">on track to achieve</div>
        </div>
        <div className="bg-emerald-50 p-6 rounded-xl border border-emerald-100">
           <div className="flex items-center mb-2 text-emerald-800 font-bold">
            <TrendingUp className="mr-2" size={20} /> Projected Growth
          </div>
          <div className="text-3xl font-bold text-emerald-900">+24.5%</div>
          <div className="text-sm text-emerald-600 mt-1">vs last quarter</div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200">
          <div className="text-slate-500 font-medium mb-1">Next Month Forecast</div>
          <div className="text-3xl font-bold text-slate-900">₹520,000</div>
          <div className="flex items-center text-emerald-500 text-sm font-bold mt-1">
             <ArrowUpRight size={16} className="mr-1" /> Strong Upside
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
        <h3 className="font-bold text-slate-800 mb-6">Revenue Trajectory</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorProjected" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="month" axisLine={false} tickLine={false} />
              <YAxis axisLine={false} tickLine={false} tickFormatter={(val) => `₹${val/1000}k`} />
              <CartesianGrid vertical={false} stroke="#f1f5f9" />
              <Tooltip />
              <Area type="monotone" dataKey="projected" stroke="#6366f1" strokeDasharray="5 5" fill="url(#colorProjected)" name="Forecast" />
              <Area type="monotone" dataKey="actual" stroke="#10b981" fill="url(#colorActual)" name="Actual" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 text-center text-xs text-slate-400">
          Dotted line represents AI-based prediction model confidence interval.
        </div>
      </div>
    </div>
  );
};
