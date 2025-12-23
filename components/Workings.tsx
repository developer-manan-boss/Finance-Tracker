import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { CheckCircle, Circle, AlertCircle, Clock, Plus } from 'lucide-react';
import { BrandId } from '../types';

export const Workings: React.FC = () => {
  const { tasks, brands, addTask, toggleTask } = useStore();
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskBrand, setNewTaskBrand] = useState<BrandId>(BrandId.MISC);

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    
    addTask({
      title: newTaskTitle,
      brandId: newTaskBrand,
      priority: 'MEDIUM',
      dueDate: 'Today'
    });
    setNewTaskTitle('');
  };

  return (
    <div className="space-y-6 animate-fade-in">
       <div className="flex justify-between items-center">
         <h2 className="text-2xl font-bold text-slate-900">Workings & Tasks</h2>
         <div className="flex space-x-2">
           <span className="px-3 py-1 bg-white border border-slate-200 rounded-full text-xs font-medium text-slate-600">All Brands</span>
         </div>
       </div>

       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* To Do List */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden flex flex-col h-[500px]">
             <div className="p-4 bg-slate-50 border-b border-slate-100 font-bold text-slate-700">
               Priority Queue
             </div>
             
             {/* Add Task Input */}
             <form onSubmit={handleAddTask} className="p-4 border-b border-slate-100 flex gap-2">
                <select 
                  className="bg-slate-50 border-none rounded-lg text-xs w-24 p-2 text-slate-600 focus:ring-2 focus:ring-emerald-500"
                  value={newTaskBrand}
                  onChange={(e) => setNewTaskBrand(e.target.value as BrandId)}
                >
                  {brands.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
                </select>
                <input 
                  type="text" 
                  className="flex-1 bg-slate-50 border-none rounded-lg text-sm p-2 focus:ring-2 focus:ring-emerald-500"
                  placeholder="Add a new task..."
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                />
                <button type="submit" className="bg-emerald-500 text-white p-2 rounded-lg hover:bg-emerald-600 transition">
                  <Plus size={16} />
                </button>
             </form>

             <div className="divide-y divide-slate-50 overflow-y-auto flex-1">
               {tasks.map(task => {
                 const brand = brands.find(b => b.id === task.brandId);
                 return (
                   <div key={task.id} className="p-4 hover:bg-slate-50 transition group flex items-start space-x-3">
                     <button 
                       onClick={() => toggleTask(task.id)}
                       className="mt-1 text-slate-300 hover:text-emerald-500 transition-colors"
                     >
                       {task.completed ? <CheckCircle size={20} className="text-emerald-500" /> : <Circle size={20} />}
                     </button>
                     <div className="flex-1">
                       <div className={`text-sm font-medium transition-all ${task.completed ? 'line-through text-slate-400' : 'text-slate-800'}`}>
                         {task.title}
                       </div>
                       <div className="flex items-center space-x-2 mt-1">
                          <span className={`text-[10px] px-1.5 py-0.5 rounded text-white ${brand?.color || 'bg-slate-400'}`}>{brand?.name}</span>
                          <span className="text-xs text-slate-400 flex items-center"><Clock size={10} className="mr-1"/> {task.dueDate}</span>
                          {task.priority === 'HIGH' && !task.completed && (
                            <span className="text-xs text-rose-500 font-medium flex items-center"><AlertCircle size={10} className="mr-1"/> High Priority</span>
                          )}
                       </div>
                     </div>
                   </div>
                 )
               })}
             </div>
          </div>

          {/* Quick Notes / Scratchpad */}
          <div className="bg-yellow-50 rounded-xl shadow-sm border border-yellow-100 p-6 relative">
             <div className="absolute top-0 right-0 p-4 opacity-10">
               <svg width="64" height="64" viewBox="0 0 24 24" fill="currentColor"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
             </div>
             <h3 className="font-bold text-yellow-800 mb-4">Founder's Scratchpad</h3>
             <textarea 
               className="w-full h-[400px] bg-transparent border-none resize-none focus:ring-0 text-yellow-900 text-sm leading-relaxed placeholder-yellow-800/50"
               placeholder="Jot down quick ideas, strategy shifts, or reminders..."
               defaultValue="- Need to renegotiate server costs for CEOHive&#10;- Call with Tax Advisor next Tuesday&#10;- Idea: New subscription tier for Fundagist?&#10;- CADINA fabric supply chain optimization needed."
             ></textarea>
          </div>
       </div>
    </div>
  );
};
