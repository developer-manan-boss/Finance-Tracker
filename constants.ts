import { Brand, BrandId, Client, ClientStatus, Asset, Debt, Task, Transaction, TransactionType, SubjectSyllabus, MasteryLevel, DailyScheduleItem, DailyHabit, ErrorLogEntry, MockTestResult } from './types';

export const BRANDS: Brand[] = [
  { id: BrandId.DIGI_FLORA, name: 'Digi Flora', color: 'bg-emerald-500' },
  { id: BrandId.CEO_HIVE, name: 'CEOHive', color: 'bg-indigo-500' },
  { id: BrandId.FUNDAGIST, name: 'Fundagist', color: 'bg-orange-500' },
  { id: BrandId.CADINA, name: 'Cadina', color: 'bg-pink-500' },
  { id: BrandId.LUXIMOTH, name: 'Luximoth Estate', color: 'bg-stone-600' },
  { id: BrandId.MISC, name: 'Personal / Misc', color: 'bg-slate-500' },
];

export const INITIAL_ASSETS: Asset[] = [
  { id: '1', name: 'HDFC Business', type: 'BANK', value: 452300, lastUpdated: 'Today' },
  { id: '2', name: 'Vault Cash', type: 'CASH', value: 25000, lastUpdated: 'Yesterday' },
  { id: '3', name: 'Nifty 50 ETF', type: 'INVESTMENT', value: 894000, lastUpdated: 'Today' },
  { id: '4', name: 'ETH Cold Wallet', type: 'CRYPTO', value: 123000, lastUpdated: '1 hour ago' },
  { id: '5', name: 'SBI Fixed Deposit', type: 'BANK_FD', value: 500000, lastUpdated: 'Last Month' },
  { id: '6', name: 'Monthly SIP', type: 'SIP', value: 150000, lastUpdated: 'Today' },
];

export const INITIAL_DEBTS: Debt[] = [
  { id: '1', creditor: 'Amex Platinum', amount: 34000, dueDate: '2023-11-20', interestRate: 18, status: 'PENDING' },
  { id: '2', creditor: 'Business Loan', amount: 150000, dueDate: '2024-01-15', interestRate: 10, status: 'PENDING' },
];

export const INITIAL_CLIENTS: Client[] = [
  { id: '1', name: 'Acme Corp', company: 'Acme Inc', email: 'finance@acme.com', phone: '+91 98765 43210', brandId: BrandId.DIGI_FLORA, status: ClientStatus.ACTIVE, projectValue: 120000, paidAmount: 60000, lastContact: '2 days ago' },
  { id: '2', name: 'John Doe', company: 'Startup Y', email: 'john@startupy.io', phone: '+91 99887 77665', brandId: BrandId.CEO_HIVE, status: ClientStatus.LEAD, projectValue: 50000, paidAmount: 0, lastContact: 'Yesterday' },
  { id: '3', name: 'Jane Smith', company: 'Tech Flow', email: 'jane@techflow.co', phone: '+1 415 555 0123', brandId: BrandId.FUNDAGIST, status: ClientStatus.COMPLETED, projectValue: 85000, paidAmount: 85000, lastContact: 'Last week' },
  { id: '4', name: 'Global Tech', company: 'Global', email: 'contact@global.net', phone: '+44 20 7946 0958', brandId: BrandId.DIGI_FLORA, status: ClientStatus.ACTIVE, projectValue: 250000, paidAmount: 100000, lastContact: 'Today' },
  { id: '5', name: 'Fashion Brand', company: 'Zara Style', email: 'buying@zara-style.com', phone: '+91 88888 99999', brandId: BrandId.CADINA, status: ClientStatus.ACTIVE, projectValue: 500000, paidAmount: 200000, lastContact: 'Today' },
  { id: '6', name: 'Luxury Villa 4BHK', company: 'Mr. Oberoi', email: 'oberoi@gmail.com', phone: '+91 90000 10000', brandId: BrandId.LUXIMOTH, status: ClientStatus.LEAD, projectValue: 45000000, paidAmount: 0, lastContact: 'Yesterday' },
];

export const INITIAL_TASKS: Task[] = [
  { id: '1', title: 'Q4 Tax Filing', brandId: BrandId.MISC, priority: 'HIGH', completed: false, dueDate: '2023-11-30' },
  { id: '2', title: 'Client Proposal for Nike', brandId: BrandId.DIGI_FLORA, priority: 'HIGH', completed: false, dueDate: '2023-11-15' },
  { id: '3', title: 'Update Website Portfolio', brandId: BrandId.CEO_HIVE, priority: 'MEDIUM', completed: true, dueDate: '2023-11-10' },
  { id: '4', title: 'Invoice Follow-up', brandId: BrandId.FUNDAGIST, priority: 'LOW', completed: false, dueDate: '2023-11-18' },
  { id: '5', title: 'Fabric Sourcing', brandId: BrandId.CADINA, priority: 'HIGH', completed: false, dueDate: '2023-11-25' },
  { id: '6', title: 'Site Visit: Golf Course Rd', brandId: BrandId.LUXIMOTH, priority: 'HIGH', completed: false, dueDate: '2023-11-14' },
];

export const INITIAL_TRANSACTIONS: Transaction[] = [
  { id: '1', date: '2023-11-01', amount: 50000, description: 'Retainer Payment', type: TransactionType.INCOME, brandId: BrandId.DIGI_FLORA, category: 'Service' },
  { id: '2', date: '2023-11-03', amount: 1200, description: 'SaaS Subscription', type: TransactionType.EXPENSE, brandId: BrandId.CEO_HIVE, category: 'Tools' },
  { id: '3', date: '2023-11-05', amount: 25000, description: 'Consulting Fee', type: TransactionType.INCOME, brandId: BrandId.FUNDAGIST, category: 'Consulting' },
  { id: '4', date: '2023-11-07', amount: 4500, description: 'Office Rent Share', type: TransactionType.EXPENSE, brandId: BrandId.MISC, category: 'Operations' },
  { id: '5', date: '2023-11-10', amount: 80000, description: 'Project Milestone', type: TransactionType.INCOME, brandId: BrandId.DIGI_FLORA, category: 'Project' },
  { id: '6', date: '2023-11-12', amount: 120000, description: 'Wholesale Order', type: TransactionType.INCOME, brandId: BrandId.CADINA, category: 'Sales' },
];

// --- SELF DEVELOPMENT DATA ---

export const INITIAL_HABITS: DailyHabit[] = [
  { id: '1', title: '4 Liters Water (75 Hard)', completed: false, category: '75HARD' },
  { id: '2', title: '45 Min Gym Workout', completed: false, category: '75HARD' },
  { id: '3', title: '45 Min Outdoor Walk', completed: false, category: '75HARD' },
  { id: '4', title: '10 Pages Reading (Non-Fiction)', completed: false, category: '75HARD' },
  { id: '5', title: 'Zero Cheat Meals / Junk', completed: false, category: '75HARD' },
  { id: '6', title: '1 Hour Accounts Practice', completed: false, category: 'ACADEMIC' },
  { id: '7', title: 'Stretching/Hanging (Height)', completed: false, category: 'BIOHACK' },
];

export const INITIAL_SCHEDULE: DailyScheduleItem[] = [
  { id: '1', time: '05:00', activity: 'Wake Up + 75 Hard Workout 1', type: 'PHYSICAL', completed: false },
  { id: '2', time: '07:00', activity: 'Deep Work: Businesses (Intl)', type: 'WORK', completed: false },
  { id: '3', time: '10:00', activity: 'Accounts & Eco (Hard Subs)', type: 'STUDY', completed: false },
  { id: '4', time: '14:00', activity: 'Business Calls / Operations', type: 'WORK', completed: false },
  { id: '5', time: '17:00', activity: 'Gym / Height Training', type: 'PHYSICAL', completed: false },
  { id: '6', time: '19:00', activity: 'Practice: Accounts Sums', type: 'STUDY', completed: false },
  { id: '7', time: '21:30', activity: 'Reading + Planning', type: 'MIND', completed: false },
];

export const INITIAL_SYLLABUS: SubjectSyllabus[] = [
  {
    id: 'ACC',
    name: 'Accountancy (Class 12)',
    examType: 'BOARDS',
    chapters: [
      { id: 'a1', name: 'Partnership: Fundamentals', weightage: 10, mastery: MasteryLevel.MODERATE, category: 'Vol 1' },
      { id: 'a2', name: 'Goodwill: Nature & Valuation', weightage: 4, mastery: MasteryLevel.STRONG, category: 'Vol 1' },
      { id: 'a3', name: 'Reconstitution (Admission)', weightage: 8, mastery: MasteryLevel.WEAK, category: 'Vol 1' },
      { id: 'a4', name: 'Retirement & Death', weightage: 8, mastery: MasteryLevel.MODERATE, category: 'Vol 1' },
      { id: 'a5', name: 'Dissolution of Firm', weightage: 6, mastery: MasteryLevel.STRONG, category: 'Vol 1' },
      { id: 'a6', name: 'Share Capital', weightage: 14, mastery: MasteryLevel.NOT_STARTED, category: 'Vol 2' },
      { id: 'a7', name: 'Issue of Debentures', weightage: 8, mastery: MasteryLevel.MODERATE, category: 'Vol 2' },
      { id: 'a8', name: 'Financial Statements of Company', weightage: 4, mastery: MasteryLevel.STRONG, category: 'Vol 3' },
      { id: 'a9', name: 'Accounting Ratios', weightage: 8, mastery: MasteryLevel.WEAK, category: 'Vol 3' },
      { id: 'a10', name: 'Cash Flow Statement', weightage: 8, mastery: MasteryLevel.MODERATE, category: 'Vol 3' },
    ]
  },
  {
    id: 'BST',
    name: 'Business Studies (Class 12)',
    examType: 'BOARDS',
    chapters: [
      { id: 'b1', name: 'Nature & Significance of Mgmt', weightage: 6, mastery: MasteryLevel.MASTERED, category: 'Part A' },
      { id: 'b2', name: 'Principles of Management', weightage: 6, mastery: MasteryLevel.STRONG, category: 'Part A' },
      { id: 'b3', name: 'Business Environment', weightage: 4, mastery: MasteryLevel.MODERATE, category: 'Part A' },
      { id: 'b4', name: 'Planning', weightage: 6, mastery: MasteryLevel.STRONG, category: 'Part A' },
      { id: 'b5', name: 'Organising', weightage: 8, mastery: MasteryLevel.WEAK, category: 'Part A' },
      { id: 'b6', name: 'Staffing', weightage: 7, mastery: MasteryLevel.MODERATE, category: 'Part A' },
      { id: 'b7', name: 'Directing', weightage: 8, mastery: MasteryLevel.WEAK, category: 'Part A' },
      { id: 'b8', name: 'Controlling', weightage: 5, mastery: MasteryLevel.STRONG, category: 'Part A' },
      { id: 'b9', name: 'Financial Management', weightage: 9, mastery: MasteryLevel.WEAK, category: 'Part B' },
      { id: 'b10', name: 'Financial Markets', weightage: 6, mastery: MasteryLevel.MODERATE, category: 'Part B' },
      { id: 'b11', name: 'Marketing Management', weightage: 11, mastery: MasteryLevel.STRONG, category: 'Part B' },
      { id: 'b12', name: 'Consumer Protection', weightage: 4, mastery: MasteryLevel.MASTERED, category: 'Part B' },
    ]
  },
  {
    id: 'ECO',
    name: 'Economics (Class 12)',
    examType: 'BOARDS',
    chapters: [
      { id: 'e1', name: 'National Income & Aggregates', weightage: 10, mastery: MasteryLevel.WEAK, category: 'Macro' },
      { id: 'e2', name: 'Money and Banking', weightage: 6, mastery: MasteryLevel.MASTERED, category: 'Macro' },
      { id: 'e3', name: 'Determination of Income/Employment', weightage: 12, mastery: MasteryLevel.MODERATE, category: 'Macro' },
      { id: 'e4', name: 'Government Budget', weightage: 6, mastery: MasteryLevel.STRONG, category: 'Macro' },
      { id: 'e5', name: 'Balance of Payments', weightage: 6, mastery: MasteryLevel.STRONG, category: 'Macro' },
      { id: 'e6', name: 'Development Exp (1947-90)', weightage: 6, mastery: MasteryLevel.MODERATE, category: 'IED' },
      { id: 'e7', name: 'Economic Reforms 1991', weightage: 6, mastery: MasteryLevel.STRONG, category: 'IED' },
      { id: 'e8', name: 'Current Challenges (Poverty/Human Cap)', weightage: 20, mastery: MasteryLevel.WEAK, category: 'IED' },
      { id: 'e9', name: 'Sustainable Development', weightage: 4, mastery: MasteryLevel.MODERATE, category: 'IED' },
      { id: 'e10', name: 'Comparative Dev (Ind/Chi/Pak)', weightage: 4, mastery: MasteryLevel.STRONG, category: 'IED' },
    ]
  },
  {
    id: 'ENG',
    name: 'English Core (Class 12)',
    examType: 'BOARDS',
    chapters: [
      { id: 'en1', name: 'The Last Lesson', weightage: 3, mastery: MasteryLevel.MASTERED, category: 'Flamingo' },
      { id: 'en2', name: 'Lost Spring', weightage: 3, mastery: MasteryLevel.STRONG, category: 'Flamingo' },
      { id: 'en3', name: 'Deep Water', weightage: 3, mastery: MasteryLevel.MODERATE, category: 'Flamingo' },
      { id: 'en4', name: 'The Rattrap', weightage: 3, mastery: MasteryLevel.STRONG, category: 'Flamingo' },
      { id: 'en5', name: 'Indigo', weightage: 3, mastery: MasteryLevel.MODERATE, category: 'Flamingo' },
      { id: 'en6', name: 'Poets and Pancakes', weightage: 3, mastery: MasteryLevel.WEAK, category: 'Flamingo' },
      { id: 'en7', name: 'The Interview', weightage: 2, mastery: MasteryLevel.MODERATE, category: 'Flamingo' },
      { id: 'en8', name: 'Going Places', weightage: 2, mastery: MasteryLevel.WEAK, category: 'Flamingo' },
      { id: 'en9', name: 'My Mother at Sixty-Six', weightage: 2, mastery: MasteryLevel.MASTERED, category: 'Poetry' },
      { id: 'en10', name: 'Keeping Quiet', weightage: 2, mastery: MasteryLevel.STRONG, category: 'Poetry' },
      { id: 'en11', name: 'A Thing of Beauty', weightage: 2, mastery: MasteryLevel.MODERATE, category: 'Poetry' },
      { id: 'en12', name: 'A Roadside Stand', weightage: 2, mastery: MasteryLevel.WEAK, category: 'Poetry' },
      { id: 'en13', name: 'Aunt Jennifer’s Tigers', weightage: 2, mastery: MasteryLevel.STRONG, category: 'Poetry' },
      { id: 'en14', name: 'The Third Level', weightage: 2, mastery: MasteryLevel.STRONG, category: 'Vistas' },
      { id: 'en15', name: 'The Tiger King', weightage: 3, mastery: MasteryLevel.MASTERED, category: 'Vistas' },
      { id: 'en16', name: 'Journey to the End of the Earth', weightage: 2, mastery: MasteryLevel.WEAK, category: 'Vistas' },
      { id: 'en17', name: 'The Enemy', weightage: 3, mastery: MasteryLevel.MODERATE, category: 'Vistas' },
      { id: 'en18', name: 'On the Face of It', weightage: 2, mastery: MasteryLevel.STRONG, category: 'Vistas' },
      { id: 'en19', name: 'Memories of Childhood', weightage: 2, mastery: MasteryLevel.MODERATE, category: 'Vistas' },
      { id: 'en20', name: 'Writing Skills (Notice/Invitation/Letters)', weightage: 10, mastery: MasteryLevel.STRONG, category: 'Writing' },
    ]
  },
  {
    id: 'HIN',
    name: 'Hindi Core (Class 12)',
    examType: 'BOARDS',
    chapters: [
      { id: 'h1', name: 'Devsena ka Geet', weightage: 3, mastery: MasteryLevel.MODERATE, category: 'Antra (Poetry)' },
      { id: 'h2', name: 'Cornelia ka Geet', weightage: 3, mastery: MasteryLevel.WEAK, category: 'Antra (Poetry)' },
      { id: 'h3', name: 'Saroj Smriti', weightage: 4, mastery: MasteryLevel.WEAK, category: 'Antra (Poetry)' },
      { id: 'h4', name: 'Premghan ki Chhaya Smriti', weightage: 4, mastery: MasteryLevel.STRONG, category: 'Antra (Prose)' },
      { id: 'h5', name: 'Sumirini ke Manke', weightage: 3, mastery: MasteryLevel.MODERATE, category: 'Antra (Prose)' },
      { id: 'h6', name: 'Surdas ki Jhopdi', weightage: 5, mastery: MasteryLevel.STRONG, category: 'Antral' },
      { id: 'h7', name: 'Arohan', weightage: 5, mastery: MasteryLevel.WEAK, category: 'Antral' },
      { id: 'h8', name: 'Abhivyakti Aur Madhyam', weightage: 10, mastery: MasteryLevel.MODERATE, category: 'Creative' },
    ]
  },
  {
    id: 'WEB',
    name: 'Web Applications (Class 12)',
    examType: 'BOARDS',
    chapters: [
      { id: 'w1', name: 'Movie Editing Tools', weightage: 10, mastery: MasteryLevel.STRONG, category: 'Multimedia' },
      { id: 'w2', name: 'Customizing & Embedding Multimedia', weightage: 10, mastery: MasteryLevel.MODERATE, category: 'Multimedia' },
      { id: 'w3', name: 'JavaScript Review', weightage: 10, mastery: MasteryLevel.WEAK, category: 'Web Scripting' },
      { id: 'w4', name: 'Work Integrated Learning (Project)', weightage: 10, mastery: MasteryLevel.MASTERED, category: 'Project' },
    ]
  },
  {
    id: 'IELTS',
    name: 'IELTS Prep',
    examType: 'IELTS',
    chapters: [
      { id: 'i1', name: 'Listening: Form Completion', weightage: 25, mastery: MasteryLevel.STRONG, category: 'Listening' },
      { id: 'i2', name: 'Reading: True/False/Not Given', weightage: 25, mastery: MasteryLevel.WEAK, category: 'Reading' },
      { id: 'i3', name: 'Writing: Task 1 (Graph)', weightage: 15, mastery: MasteryLevel.MODERATE, category: 'Writing' },
      { id: 'i4', name: 'Writing: Task 2 (Essay)', weightage: 25, mastery: MasteryLevel.WEAK, category: 'Writing' },
      { id: 'i5', name: 'Speaking: Cue Card', weightage: 10, mastery: MasteryLevel.STRONG, category: 'Speaking' },
    ]
  }
];

export const INITIAL_ERROR_LOG: ErrorLogEntry[] = [
  { id: '1', subject: 'Accounts', topic: 'Dissolution', mistake: 'Forgot to transfer Investment Fluctuation Fund', correction: 'Transfer to Realisation A/c if asset exists', date: '2023-11-01' },
  { id: '2', subject: 'Economics', topic: 'National Income', mistake: 'Double counted intermediate goods', correction: 'Only take Final Goods value', date: '2023-11-03' },
];

export const INITIAL_MOCK_RESULTS: MockTestResult[] = [
  { id: '1', date: '2023-10-15', examType: 'BOARDS', subject: 'Accountancy', score: 68, totalMarks: 80 },
  { id: '2', date: '2023-10-22', examType: 'BOARDS', subject: 'Economics', score: 72, totalMarks: 80 },
  { id: '3', date: '2023-11-01', examType: 'BOARDS', subject: 'Accountancy', score: 75, totalMarks: 80 },
];
