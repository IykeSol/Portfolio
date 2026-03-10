import React, { useState, useEffect, useRef } from 'react';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import { useScroll, useSpring } from 'framer-motion';
import {
  Menu, X, Github, Mail, ExternalLink,
  MapPin, Zap, Code2, Layers, CheckCircle2, ArrowUpRight,
  Sun, Moon, MessageCircle, Send, Loader2, Twitter,
  Home, User, Briefcase
} from 'lucide-react';
import { FaWhatsapp, FaReact, FaPython, FaJs, FaLinkedin, FaNodeJs, FaGitAlt } from 'react-icons/fa';
import {
  SiSolidity, SiTypescript, SiNextdotjs, SiTailwindcss, SiMongodb, SiTensorflow, SiSupabase
} from 'react-icons/si';

// ─── CONSTANTS ────────────────────────────────────────────────────────────────

const WHATSAPP_NUMBER = '2348126832604';

const SYSTEM_PROMPT = `You are IykeSol's portfolio AI assistant. Your job is to help visitors understand what IykeSol can build for them.

IykeSol's skills and services:
- Software Development & Engineering: Full software lifecycle, robust system architecture, problem-solving, and scalable applications.
- Full Stack Web Development: Frontend & Backend, React, Next.js, Node.js, TypeScript, JavaScript, HTML/CSS, Tailwind CSS
- Blockchain / Web3 / DeFi: Solidity smart contracts, ERC-20/ERC-721 tokens, NFTs, DeFi protocols, dApps, MetaMask integration, Ethereum, Sepolia
- Machine Learning / AI: Python, TensorFlow, Streamlit, data analysis, AI prediction systems, Gemini API integration
- Database: MongoDB, Supabase, Firebase
- Other: E-Commerce platforms, portfolio sites, dashboards, SaaS products, token scanners, auction platforms
- Availability: Open to freelance and full-time roles, worldwide

Rules:
1. Be friendly, brief, and conversational. Max 3 sentences unless listing.
2. If the user's need matches IykeSol's skills, at the END of your message include this EXACT tag: [WHATSAPP_REDIRECT:message] where message is a pre-filled WhatsApp message for the user to send to IykeSol. The message should start with "Hi IykeSol, I saw your portfolio and I'm interested in..." and include the specific details of what the user needs.
3. If IykeSol likely can't help (e.g., mobile app native dev, iOS), politely let them know.
4. Never make up portfolio items not listed above.
5. Keep it human and warm, not corporate.`;

const NAV_ITEMS = ['Home', 'About', 'GitHub', 'Projects', 'Contact'];

const TECH = [
  { name: 'React',       Icon: FaReact,        color: '#61DAFB' },
  { name: 'TypeScript',  Icon: SiTypescript,   color: '#3178C6' },
  { name: 'JavaScript',  Icon: FaJs,           color: '#F7DF1E' },
  { name: 'Python',      Icon: FaPython,       color: '#3776AB' },
  { name: 'Solidity',    Icon: SiSolidity,     color: '#a8a8a8' },
  { name: 'Node.js',     Icon: FaNodeJs,       color: '#68A063' },
  { name: 'Next.js',     Icon: SiNextdotjs,    color: '#000000' },
  { name: 'Tailwind',    Icon: SiTailwindcss,  color: '#38BDF8' },
  { name: 'MongoDB',     Icon: SiMongodb,      color: '#47A248' },
  { name: 'Supabase',    Icon: SiSupabase,     color: '#3ECF8E' },
  { name: 'TensorFlow',  Icon: SiTensorflow,   color: '#FF6F00' },
  { name: 'Git',         Icon: FaGitAlt,       color: '#F05032' },
];

const PROJECTS = [
  {
    title: 'Intelligent Soccer Prediction System',
    category: 'Machine Learning',
    desc: 'An advanced ML-powered soccer match prediction system that analyzes team form, head-to-head history, expected goals (xG), and multiple statistical features to generate accurate match predictions. Integrated with Gemini API for detailed match analysis and final verdict with confidence scores.',
    tech: ['Python', 'Machine Learning', 'Streamlit', 'Gemini API'],
    link: 'https://top5-league-predictor.streamlit.app/',
    image: '/Images/Screenshot (1561).png',
    multiImages: ['/Images/Screenshot (1561).png', '/Images/Screenshot (1562).png', '/Images/brentford.png'],
    featured: true,
  },
  {
    title: 'IYKESOL Crypto Bank',
    category: 'DeFi',
    desc: 'A complete decentralized crypto banking platform built on Ethereum Sepolia testnet featuring a custom ERC-20 IYKESOL token with 2% burn mechanism on every transfer. Features dual authentication, real-time tracking, admin dashboard, and loan system.',
    tech: ['React', 'Node.js', 'Express', 'MongoDB', 'Solidity', 'Web3.js', 'MetaMask', 'Ethereum'],
    link: 'https://iykesol-crypto-bank.vercel.app/',
    image: '/Images/Screenshot (2479).png',
    color: '#a855f7',
    featured: false,
  },
  {
    title: 'Stella Collections',
    category: 'E-Commerce',
    desc: 'A premium contemporary fashion store built for a seamless shopping experience. Features real-time inventory via Supabase, a secure authenticated admin dashboard, and automated customer order confirmations via EmailJS.',
    tech: ['JavaScript', 'Tailwind CSS', 'Supabase', 'EmailJS', 'Vercel'],
    link: 'https://stellacollections.vercel.app/',
    image: '/Images/stella-collections.webp',
    color: '#ef4444',
    featured: false,
  },
  {
    title: 'Blockchain Food Ordering System',
    category: 'dApp',
    desc: 'A decentralized food delivery platform built with blockchain technology that ensures secure transactions through smart contract escrow. The system holds customer payments in ETH until food delivery is confirmed.',
    tech: ['HTML', 'JavaScript', 'Web3.js', 'Solidity', 'Metamask'],
    link: 'https://iyke-kitchen.pages.dev/',
    image: '/Images/Iykekitchen.png',
    color: '#10b981',
    featured: false,
  },
  {
    title: 'Token Safety Scanner',
    category: 'Security',
    desc: 'A comprehensive cryptocurrency token security scanner that analyzes smart contracts across Ethereum, BSC, Polygon, and Solana networks. Detects honeypots, verifies ownership, and assesses liquidity risks.',
    tech: ['HTML', 'Tailwind CSS', 'JavaScript', 'Node.js', 'Express', 'Ethers.js', 'Solana Web3.js'],
    link: 'https://tokenshield.netlify.app/',
    image: '/Images/Screenshot (1716).png',
    color: '#3b82f6',
    featured: false,
  },
  {
    title: 'CertiVerify',
    category: 'Blockchain',
    desc: 'A decentralized certificate verification platform deployed on Sepolia Ethereum network. Prevents fraud by allowing instant validation of educational credentials via blockchain.',
    tech: ['HTML', 'Tailwind CSS', 'JavaScript', 'Web3.js', 'Solidity', 'MetaMask'],
    link: 'https://certi-verify.pages.dev/',
    image: '/Images/Screenshot (1569).png',
    color: '#06b6d4',
    featured: false,
  },
];

// ─── THEME ────────────────────────────────────────────────────────────────────

const getThemeVars = (dark) => ({
  '--bg':       dark ? '#000000' : '#f9fafb',
  '--surface':  dark ? '#000000' : '#ffffff',
  '--surface2': dark ? '#000000' : '#f3f4f6',
  '--border':   dark ? '#18181b' : '#e5e7eb',
  '--text':     dark ? '#fafafa' : '#111827',
  '--muted':    dark ? '#8b949e' : '#4b5563',
  '--subtle':   dark ? '#6e7681' : '#9ca3af',
  '--nav-bg':   dark ? 'rgba(0,0,0,0.85)' : 'rgba(255,255,255,0.85)',
  '--brand':    '#2563eb',
});

// ─── GITHUB CONTRIBUTIONS ─────────────────────────────────────────────────────

const GitHubContributions = ({ dark }) => {
  const [weeks, setWeeks]   = useState([]);
  const [total, setTotal]   = useState(0);
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    const y = new Date().getFullYear();
    const BASE = 'https://github-contributions-api.jogruber.de/v4/IykeSol?y=';
    Promise.all([fetch(`${BASE}${y-1}`).then(r=>r.json()), fetch(`${BASE}${y}`).then(r=>r.json())])
      .then(([prev, curr]) => {
        const all = [...(prev.contributions||[]),...(curr.contributions||[])]
          .sort((a,b)=>a.date.localeCompare(b.date));
        const today=new Date(); today.setHours(23,59,59,0);
        const cutoff=new Date(today); cutoff.setDate(cutoff.getDate()-371);
        const filtered=all.filter(d=>{const dt=new Date(d.date);return dt>=cutoff&&dt<=today;});
        const first=new Date(filtered[0]?.date), dow=first.getDay();
        const padded=[
          ...Array.from({length:dow},(_,i)=>{const dp=new Date(first);dp.setDate(dp.getDate()-(dow-i));return{date:dp.toISOString().slice(0,10),count:0};}),
          ...filtered
        ];
        const grouped=[];for(let i=0;i<padded.length;i+=7)grouped.push(padded.slice(i,i+7));
        setWeeks(grouped);
        setTotal(filtered.reduce((s,d)=>s+d.count,0));
        setStatus('ok');
      }).catch(()=>setStatus('error'));
  },[]);

  const getColor=(count)=>{
    if(!dark){
      if(count===0)return '#ebedf0';
      if(count<=2)return '#9be9a8';
      if(count<=5)return '#40c463';
      if(count<=9)return '#30a14e';
      return '#216e39';
    }
    if(count===0)return '#27272a';
    if(count<=2)return '#10b981';
    if(count<=5)return '#34d399';
    if(count<=9)return '#6ee7b7';
    return '#a7f3d0';
  };

  const months=[];
  if(weeks.length>0){
    let last=-1;
    weeks.forEach((week,wi)=>{
      if(!week[0])return;
      const m=new Date(week[0].date).getMonth();
      if(m!==last){months.push({index:wi,label:new Date(week[0].date).toLocaleString('en',{month:'short'})});last=m;}
    });
  }

  const muted = dark ? '#52525b' : '#94a3b8';
  const CELL=12,GAP=2;

  if(status==='loading')return(
    <div style={{display:'flex',alignItems:'center',justifyContent:'center',padding:'32px 0',gap:10}}>
      <div style={{width:20,height:20,border:`2px solid #10b981`,borderTopColor:'transparent',borderRadius:'50%',animation:'spin .8s linear infinite'}}/>
      <span style={{color:muted,fontSize:12,fontFamily:'monospace'}}>Loading contributions…</span>
    </div>
  );
  if(status==='error')return<p style={{color:muted,fontSize:12}}>Could not load data.</p>;

  return(
    <div style={{width:'100%',overflowX:'auto'}}>
      <div style={{display:'flex',marginLeft:34,marginBottom:4,gap:GAP}}>
        {weeks.map((_,wi)=>{
          const m=months.find(x=>x.index===wi);
          return<div key={wi} style={{width:CELL,flexShrink:0,fontSize:9,color:muted,fontFamily:'monospace'}}>{m?m.label:''}</div>;
        })}
      </div>
      <div style={{display:'flex',gap:GAP}}>
        <div style={{display:'flex',flexDirection:'column',gap:GAP,marginRight:4}}>
          {['','Mon','','Wed','','Fri',''].map((d,i)=>
            <div key={i} style={{height:CELL,width:28,display:'flex',alignItems:'center',justifyContent:'flex-end',paddingRight:4,fontSize:9,color:muted,fontFamily:'monospace'}}>{d}</div>
          )}
        </div>
        {weeks.map((week,wi)=>(
          <div key={wi} style={{display:'flex',flexDirection:'column',gap:GAP,width:CELL,flexShrink:0}}>
            {Array.from({length:7}).map((_,di)=>{
              const day=week[di]||{date:'',count:0};
              return(
                <div key={di}
                  title={day.date?`${day.date}: ${day.count} contribution${day.count!==1?'s':''}`:undefined}
                  style={{width:CELL,height:CELL,borderRadius:2,backgroundColor:getColor(day.count),flexShrink:0,cursor:'default',transition:'transform .15s'}}
                  onMouseEnter={e=>e.currentTarget.style.transform='scale(1.4)'}
                  onMouseLeave={e=>e.currentTarget.style.transform='scale(1)'}
                />
              );
            })}
          </div>
        ))}
      </div>
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginTop:14}}>
        <span style={{fontSize:11,color:muted,fontFamily:'monospace'}}>{total.toLocaleString()} contributions · last 12 months</span>
        <div style={{display:'flex',alignItems:'center',gap:3,fontSize:9,color:muted}}>
          <span>Less</span>
          {(dark?['#27272a','#10b981','#34d399','#6ee7b7','#a7f3d0']:['#ebedf0','#9be9a8','#40c463','#30a14e','#216e39'])
            .map(c=><div key={c} style={{width:10,height:10,borderRadius:2,backgroundColor:c}}/>)}
          <span>More</span>
        </div>
      </div>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  );
};

// ─── CHAT WIDGET ──────────────────────────────────────────────────────────────

const ChatWidget = ({ dark }) => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', text: "Hey! I'm IykeSol's AI assistant. Ask me anything about his work, skills, or just say hi." }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [waLink, setWaLink] = useState(null);
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const send = async (textOverride) => {
    const text = typeof textOverride === 'string' ? textOverride.trim() : input.trim();
    if (!text || loading) return;
    setInput('');
    setWaLink(null);
    const history = [...messages, { role: 'user', text }];
    setMessages(history);
    setLoading(true);

    let reply = null;

    // --- TRY COHERE ---
    try {
      const cohereKey = import.meta.env.VITE_COHERE_API_KEY;
      const res = await fetch('https://api.cohere.com/v1/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${cohereKey}`,
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          message: text,
          preamble: SYSTEM_PROMPT,
          chat_history: history.slice(1, -1).map(m => ({
            role: m.role === 'assistant' ? 'CHATBOT' : 'USER',
            message: m.text
          }))
        })
      });
      const data = await res.json();
      if (res.ok) reply = data.text;
    } catch {
      console.warn("Cohere Primary failed, falling back...");
    }

    // --- FALLBACK TO GROQ ---
    if (!reply) {
      try {
        const groqKey = import.meta.env.VITE_GROQ_API_KEY;
        const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${groqKey}`
          },
          body: JSON.stringify({
            model: "llama-3.3-70b-versatile",
            messages: [
              { role: "system", content: SYSTEM_PROMPT },
              ...history.slice(1).map(m => ({ 
                role: m.role === 'assistant' ? 'assistant' : 'user', 
                content: m.text 
              }))
            ],
            temperature: 0.7,
            max_tokens: 500
          })
        });
        const data = await res.json();
        if (res.ok) reply = data.choices[0].message.content;
      } catch {
        console.warn("Groq Fallback failed, falling back to Gemini...");
      }
    }

    // --- FALLBACK TO GEMINI ---
    if (!reply) {
      try {
        const geminiKey = import.meta.env.VITE_GEMINI_API_KEY;
        const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=${geminiKey}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [
              { role: "user", parts: [{ text: SYSTEM_PROMPT }] },
              ...history.slice(1).map(m => ({
                role: m.role === 'assistant' ? 'model' : 'user',
                parts: [{ text: m.text }]
              }))
            ]
          })
        });
        const data = await res.json();
        if (res.ok) reply = data.candidates[0].content.parts[0].text;
      } catch (e) {
        console.error("Triple fallback failed:", e);
      }
    }

    if (reply) {
      const waMatch = reply.match(/\[WHATSAPP_REDIRECT:(.+?)\]/s);
      if (waMatch) {
        const waMsg = waMatch[1].trim();
        setWaLink(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(waMsg)}`);
        reply = reply.replace(/\[WHATSAPP_REDIRECT:.+?\]/s, '').trim();
      }
      setMessages(prev => [...prev, { role: 'assistant', text: reply }]);
    } else {
      setMessages(prev => [...prev, { role: 'assistant', text: "The AI is currently undergoing maintenance. Please reach out to IykeSOL directly via WhatsApp." }]);
      setWaLink(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hi IykeSOL, I saw your portfolio and would like to discuss a project.')}`);
    }
    setLoading(false);
  };

  const suggestions = [
    "What's your tech stack?",
    "Tell me about your ML projects",
    "Are you open to work?",
    "What projects have you built?"
  ];

  const s = dark
    ? { bg: '#09090b', border: '#27272a', text: '#fafafa', muted: '#a1a1aa', input: '#09090b', bubble: '#18181b', userBg: 'transparent', hover: '#27272a' }
    : { bg: '#ffffff', border: '#e5e7eb', text: '#111827', muted: '#64748b', input: '#f9fafb', bubble: '#f3f4f6', userBg: 'transparent', hover: '#f9fafb' };

  return (
    <>
      <button
        onClick={() => setOpen(o => !o)}
        className="fixed bottom-24 md:bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-all hover:scale-105 active:scale-95 border"
        style={{ background: s.bg, borderColor: s.border, color: s.text }}
        aria-label="Chat with AI"
      >
        {open ? <X size={20} /> : <MessageCircle size={20} />}
        {!open && <span className="absolute top-0 right-0 w-3.5 h-3.5 rounded-full bg-blue-500 animate-pulse border-2" style={{ borderColor: s.bg }} />}
      </button>

      <AnimatePresence>
        {open && (
          <Motion.div
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] md:inset-auto md:bottom-24 md:right-4 md:z-50 w-full h-full md:w-[380px] md:h-[480px] md:rounded-xl overflow-hidden shadow-2xl flex flex-col font-mono"
            style={{ 
              background: s.bg,
              border: 'none',
              ...(typeof window !== 'undefined' && window.innerWidth >= 768 ? { border: `1px solid ${s.border}` } : {})
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b" style={{ borderColor: s.border }}>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#2563eb' }} />
                <span className="text-xs font-mono font-bold tracking-widest" style={{ color: '#2563eb' }}>CHAT://IYKESOL</span>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => setMessages([{ role: 'assistant', text: "Hey! I'm IykeSol's AI assistant. Ask me anything about his work, skills, or just say hi." }])} className="p-1 hover:opacity-70 transition-opacity">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={s.muted} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
                </button>
                <button onClick={() => setOpen(false)} className="p-1 hover:opacity-70 transition-opacity">
                  <X size={14} color={s.muted} />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 font-mono text-xs leading-relaxed" style={{ scrollbarWidth: 'thin' }}>
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className="max-w-[90%] break-words p-3 rounded-lg"
                    style={{
                      background: m.role === 'user' ? s.userBg : s.bubble,
                      color: m.role === 'user' ? s.muted : s.text,
                      border: m.role === 'user' ? 'none' : `1px solid ${s.border}`,
                      textAlign: m.role === 'user' ? 'right' : 'left'
                    }}
                  >
                    {m.text}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="p-3 rounded-lg border flex items-center gap-2" style={{ background: s.bubble, borderColor: s.border, color: s.text }}>
                    <Loader2 size={12} className="animate-spin" />
                    <span className="opacity-70">typing...</span>
                  </div>
                </div>
              )}
              {waLink && !loading && (
                <div className="flex justify-start">
                  <a href={waLink} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 py-2 text-xs font-bold rounded-lg border transition-all"
                    style={{ background: 'rgba(37,99,235,0.1)', color: '#2563eb', borderColor: 'rgba(37,99,235,0.3)' }}>
                    <FaWhatsapp size={14} /> Connect on WhatsApp
                  </a>
                </div>
              )}
              {messages.length === 1 && !loading && (
                <div className="mt-auto pt-4 flex flex-wrap gap-2">
                  {suggestions.map(sug => (
                    <button key={sug} onClick={() => send(sug)}
                      className="text-[10px] px-2.5 py-1.5 rounded-md border text-left transition-colors"
                      style={{ borderColor: s.border, color: s.muted, borderStyle: 'dashed' }}
                      onMouseEnter={e => { e.currentTarget.style.color = s.text; e.currentTarget.style.borderColor = s.muted; }}
                      onMouseLeave={e => { e.currentTarget.style.color = s.muted; e.currentTarget.style.borderColor = s.border; }}
                    >
                      {sug}
                    </button>
                  ))}
                </div>
              )}
              <div ref={endRef} />
            </div>

            {/* Input */}
            <div className="p-3 border-t flex flex-col gap-2" style={{ borderColor: s.border }}>
              <div className="flex items-center gap-2 relative">
                <span className="absolute left-3 font-mono select-none text-xs" style={{ color: '#2563eb' }}>{'>'}</span>
                <input
                  type="text"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && send()}
                  placeholder="Ask me anything..."
                  className="flex-1 text-xs px-8 py-2.5 outline-none font-mono transition-all rounded-md"
                  style={{ background: s.input, color: s.text }}
                />
                <button onClick={() => send()} disabled={loading || !input.trim()}
                  className="w-8 h-8 flex items-center justify-center disabled:opacity-30 absolute right-1 transition-opacity">
                  <Send size={14} style={{ color: s.muted }} />
                </button>
              </div>
              <div className="flex justify-between items-center px-1">
                <span className="text-[9px] font-mono opacity-40" style={{ color: s.muted }}>{input.length}/500</span>
                <span className="text-[9px] font-mono opacity-40" style={{ color: s.muted }}>powered by gemini</span>
              </div>
            </div>
          </Motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// ─── SCROLL PROGRESS ──────────────────────────────────────────────────────────

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  return <Motion.div className="fixed top-0 left-0 h-[2px] z-50 origin-left" style={{ scaleX, background: '#2563eb' }} />;
};

// ─── LOADER ───────────────────────────────────────────────────────────────────

const Loader = ({ onComplete }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const t = setInterval(() => {
      setCount(p => { if (p >= 100) { clearInterval(t); setTimeout(onComplete, 400); return 100; } return p + 2; });
    }, 20);
    return () => clearInterval(t);
  }, [onComplete]);

  return (
    <Motion.div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#000000]"
      exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
      <img src="/Images/logo.png" alt="Logo" className="w-20 h-auto mb-8 opacity-90" />
      <div className="relative w-48">
        <div className="text-5xl font-black text-center tabular-nums font-mono text-zinc-100">
          {count}<span style={{ color: '#2563eb' }}>%</span>
        </div>
        <div className="h-[2px] bg-zinc-800 mt-4 rounded-full overflow-hidden">
          <Motion.div className="h-full rounded-full" style={{ background: '#2563eb' }} animate={{ width: `${count}%` }} />
        </div>
      </div>
    </Motion.div>
  );
};

// ─── TYPEWRITER ───────────────────────────────────────────────────────────────

const Typewriter = ({ strings }) => {
  const [idx, setIdx] = useState(0);
  const [text, setText] = useState('');
  const [del, setDel] = useState(false);

  useEffect(() => {
    const cur = strings[idx % strings.length];
    const t = setTimeout(() => {
      if (!del) {
        setText(cur.slice(0, text.length + 1));
        if (text.length + 1 === cur.length) setTimeout(() => setDel(true), 1800);
      } else {
        setText(cur.slice(0, text.length - 1));
        if (text.length === 0) { setDel(false); setIdx(i => i + 1); }
      }
    }, del ? 40 : 80);
    return () => clearTimeout(t);
  }, [text, del, idx, strings]);

  return <span className="text-blue-500 font-mono">{text}<span className="animate-blink">|</span></span>;
};

// ─── SECTION LABEL ────────────────────────────────────────────────────────────

const SectionLabel = ({ children }) => (
  <span className="text-xs font-mono uppercase tracking-widest text-blue-500">
    {children}
  </span>
);

// ─── MAIN APP ─────────────────────────────────────────────────────────────────

export default function App() {
  const [loading, setLoading] = useState(true);
  const [dark, setDark]       = useState(true);
  const [menuOpen, setMenu]   = useState(false);
  const [formStatus, setFormStatus] = useState('');
  const themeVars = getThemeVars(dark);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
  }, [menuOpen]);

  const scrollTo = (id) => {
    setMenu(false);
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 90, behavior: 'smooth' });
  };

  if (loading) return (
    <AnimatePresence><Loader onComplete={() => setLoading(false)} /></AnimatePresence>
  );

  const card = `rounded-2xl border transition-colors duration-300`;
  const cardStyle = { background: themeVars['--surface'], borderColor: themeVars['--border'] };
  const cardDash = { background: themeVars['--surface'], border: `1px dashed ${themeVars['--border']}`, borderRadius: 16 };

  return (
    <div style={{ ...themeVars, background: themeVars['--bg'], color: themeVars['--text'], minHeight: '100vh', transition: 'background .3s, color .3s' }}>
      <ScrollProgress />

      {/* Dot grid */}
      <div className="fixed inset-0 pointer-events-none z-0"
        style={{ backgroundImage: `radial-gradient(circle, ${dark ? '#27272a' : '#cbd5e1'} 1px, transparent 1px)`, backgroundSize: '24px 24px', opacity: dark ? 0.35 : 0.25 }} />

      {/* Glow */}
      <div className="fixed inset-0 pointer-events-none z-0"
        style={{ background: `radial-gradient(ellipse 80% 50% at 50% -20%, rgba(16,185,129,${dark ? '0.08' : '0.04'}) 0%, transparent 70%)` }} />

      {/* Sidebar Navigation (Desktop) */}
      <nav className="fixed left-0 top-0 bottom-0 w-20 z-50 hidden md:flex flex-col items-center py-8 border-r transition-all duration-300"
        style={{ background: themeVars['--bg'], borderColor: themeVars['--border'] }}>
        <img src="/Images/logo.png" alt="Logo" className="h-10 w-auto mb-10 opacity-90" />
        
        <div className="flex-1 flex flex-col gap-6">
          {[
            { id: 'home', icon: Home },
            { id: 'about', icon: User },
            { id: 'projects', icon: Briefcase },
            { id: 'github', icon: Github },
            { id: 'contact', icon: Mail }
          ].map(item => (
            <button key={item.id} onClick={() => scrollTo(item.id)}
              className="p-3 rounded-xl transition-all hover:bg-zinc-800/50 group relative"
              style={{ color: themeVars['--muted'] }}>
              <item.icon size={20} className="group-hover:text-blue-500 transition-colors" />
              <span className="absolute left-full ml-4 px-2 py-1 rounded bg-zinc-900 text-white text-[10px] font-mono uppercase tracking-widest opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap">
                {item.id}
              </span>
            </button>
          ))}
        </div>

        <div className="flex flex-col gap-4">
          <button onClick={() => setDark(d => !d)}
            className="p-3 rounded-xl transition-all hover:bg-zinc-800/50"
            style={{ color: themeVars['--muted'] }}>
            {dark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile Bottom Navigation (Twitter-style) */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden flex items-center justify-around py-4 border-t backdrop-blur-xl"
        style={{ background: themeVars['--nav-bg'], borderColor: themeVars['--border'] }}>
        {[
          { id: 'home', icon: Home },
          { id: 'about', icon: User },
          { id: 'projects', icon: Briefcase },
          { id: 'contact', icon: Mail }
        ].map(item => (
          <button key={item.id} onClick={() => scrollTo(item.id)}
            className="p-2 transition-all"
            style={{ color: themeVars['--muted'] }}>
            <item.icon size={22} />
          </button>
        ))}
      </nav>

      {/* Mobile Top Controls */}
      <div className="fixed top-4 right-4 z-50 md:hidden">
        <button onClick={() => setDark(d => !d)}
          className="w-10 h-10 rounded-full flex items-center justify-center border backdrop-blur-md"
          style={{ background: themeVars['--nav-bg'], borderColor: themeVars['--border'], color: themeVars['--muted'] }}>
          {dark ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>

      <div className="pl-0 md:pl-20 pb-20 md:pb-0">


      {/* ── HERO ── */}
      <section id="home" className="relative z-10 pt-28 md:pt-32 pb-10 px-4 md:px-8 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-5 gap-4">

          {/* Name / Bio */}
          <Motion.div initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }} transition={{ duration:.5 }}
            className={`md:col-span-3 ${card} p-7 flex flex-col justify-between min-h-[260px]`} style={cardStyle}>
            <div>
              <div className="flex items-center gap-2 mb-5">
                <span className="text-xs font-mono text-emerald-500 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse-dot" />
                  Available for Hire
                </span>
              </div>
              <div className="flex items-center gap-3 mb-2 flex-wrap">
                <h1 className="text-4xl md:text-5xl font-black tracking-tight" style={{ color: themeVars['--text'] }}>
                  Kalu Ikechukwu
                </h1>
                <CheckCircle2 size={28} className="text-blue-500 flex-shrink-0" strokeWidth={2.5} />
              </div>
              <p className="text-lg mt-3 leading-relaxed" style={{ color: themeVars['--muted'] }}>
                <Typewriter strings={['Full Stack Developer.', 'Blockchain Engineer.', 'Machine Learning Dev.', 'Building Digital Value.']} />
              </p>
            </div>
            <div className="flex flex-wrap gap-3 mt-6 items-center">
              <button onClick={() => scrollTo('projects')} className="flex items-center gap-2 px-5 py-2.5 hover:opacity-90 text-white font-semibold rounded-xl transition-all text-sm"
                style={{ background: themeVars['--brand'] }}>
                View Projects <ArrowUpRight size={16} />
              </button>
              <div className="flex items-center gap-2 ml-2">
                <a href="https://www.linkedin.com/in/kalu-ikechukwu-4730683a1" target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-full transition-colors flex items-center justify-center hover:bg-zinc-200 dark:hover:bg-zinc-800" style={{ color: themeVars['--muted'], background: themeVars['--surface2'] }}>
                  <FaLinkedin size={18} />
                </a>
                <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-full transition-colors flex items-center justify-center hover:bg-zinc-200 dark:hover:bg-zinc-800" style={{ color: themeVars['--muted'], background: themeVars['--surface2'] }}>
                  <FaWhatsapp size={18} />
                </a>
                <a href="https://twitter.com/agbaghaSol" target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-full transition-colors flex items-center justify-center hover:bg-zinc-200 dark:hover:bg-zinc-800" style={{ color: themeVars['--muted'], background: themeVars['--surface2'] }}>
                  <Twitter size={18} />
                </a>
              </div>
            </div>
          </Motion.div>

          {/* Terminal card */}
          <Motion.div initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }} transition={{ duration:.5, delay:.1 }}
            className={`md:col-span-2 ${card} overflow-hidden`} style={cardStyle}>
            <div className="flex items-center gap-2 px-4 py-3 border-b" style={{ borderColor: themeVars['--border'], background: themeVars['--surface2'] }}>
              <div className="w-3 h-3 rounded-full bg-red-500/80" /><div className="w-3 h-3 rounded-full bg-yellow-500/80" /><div className="w-3 h-3 rounded-full bg-green-500/80" />
              <span className="ml-3 text-xs font-mono" style={{ color: themeVars['--subtle'] }}>developer.js</span>
            </div>
            <div className="p-5 font-mono text-sm leading-7">
              {[
                { t: 'const dev = {',                            c: '#a78bfa' },
                { t: "  name: 'IykeSol',",                          c: '#34d399' },
                { t: "  role: 'Full Stack + Blockchain + Machine Learning',",       c: '#60a5fa' },
                { t: "  stack: ['React','Python','Solidity'],",  c: '#fbbf24' },
                { t: "  status: 'Open to work',",               c: '#34d399' },
                { t: '};',                                        c: '#a78bfa' },
              ].map((l, i) => (
                <Motion.div key={i} initial={{ opacity:0, x:-10 }} animate={{ opacity:1, x:0 }} transition={{ delay:0.4+i*0.1 }}
                  className="flex gap-3">
                  <span className="select-none w-4 text-right" style={{ color: themeVars['--subtle'] }}>{i+1}</span>
                  <span style={{ color: l.c }}>{l.t}</span>
                </Motion.div>
              ))}
              <Motion.div animate={{ opacity:[0,1,0] }} transition={{ repeat:Infinity, duration:.9 }} className="w-2 h-4 bg-blue-500 mt-1 ml-7" />
            </div>
          </Motion.div>

          {/* Stats */}
          {[
            { icon: <Layers size={18}/>,  label:'Projects Built',   value:'8+' },
            { icon: <Code2 size={18}/>,   label:'Technologies',     value:'16+' },
            { icon: <Zap size={18}/>,     label:'Contributions/yr', value:'200+' },
            { icon: <MapPin size={18}/>,  label:'Location',         value:'Worldwide' },
          ].map((s, i) => (
            <Motion.div key={i} initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.3+i*0.07 }}
              className={`${card} p-5 flex items-center gap-4 cursor-default`} style={cardStyle}
               onMouseEnter={e => e.currentTarget.style.borderColor='rgba(37,99,235,0.4)'}
               onMouseLeave={e => e.currentTarget.style.borderColor=themeVars['--border']}>
               <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-500 flex-shrink-0">
                {s.icon}
              </div>
              <div>
                <p className="text-xl font-black" style={{ color: themeVars['--text'] }}>{s.value}</p>
                <p className="text-xs font-mono mt-0.5" style={{ color: themeVars['--subtle'] }}>{s.label}</p>
              </div>
            </Motion.div>
          ))}
        </div>
      </section>

      {/* ── ABOUT & ML ── */}
      <section id="about" className="relative z-10 py-16 px-4 md:px-8 max-w-6xl mx-auto">
        <Motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} className="mb-10">
          <SectionLabel>About Me</SectionLabel>
          <h2 className="text-3xl md:text-4xl font-black mt-1" style={{ color: themeVars['--text'] }}>Who I Am</h2>
        </Motion.div>
        <div className="grid md:grid-cols-2 gap-6">
          <Motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
            className={`p-6 ${card} ${!dark ? 'shadow-sm' : ''}`} style={{ ...cardStyle }}>
            <p className="mb-4">
              I am a versatile <strong style={{color:themeVars['--text']}}>Full Stack Developer</strong> and <strong style={{color:themeVars['--text']}}>Blockchain Engineer</strong> with a passion for building scalable, high-performance applications. Whether it's crafting intuitive web interfaces in React and Next.js, or architecting secure decentralized smart contracts in Solidity, I bring deep technical expertise to every project.
            </p>
            <p>
              My journey in tech is driven by an insatiable curiosity for system architecture. I design robust backend systems and seamless Web3 integrations that bridge the gap between traditional computing and the decentralized data era.
            </p>
          </Motion.div>
          <Motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay: 0.1 }}
            className={`p-6 ${card} ${!dark ? 'shadow-sm' : ''}`} style={{ ...cardStyle }}>
            <p className="mb-4">
              Beyond standard development, I specialize in <strong style={{color:themeVars['--text']}}>Machine Learning & AI</strong>. I have built predictive systems like an ML-powered soccer match analyzer using Python, Streamlit, and the Gemini API, alongside complex data-driven solutions using TensorFlow.
            </p>
            <p>
              I thrive on transforming sophisticated challenges into elegant solutions, continuously exploring the exciting intersection of modern software engineering, artificial intelligence, and decentralized platforms.
            </p>
          </Motion.div>
        </div>
      </section>

      {/* ── TECH TICKER ── */}
      <div className="relative z-10 py-8 overflow-hidden"
        style={{ borderTop: `1px solid ${themeVars['--border']}`, borderBottom: `1px solid ${themeVars['--border']}`, background: dark ? 'rgba(9,9,11,0.5)' : 'rgba(255,255,255,0.5)' }}>
        <div className="animate-ticker flex gap-12 items-center">
          {[...TECH,...TECH].map((t, i) => (
            <div key={i} className="flex items-center gap-3 text-sm font-semibold uppercase tracking-wider flex-shrink-0 transition-colors" style={{ color: themeVars['--subtle'], fontFamily:'monospace' }}>
              <t.Icon size={18} style={{ color: t.color === '#000000' && !dark ? '#18181b' : t.color }} />
              {t.name}
            </div>
          ))}
        </div>
      </div>

      {/* ── TECH BENTO ── */}
      <section className="relative z-10 py-16 px-4 md:px-8 max-w-6xl mx-auto">
        <Motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} className="mb-10">
          <SectionLabel>Skills</SectionLabel>
          <h2 className="text-3xl md:text-4xl font-black mt-1" style={{ color: themeVars['--text'] }}>Tech Stack</h2>
        </Motion.div>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3">
          {TECH.map((t, i) => (
            <Motion.div key={i} initial={{ opacity:0, scale:0.8 }} whileInView={{ opacity:1, scale:1 }} viewport={{ once:true }} transition={{ delay:i*0.04 }}
              whileHover={{ y:-4 }}
              className="p-4 flex flex-col items-center gap-2.5 cursor-default group transition-all rounded-2xl"
              style={{ background: themeVars['--surface'], border:`1px dashed ${themeVars['--border']}` }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = dark ? '#52525b' : '#94a3b8'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = themeVars['--border']; }}>
              <t.Icon size={30} style={{ color: t.color === '#000000' && !dark ? '#18181b' : t.color }} className="group-hover:scale-110 transition-transform" />
              <span className="text-xs font-mono transition-colors" style={{ color: themeVars['--subtle'] }}>{t.name}</span>
            </Motion.div>
          ))}
        </div>
      </section>

      {/* ── GITHUB ── */}
      <section id="github" className="relative z-10 py-8 px-4 md:px-8 max-w-6xl mx-auto">
        <Motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} className="mb-8">
          <SectionLabel>Open Source</SectionLabel>
          <h2 className="text-3xl md:text-4xl font-black mt-1" style={{ color: themeVars['--text'] }}>GitHub Activity</h2>
        </Motion.div>
        <Motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
          className="rounded-2xl border p-6 md:p-8"
          style={{ background: dark ? '#0d1117' : '#ffffff', borderColor: themeVars['--border'] }}>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: themeVars['--surface2'] }}>
                <Github size={16} style={{ color: themeVars['--muted'] }} />
              </div>
              <div>
                <p className="text-sm font-semibold" style={{ color: themeVars['--text'] }}>IykeSol</p>
                <p className="text-xs font-mono" style={{ color: themeVars['--subtle'] }}>github.com/IykeSol</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono" style={{ color: '#2563eb' }}>
              <span className="w-2 h-2 rounded-full animate-pulse-dot" style={{ background: '#2563eb' }} />
              Live data
            </div>
          </div>
          <GitHubContributions dark={dark} />
        </Motion.div>
      </section>

      {/* ── PROJECTS ── */}
      <section id="projects" className="relative z-10 py-16 px-4 md:px-8 max-w-6xl mx-auto">
        <Motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} className="mb-10">
          <SectionLabel>Work</SectionLabel>
          <h2 className="text-3xl md:text-4xl font-black mt-1" style={{ color: themeVars['--text'] }}>Featured Projects</h2>
        </Motion.div>

        {/* Featured */}
        {PROJECTS.filter(p=>p.featured).map((p,i)=>(
          <Motion.div key={i} initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
            className={`${card} mb-4 overflow-hidden group`} style={cardStyle}
            onMouseEnter={e => e.currentTarget.style.borderColor = dark ? '#3f3f46' : '#cbd5e1'}
            onMouseLeave={e => e.currentTarget.style.borderColor = themeVars['--border']}>
            {p.multiImages ? (
              <div className="flex flex-col">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-1 bg-black border-b" style={{ borderColor: themeVars['--border'] }}>
                  {p.multiImages.map((img, idx) => (
                    <div key={idx} className="aspect-video overflow-hidden bg-black border-x first:border-l-0 last:border-r-0" style={{ borderColor: themeVars['--border'] }}>
                      <img src={img} alt={`${p.title} ${idx}`} className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700" />
                    </div>
                  ))}
                </div>
                <div className="p-7">
                  <div>
                    <span className="text-xs font-mono uppercase tracking-wider px-2.5 py-1 rounded-md inline-block"
                      style={{ background: themeVars['--surface2'], color: themeVars['--muted'], border:`1px solid ${themeVars['--border']}` }}>
                      {p.category}
                    </span>
                    <h3 className="text-2xl font-black mt-3 mb-3" style={{ color: themeVars['--text'] }}>{p.title}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: themeVars['--muted'] }}>{p.desc}</p>
                  </div>
                  <div>
                    <div className="flex flex-wrap gap-2 mt-5 mb-5">
                      {p.tech.map(t=><span key={t} className="text-[11px] font-mono px-2.5 py-1 rounded"
                        style={{ background: themeVars['--surface2'], color: themeVars['--subtle'], border:`1px solid ${themeVars['--border']}` }}>{t}</span>)}
                    </div>
                    <a href={p.link} target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 hover:opacity-90 text-white font-semibold rounded-xl transition-all text-sm"
                      style={{ background: themeVars['--brand'] }}>
                      View Project <ExternalLink size={14}/>
                    </a>
                  </div>
                </div>
              </div>
            ) : (
              <div className="md:grid md:grid-cols-5">
                <div className="md:col-span-3 relative overflow-hidden bg-black aspect-video">
                  <img src={p.image} alt={p.title} className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 md:bg-gradient-to-r from-transparent to-black/60" />
                </div>
                <div className="md:col-span-2 p-7 flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-mono uppercase tracking-wider px-2.5 py-1 rounded-md inline-block"
                      style={{ background: themeVars['--surface2'], color: themeVars['--muted'], border:`1px solid ${themeVars['--border']}` }}>
                      {p.category}
                    </span>
                    <h3 className="text-2xl font-black mt-3 mb-3" style={{ color: themeVars['--text'] }}>{p.title}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: themeVars['--muted'] }}>{p.desc}</p>
                  </div>
                  <div>
                    <div className="flex flex-wrap gap-2 mt-5 mb-5">
                      {p.tech.map(t=><span key={t} className="text-[11px] font-mono px-2.5 py-1 rounded"
                        style={{ background: themeVars['--surface2'], color: themeVars['--subtle'], border:`1px solid ${themeVars['--border']}` }}>{t}</span>)}
                    </div>
                    <a href={p.link} target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 hover:opacity-90 text-white font-semibold rounded-xl transition-all text-sm"
                      style={{ background: themeVars['--brand'] }}>
                      View Project <ExternalLink size={14}/>
                    </a>
                  </div>
                </div>
              </div>
            )}
          </Motion.div>
        ))}

        {/* Other projects grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {PROJECTS.filter(p=>!p.featured).map((p,i)=>(
            <Motion.div key={i} initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true }} transition={{ delay:i*0.08 }}
              className={`${card} overflow-hidden group flex flex-col cursor-pointer`} style={cardStyle}
              whileHover={{ y: -4 }}
              onMouseEnter={e => e.currentTarget.style.borderColor = dark ? '#3f3f46' : '#cbd5e1'}
              onMouseLeave={e => e.currentTarget.style.borderColor = themeVars['--border']}>
              <div className="relative overflow-hidden h-48 bg-black">
                <img src={p.image} alt={p.title} className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700"/>
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-zinc-950 to-transparent"/>
              </div>
              <div className="p-6 flex flex-col flex-1">
                <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] mb-2" style={{ color: p.color || themeVars['--brand'] }}>{p.category}</span>
                <h3 className="text-xl font-bold mb-3" style={{ color: themeVars['--text'] }}>{p.title}</h3>
                <div className="flex flex-col text-sm leading-relaxed space-y-4 text-slate-400" style={{ color: themeVars['--muted'] }}>{p.desc}</div>
                <div className="flex flex-wrap gap-2 mt-5 mb-6">
                  {p.tech.map(t=><span key={t} className="text-[10px] font-mono px-2 py-1 rounded-md"
                    style={{ background: themeVars['--surface2'], color: themeVars['--subtle'], border:`1px solid ${themeVars['--border']}` }}>{t}</span>)}
                </div>
                <div className="pt-2">
                  <a href={p.link} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-xs font-bold text-white transition-all hover:opacity-90"
                    style={{ background: themeVars['--brand'] }}>
                    View Project <ExternalLink size={12}/>
                  </a>
                </div>
              </div>
            </Motion.div>
          ))}
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="relative z-10 py-16 px-4 md:px-8 max-w-6xl mx-auto">
        <Motion.div initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
          className="p-10 md:p-16 text-center rounded-3xl"
          style={{ ...cardDash }}>
          <SectionLabel>Let's Talk</SectionLabel>
          <h2 className="text-4xl md:text-5xl font-black mb-4 mt-2" style={{ color: themeVars['--text'] }}>Ready to Build Something?</h2>
          <p className="max-w-xl mx-auto mb-10 leading-relaxed" style={{ color: themeVars['--muted'] }}>
            Whether you need a blockchain solution, an AI model, or a full-stack web app. I'm ready to bring your vision to life.
          </p>
          <div className="max-w-md mx-auto mt-8 mb-6">
            <form onSubmit={async (e) => {
              e.preventDefault();
              setFormStatus('loading');
              const formData = new FormData(e.target);
              try {
                const res = await fetch('https://formspree.io/f/mreypbja', {
                  method: 'POST',
                  body: formData,
                  headers: { 'Accept': 'application/json' }
                });
                if (res.ok) { setFormStatus('success'); e.target.reset(); }
                else setFormStatus('error');
              } catch (err) { 
                console.error("Form submission error:", err);
                setFormStatus('error'); 
              }
            }} className="flex flex-col gap-3 text-left">
              <input type="email" name="email" required placeholder="Your email address" className="w-full px-4 py-3 rounded-xl text-sm font-medium outline-none transition-all" style={{ background: themeVars['--surface2'], border: `1px solid ${themeVars['--border']}`, color: themeVars['--text'] }} />
              <textarea name="message" required placeholder="How can I help you?" rows={4} className="w-full px-4 py-3 rounded-xl text-sm font-medium outline-none transition-all resize-none" style={{ background: themeVars['--surface2'], border: `1px solid ${themeVars['--border']}`, color: themeVars['--text'] }} />
              <button type="submit" disabled={formStatus === 'loading'} className="w-full flex items-center justify-center gap-2 px-5 py-3 text-white font-semibold rounded-xl transition-all text-sm disabled:opacity-70"
                style={{ background: themeVars['--brand'] }}>
                {formStatus === 'loading' ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />} 
                {formStatus === 'success' ? 'Message Sent!' : formStatus === 'error' ? 'Error Sending. Try Again.' : 'Send Message'}
              </button>
            </form>
          </div>

          <div className="flex flex-wrap justify-center gap-4 pt-8" style={{ borderTop: `1px solid ${themeVars['--border']}` }}>
            {[
              { href:'https://www.linkedin.com/in/kalu-ikechukwu-4730683a1', icon:<FaLinkedin size={20}/>, color: '#0077b5' },
              { href:'https://github.com/IykeSol', icon:<Github size={20}/>, color: themeVars['--text'] },
              { href:`https://wa.me/${WHATSAPP_NUMBER}`, icon:<FaWhatsapp size={20}/>, color: '#25D366' },
              { href:'https://twitter.com/agbaghaSol', icon:<Twitter size={20}/>, color: themeVars['--text'] }
            ].map((b, i) => (
              <a key={i} href={b.href} target="_blank" rel="noopener noreferrer"
                className="p-3 rounded-full transition-transform hover:scale-110 flex items-center justify-center"
                style={{ color: b.color, background: themeVars['--surface2'], border: `1px solid ${themeVars['--border']}` }}>
                {b.icon}
              </a>
            ))}
          </div>
        </Motion.div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="relative z-10 py-8 px-4 md:px-8 max-w-6xl mx-auto" style={{ borderTop:`1px solid ${themeVars['--border']}` }}>
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img src="/Images/logo.png" alt="Logo" className="h-6 w-auto opacity-60"/>
            <p className="text-xs font-mono" style={{ color: themeVars['--subtle'] }}>© {new Date().getFullYear()} IykeSol</p>
          </div>
          <div className="flex gap-6 text-xs font-mono" style={{ color: themeVars['--subtle'] }}>
            {['home','about','projects','contact'].map(id=>(
              <button key={id} onClick={()=>scrollTo(id)} className="transition-colors capitalize hover:text-blue-500">{id}</button>
            ))}
          </div>
        </div>
      </footer>

      <ChatWidget dark={dark} />
    </div>
  </div>
);
}