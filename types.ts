export enum BrandId {
  DIGI_FLORA = 'DIGI_FLORA',
  CEO_HIVE = 'CEO_HIVE',
  FUNDAGIST = 'FUNDAGIST',
  CADINA = 'CADINA',
  LUXIMOTH = 'LUXIMOTH',
  MISC = 'MISC'
}

export interface Brand {
  id: BrandId;
  name: string;
  color: string;
}

export enum TransactionType {
  INCOME = 'INCOME',
  EXPENSE = 'EXPENSE'
}

export interface Transaction {
  id: string;
  date: string;
  amount: number;
  description: string;
  type: TransactionType;
  brandId: BrandId;
  category: string;
}

export enum ClientStatus {
  LEAD = 'LEAD',
  ACTIVE = 'ACTIVE',
  COMPLETED = 'COMPLETED',
  LOST = 'LOST'
}

export interface Client {
  id: string;
  name: string;
  company: string;
  email?: string;
  phone?: string;
  brandId: BrandId;
  status: ClientStatus;
  projectValue: number;
  paidAmount: number;
  lastContact: string;
  notes?: string;
}

export type AssetType = 'CASH' | 'BANK' | 'INVESTMENT' | 'CRYPTO' | 'PHYSICAL' | 'BANK_FD' | 'SIP' | 'LONG_TERM' | 'SHORT_TERM';

export interface Asset {
  id: string;
  name: string;
  type: AssetType;
  value: number;
  lastUpdated: string;
}

export interface Debt {
  id: string;
  creditor: string;
  amount: number;
  dueDate: string;
  interestRate: number;
  status: 'PENDING' | 'PAID' | 'OVERDUE';
}

export interface Task {
  id: string;
  title: string;
  brandId: BrandId;
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
  completed: boolean;
  dueDate: string;
  clientName?: string; // Associated client
  procedure?: string; // Advance procedures/details
}

// --- NEW TYPES FOR SELF DEVELOPMENT ---

export enum MasteryLevel {
  NOT_STARTED = 0,
  WEAK = 1,      // Studied but confused
  MODERATE = 2,  // Can solve NCERT
  STRONG = 3,    // Can solve PYQs
  MASTERED = 4   // Can teach it / 100% accuracy
}

export interface Chapter {
  id: string;
  name: string;
  weightage: number; // Marks in boards
  mastery: MasteryLevel;
  category?: string; // e.g., 'Macro', 'Indian Eco', 'Flamingo'
}

export interface SubjectSyllabus {
  id: string;
  name: string; // Accounts, BST, etc.
  chapters: Chapter[];
  examType: 'BOARDS' | 'CUET' | 'IELTS';
}

export interface DailyScheduleItem {
  id: string;
  time: string;
  activity: string;
  type: 'PHYSICAL' | 'WORK' | 'STUDY' | 'MIND';
  completed: boolean;
}

export interface ErrorLogEntry {
  id: string;
  subject: string;
  topic: string;
  mistake: string; // "Calculation error", "Conceptual gap"
  correction: string;
  date: string;
}

export interface DailyHabit {
  id: string;
  title: string;
  completed: boolean;
  category: '75HARD' | 'ACADEMIC' | 'BIOHACK';
}

export interface MockTestResult {
  id: string;
  date: string;
  examType: 'BOARDS' | 'CUET';
  subject: string;
  score: number;
  totalMarks: number;
}
