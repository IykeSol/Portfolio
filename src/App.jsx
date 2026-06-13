import React, { useState, useEffect, useRef } from 'react';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import { useScroll, useSpring, useMotionValue, useTransform, useMotionTemplate, useReducedMotion } from 'framer-motion';
import {
  X, Github, Mail, ExternalLink, ArrowUpRight, ArrowRight,
  Sun, Moon, MessageCircle, Send, Loader2, Twitter,
  Home, User, Briefcase, Layers, Boxes, Cpu, Database,
  CheckCircle2, Terminal
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

// Skill domains — the spine of the page. Every skill lives in exactly one domain.
const DOMAINS = [
  {
    key: 'fullstack',
    name: 'Full-Stack Engineering',
    Icon: Layers,
    color: '#4f7cff',
    pitch: 'Production web apps, end to end. Accessible UI, typed APIs, the lot.',
    deliver: ['Web apps & dashboards', 'REST APIs & auth', 'E-commerce & SaaS'],
    tech: ['React', 'Next.js', 'TypeScript', 'Node.js', 'Express', 'Tailwind CSS'],
    span: 'lg',
  },
  {
    key: 'web3',
    name: 'Blockchain & Web3',
    Icon: Boxes,
    color: '#a855f7',
    pitch: 'Smart contracts and dApps that move real value on-chain.',
    deliver: ['ERC-20 / ERC-721 tokens', 'DeFi & escrow contracts', 'Wallet-connected dApps'],
    tech: ['Solidity', 'Ethereum', 'Web3.js', 'Ethers.js', 'MetaMask', 'Hardhat'],
  },
  {
    key: 'ml',
    name: 'Machine Learning & AI',
    Icon: Cpu,
    color: '#10b981',
    pitch: 'Predictive models and AI features wired straight into products.',
    deliver: ['Prediction systems', 'Data analysis pipelines', 'LLM / API integration'],
    tech: ['Python', 'TensorFlow', 'Streamlit', 'Gemini API', 'Pandas'],
  },
  {
    key: 'data',
    name: 'Data & Infrastructure',
    Icon: Database,
    color: '#f59e0b',
    pitch: 'Realtime data, auth and deploys that just keep running.',
    deliver: ['Realtime databases', 'Auth & storage', 'CI & deploys'],
    tech: ['MongoDB', 'Supabase', 'Firebase', 'Vercel', 'Git'],
  },
];

const TECH = [
  { name: 'React',       Icon: FaReact,        color: '#61DAFB' },
  { name: 'TypeScript',  Icon: SiTypescript,   color: '#3178C6' },
  { name: 'JavaScript',  Icon: FaJs,           color: '#F7DF1E' },
  { name: 'Python',      Icon: FaPython,       color: '#3776AB' },
  { name: 'Solidity',    Icon: SiSolidity,     color: '#a8a8a8' },
  { name: 'Node.js',     Icon: FaNodeJs,       color: '#68A063' },
  { name: 'Next.js',     Icon: SiNextdotjs,    color: '#ffffff' },
  { name: 'Tailwind',    Icon: SiTailwindcss,  color: '#38BDF8' },
  { name: 'MongoDB',     Icon: SiMongodb,      color: '#47A248' },
  { name: 'Supabase',    Icon: SiSupabase,     color: '#3ECF8E' },
  { name: 'TensorFlow',  Icon: SiTensorflow,   color: '#FF6F00' },
  { name: 'Git',         Icon: FaGitAlt,       color: '#F05032' },
];

const PROJECTS = [
  // ── Featured hero ──
  {
    title: 'Intelligent Soccer Prediction System',
    category: 'Machine Learning',
    domain: 'ml',
    desc: 'An ML-powered soccer match predictor that analyzes team form, head-to-head history, expected goals (xG) and dozens of statistical features. Integrated with the Gemini API for a detailed match analysis and final verdict with confidence scores.',
    tech: ['Python', 'Machine Learning', 'Streamlit', 'Gemini API'],
    link: 'https://top5-league-predictor.streamlit.app/',
    image: '/Images/Screenshot (1561).png',
    multiImages: ['/Images/Screenshot (1561).png', '/Images/Screenshot (1562).png', '/Images/brentford.png'],
    featured: true,
  },
  // ── Grid (6 = two clean rows of three) ──
  {
    title: 'Voltic Prepaid Analyzer',
    category: 'Machine Learning',
    domain: 'ml',
    desc: 'An AI prepaid electricity meter analyzer that reads usage history, forecasts token consumption and flags unusual spending, with Gemini-powered savings advice so households can budget power smarter.',
    tech: ['Python', 'FastAPI', 'Pandas', 'Gemini API'],
    link: 'https://iykesol-voltic.hf.space/',
    image: '/Images/voltic.png',
    featured: false,
  },
  {
    title: 'SENTRY Driver Fatigue',
    category: 'Computer Vision',
    domain: 'ml',
    desc: 'A real-time driver fatigue and drowsiness detector built with computer vision. It watches eye and head cues from a live camera feed and raises an alert the moment focus slips.',
    tech: ['Python', 'OpenCV', 'TensorFlow', 'Computer Vision'],
    link: 'https://iykekaey-sentry.hf.space/',
    image: '/Images/sentry.png',
    featured: false,
  },
  {
    title: 'Stella Collections',
    category: 'E-Commerce',
    domain: 'fullstack',
    desc: 'A premium contemporary fashion store built for a seamless shopping experience: real-time inventory via Supabase, a secure authenticated admin dashboard and automated order confirmations via EmailJS.',
    tech: ['JavaScript', 'Tailwind CSS', 'Supabase', 'EmailJS', 'Vercel'],
    link: 'https://stellacollections.vercel.app/',
    image: '/Images/stella-collections.webp',
    featured: false,
  },
  {
    title: 'Token Safety Scanner',
    category: 'Security',
    domain: 'web3',
    desc: 'A cryptocurrency token security scanner that analyzes smart contracts across Ethereum, BSC, Polygon and Solana. Detects honeypots, verifies ownership and assesses liquidity risk.',
    tech: ['JavaScript', 'Node.js', 'Express', 'Ethers.js', 'Solana Web3.js'],
    link: 'https://tokenshield.netlify.app/',
    image: '/Images/Screenshot (1716).png',
    featured: false,
  },
  {
    title: 'CertiVerify',
    category: 'Blockchain',
    domain: 'web3',
    desc: 'A decentralized certificate verification platform on Sepolia. Prevents credential fraud by letting anyone instantly validate educational certificates on-chain.',
    tech: ['JavaScript', 'Tailwind CSS', 'Web3.js', 'Solidity', 'MetaMask'],
    link: 'https://certi-verify.pages.dev/',
    image: '/Images/Screenshot (1569).png',
    featured: false,
  },
  {
    title: 'IYKESOL Crypto Bank',
    category: 'DeFi',
    domain: 'web3',
    desc: 'A full decentralized crypto banking platform on Ethereum Sepolia with a custom ERC-20 token (2% burn on every transfer), dual authentication, real-time tracking, an admin dashboard and a loan system.',
    tech: ['React', 'Node.js', 'Express', 'MongoDB', 'Solidity', 'Web3.js', 'MetaMask'],
    link: 'https://iykesol-crypto-bank.vercel.app/',
    image: '/Images/Screenshot (2479).png',
    featured: false,
  },
];

const domainColor = (key) => DOMAINS.find(d => d.key === key)?.color || '#4f7cff';
const domainName  = (key) => DOMAINS.find(d => d.key === key)?.name || '';

// ─── THEME ────────────────────────────────────────────────────────────────────

const getThemeVars = (dark) => dark ? {
  '--bg':        '#08080b',
  '--surface':   '#0e0e13',
  '--surface2':  '#16161d',
  '--border':    '#262630',
  '--border-hi': '#3a3a46',
  '--text':      '#f4f4f5',
  '--muted':     '#a1a1aa',
  '--subtle':    '#71717a',
  '--nav-bg':    'rgba(8,8,11,0.72)',
  '--brand':     '#4f7cff',
} : {
  '--bg':        '#f5f6f8',
  '--surface':   '#ffffff',
  '--surface2':  '#eef0f4',
  '--border':    '#e1e4ea',
  '--border-hi': '#c7ccd6',
  '--text':      '#0c0e14',
  '--muted':     '#475066',
  '--subtle':    '#6b7488',
  '--nav-bg':    'rgba(255,255,255,0.82)',
  '--brand':     '#2f5fe0',
};

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
    if(count===0)return '#1c1c24';
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
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginTop:14,flexWrap:'wrap',gap:8}}>
        <span style={{fontSize:11,color:muted,fontFamily:'monospace'}}>{total.toLocaleString()} contributions · last 12 months</span>
        <div style={{display:'flex',alignItems:'center',gap:3,fontSize:9,color:muted}}>
          <span>Less</span>
          {(dark?['#1c1c24','#10b981','#34d399','#6ee7b7','#a7f3d0']:['#ebedf0','#9be9a8','#40c463','#30a14e','#216e39'])
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
    "What can you build for me?"
  ];

  const s = dark
    ? { bg: '#0a0a0e', border: '#262630', text: '#f4f4f5', muted: '#a1a1aa', input: '#13131a', bubble: '#16161d', userBg: 'transparent' }
    : { bg: '#ffffff', border: '#e1e4ea', text: '#0c0e14', muted: '#475066', input: '#f5f6f8', bubble: '#eef0f4', userBg: 'transparent' };

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
                <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: 'var(--brand)' }} />
                <span className="text-xs font-mono font-bold tracking-widest" style={{ color: 'var(--brand)' }}>CHAT://IYKESOL</span>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => setMessages([{ role: 'assistant', text: "Hey! I'm IykeSol's AI assistant. Ask me anything about his work, skills, or just say hi." }])} className="p-1 hover:opacity-70 transition-opacity" aria-label="Reset chat">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={s.muted} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
                </button>
                <button onClick={() => setOpen(false)} className="p-1 hover:opacity-70 transition-opacity" aria-label="Close chat">
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
                    style={{ background: 'rgba(37,99,235,0.1)', color: 'var(--brand)', borderColor: 'rgba(37,99,235,0.3)' }}>
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
                <span className="absolute left-3 font-mono select-none text-xs" style={{ color: 'var(--brand)' }}>{'>'}</span>
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
                  className="w-8 h-8 flex items-center justify-center disabled:opacity-30 absolute right-1 transition-opacity" aria-label="Send message">
                  <Send size={14} style={{ color: s.muted }} />
                </button>
              </div>
              <div className="flex justify-between items-center px-1">
                <span className="text-[9px] font-mono opacity-40" style={{ color: s.muted }}>{input.length}/500</span>
                <span className="text-[9px] font-mono opacity-40" style={{ color: s.muted }}>AI assistant</span>
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
  return <Motion.div className="fixed top-0 left-0 right-0 h-[2px] z-[60] origin-left" style={{ scaleX, background: 'var(--brand)' }} />;
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
    <Motion.div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#08080b]"
      exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
      <Motion.div initial={{ scale: 0.85, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }} className="mb-8">
        <LogoMark size={76} rounded={20} gradId="iyk-load" />
      </Motion.div>
      <div className="relative w-48">
        <div className="text-5xl font-black text-center tabular-nums font-mono text-zinc-100">
          {count}<span style={{ color: '#4f7cff' }}>%</span>
        </div>
        <div className="h-[2px] bg-zinc-800 mt-4 rounded-full overflow-hidden">
          <Motion.div className="h-full rounded-full" style={{ background: '#4f7cff' }} animate={{ width: `${count}%` }} />
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

  return <span style={{ color: 'var(--brand)' }} className="font-mono">{text}<span className="animate-blink">|</span></span>;
};

// ─── REVEAL ───────────────────────────────────────────────────────────────────

const EASE = [0.16, 1, 0.3, 1];
const Reveal = ({ children, delay = 0, y = 24, className, style }) => (
  <Motion.div
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-60px' }}
    transition={{ duration: 0.6, delay, ease: EASE }}
    className={className}
    style={style}
  >
    {children}
  </Motion.div>
);

// Section heading — deliberately varied, no per-section eyebrow.
const Heading = ({ title, sub }) => (
  <div className="mb-10 max-w-2xl">
    <h2 className="font-display font-bold leading-[1.05]"
      style={{ fontSize: 'clamp(1.9rem,4vw,2.75rem)', color: 'var(--text)', textWrap: 'balance' }}>
      {title}
    </h2>
    {sub && <p className="mt-3 text-base md:text-lg leading-relaxed" style={{ color: 'var(--muted)' }}>{sub}</p>}
  </div>
);

// ─── LOGO ─────────────────────────────────────────────────────────────────────
// Monogram coined from the name: "IK" (Ikechukwu Kalu), set in Clash Display
// inside the brand indigo→violet squircle. Vector, theme-proof and crisp.
const LogoMark = ({ size = 40, rounded = 12, className, gradId = 'iyk-mark' }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className} role="img" aria-label="Ikechukwu Kalu logo">
    <defs>
      <linearGradient id={gradId} x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
        <stop stopColor="#5d8bff" />
        <stop offset="1" stopColor="#1e4fd6" />
      </linearGradient>
    </defs>
    <rect x="2" y="2" width="44" height="44" rx={rounded} fill={`url(#${gradId})`} />
    <text x="24" y="25.5" textAnchor="middle" dominantBaseline="central"
      fontFamily='"Clash Display", "Satoshi", system-ui, sans-serif' fontWeight="600"
      fontSize="23" letterSpacing="-0.5" fill="#fff">IK</text>
  </svg>
);

const Wordmark = ({ className = '', style }) => (
  <span className={`font-display font-semibold tracking-tight ${className}`} style={style}>
    Iyke<span style={{ color: 'var(--brand)' }}>Sol</span>
  </span>
);

// ─── TILT (3D hover) ──────────────────────────────────────────────────────────
// Cursor-tracking perspective tilt + scale + a soft sheen that follows the pointer.
// Falls back to a static element when the user prefers reduced motion.
const Tilt = ({ children, className = '', style, max = 9, scale = 1.02, sheen = true, onMouseEnter, onMouseLeave }) => {
  const reduce = useReducedMotion();
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(my, [0, 1], [max, -max]), { stiffness: 150, damping: 17 });
  const rotateY = useSpring(useTransform(mx, [0, 1], [-max, max]), { stiffness: 150, damping: 17 });
  const gx = useTransform(mx, v => `${v * 100}%`);
  const gy = useTransform(my, v => `${v * 100}%`);
  const sheenBg = useMotionTemplate`radial-gradient(240px circle at ${gx} ${gy}, rgba(255,255,255,0.12), transparent 60%)`;

  if (reduce) {
    return <div className={className} style={style} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>{children}</div>;
  }
  return (
    <Motion.div
      className={className}
      onMouseMove={e => { const r = e.currentTarget.getBoundingClientRect(); mx.set((e.clientX - r.left) / r.width); my.set((e.clientY - r.top) / r.height); }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={e => { mx.set(0.5); my.set(0.5); onMouseLeave && onMouseLeave(e); }}
      whileHover={{ scale }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      style={{ ...style, rotateX, rotateY, transformPerspective: 1000, transformStyle: 'preserve-3d' }}
    >
      {children}
      {sheen && (
        <Motion.div aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: sheenBg, borderRadius: 'inherit' }} />
      )}
    </Motion.div>
  );
};

// ─── MAIN APP ─────────────────────────────────────────────────────────────────

export default function App() {
  const [loading, setLoading] = useState(true);
  const [dark, setDark]       = useState(true);
  const [formStatus, setFormStatus] = useState('');
  const themeVars = getThemeVars(dark);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 40, behavior: 'smooth' });
  };

  if (loading) return (
    <AnimatePresence><Loader onComplete={() => setLoading(false)} /></AnimatePresence>
  );

  const card = `rounded-2xl border transition-colors duration-300`;
  const cardStyle = { background: 'var(--surface)', borderColor: 'var(--border)' };
  const liftIn  = (e) => e.currentTarget.style.borderColor = themeVars['--border-hi'];
  const liftOut = (e) => e.currentTarget.style.borderColor = themeVars['--border'];

  const NAV = [
    { id: 'home',         icon: Home },
    { id: 'capabilities', icon: Layers },
    { id: 'about',        icon: User },
    { id: 'projects',     icon: Briefcase },
    { id: 'github',       icon: Github },
    { id: 'contact',      icon: Mail },
  ];

  return (
    <div style={{ ...themeVars, background: 'var(--bg)', color: 'var(--text)', minHeight: '100vh', transition: 'background .3s, color .3s' }}>
      <ScrollProgress />

      {/* Dot grid */}
      <div className="fixed inset-0 pointer-events-none z-0"
        style={{ backgroundImage: `radial-gradient(circle, ${dark ? '#22222c' : '#cbd5e1'} 1px, transparent 1px)`, backgroundSize: '26px 26px', opacity: dark ? 0.4 : 0.3, maskImage: 'radial-gradient(ellipse 100% 80% at 50% 0%, #000 40%, transparent 100%)', WebkitMaskImage: 'radial-gradient(ellipse 100% 80% at 50% 0%, #000 40%, transparent 100%)' }} />

      {/* Multi-hue aurora glow — encodes the four domains, subtle */}
      <div className="fixed inset-0 pointer-events-none z-0" style={{ opacity: dark ? 0.7 : 0.45 }}>
        <div className="animate-aurora absolute -top-40 left-1/2 w-[820px] h-[520px] rounded-full blur-[120px]"
          style={{ background: `radial-gradient(circle at 30% 40%, ${dark ? 'rgba(79,124,255,0.18)' : 'rgba(79,124,255,0.12)'}, transparent 60%), radial-gradient(circle at 70% 50%, ${dark ? 'rgba(168,85,247,0.14)' : 'rgba(168,85,247,0.10)'}, transparent 60%)` }} />
      </div>

      {/* Sidebar Navigation (Desktop) */}
      <nav className="fixed left-0 top-0 bottom-0 w-20 z-50 hidden md:flex flex-col items-center py-8 border-r transition-all duration-300"
        style={{ background: themeVars['--nav-bg'], backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', borderColor: 'var(--border)' }}>
        <button onClick={() => scrollTo('home')} aria-label="Home" className="mb-10 transition-transform hover:scale-105 active:scale-95">
          <LogoMark size={40} gradId="iyk-nav" />
        </button>

        <div className="flex-1 flex flex-col gap-2">
          {NAV.map(item => (
            <button key={item.id} onClick={() => scrollTo(item.id)}
              className="p-3 rounded-xl transition-all hover:bg-[var(--surface2)] group relative"
              style={{ color: 'var(--muted)' }} aria-label={item.id}>
              <item.icon size={20} className="group-hover:text-[var(--brand)] transition-colors" />
              <span className="absolute left-full ml-3 px-2 py-1 rounded-md text-[10px] font-mono uppercase tracking-widest opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50"
                style={{ background: 'var(--surface2)', color: 'var(--text)', border: '1px solid var(--border)' }}>
                {item.id}
              </span>
            </button>
          ))}
        </div>

        <button onClick={() => setDark(d => !d)}
          className="p-3 rounded-xl transition-all hover:bg-[var(--surface2)]"
          style={{ color: 'var(--muted)' }} aria-label="Toggle theme">
          {dark ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </nav>

      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden flex items-center justify-around py-3.5 border-t backdrop-blur-xl"
        style={{ background: themeVars['--nav-bg'], borderColor: 'var(--border)' }}>
        {[NAV[0], NAV[1], NAV[3], NAV[5]].map(item => (
          <button key={item.id} onClick={() => scrollTo(item.id)} className="p-2 transition-all active:scale-90"
            style={{ color: 'var(--muted)' }} aria-label={item.id}>
            <item.icon size={22} />
          </button>
        ))}
      </nav>

      {/* Mobile theme toggle */}
      <div className="fixed top-4 right-4 z-50 md:hidden">
        <button onClick={() => setDark(d => !d)}
          className="w-10 h-10 rounded-full flex items-center justify-center border backdrop-blur-md"
          style={{ background: themeVars['--nav-bg'], borderColor: 'var(--border)', color: 'var(--muted)' }} aria-label="Toggle theme">
          {dark ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>

      <div className="md:pl-20 pb-24 md:pb-0">

        {/* ── HERO ── */}
        <section id="home" className="relative z-10 min-h-screen flex items-center px-5 md:px-10 pt-20 md:pt-0 overflow-hidden">
          {/* crossing light beams */}
          <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            <span className="sweep sweep-1" />
            <span className="sweep sweep-2" />
          </div>
          <div className="relative z-10 max-w-6xl mx-auto w-full grid lg:grid-cols-12 gap-8 items-center">

            {/* Left — name & pitch */}
            <div className="lg:col-span-7">
              <Motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: EASE }}
                className="inline-flex items-center gap-2 text-xs font-mono mb-7 px-3 py-1.5 rounded-full"
                style={{ color: '#10b981', background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.25)' }}>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse-dot" />
                Available for work · worldwide
              </Motion.div>

              <Motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.05, ease: EASE }}
                className="font-display font-bold leading-[0.9]"
                style={{ fontSize: 'clamp(2.7rem,7.5vw,5.25rem)', color: 'var(--text)', textWrap: 'balance', letterSpacing: '-0.035em' }}>
                Kalu Ikechukwu
              </Motion.h1>

              <Motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15, ease: EASE }}
                className="mt-4 flex items-center gap-2 text-xl md:text-2xl font-semibold min-h-[2rem]">
                <Typewriter strings={['Full-Stack Developer.', 'Blockchain Engineer.', 'ML & AI Developer.', 'I ship across the stack.']} />
              </Motion.div>

              <Motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.25, ease: EASE }}
                className="mt-6 text-base md:text-lg leading-relaxed max-w-xl" style={{ color: 'var(--muted)' }}>
                I build production web apps, on-chain systems and ML-powered products.
                One engineer covering <span style={{ color: 'var(--text)', fontWeight: 600 }}>four</span> domains, so your idea
                ships end to end.
              </Motion.p>

              <Motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.35, ease: EASE }}
                className="mt-8 flex flex-wrap items-center gap-3">
                <button onClick={() => scrollTo('capabilities')}
                  className="flex items-center gap-2 px-6 py-3 text-white font-semibold rounded-xl transition-all text-sm hover:-translate-y-0.5"
                  style={{ background: 'var(--brand)', boxShadow: '0 10px 30px -10px var(--brand)' }}>
                  See what I can build for you <ArrowRight size={16} />
                </button>
                <button onClick={() => scrollTo('contact')}
                  className="flex items-center gap-2 px-6 py-3 font-semibold rounded-xl transition-colors text-sm border"
                  style={{ borderColor: 'var(--border-hi)', color: 'var(--text)', background: 'var(--surface)' }}>
                  Let's work together <Mail size={15} />
                </button>
                <div className="flex items-center gap-1.5 ml-1">
                  {[
                    { href: 'https://www.linkedin.com/in/kalu-ikechukwu-4730683a1', icon: <FaLinkedin size={18} /> },
                    { href: 'https://github.com/IykeSol', icon: <Github size={18} /> },
                    { href: `https://wa.me/${WHATSAPP_NUMBER}`, icon: <FaWhatsapp size={18} /> },
                    { href: 'https://twitter.com/agbaghaSol', icon: <Twitter size={18} /> },
                  ].map((b, i) => (
                    <a key={i} href={b.href} target="_blank" rel="noopener noreferrer"
                      className="p-2.5 rounded-full transition-all hover:-translate-y-0.5"
                      style={{ color: 'var(--muted)', background: 'var(--surface2)' }}>
                      {b.icon}
                    </a>
                  ))}
                </div>
              </Motion.div>

              {/* Slim stat strip — not the big-number card cliché */}
              <Motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.5 }}
                className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm font-mono"
                style={{ color: 'var(--subtle)' }}>
                {[['8+', 'projects shipped'], ['4', 'skill domains'], ['16+', 'technologies'], ['200+', 'commits / yr']].map(([n, l], i) => (
                  <span key={i} className="flex items-center gap-2">
                    <span className="font-display font-bold text-lg" style={{ color: 'var(--text)' }}>{n}</span> {l}
                    {i < 3 && <span className="ml-4 opacity-40 hidden sm:inline">/</span>}
                  </span>
                ))}
              </Motion.div>
            </div>

            {/* Right — terminal card (always dark, like a real embedded terminal) */}
            <Motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
              className="lg:col-span-5">
              <Tilt max={9} scale={1.01} className="beam-border relative group rounded-2xl overflow-hidden shadow-2xl"
                style={{ background: '#0b0b10', border: `1px solid ${dark ? '#23232b' : '#1f1f27'}` }}>
              <div className="flex items-center gap-2 px-4 py-3 border-b" style={{ borderColor: '#1d1d24', background: '#121219' }}>
                <div className="w-3 h-3 rounded-full bg-red-500/80" /><div className="w-3 h-3 rounded-full bg-yellow-500/80" /><div className="w-3 h-3 rounded-full bg-green-500/80" />
                <span className="ml-3 text-xs font-mono flex items-center gap-1.5" style={{ color: '#71717a' }}>
                  <Terminal size={12} /> developer.js
                </span>
              </div>
              <div className="p-5 font-mono text-[13px] md:text-sm leading-7">
                {[
                  { t: 'const dev = {', c: '#a78bfa' },
                  { t: "  name: 'IykeSol',", c: '#34d399' },
                  { t: "  builds: ['web', 'web3', 'ml', 'data'],", c: '#60a5fa' },
                  { t: "  stack: ['React', 'Python', 'Solidity'],", c: '#fbbf24' },
                  { t: "  status: 'open to work',", c: '#34d399' },
                  { t: '};', c: '#a78bfa' },
                ].map((l, i) => (
                  <Motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 + i * 0.1 }}
                    className="flex gap-3">
                    <span className="select-none w-4 text-right" style={{ color: '#52525b' }}>{i + 1}</span>
                    <span style={{ color: l.c }}>{l.t}</span>
                  </Motion.div>
                ))}
                <Motion.div animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 0.9 }} className="w-2 h-4 mt-1 ml-7" style={{ background: '#4f7cff' }} />
              </div>
              </Tilt>
            </Motion.div>
          </div>
        </section>

        {/* ── TECH MARQUEE ── */}
        <div className="relative z-10 py-4 overflow-hidden flex flex-col gap-3"
          style={{ borderTop: `1px solid var(--border)`, borderBottom: `1px solid var(--border)`, background: dark ? 'rgba(14,14,19,0.6)' : 'rgba(255,255,255,0.6)' }}>
          {/* two rows crossing in opposite directions */}
          <div className="animate-ticker flex gap-12 items-center">
            {[...TECH, ...TECH].map((t, i) => (
              <div key={i} className="flex items-center gap-3 text-sm font-semibold uppercase tracking-wider flex-shrink-0" style={{ color: 'var(--subtle)', fontFamily: 'monospace' }}>
                <t.Icon size={18} style={{ color: t.color === '#ffffff' && !dark ? '#18181b' : t.color }} />
                {t.name}
              </div>
            ))}
          </div>
          <div className="animate-ticker-rev flex gap-12 items-center opacity-60">
            {[...[...TECH].reverse(), ...[...TECH].reverse()].map((t, i) => (
              <div key={i} className="flex items-center gap-3 text-sm font-semibold uppercase tracking-wider flex-shrink-0" style={{ color: 'var(--subtle)', fontFamily: 'monospace' }}>
                <t.Icon size={16} style={{ color: t.color === '#ffffff' && !dark ? '#18181b' : t.color }} />
                {t.name}
              </div>
            ))}
          </div>
        </div>

        {/* ── CAPABILITIES (the spine) ── */}
        <section id="capabilities" className="relative z-10 py-20 md:py-28 px-5 md:px-10 max-w-6xl mx-auto">
          <Reveal>
            <Heading
              title="One engineer. Four domains."
              sub="Most projects need more than one skill set. I cover the whole arc: interface, on-chain logic, intelligence and the data underneath, so nothing falls through the cracks."
            />
          </Reveal>

          {/* Asymmetric bento — varied sizes break the identical-grid reflex */}
          <div className="grid md:grid-cols-6 gap-4">
            {DOMAINS.map((d, i) => {
              const big = d.span === 'lg';
              return (
                <Reveal key={d.key} delay={i * 0.08}
                  className={big ? 'md:col-span-4' : i === 1 ? 'md:col-span-2' : 'md:col-span-3'}>
                  <Tilt max={7} scale={1.02} sheen={false} className={`${card} relative overflow-hidden h-full p-6 md:p-7 group`} style={cardStyle}
                    onMouseEnter={liftIn} onMouseLeave={liftOut}>
                    {/* domain glow on hover */}
                    <div className="absolute -top-28 -right-20 w-60 h-60 rounded-full blur-[90px] opacity-0 group-hover:opacity-50 transition-opacity duration-500 pointer-events-none"
                      style={{ background: d.color }} />
                    <div className="relative">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                          style={{ background: `${d.color}1a`, border: `1px solid ${d.color}40`, color: d.color }}>
                          <d.Icon size={22} />
                        </div>
                        <h3 className="text-lg md:text-xl font-display font-semibold leading-tight" style={{ color: 'var(--text)' }}>{d.name}</h3>
                      </div>
                      <p className={`leading-relaxed ${big ? 'text-base md:text-lg max-w-md' : 'text-sm'}`} style={{ color: 'var(--muted)' }}>
                        {d.pitch}
                      </p>

                      {big && (
                        <ul className="mt-5 grid sm:grid-cols-3 gap-2">
                          {d.deliver.map(item => (
                            <li key={item} className="flex items-center gap-2 text-sm" style={{ color: 'var(--muted)' }}>
                              <CheckCircle2 size={15} style={{ color: d.color }} className="flex-shrink-0" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      )}

                      <div className="flex flex-wrap gap-1.5 mt-5">
                        {d.tech.map(t => (
                          <span key={t} className="text-[11px] font-mono px-2.5 py-1 rounded-md"
                            style={{ background: 'var(--surface2)', color: 'var(--subtle)', border: `1px solid var(--border)` }}>
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Tilt>
                </Reveal>
              );
            })}
          </div>
        </section>

        {/* ── ABOUT ── */}
        <section id="about" className="relative z-10 py-16 md:py-24 px-5 md:px-10 max-w-6xl mx-auto">
          <div className="grid md:grid-cols-5 gap-8 items-start">
            <Reveal className="md:col-span-2">
              <Heading title="A bit about me" />
              <div className="flex items-center gap-3 mt-2">
                <LogoMark size={52} rounded={15} gradId="iyk-about" />
                <div>
                  <p className="font-display font-semibold text-lg" style={{ color: 'var(--text)' }}>Kalu Ikechukwu</p>
                  <p className="text-xs font-mono" style={{ color: 'var(--subtle)' }}>@iykesol</p>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.1} className="md:col-span-3 space-y-4 text-base leading-relaxed" style={{ color: 'var(--muted)' }}>
              <p>
                I'm a <span style={{ color: 'var(--text)', fontWeight: 600 }}>full-stack developer and blockchain engineer</span> who
                likes problems that span more than one discipline. Whether it's a React interface,
                a Solidity contract, or a Python prediction model, I enjoy taking an idea from
                blank file to deployed product.
              </p>
              <p>
                What ties my work together is system thinking: designing the backend, the on-chain
                logic and the data layer to fit together cleanly. I've shipped DeFi platforms, an
                ML-powered match predictor, e-commerce stores and security tooling, and I'm
                always chasing the intersection of <span style={{ color: 'var(--text)', fontWeight: 600 }}>software, AI and decentralized tech</span>.
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                {['Problem solver', 'System thinker', 'Fast shipper', 'Always learning'].map(t => (
                  <span key={t} className="text-xs font-mono px-3 py-1.5 rounded-full" style={{ background: 'var(--surface2)', color: 'var(--muted)', border: '1px solid var(--border)' }}>{t}</span>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── PROJECTS ── */}
        <section id="projects" className="relative z-10 py-16 md:py-24 px-5 md:px-10 max-w-6xl mx-auto">
          <Reveal>
            <Heading title="Selected work" sub="Real, shipped projects you can click through and try. Each one is tagged with the domain it leans on." />
          </Reveal>

          {/* Featured */}
          {PROJECTS.filter(p => p.featured).map((p, i) => (
            <Reveal key={i}>
              <Tilt max={4} scale={1.008} className={`relative ${card} mb-4 overflow-hidden group`} style={cardStyle}
                onMouseEnter={liftIn} onMouseLeave={liftOut}>
                <div className="flex flex-col">
                  {p.multiImages ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-1 bg-black border-b" style={{ borderColor: 'var(--border)' }}>
                      {p.multiImages.map((img, idx) => (
                        <div key={idx} className="aspect-video overflow-hidden bg-black">
                          <img src={img} alt={`${p.title} ${idx + 1}`} loading="lazy" className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700" />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="bg-black border-b overflow-hidden flex items-center justify-center" style={{ borderColor: 'var(--border)' }}>
                      <img src={p.image} alt={p.title} loading="lazy" className="w-full max-h-[440px] object-contain group-hover:scale-105 transition-transform duration-700" />
                    </div>
                  )}
                  <div className="p-6 md:p-7">
                    <div className="flex items-center gap-2 flex-wrap mb-3">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-[0.18em] px-2.5 py-1 rounded-md"
                        style={{ background: `${domainColor(p.domain)}1a`, color: domainColor(p.domain), border: `1px solid ${domainColor(p.domain)}40` }}>
                        {p.category}
                      </span>
                      <span className="text-[10px] font-mono uppercase tracking-wider" style={{ color: 'var(--subtle)' }}>
                        {domainName(p.domain)}
                      </span>
                    </div>
                    <h3 className="text-xl md:text-2xl font-display font-semibold mb-3" style={{ color: 'var(--text)' }}>{p.title}</h3>
                    <p className="text-sm md:text-base leading-relaxed max-w-3xl" style={{ color: 'var(--muted)' }}>{p.desc}</p>
                    <div className="flex flex-wrap gap-2 mt-5 mb-5">
                      {p.tech.map(t => <span key={t} className="text-[11px] font-mono px-2.5 py-1 rounded"
                        style={{ background: 'var(--surface2)', color: 'var(--subtle)', border: `1px solid var(--border)` }}>{t}</span>)}
                    </div>
                    <a href={p.link} target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 text-white font-semibold rounded-xl transition-all text-sm hover:-translate-y-0.5"
                      style={{ background: 'var(--brand)' }}>
                      View live project <ExternalLink size={14} />
                    </a>
                  </div>
                </div>
              </Tilt>
            </Reveal>
          ))}

          {/* Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            {PROJECTS.filter(p => !p.featured).map((p, i) => (
              <Reveal key={i} delay={i * 0.06}>
                <Tilt max={8} scale={1.03} className={`relative ${card} overflow-hidden group flex flex-col h-full`} style={cardStyle}
                  onMouseEnter={liftIn} onMouseLeave={liftOut}>
                  <div className="relative overflow-hidden h-48 bg-black">
                    {p.image ? (
                      <img src={p.image} alt={p.title} loading="lazy" className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700" />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center gap-2"
                        style={{ background: `radial-gradient(130% 120% at 30% 15%, ${domainColor(p.domain)}33, transparent 55%), #0b0b10` }}>
                        <Cpu size={40} style={{ color: domainColor(p.domain) }} className="group-hover:scale-110 transition-transform duration-500" />
                        <span className="text-[10px] font-mono uppercase tracking-[0.25em]" style={{ color: domainColor(p.domain) }}>AI · ML</span>
                      </div>
                    )}
                    <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent" />
                    <span className="absolute top-3 left-3 text-[10px] font-mono font-bold uppercase tracking-[0.18em] px-2 py-1 rounded-md backdrop-blur-sm"
                      style={{ background: `${domainColor(p.domain)}26`, color: '#fff', border: `1px solid ${domainColor(p.domain)}66` }}>
                      {p.category}
                    </span>
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="text-lg font-display font-semibold mb-2" style={{ color: 'var(--text)' }}>{p.title}</h3>
                    <p className="text-sm leading-relaxed flex-1" style={{ color: 'var(--muted)' }}>{p.desc}</p>
                    <div className="flex flex-wrap gap-1.5 mt-4 mb-5">
                      {p.tech.slice(0, 4).map(t => <span key={t} className="text-[10px] font-mono px-2 py-1 rounded-md"
                        style={{ background: 'var(--surface2)', color: 'var(--subtle)', border: `1px solid var(--border)` }}>{t}</span>)}
                    </div>
                    {p.link ? (
                      <a href={p.link} target="_blank" rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-xs font-bold transition-all border"
                        style={{ color: 'var(--text)', borderColor: 'var(--border-hi)' }}
                        onMouseEnter={e => { e.currentTarget.style.background = 'var(--brand)'; e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = 'var(--brand)'; }}
                        onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = themeVars['--text']; e.currentTarget.style.borderColor = themeVars['--border-hi']; }}>
                        View project <ArrowUpRight size={13} />
                      </a>
                    ) : (
                      <button onClick={() => scrollTo('contact')}
                        className="inline-flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-xs font-bold transition-all border"
                        style={{ color: 'var(--text)', borderColor: 'var(--border-hi)' }}
                        onMouseEnter={e => { e.currentTarget.style.background = 'var(--brand)'; e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = 'var(--brand)'; }}
                        onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = themeVars['--text']; e.currentTarget.style.borderColor = themeVars['--border-hi']; }}>
                        Request a demo <ArrowRight size={13} />
                      </button>
                    )}
                  </div>
                </Tilt>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ── GITHUB ── */}
        <section id="github" className="relative z-10 py-16 md:py-20 px-5 md:px-10 max-w-6xl mx-auto">
          <Reveal>
            <Heading title="I show up and ship" sub="A year of public contributions, pulled live from GitHub." />
          </Reveal>
          <Reveal>
            <div className="rounded-2xl border p-6 md:p-8" style={{ background: dark ? '#0c0c11' : '#ffffff', borderColor: 'var(--border)' }}>
              <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: 'var(--surface2)' }}>
                    <Github size={17} style={{ color: 'var(--muted)' }} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold" style={{ color: 'var(--text)' }}>IykeSol</p>
                    <a href="https://github.com/IykeSol" target="_blank" rel="noopener noreferrer" className="text-xs font-mono hover:underline" style={{ color: 'var(--subtle)' }}>github.com/IykeSol</a>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs font-mono" style={{ color: 'var(--brand)' }}>
                  <span className="w-2 h-2 rounded-full animate-pulse-dot" style={{ background: 'var(--brand)' }} />
                  Live data
                </div>
              </div>
              <GitHubContributions dark={dark} />
            </div>
          </Reveal>
        </section>

        {/* ── CONTACT ── */}
        <section id="contact" className="relative z-10 py-16 md:py-24 px-5 md:px-10 max-w-6xl mx-auto">
          <Reveal>
            <div className="beam-border p-8 md:p-16 text-center rounded-3xl relative overflow-hidden"
              style={{ background: 'var(--surface)', border: `1px solid var(--border)` }}>
              <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full blur-[100px] pointer-events-none"
                style={{ background: dark ? 'rgba(79,124,255,0.16)' : 'rgba(79,124,255,0.1)' }} />
              <div className="relative">
                <h2 className="font-display font-bold mb-4" style={{ fontSize: 'clamp(2rem,5vw,3.25rem)', color: 'var(--text)', textWrap: 'balance' }}>
                  Got something to build?
                </h2>
                <p className="max-w-xl mx-auto mb-10 leading-relaxed text-base md:text-lg" style={{ color: 'var(--muted)' }}>
                  A blockchain solution, an AI feature, or a full-stack web app. Tell me what you
                  need and I'll get back to you fast.
                </p>

                <form onSubmit={async (e) => {
                  e.preventDefault();
                  setFormStatus('loading');
                  const formData = new FormData(e.target);
                  try {
                    const res = await fetch('https://formspree.io/f/mreypbja', {
                      method: 'POST', body: formData, headers: { 'Accept': 'application/json' }
                    });
                    if (res.ok) { setFormStatus('success'); e.target.reset(); }
                    else setFormStatus('error');
                  } catch (err) {
                    console.error("Form submission error:", err);
                    setFormStatus('error');
                  }
                }} className="flex flex-col gap-3 text-left max-w-md mx-auto">
                  <input type="email" name="email" required placeholder="Your email address" className="w-full px-4 py-3 rounded-xl text-sm font-medium outline-none transition-all focus:ring-2"
                    style={{ background: 'var(--surface2)', border: `1px solid var(--border)`, color: 'var(--text)' }} />
                  <textarea name="message" required placeholder="How can I help you?" rows={4} className="w-full px-4 py-3 rounded-xl text-sm font-medium outline-none transition-all resize-none focus:ring-2"
                    style={{ background: 'var(--surface2)', border: `1px solid var(--border)`, color: 'var(--text)' }} />
                  <button type="submit" disabled={formStatus === 'loading'} className="w-full flex items-center justify-center gap-2 px-5 py-3 text-white font-semibold rounded-xl transition-all text-sm disabled:opacity-70 hover:-translate-y-0.5"
                    style={{ background: 'var(--brand)' }}>
                    {formStatus === 'loading' ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                    {formStatus === 'success' ? 'Message sent!' : formStatus === 'error' ? 'Something went wrong, try again' : 'Send it my way'}
                  </button>
                  {formStatus === 'success' && <p className="text-xs text-center font-mono" style={{ color: '#10b981' }}>Thanks. I'll be in touch soon.</p>}
                </form>

                <div className="flex flex-wrap justify-center gap-3 mt-10 pt-8" style={{ borderTop: `1px solid var(--border)` }}>
                  {[
                    { href: 'https://www.linkedin.com/in/kalu-ikechukwu-4730683a1', icon: <FaLinkedin size={20} />, color: '#0a66c2' },
                    { href: 'https://github.com/IykeSol', icon: <Github size={20} />, color: 'var(--text)' },
                    { href: `https://wa.me/${WHATSAPP_NUMBER}`, icon: <FaWhatsapp size={20} />, color: '#25D366' },
                    { href: 'https://twitter.com/agbaghaSol', icon: <Twitter size={20} />, color: 'var(--text)' },
                  ].map((b, i) => (
                    <a key={i} href={b.href} target="_blank" rel="noopener noreferrer"
                      className="p-3 rounded-full transition-transform hover:scale-110 flex items-center justify-center"
                      style={{ color: b.color, background: 'var(--surface2)', border: `1px solid var(--border)` }}>
                      {b.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        {/* ── FOOTER ── */}
        <footer className="relative z-10 py-8 px-5 md:px-10 max-w-6xl mx-auto" style={{ borderTop: `1px solid var(--border)` }}>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <LogoMark size={28} rounded={9} gradId="iyk-foot" />
              <Wordmark className="text-lg" />
              <span className="text-xs font-mono ml-1" style={{ color: 'var(--subtle)' }}>© {new Date().getFullYear()}</span>
            </div>
            <div className="flex gap-5 text-xs font-mono" style={{ color: 'var(--subtle)' }}>
              {['home', 'capabilities', 'projects', 'contact'].map(id => (
                <button key={id} onClick={() => scrollTo(id)} className="transition-colors capitalize hover:text-[var(--brand)]">{id}</button>
              ))}
            </div>
          </div>
        </footer>
      </div>

      <ChatWidget dark={dark} />
    </div>
  );
}
