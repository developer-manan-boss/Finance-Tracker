import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Sliders, Save, RefreshCw, Archive, Globe, User, Shield } from 'lucide-react';

export const Settings: React.FC = () => {
  const { brands, updateBrand } = useStore();
  const [activeSection, setActiveSection] = useState<'GENERAL' | 'BRANDS' | 'DATA'>('GENERAL');
  
  const [editBrands, setEditBrands] = useState(brands);

  const handleBrandNameChange = (id: any, val: string) => {
    setEditBrands(prev => prev.map(b => b.id === id ? { ...b, name: val } : b));
  };

  const saveBrands = () => {
    editBrands.forEach(b => {
      updateBrand(b.id, b.name);
    });
    alert('Brand configurations updated successfully.');
  };

  return (
    <div className="space-y-6 animate-fade-in pb-10">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">System Settings</h2>
        <p className="text-slate-500 text-sm">Master control for Founder OS</p>
      </div>

      <div className="flex gap-6">
        {/* Sidebar Nav */}
        <div className="w-64 space-y-2">
           <button 
             onClick={() => setActiveSection('GENERAL')}
             className={`w-full text-left px-4 py-3 rounded-lg font-medium text-sm flex items-center ${activeSection === 'GENERAL' ? 'bg-slate-900 text-white' : 'bg-white text-slate-600 hover:bg-slate-50'}`}
           >
             <User size={16} className="mr-3"/> Profile & Identity
           </button>
           <button 
             onClick={() => setActiveSection('BRANDS')}
             className={`w-full text-left px-4 py-3 rounded-lg font-medium text-sm flex items-center ${activeSection === 'BRANDS' ? 'bg-slate-900 text-white' : 'bg-white text-slate-600 hover:bg-slate-50'}`}
           >
             <Globe size={16} className="mr-3"/> Business Entities
           </button>
           <button 
             onClick={() => setActiveSection('DATA')}
             className={`w-full text-left px-4 py-3 rounded-lg font-medium text-sm flex items-center ${activeSection === 'DATA' ? 'bg-slate-900 text-white' : 'bg-white text-slate-600 hover:bg-slate-50'}`}
           >
             <Shield size={16} className="mr-3"/> Data Management
           </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 bg-white border border-slate-200 rounded-xl p-8 shadow-sm">
           
           {activeSection === 'GENERAL' && (
             <div className="space-y-6">
               <h3 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-2">Profile Configuration</h3>
               <div className="grid grid-cols-2 gap-4">
                 <div>
                   <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Founder Name</label>
                   <input type="text" defaultValue="BOSS" className="w-full border border-slate-200 rounded-lg p-2.5 text-sm bg-slate-50 focus:bg-white focus:ring-2 focus:ring-slate-900 transition" />
                 </div>
                 <div>
                   <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Role / Title</label>
                   <input type="text" defaultValue="Founder / Operator" className="w-full border border-slate-200 rounded-lg p-2.5 text-sm bg-slate-50 focus:bg-white focus:ring-2 focus:ring-slate-900 transition" />
                 </div>
               </div>
               
               <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">System Theme</label>
                  <div className="flex gap-4">
                    <div className="flex items-center p-3 border border-slate-900 bg-slate-50 rounded-lg cursor-pointer">
                      <div className="w-4 h-4 rounded-full bg-slate-900 mr-2"></div>
                      <span className="text-sm font-medium">Founder Light (Active)</span>
                    </div>
                    <div className="flex items-center p-3 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50 opacity-50">
                      <div className="w-4 h-4 rounded-full bg-slate-900 mr-2"></div>
                      <span className="text-sm font-medium">Midnight Protocol</span>
                    </div>
                  </div>
               </div>
             </div>
           )}

           {activeSection === 'BRANDS' && (
             <div className="space-y-6">
               <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                 <h3 className="text-lg font-bold text-slate-800">Business Units Configuration</h3>
                 <button onClick={saveBrands} className="text-xs bg-emerald-500 text-white px-3 py-1.5 rounded-lg font-bold flex items-center hover:bg-emerald-600">
                   <Save size={14} className="mr-1" /> Save Changes
                 </button>
               </div>
               <p className="text-sm text-slate-500">
                 Manage the display names of your business entities. The IDs remain constant for data integrity.
               </p>
               <div className="space-y-4">
                 {editBrands.map(brand => (
                   <div key={brand.id} className="flex items-center gap-4">
                      <div className={`w-8 h-8 rounded-lg ${brand.color} shrink-0`}></div>
                      <div className="flex-1">
                        <label className="text-xs font-bold text-slate-400 uppercase">{brand.id}</label>
                        <input 
                          type="text" 
                          value={brand.name} 
                          onChange={(e) => handleBrandNameChange(brand.id, e.target.value)}
                          className="w-full border-b border-slate-200 py-1 text-sm font-medium text-slate-800 focus:border-slate-900 outline-none transition"
                        />
                      </div>
                   </div>
                 ))}
               </div>
             </div>
           )}

           {activeSection === 'DATA' && (
             <div className="space-y-6">
               <h3 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-2">Data Control</h3>
               
               <div className="bg-indigo-50 border border-indigo-100 p-4 rounded-lg flex justify-between items-center">
                 <div>
                   <h4 className="font-bold text-indigo-900">Export System Data</h4>
                   <p className="text-xs text-indigo-700">Download a full JSON backup of all financial, client, and academic data.</p>
                 </div>
                 <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-indigo-700 flex items-center">
                   <Archive size={16} className="mr-2"/> Export JSON
                 </button>
               </div>

               <div className="bg-rose-50 border border-rose-100 p-4 rounded-lg flex justify-between items-center">
                 <div>
                   <h4 className="font-bold text-rose-900">Factory Reset</h4>
                   <p className="text-xs text-rose-700">Wipe all data and restore to initial demo state. This cannot be undone.</p>
                 </div>
                 <button 
                    onClick={() => { if(confirm('Are you sure you want to wipe all data?')) window.location.reload(); }}
                    className="bg-white border border-rose-200 text-rose-600 px-4 py-2 rounded-lg text-sm font-bold hover:bg-rose-100 flex items-center"
                 >
                   <RefreshCw size={16} className="mr-2"/> Reset System
                 </button>
               </div>
             </div>
           )}

        </div>
      </div>
    </div>
  );
};
