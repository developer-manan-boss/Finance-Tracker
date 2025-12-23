import React, { createContext, useContext, useState, ReactNode } from 'react';
import { 
  Asset, Debt, Client, Task, Transaction, Brand, 
  TransactionType, BrandId, SubjectSyllabus, DailyHabit, 
  DailyScheduleItem, ErrorLogEntry, MasteryLevel, MockTestResult
} from '../types';
import { 
  INITIAL_ASSETS, INITIAL_CLIENTS, INITIAL_DEBTS, 
  INITIAL_TASKS, INITIAL_TRANSACTIONS, BRANDS as CONST_BRANDS,
  INITIAL_SYLLABUS, INITIAL_HABITS, INITIAL_SCHEDULE, INITIAL_ERROR_LOG, INITIAL_MOCK_RESULTS
} from '../constants';

interface StoreContextType {
  brands: Brand[];
  assets: Asset[];
  debts: Debt[];
  clients: Client[];
  tasks: Task[];
  transactions: Transaction[];
  syllabus: SubjectSyllabus[];
  habits: DailyHabit[];
  schedule: DailyScheduleItem[];
  errorLog: ErrorLogEntry[];
  mockResults: MockTestResult[];
  
  updateBrand: (id: BrandId, name: string) => void;

  addTransaction: (t: Omit<Transaction, 'id'>) => void;
  deleteTransaction: (id: string) => void;
  addClient: (c: Omit<Client, 'id'>) => void;
  deleteClient: (id: string) => void;
  addTask: (t: Omit<Task, 'id' | 'completed'>) => void;
  toggleTask: (id: string) => void;
  deleteTask: (id: string) => void;
  addAsset: (a: Omit<Asset, 'id'>) => void;
  deleteAsset: (id: string) => void;
  addDebt: (d: Omit<Debt, 'id'>) => void;
  deleteDebt: (id: string) => void;
  
  // New Methods
  toggleHabit: (id: string) => void;
  updateChapterMastery: (subjectId: string, chapterId: string, level: MasteryLevel) => void;
  updateSchedule: (id: string, field: keyof DailyScheduleItem, value: any) => void;
  addScheduleItem: (item: Omit<DailyScheduleItem, 'id'>) => void;
  deleteScheduleItem: (id: string) => void;
  addErrorLog: (entry: Omit<ErrorLogEntry, 'id'>) => void;
  deleteErrorLog: (id: string) => void;
  addMockResult: (result: Omit<MockTestResult, 'id'>) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [brands, setBrands] = useState<Brand[]>(CONST_BRANDS);
  const [assets, setAssets] = useState<Asset[]>(INITIAL_ASSETS);
  const [debts, setDebts] = useState<Debt[]>(INITIAL_DEBTS);
  const [clients, setClients] = useState<Client[]>(INITIAL_CLIENTS);
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  const [transactions, setTransactions] = useState<Transaction[]>(INITIAL_TRANSACTIONS);
  
  // Self Development State
  const [syllabus, setSyllabus] = useState<SubjectSyllabus[]>(INITIAL_SYLLABUS);
  const [habits, setHabits] = useState<DailyHabit[]>(INITIAL_HABITS);
  const [schedule, setSchedule] = useState<DailyScheduleItem[]>(INITIAL_SCHEDULE);
  const [errorLog, setErrorLog] = useState<ErrorLogEntry[]>(INITIAL_ERROR_LOG);
  const [mockResults, setMockResults] = useState<MockTestResult[]>(INITIAL_MOCK_RESULTS);

  const updateBrand = (id: BrandId, name: string) => {
    setBrands(prev => prev.map(b => b.id === id ? { ...b, name } : b));
  };

  const addTransaction = (t: Omit<Transaction, 'id'>) => {
    const newT = { ...t, id: Math.random().toString(36).substr(2, 9) };
    setTransactions(prev => [newT, ...prev]);
  };

  const deleteTransaction = (id: string) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  };

  const addClient = (c: Omit<Client, 'id'>) => {
    setClients(prev => [{ ...c, id: Math.random().toString(36).substr(2, 9) }, ...prev]);
  };

  const deleteClient = (id: string) => {
    setClients(prev => prev.filter(c => c.id !== id));
  };

  const addTask = (t: Omit<Task, 'id' | 'completed'>) => {
    setTasks(prev => [{ ...t, id: Math.random().toString(36).substr(2, 9), completed: false }, ...prev]);
  };

  const toggleTask = (id: string) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  const addAsset = (a: Omit<Asset, 'id'>) => {
    setAssets(prev => [{ ...a, id: Math.random().toString(36).substr(2, 9) }, ...prev]);
  };

  const deleteAsset = (id: string) => {
    setAssets(prev => prev.filter(a => a.id !== id));
  };

  const addDebt = (d: Omit<Debt, 'id'>) => {
    setDebts(prev => [{ ...d, id: Math.random().toString(36).substr(2, 9) }, ...prev]);
  };

  const deleteDebt = (id: string) => {
    setDebts(prev => prev.filter(d => d.id !== id));
  };

  const toggleHabit = (id: string) => {
    setHabits(prev => prev.map(h => h.id === id ? { ...h, completed: !h.completed } : h));
  };

  const updateChapterMastery = (subjectId: string, chapterId: string, level: MasteryLevel) => {
    setSyllabus(prev => prev.map(sub => {
      if (sub.id !== subjectId) return sub;
      return {
        ...sub,
        chapters: sub.chapters.map(ch => ch.id === chapterId ? { ...ch, mastery: level } : ch)
      };
    }));
  };

  const updateSchedule = (id: string, field: keyof DailyScheduleItem, value: any) => {
    setSchedule(prev => prev.map(item => item.id === id ? { ...item, [field]: value } : item));
  };

  const addScheduleItem = (item: Omit<DailyScheduleItem, 'id'>) => {
    setSchedule(prev => [...prev, { ...item, id: Math.random().toString(36).substr(2, 9) }].sort((a,b) => a.time.localeCompare(b.time)));
  };

  const deleteScheduleItem = (id: string) => {
    setSchedule(prev => prev.filter(item => item.id !== id));
  };

  const addErrorLog = (entry: Omit<ErrorLogEntry, 'id'>) => {
    setErrorLog(prev => [{ ...entry, id: Math.random().toString(36).substr(2, 9) }, ...prev]);
  };

  const deleteErrorLog = (id: string) => {
    setErrorLog(prev => prev.filter(e => e.id !== id));
  };

  const addMockResult = (result: Omit<MockTestResult, 'id'>) => {
    setMockResults(prev => [...prev, { ...result, id: Math.random().toString(36).substr(2, 9) }]);
  };

  return (
    <StoreContext.Provider value={{
      brands, assets, debts, clients, tasks, transactions, syllabus, habits, schedule, errorLog, mockResults,
      updateBrand,
      addTransaction, deleteTransaction, 
      addClient, deleteClient,
      addTask, toggleTask, deleteTask,
      addAsset, deleteAsset,
      addDebt, deleteDebt,
      toggleHabit, updateChapterMastery,
      updateSchedule, addScheduleItem, deleteScheduleItem,
      addErrorLog, deleteErrorLog, addMockResult
    }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) throw new Error('useStore must be used within StoreProvider');
  return context;
};
