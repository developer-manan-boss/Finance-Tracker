import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { ClientStatus, BrandId } from '../types';
import { MoreHorizontal, Plus, Phone, Mail, Trash2, CheckSquare } from 'lucide-react';

export const CRM: React.FC = () => {
  const { clients, brands, addClient, deleteClient } = useStore();
  const [showModal, setShowModal] = useState(false);
  const [newClient, setNewClient] = useState({
    name: '', company: '', brandId: BrandId.DIGI_FLORA, projectValue: ''
  });

  const columns = [
    { id: ClientStatus.LEAD, title: 'Potential Work (Leads)', color: 'border-t-blue-500', bg: 'bg-blue-50' },
    { id: ClientStatus.ACTIVE, title: 'In Progress', color: 'border-t-emerald-500', bg: 'bg-emerald-50' },
    { id: ClientStatus.COMPLETED, title: 'Completed', color: 'border-t-slate-500', bg: 'bg-slate-50' },
  ];

  const getBrandColor = (id: string) => brands.find(b => b.id === id)?.color || 'bg-slate-500';

  const handleAddClient = () => {
    if (!newClient.company) return;
    addClient({
      name: newClient.name,
      company: newClient.company,
      brandId: newClient.brandId as BrandId,
      status: ClientStatus.LEAD,
      projectValue: parseFloat(newClient.projectValue) || 0,
      paidAmount: 0,
      lastContact: 'Just now'
    });
    setShowModal(false);
    setNewClient({ name: '', company: '', brandId: BrandId.DIGI_FLORA, projectValue: '' });
  };

  return (
    <div className="h-full flex flex-col animate-fade-in relative">
      <div className="flex justify-between items-center mb-6">
        <div>
           <h2 className="text-2xl font-bold text-slate-900">CRM & Pipeline</h2>
           <p className="text-slate-500 text-sm">Lead tracking and client management</p>
        </div>
        <div className="flex items-center space-x-4">
           <div className="text-right hidden md:block">
              <div className="text-xs text-slate-500">Total Pipeline Value</div>
              <div className="font-bold text-slate-900">₹{clients.reduce((acc, c) => acc + c.projectValue, 0).toLocaleString()}</div>
           </div>
           <button 
             onClick={() => setShowModal(true)}
             className="bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center hover:bg-slate-800"
           >
             <Plus size={16} className="mr-2" /> New Client
           </button>
        </div>
      </div>

      <div className="flex-1 overflow-x-auto">
        <div className="flex space-x-6 min-w-max h-full pb-4">
          {columns.map(col => (
            <div key={col.id} className="w-80 flex flex-col bg-slate-50 rounded-xl border border-slate-200">
              <div className={`p-4 border-t-4 ${col.color} bg-white rounded-t-xl border-b border-slate-100 flex justify-between items-center`}>
                <h3 className="font-bold text-slate-700">{col.title}</h3>
                <span className={`${col.bg} text-slate-600 text-xs px-2 py-1 rounded-full font-bold`}>
                  {clients.filter(c => c.status === col.id).length}
                </span>
              </div>
              <div className="p-3 space-y-3 flex-1 overflow-y-auto">
                {clients.filter(c => c.status === col.id).map(client => (
                  <div key={client.id} className="bg-white p-4 rounded-lg shadow-sm border border-slate-100 cursor-move hover:shadow-md transition group relative">
                    <button 
                      onClick={() => deleteClient(client.id)}
                      className="absolute top-2 right-2 text-slate-200 hover:text-rose-500 transition opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 size={14} />
                    </button>
                    
                    <div className="flex justify-between items-start mb-2">
                      <div className={`w-2 h-2 rounded-full ${getBrandColor(client.brandId)}`}></div>
                    </div>
                    <h4 className="font-bold text-slate-800">{client.company}</h4>
                    <p className="text-xs text-slate-500 mb-3">{client.name}</p>
                    
                    {/* Progress Visual */}
                    <div className="w-full bg-slate-100 rounded-full h-1.5 mb-3">
                       <div 
                         className={`h-1.5 rounded-full ${client.status === 'COMPLETED' ? 'bg-slate-400' : 'bg-emerald-500'}`} 
                         style={{width: client.status === 'LEAD' ? '25%' : client.status === 'ACTIVE' ? '60%' : '100%'}}
                       ></div>
                    </div>
                    
                    <div className="flex items-center justify-between text-xs text-slate-500 bg-slate-50 p-2 rounded mb-3">
                      <span>Project Value</span>
                      <span className="font-bold text-slate-700">₹{client.projectValue.toLocaleString()}</span>
                    </div>

                    <div className="flex justify-between items-center pt-2 border-t border-slate-50">
                      <div className="flex space-x-2">
                         <div className="p-1.5 rounded-md hover:bg-slate-100 text-slate-400 hover:text-blue-500 cursor-pointer">
                           <Phone size={14} />
                         </div>
                         <div className="p-1.5 rounded-md hover:bg-slate-100 text-slate-400 hover:text-emerald-500 cursor-pointer">
                           <Mail size={14} />
                         </div>
                      </div>
                      <span className="text-[10px] text-slate-400">{client.lastContact}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-96 shadow-2xl">
            <h3 className="text-lg font-bold mb-4">Add New Client</h3>
            <div className="space-y-3">
              <input type="text" placeholder="Company Name" className="w-full p-2 border rounded-lg" value={newClient.company} onChange={e => setNewClient({...newClient, company: e.target.value})} />
              <input type="text" placeholder="Contact Person" className="w-full p-2 border rounded-lg" value={newClient.name} onChange={e => setNewClient({...newClient, name: e.target.value})} />
              <input type="number" placeholder="Potential Value (₹)" className="w-full p-2 border rounded-lg" value={newClient.projectValue} onChange={e => setNewClient({...newClient, projectValue: e.target.value})} />
              <select className="w-full p-2 border rounded-lg" value={newClient.brandId} onChange={e => setNewClient({...newClient, brandId: e.target.value})}>
                {brands.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
              </select>
              <button onClick={handleAddClient} className="w-full py-2 bg-slate-900 text-white rounded-lg">Add to Pipeline</button>
              <button onClick={() => setShowModal(false)} className="w-full py-2 text-slate-500 text-sm">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
