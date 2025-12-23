import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { 
  Trophy, BookOpen, Dumbbell, Flame, TrendingUp, TrendingDown, 
  CheckCircle, Circle, Skull, Brain, UtensilsCrossed, Clock, 
  AlertTriangle, ChevronDown, ChevronUp, Plus, Trash2, Crown, Zap,
  Timer, Moon, LineChart as ChartIcon, RotateCcw
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { MasteryLevel, Chapter } from '../types';

const leaders = [
  { name: 'Ratan Tata', field: 'Business & Ethics', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Ratan_Tata_2011.jpg/480px-Ratan_Tata_2011.jpg' },
  { name: 'Elon Musk', field: 'Innovation', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Elon_Musk_Royal_Society_%28crop2%29.jpg/480px-Elon_Musk_Royal_Society_%28crop2%29.jpg' },
  { name: 'Warren Buffett', field: 'Investing', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Warren_Buffett_KU_Visit.jpg/480px-Warren_Buffett_KU_Visit.jpg' },
  { name: 'Sundar Pichai', field: 'Leadership', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Sundar_Pichai_%282023%29_cropped.jpg/480px-Sundar_Pichai_%282023%29_cropped.jpg' },
];

export const SelfDevelopment: React.FC = () => {
  const { 
    syllabus, habits, schedule, errorLog, mockResults,
    toggleHabit, updateChapterMastery, updateSchedule, 
    addScheduleItem, deleteScheduleItem, addErrorLog, deleteErrorLog, addMockResult
  } = useStore();

  const [activeTab, setActiveTab] = useState<'PLANNER' | 'SYLLABUS' | 'ERRORS'>('SYLLABUS');
  const [expandedSubject, setExpandedSubject] = useState<string | null>(null);
  
  // New Error State
  const [newError, setNewError] = useState({ subject: 'ACC', topic: '', mistake: '', correction: '' });
  
  // Mock Test State
  const [newMock, setNewMock] = useState({ subject: 'Accountancy', score: '', totalMarks: '80', date: new Date().toISOString().split('T')[0] });

  // Planner State
  const [newItem, setNewItem] = useState({ time: '', activity: '', type: 'STUDY' as const });

  // Focus Timer State
  const [timerActive, setTimerActive] = useState(false);
  const [seconds, setSeconds] = useState(0);

  // Sleep State (Simple Local State)
  const [sleepHrs, setSleepHrs] = useState(7);

  useEffect(() => {
    let interval: any = null;
    if (timerActive) {
      interval = setInterval(() => {
        setSeconds(prev => {
          const next = prev + 1;
          // Voice Coach Logic - Every 3600 seconds (1 hour)
          if (next > 0 && next % 3600 === 0) {
             const msg = new SpeechSynthesisUtterance("Good BOSS, you are doing great job by completing a 1 hour streak continue to next 1 hour and perform a 1 mock test now.");
             window.speechSynthesis.speak(msg);
          }
          return next;
        });
      }, 1000);
    } else if (!timerActive && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timerActive]);

  const formatTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const resetTimer = () => {
    setTimerActive(false);
    setSeconds(0);
  };

  // Calculate Overall Readiness
  const calculateReadiness = () => {
    let totalWeight = 0;
    let earnedWeight = 0;
    syllabus.forEach(sub => {
      sub.chapters.forEach(ch => {
        totalWeight += ch.weightage;
        // Mastery 0=0%, 1=25%, 2=50%, 3=75%, 4=100%
        const factor = ch.mastery / 4; 
        earnedWeight += (ch.weightage * factor);
      });
    });
    return totalWeight === 0 ? 0 : Math.round((earnedWeight / totalWeight) * 100);
  };

  const readiness = calculateReadiness();

  const getMasteryColor = (level: MasteryLevel) => {
    switch(level) {
      case MasteryLevel.NOT_STARTED: return 'bg-slate-100 text-slate-400 border-slate-200';
      case MasteryLevel.WEAK: return 'bg-rose-100 text-rose-600 border-rose-200';
      case MasteryLevel.MODERATE: return 'bg-amber-100 text-amber-600 border-amber-200';
      case MasteryLevel.STRONG: return 'bg-emerald-100 text-emerald-600 border-emerald-200';
      case MasteryLevel.MASTERED: return 'bg-purple-100 text-purple-600 border-purple-200';
    }
  };

  const getMasteryLabel = (level: MasteryLevel) => {
    switch(level) {
      case MasteryLevel.NOT_STARTED: return 'Not Started';
      case MasteryLevel.WEAK: return 'Weak';
      case MasteryLevel.MODERATE: return 'Moderate';
      case MasteryLevel.STRONG: return 'Strong';
      case MasteryLevel.MASTERED: return 'Mastered';
    }
  };

  const handleAddError = () => {
    if(!newError.topic) return;
    addErrorLog({
      subject: newError.subject,
      topic: newError.topic,
      mistake: newError.mistake,
      correction: newError.correction,
      date: new Date().toISOString().split('T')[0]
    });
    setNewError({ subject: 'ACC', topic: '', mistake: '', correction: '' });
  };

  const handleAddItem = () => {
    if(!newItem.time || !newItem.activity) return;
    addScheduleItem({
      time: newItem.time,
      activity: newItem.activity,
      type: newItem.type,
      completed: false
    });
    setNewItem({ time: '', activity: '', type: 'STUDY' });
  };

  const handleAddMock = () => {
    if(!newMock.score) return;
    addMockResult({
      subject: newMock.subject,
      score: parseFloat(newMock.score),
      totalMarks: parseFloat(newMock.totalMarks),
      date: newMock.date,
      examType: 'BOARDS'
    });
    setNewMock({...newMock, score: ''});
  };

  // Mock Graph Data
  const mockGraphData = mockResults.map(m => ({
    date: m.date.slice(5), // MM-DD
    score: (m.score / m.totalMarks) * 100,
    subject: m.subject
  }));

  return (
    <div className="space-y-8 animate-fade-in pb-20">
      
      {/* --- HERO SECTION --- */}
      <div className="bg-slate-900 text-white p-8 rounded-2xl shadow-xl relative overflow-hidden transition-all duration-500 hover:shadow-2xl">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-rose-600 opacity-10 rounded-full filter blur-3xl translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-end">
          <div>
            <div className="flex items-center space-x-2 text-rose-500 font-bold tracking-widest uppercase mb-2">
              <Crown size={20} />
              <span>Project: 0 to Hero</span>
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight mb-2">BEAST MODE</h1>
            <p className="text-slate-400 max-w-xl text-sm leading-relaxed">
              Target: SRCC (99%+). You are the architect of your own destiny.
              Pain is temporary. Regret is forever.
            </p>
          </div>
          <div className="text-right mt-6 md:mt-0">
             <div className="text-xs text-slate-400 mb-1 uppercase tracking-wide">Boards Readiness</div>
             <div className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
               {readiness}%
             </div>
             <div className="text-xs text-slate-500 mt-2">Based on Syllabus Mastery</div>
          </div>
        </div>

        {/* --- FOCUS TIMER & BIO WIDGETS --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
           {/* Monk Mode Timer */}
           <div className="bg-slate-800 p-4 rounded-xl border border-slate-700 flex items-center justify-between">
              <div>
                <div className="text-xs text-indigo-400 font-bold uppercase mb-1 flex items-center"><Timer size={12} className="mr-1"/> Monk Mode Timer</div>
                <div className="text-2xl font-mono font-bold tracking-wider">{formatTime(seconds)}</div>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => setTimerActive(!timerActive)}
                  className={`px-4 py-2 rounded-lg font-bold text-xs shadow-lg transition-all ${timerActive ? 'bg-rose-500 text-white hover:bg-rose-600' : 'bg-emerald-500 text-white hover:bg-emerald-600'}`}
                >
                  {timerActive ? 'STOP' : 'START'}
                </button>
                <button 
                  onClick={resetTimer}
                  className="p-2 bg-slate-700 text-slate-300 rounded-lg hover:bg-slate-600 transition-colors"
                >
                  <RotateCcw size={16} />
                </button>
              </div>
           </div>

           {/* Sleep Tracker */}
           <div className="bg-slate-800 p-4 rounded-xl border border-slate-700 flex items-center justify-between">
             <div>
               <div className="text-xs text-purple-400 font-bold uppercase mb-1 flex items-center"><Moon size={12} className="mr-1"/> Sleep (Recovery)</div>
               <div className="flex items-center">
                 <input 
                   type="number" 
                   value={sleepHrs} 
                   onChange={(e) => setSleepHrs(parseFloat(e.target.value))}
                   className="w-12 bg-transparent text-2xl font-bold font-mono border-b border-slate-600 focus:outline-none focus:border-purple-500 text-center"
                 />
                 <span className="ml-2 text-sm text-slate-400">Hrs</span>
               </div>
             </div>
             <div className="text-right">
               <div className="text-xs text-slate-500">Target: 8h</div>
               <div className={`text-xs font-bold ${sleepHrs >= 8 ? 'text-emerald-500' : 'text-amber-500'}`}>
                 {sleepHrs >= 8 ? 'OPTIMIZED' : 'LACKING'}
               </div>
             </div>
           </div>

           {/* Mock Test Mini Stat */}
           <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
              <div className="text-xs text-cyan-400 font-bold uppercase mb-1 flex items-center"><ChartIcon size={12} className="mr-1"/> Latest Mock Score</div>
              <div className="flex justify-between items-end">
                <div className="text-2xl font-bold">
                  {mockResults.length > 0 ? `${(mockResults[mockResults.length-1].score / mockResults[mockResults.length-1].totalMarks * 100).toFixed(1)}%` : 'N/A'}
                </div>
                <div className="text-xs text-slate-400">{mockResults.length > 0 ? mockResults[mockResults.length-1].subject : '-'}</div>
              </div>
           </div>
        </div>
      </div>

      {/* --- TABS --- */}
      <div className="flex space-x-1 bg-slate-200 p-1 rounded-xl w-fit">
        {['PLANNER', 'SYLLABUS', 'ERRORS'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === tab ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
          >
            {tab === 'SYLLABUS' ? 'ACADEMIC TRACKER' : tab === 'PLANNER' ? 'WAR ROOM' : 'ERROR VAULT'}
          </button>
        ))}
      </div>

      {/* --- PLANNER TAB --- */}
      {activeTab === 'PLANNER' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-in">
          {/* Daily Schedule */}
          <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm p-6">
             <div className="flex justify-between items-center mb-6">
               <h3 className="font-bold text-slate-800 flex items-center">
                 <Clock size={18} className="mr-2 text-indigo-500" /> 
                 Daily Battle Plan
               </h3>
               <div className="text-xs text-slate-400">{new Date().toDateString()}</div>
             </div>
             
             {/* Add Item */}
             <div className="flex gap-2 mb-6 p-3 bg-slate-50 rounded-lg">
               <input type="time" className="border rounded p-1 text-sm" value={newItem.time} onChange={e => setNewItem({...newItem, time: e.target.value})} />
               <input type="text" placeholder="Activity" className="flex-1 border rounded p-1 text-sm" value={newItem.activity} onChange={e => setNewItem({...newItem, activity: e.target.value})} />
               <select className="border rounded p-1 text-sm" value={newItem.type} onChange={e => setNewItem({...newItem, type: e.target.value as any})}>
                 <option value="STUDY">Study</option>
                 <option value="WORK">Work</option>
                 <option value="PHYSICAL">Gym</option>
                 <option value="MIND">Mind</option>
               </select>
               <button onClick={handleAddItem} className="bg-indigo-600 text-white p-1 rounded hover:bg-indigo-700"><Plus size={18}/></button>
             </div>

             <div className="space-y-0 relative border-l-2 border-slate-100 ml-3">
                {schedule.map((slot) => (
                  <div key={slot.id} className="mb-6 ml-6 relative group">
                     <div 
                       onClick={() => updateSchedule(slot.id, 'completed', !slot.completed)}
                       className={`absolute -left-[31px] w-4 h-4 rounded-full border-2 border-white shadow-sm cursor-pointer transition-colors
                       ${slot.completed ? 'bg-slate-400' : slot.type === 'PHYSICAL' ? 'bg-orange-400' : slot.type === 'WORK' ? 'bg-indigo-500' : slot.type === 'STUDY' ? 'bg-emerald-500' : 'bg-purple-500'}`}
                     ></div>
                     <div className="flex justify-between items-start">
                       <div className={slot.completed ? 'opacity-50 blur-[0.5px] transition-all' : ''}>
                         <div className="text-xs font-bold text-slate-400">{slot.time}</div>
                         <div className="text-sm font-medium text-slate-800">{slot.activity}</div>
                       </div>
                       <button onClick={() => deleteScheduleItem(slot.id)} className="text-slate-300 hover:text-rose-500 opacity-0 group-hover:opacity-100 transition"><Trash2 size={14}/></button>
                     </div>
                  </div>
                ))}
             </div>
          </div>

          {/* 75 Hard & Hall of Fame */}
          <div className="space-y-6">
             <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
               <h3 className="font-bold text-slate-800 mb-4 flex items-center">
                 <Dumbbell size={18} className="mr-2 text-rose-500" />
                 75 Hard Checklist
               </h3>
               <div className="space-y-3">
                {habits.filter(h => h.category === '75HARD').map(habit => (
                  <div 
                    key={habit.id} 
                    onClick={() => toggleHabit(habit.id)}
                    className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-all hover:-translate-y-0.5
                      ${habit.completed ? 'bg-rose-50 border-rose-200' : 'bg-white border-slate-100 hover:border-slate-300'}`}
                  >
                    <span className={`text-xs font-bold ${habit.completed ? 'text-rose-800' : 'text-slate-600'}`}>
                      {habit.title}
                    </span>
                    {habit.completed ? <CheckCircle className="text-rose-600" size={16} /> : <Circle className="text-slate-300" size={16} />}
                  </div>
                ))}
              </div>
             </div>

             <div className="bg-slate-900 rounded-xl p-6 text-white hover:shadow-xl transition-all duration-300">
                <h3 className="font-bold text-amber-400 mb-4 text-xs uppercase tracking-widest flex items-center">
                  <Zap size={14} className="mr-2" /> Top 0.00000001%
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {leaders.map((leader, i) => (
                    <div key={i} className="text-center group cursor-pointer">
                      <div className="w-16 h-16 mx-auto rounded-full overflow-hidden border-2 border-slate-700 group-hover:border-amber-400 transition mb-2">
                        <img src={leader.img} alt={leader.name} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition duration-500 transform group-hover:scale-110" />
                      </div>
                      <div className="text-xs font-bold">{leader.name}</div>
                      <div className="text-[10px] text-slate-500">{leader.field}</div>
                    </div>
                  ))}
                </div>
             </div>
          </div>
        </div>
      )}

      {/* --- SYLLABUS TAB --- */}
      {activeTab === 'SYLLABUS' && (
        <div className="animate-fade-in space-y-6">
          
          {/* MOCK TEST TRACKER */}
          <div className="bg-white border border-slate-200 p-6 rounded-xl shadow-sm">
             <div className="flex justify-between items-start mb-6">
               <div>
                  <h3 className="font-bold text-slate-800 flex items-center">
                    <ChartIcon className="mr-2 text-blue-600" size={18} />
                    Mock Test Trajectory
                  </h3>
                  <p className="text-xs text-slate-400">Track your performance over time. Target: 99%</p>
               </div>
               <div className="flex gap-2 bg-slate-50 p-2 rounded-lg">
                  <select 
                    className="bg-transparent text-sm border-none focus:ring-0"
                    value={newMock.subject}
                    onChange={(e) => setNewMock({...newMock, subject: e.target.value})}
                  >
                    {syllabus.map(s => <option key={s.id} value={s.name}>{s.name}</option>)}
                  </select>
                  <input 
                    type="number" 
                    placeholder="Score"
                    className="w-16 bg-white border border-slate-200 rounded px-2 py-1 text-sm"
                    value={newMock.score}
                    onChange={(e) => setNewMock({...newMock, score: e.target.value})}
                  />
                  <span className="text-slate-400 text-sm py-1">/ {newMock.totalMarks}</span>
                  <button onClick={handleAddMock} className="bg-blue-600 text-white px-3 py-1 rounded text-sm font-bold">+</button>
               </div>
             </div>
             
             <div className="h-64 w-full">
               <ResponsiveContainer width="100%" height="100%">
                 <LineChart data={mockGraphData}>
                   <CartesianGrid strokeDasharray="3 3" vertical={false} />
                   <XAxis dataKey="date" tick={{fontSize: 12}} />
                   <YAxis domain={[0, 100]} tick={{fontSize: 12}} />
                   <Tooltip />
                   <Line type="monotone" dataKey="score" stroke="#2563eb" strokeWidth={3} dot={{r: 4}} />
                 </LineChart>
               </ResponsiveContainer>
             </div>
          </div>

          <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg flex items-start gap-3">
             <AlertTriangle className="text-amber-500 shrink-0" size={20} />
             <div className="text-sm text-amber-800">
               <strong>Strategy:</strong> Prioritize "High Weightage, Low Mastery" chapters. 
               Click on a status button to cycle through levels (Weak -> Moderate -> Strong -> Mastered).
             </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {syllabus.map(subject => (
              <div key={subject.id} className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition">
                <div 
                  onClick={() => setExpandedSubject(expandedSubject === subject.id ? null : subject.id)}
                  className="p-4 bg-slate-50 flex justify-between items-center cursor-pointer hover:bg-slate-100 transition"
                >
                  <div className="flex items-center gap-3">
                    <BookOpen size={20} className="text-slate-500" />
                    <span className="font-bold text-slate-800">{subject.name}</span>
                    <span className="text-xs px-2 py-0.5 rounded bg-white border border-slate-200 text-slate-500">{subject.examType}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-xs font-medium text-slate-500 hidden md:block">
                      {subject.chapters.filter(c => c.mastery === MasteryLevel.MASTERED).length}/{subject.chapters.length} Mastered
                    </div>
                    {expandedSubject === subject.id ? <ChevronUp size={20} className="text-slate-400" /> : <ChevronDown size={20} className="text-slate-400" />}
                  </div>
                </div>

                {expandedSubject === subject.id && (
                  <div className="p-4 overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="text-xs text-slate-400 uppercase border-b border-slate-100">
                          <th className="pb-2 pl-2">Category</th>
                          <th className="pb-2">Chapter</th>
                          <th className="pb-2 text-center">Weightage</th>
                          <th className="pb-2">Mastery Level (Click to Edit)</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-50">
                        {subject.chapters.map(chapter => (
                          <tr key={chapter.id} className="group hover:bg-slate-50">
                            <td className="py-3 pl-2 text-xs text-slate-500 font-medium">{chapter.category}</td>
                            <td className="py-3 text-sm font-semibold text-slate-800">{chapter.name}</td>
                            <td className="py-3 text-center">
                              <span className="text-xs font-bold bg-slate-100 px-2 py-1 rounded text-slate-600">{chapter.weightage} Marks</span>
                            </td>
                            <td className="py-3">
                              <button
                                onClick={() => {
                                  const nextLevel = chapter.mastery >= 4 ? 0 : chapter.mastery + 1;
                                  updateChapterMastery(subject.id, chapter.id, nextLevel);
                                }}
                                className={`w-full text-xs font-bold py-1.5 px-3 rounded border transition-all hover:brightness-95 ${getMasteryColor(chapter.mastery)}`}
                              >
                                {getMasteryLabel(chapter.mastery)}
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* --- ERROR VAULT TAB --- */}
      {activeTab === 'ERRORS' && (
        <div className="animate-fade-in grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
             <div className="bg-slate-900 text-white p-6 rounded-xl shadow-lg sticky top-6">
               <h3 className="font-bold mb-4 flex items-center text-rose-400">
                 <Skull size={18} className="mr-2" />
                 Log New Mistake
               </h3>
               <p className="text-xs text-slate-400 mb-4">
                 "Insanity is doing the same thing over and over expecting different results." - Log it to kill it.
               </p>
               <div className="space-y-3">
                 <select 
                    className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-sm text-slate-200"
                    value={newError.subject}
                    onChange={(e) => setNewError({...newError, subject: e.target.value})}
                 >
                   {syllabus.map(s => <option key={s.id} value={s.name}>{s.name}</option>)}
                 </select>
                 <input 
                   type="text" 
                   placeholder="Topic (e.g. Admission)" 
                   className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-sm text-slate-200"
                   value={newError.topic}
                   onChange={(e) => setNewError({...newError, topic: e.target.value})}
                 />
                 <textarea 
                   placeholder="What went wrong?" 
                   className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-sm text-slate-200"
                   rows={2}
                   value={newError.mistake}
                   onChange={(e) => setNewError({...newError, mistake: e.target.value})}
                 />
                 <textarea 
                   placeholder="The Correction / Concept" 
                   className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-sm text-emerald-400 placeholder-emerald-800/50"
                   rows={2}
                   value={newError.correction}
                   onChange={(e) => setNewError({...newError, correction: e.target.value})}
                 />
                 <button 
                   onClick={handleAddError}
                   className="w-full bg-rose-600 hover:bg-rose-700 text-white font-bold py-2 rounded transition"
                 >
                   Archive Failure
                 </button>
               </div>
             </div>
          </div>

          <div className="lg:col-span-2 space-y-4">
             {errorLog.length === 0 && (
               <div className="text-center p-10 bg-white border border-dashed border-slate-300 rounded-xl text-slate-400">
                 No errors logged yet. Start practicing and record your gaps here.
               </div>
             )}
             {errorLog.map(log => (
               <div key={log.id} className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm hover:shadow-md transition group">
                 <div className="flex justify-between items-start mb-2">
                   <div>
                     <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-600 px-2 py-1 rounded mr-2">
                       {log.subject}
                     </span>
                     <span className="text-sm font-bold text-slate-800">{log.topic}</span>
                   </div>
                   <button onClick={() => deleteErrorLog(log.id)} className="text-slate-300 hover:text-rose-500 opacity-0 group-hover:opacity-100"><Trash2 size={16}/></button>
                 </div>
                 <div className="flex gap-4 mt-3">
                   <div className="flex-1 bg-rose-50 p-3 rounded-lg border border-rose-100">
                     <div className="text-xs font-bold text-rose-800 mb-1">MISTAKE</div>
                     <div className="text-sm text-rose-700">{log.mistake}</div>
                   </div>
                   <div className="flex-1 bg-emerald-50 p-3 rounded-lg border border-emerald-100">
                     <div className="text-xs font-bold text-emerald-800 mb-1">FIX</div>
                     <div className="text-sm text-emerald-700">{log.correction}</div>
                   </div>
                 </div>
                 <div className="text-right mt-2 text-[10px] text-slate-400">Logged on {log.date}</div>
               </div>
             ))}
          </div>
        </div>
      )}

    </div>
  );
};
