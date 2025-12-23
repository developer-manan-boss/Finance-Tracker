import React from 'react';
import { 
  LayoutDashboard, 
  Wallet, 
  Briefcase, 
  Users, 
  CheckSquare, 
  PieChart, 
  Settings as SettingsIcon,
  LogOut,
  ChevronRight,
  TrendingUp,
  Banknote,
  ListOrdered,
  Swords,
  Contact
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  selectedBrand: string | null;
  setSelectedBrand: (id: string | null) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, selectedBrand, setSelectedBrand }) => {
  const { brands } = useStore();
  
  const NavItem = ({ id, label, icon: Icon, isBrand = false, isSpecial = false }: any) => {
    const isActive = isBrand ? selectedBrand === id : activeTab === id && !selectedBrand;
    
    return (
      <button
        onClick={() => {
          if (isBrand) {
            setSelectedBrand(id);
            setActiveTab('BUSINESS'); // Force switch to business view container
          } else {
            setActiveTab(id);
            setSelectedBrand(null);
          }
        }}
        className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 mb-1
          ${isActive 
            ? 'bg-slate-900 text-white shadow-lg shadow-slate-200 translate-x-1' 
            : isSpecial 
              ? 'text-rose-600 hover:bg-rose-50 hover:text-rose-700 font-bold hover:translate-x-1' 
              : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900 hover:translate-x-1'
          }`}
      >
        <div className="flex items-center">
          {Icon && <Icon size={18} className={`mr-3 ${isActive ? 'text-emerald-400' : isSpecial ? 'text-rose-500' : 'text-slate-400'}`} />}
          {isBrand && <div className={`w-2 h-2 rounded-full mr-3 ${label.color}`}></div>}
          <span>{isBrand ? label.name : label}</span>
        </div>
        {isActive && <ChevronRight size={14} className="text-slate-500" />}
      </button>
    );
  };

  return (
    <div className="w-64 h-screen bg-white border-r border-slate-200 flex flex-col fixed left-0 top-0 z-20">
      <div className="p-6 border-b border-slate-50">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center text-white font-bold shadow-lg shadow-slate-200">B</div>
          <div>
            <h1 className="text-sm font-bold text-slate-900">BOSS SYSTEM</h1>
            <p className="text-[10px] text-slate-400 tracking-wider uppercase">Founder OS v2.2</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto py-6 px-4 space-y-8 custom-scrollbar">
        {/* Main Nav */}
        <div>
          <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 px-3">Overview</h3>
          <NavItem id="DASHBOARD" label="Command Center" icon={LayoutDashboard} />
          <NavItem id="CASHFLOW" label="Cashflow" icon={Banknote} />
          <NavItem id="TRANSACTIONS" label="Transactions" icon={ListOrdered} />
          <NavItem id="FINANCIALS" label="Money Control" icon={Wallet} />
          <NavItem id="CRM" label="CRM & Pipeline" icon={Users} />
          <NavItem id="WORKINGS" label="Workings" icon={CheckSquare} />
        </div>

        {/* Self Development */}
        <div>
          <h3 className="text-xs font-semibold text-rose-500 uppercase tracking-wider mb-3 px-3">Beast Mode</h3>
          <NavItem id="SELF_DEV" label="75 Hard & SRCC" icon={Swords} isSpecial={true} />
        </div>

        {/* Businesses */}
        <div>
          <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 px-3">Business Units</h3>
          {brands.map(brand => (
             <NavItem key={brand.id} id={brand.id} label={brand} isBrand={true} />
          ))}
        </div>

        {/* Analytics */}
        <div>
          <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 px-3">Intelligence</h3>
          <NavItem id="PNL" label="Profit & Loss" icon={TrendingUp} />
          <NavItem id="PROJECTIONS" label="Projections" icon={PieChart} />
          <NavItem id="CONTACTS" label="Contacts Hub" icon={Contact} />
        </div>
      </div>

      <div className="p-4 border-t border-slate-50">
        <NavItem id="SETTINGS" label="Settings" icon={SettingsIcon} />
        <button className="w-full flex items-center px-3 py-2 mt-1 text-sm font-medium text-rose-500 hover:bg-rose-50 rounded-lg transition hover:translate-x-1">
          <LogOut size={18} className="mr-3" />
          Sign Out
        </button>
      </div>
    </div>
  );
};
