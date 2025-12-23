import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Mail, Phone, Building, Search, User, Briefcase } from 'lucide-react';

export const Contacts: React.FC = () => {
  const { clients, brands } = useStore();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredClients = clients.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getBusinessName = (id: string) => brands.find(b => b.id === id)?.name || id;
  const getBusinessColor = (id: string) => brands.find(b => b.id === id)?.color || 'bg-slate-500';

  return (
    <div className="space-y-6 animate-fade-in pb-10">
       <div className="flex justify-between items-center">
         <div>
           <h2 className="text-2xl font-bold text-slate-900">Contacts Directory</h2>
           <p className="text-slate-500 text-sm">Unified database across all business units</p>
         </div>
         <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search contacts..." 
              className="pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm w-64 focus:ring-2 focus:ring-slate-900 transition"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
         </div>
       </div>

       <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Contact Name</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Business Unit</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Contact Info</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Financial Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
               {filteredClients.map(client => {
                 const balance = client.projectValue - client.paidAmount;
                 return (
                   <tr key={client.id} className="hover:bg-slate-50 transition group">
                     <td className="px-6 py-4">
                        <div className="flex items-center">
                           <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold mr-3">
                             {client.name.charAt(0)}
                           </div>
                           <div>
                             <div className="font-bold text-slate-800">{client.name}</div>
                             <div className="text-xs text-slate-500 flex items-center mt-0.5">
                               <Briefcase size={10} className="mr-1"/> {client.company}
                             </div>
                           </div>
                        </div>
                     </td>
                     <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold text-white ${getBusinessColor(client.brandId)}`}>
                          {getBusinessName(client.brandId)}
                        </span>
                     </td>
                     <td className="px-6 py-4">
                        <div className="space-y-1">
                          <div className="flex items-center text-sm text-slate-600">
                            <Mail size={14} className="mr-2 text-slate-400" /> {client.email || 'N/A'}
                          </div>
                          <div className="flex items-center text-sm text-slate-600">
                            <Phone size={14} className="mr-2 text-slate-400" /> {client.phone || 'N/A'}
                          </div>
                        </div>
                     </td>
                     <td className="px-6 py-4">
                        {balance > 0 ? (
                          <div className="inline-block px-3 py-1 bg-rose-50 border border-rose-100 rounded-lg">
                            <div className="text-[10px] font-bold text-rose-600 uppercase mb-0.5">Owes Us</div>
                            <div className="font-bold text-rose-700 text-sm">₹{balance.toLocaleString()}</div>
                          </div>
                        ) : (
                          <div className="inline-block px-3 py-1 bg-emerald-50 border border-emerald-100 rounded-lg">
                            <div className="text-[10px] font-bold text-emerald-600 uppercase mb-0.5">Settled</div>
                            <div className="font-bold text-emerald-700 text-sm">Paid Full</div>
                          </div>
                        )}
                     </td>
                   </tr>
                 );
               })}
               {filteredClients.length === 0 && (
                 <tr>
                   <td colSpan={4} className="px-6 py-10 text-center text-slate-400">
                     No contacts found matching your search.
                   </td>
                 </tr>
               )}
            </tbody>
          </table>
       </div>
    </div>
  );
};
