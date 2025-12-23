import React, { useState } from 'react';
import { Brand, ClientStatus, BrandId } from '../types';
import { useStore } from '../context/StoreContext';
import { TransactionType } from '../types';
import { Clock, Plus, Target, CheckCircle, Calendar, FileText } from 'lucide-react';

interface BusinessViewProps {
  brand: Brand;
}

export const BusinessView: React.FC<BusinessViewProps> = ({ brand }) => {
  const { clients, transactions, tasks, addTask, toggleTask } = useStore();
  const [showTaskModal, setShowTaskModal] = useState(false);
  
  // New task state
  const [newTask, setNewTask] = useState({
    title: '',
    clientName: '',
    procedure: '',
    dueDate: ''
  });
  
  const brandClients = clients.filter(c => c.brandId === brand.id);
  const brandTransactions = transactions.filter(t => t.brandId === brand.id);
  const brandTasks = tasks.filter(t => t.brandId === brand.id);

  const totalRevenue = brandTransactions
    .filter(t => t.type === TransactionType.INCOME)
    .reduce((acc, curr) => acc + curr.amount, 0);

  const pendingRevenue = brandClients.reduce((acc, curr) => acc + (curr.projectValue - curr.paidAmount), 0);
  
  const pipelineProjects = brandClients.filter(c => c.status === 'LEAD' || c.status === 'ACTIVE');

  const handleAddTask = () => {
    if(!newTask.title) return;
    addTask({
      title: newTask.title,
      brandId: brand.id,
      priority: 'MEDIUM',
      dueDate: newTask.dueDate || 'ASAP',
      clientName: newTask.clientName,
      procedure: newTask.procedure
    });
    setShowTaskModal(false);
    setNewTask({ title: '', clientName: '', procedure: '', dueDate: '' });
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center space-x-3 mb-1">
            <div className={`w-3 h-3 rounded-full ${brand.color}`}></div>
            <h2 className="text-2xl font-bold text-slate-900">{brand.name} HQ</h2>
          </div>
          <p className="text-slate-500 text-sm">Business Performance & Operations</p>
        </div>
        <div className="text-right">
          <div className="text-sm text-slate-500">Total Revenue (YTD)</div>
          <div className="text-3xl font-bold text-slate-900">₹{totalRevenue.toLocaleString()}</div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border border-slate-100 shadow-sm">
          <div className="text-slate-400 text-xs uppercase font-bold tracking-wider mb-2">Pending Invoices</div>
          <div className="text-xl font-bold text-slate-800">₹{pendingRevenue.toLocaleString()}</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-slate-100 shadow-sm">
          <div className="text-slate-400 text-xs uppercase font-bold tracking-wider mb-2">Active Clients</div>
          <div className="text-xl font-bold text-slate-800">{brandClients.filter(c => c.status === ClientStatus.ACTIVE).length}</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-slate-100 shadow-sm">
          <div className="text-slate-400 text-xs uppercase font-bold tracking-wider mb-2">Open Tasks</div>
          <div className="text-xl font-bold text-slate-800">{brandTasks.filter(t => !t.completed).length}</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-slate-100 shadow-sm">
          <div className="text-slate-400 text-xs uppercase font-bold tracking-wider mb-2">Profit Margin</div>
          <div className="text-xl font-bold text-emerald-600">68%</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Project Pipeline */}
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-100 bg-indigo-50 flex items-center">
            <Target size={18} className="text-indigo-600 mr-2" />
            <h3 className="font-bold text-indigo-900">Project Pipeline</h3>
          </div>
          <div className="p-4 space-y-3">
             {pipelineProjects.map(p => (
               <div key={p.id} className="border border-slate-100 rounded-lg p-3 hover:shadow-md transition">
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-bold text-slate-800">{p.company}</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full ${p.status === 'LEAD' ? 'bg-blue-100 text-blue-600' : 'bg-emerald-100 text-emerald-600'}`}>{p.status}</span>
                  </div>
                  <div className="text-sm text-slate-600 mb-2">{p.name} - ₹{p.projectValue.toLocaleString()}</div>
                  <div className="w-full bg-slate-100 rounded-full h-1.5">
                     <div className="bg-indigo-500 h-1.5 rounded-full" style={{ width: p.status === 'ACTIVE' ? '60%' : '20%' }}></div>
                  </div>
                  <div className="text-[10px] text-slate-400 mt-1 text-right">Progress</div>
               </div>
             ))}
             {pipelineProjects.length === 0 && <div className="text-center text-slate-400 text-sm">No active pipeline.</div>}
          </div>
        </div>

        {/* Operational Tasks */}
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden flex flex-col">
          <div className="p-4 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
             <div className="flex items-center">
                <CheckCircle size={18} className="text-slate-600 mr-2" />
                <h3 className="font-bold text-slate-800">Operations & Execution</h3>
             </div>
             <button onClick={() => setShowTaskModal(true)} className="text-xs flex items-center bg-white border border-slate-200 px-2 py-1 rounded hover:bg-slate-100">
               <Plus size={12} className="mr-1"/> Add Task
             </button>
          </div>
          <div className="p-4 space-y-3 flex-1 overflow-y-auto max-h-[400px]">
            {brandTasks.map(task => (
              <div key={task.id} className="flex items-start space-x-3 bg-white p-3 rounded-lg shadow-sm border border-slate-100 group">
                <button 
                  onClick={() => toggleTask(task.id)}
                  className={`mt-1 w-5 h-5 rounded-full border flex items-center justify-center transition ${task.completed ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-slate-300 text-transparent hover:border-emerald-500'}`}
                >
                  <CheckCircle size={14} />
                </button>
                <div className="flex-1">
                  <div className={`text-sm font-medium ${task.completed ? 'line-through text-slate-400' : 'text-slate-800'}`}>
                    {task.title}
                  </div>
                  {task.clientName && (
                    <div className="text-xs text-indigo-600 mt-0.5 font-medium">Client: {task.clientName}</div>
                  )}
                  {task.procedure && (
                     <div className="text-xs text-slate-500 mt-1 bg-slate-50 p-1 rounded">
                       <span className="font-semibold text-slate-600">Procedure:</span> {task.procedure}
                     </div>
                  )}
                  <div className="text-xs text-slate-400 mt-1 flex items-center justify-between">
                    <span className="flex items-center"><Calendar size={10} className="mr-1" /> Due: {task.dueDate}</span>
                  </div>
                </div>
              </div>
            ))}
            {brandTasks.length === 0 && <div className="text-center text-slate-400 text-sm">No pending tasks.</div>}
          </div>
        </div>
      </div>

      {showTaskModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-96 shadow-2xl">
            <h3 className="text-lg font-bold mb-4">Add Operational Task</h3>
            <div className="space-y-3">
              <input 
                className="w-full p-2 border rounded-lg text-sm" 
                placeholder="Task Title" 
                value={newTask.title} onChange={e => setNewTask({...newTask, title: e.target.value})} 
              />
              <input 
                className="w-full p-2 border rounded-lg text-sm" 
                placeholder="Client Name (Optional)" 
                value={newTask.clientName} onChange={e => setNewTask({...newTask, clientName: e.target.value})} 
              />
              <textarea 
                className="w-full p-2 border rounded-lg text-sm" 
                placeholder="Advance Procedure / Details" 
                rows={3}
                value={newTask.procedure} onChange={e => setNewTask({...newTask, procedure: e.target.value})} 
              />
              <input 
                type="date"
                className="w-full p-2 border rounded-lg text-sm" 
                value={newTask.dueDate} onChange={e => setNewTask({...newTask, dueDate: e.target.value})} 
              />
              <button onClick={handleAddTask} className="w-full bg-slate-900 text-white py-2 rounded-lg text-sm">Create Task</button>
              <button onClick={() => setShowTaskModal(false)} className="w-full bg-slate-100 text-slate-600 py-2 rounded-lg text-sm">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
