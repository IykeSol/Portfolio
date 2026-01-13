import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { 
  Menu, X, Github, Mail, ExternalLink, 
  ChevronRight, Globe
} from 'lucide-react';
import { FaTwitter, FaWhatsapp, FaReact, FaPython, FaJs, FaLinkedin } from 'react-icons/fa';
import { SiSolidity } from 'react-icons/si';

// --- ASSETS ---
const techStack = [
  { name: 'HTML5', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
  { name: 'CSS3', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
  { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
  { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
  { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
  { name: 'Next.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg' },
  { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
  { name: 'Tailwind', icon: 'https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg' },
  { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
  { name: 'Solidity', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/solidity/solidity-original.svg' },
  { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
  { name: 'GitHub', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg' },
  { name: 'MongoDB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
  { name: 'TensorFlow', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg' },
  { name: 'Streamlit', icon: 'https://streamlit.io/images/brand/streamlit-mark-color.png' },
  { name: 'Web3.js', icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/MetaMask_Fox.svg/2048px-MetaMask_Fox.svg.png' }, 
];

const projects = [
  {
    title: "Intelligent Soccer Prediction System",
    category: "Machine Learning",
    desc: "An advanced ML-powered soccer match prediction system that analyzes team form, head-to-head history, expected goals (xG), and multiple statistical features to generate accurate match predictions. Integrated with Gemini API for detailed match analysis and final verdict with confidence scores.",
    tech: ["Python", "Machine Learning", "Streamlit", "Gemini API"],
    link: "https://top5-league-predictor.streamlit.app/",
    images: ["/Images/Screenshot (1561).png", "/Images/Screenshot (1562).png", "/Images/brentford.png"],
    layout: "featured",
    color: "from-blue-600 to-cyan-500"
  },
  {
    title: "IYKESOL Crypto Bank",
    category: "DeFi",
    desc: "A complete decentralized crypto banking platform built on Ethereum Sepolia testnet featuring a custom ERC-20 IYKESOL token with 2% burn mechanism on every transfer. Features dual authentication, real-time tracking, admin dashboard, and loan system.",
    tech: ["React", "Node.js", "Express", "MongoDB", "Solidity", "Web3.js", "MetaMask", "Ethereum"],
    link: "https://iykesol-crypto-bank.vercel.app/",
    images: ["/Images/Screenshot (2479).png"],
    layout: "standard",
    color: "from-purple-600 to-pink-500"
  },
  {
    title: "Iyke Clothing Store",
    category: "E-Commerce",
    desc: "Production-ready e-commerce platform featuring secure payment processing (Paystack), JWT authentication, order lifecycle management, and admin dashboard. Includes dynamic product catalog and multi-payment gateway support.",
    tech: ["HTML5", "Tailwind CSS", "JavaScript", "Node.js", "Express.js", "MongoDB", "Mongoose", "Paystack", "JWT", "Cloudinary"],
    link: "https://iyke-clothing-store.onrender.com",
    images: ["/Images/Screenshot (2480).png"],
    layout: "standard",
    color: "from-orange-500 to-red-500"
  },
  {
    title: "Blockchain Food Ordering System",
    category: "dApp",
    desc: "A decentralized food delivery platform built with blockchain technology that ensures secure transactions through smart contract escrow. The system holds customer payments in ETH until food delivery is confirmed.",
    tech: ["HTML", "JavaScript", "Web3.js", "Solidity", "Metamask"],
    link: "https://iyke-kitchen.pages.dev/",
    images: ["/Images/Iykekitchen.png"],
    layout: "standard",
    color: "from-green-500 to-emerald-400"
  },
  {
    title: "Token Safety Scanner",
    category: "Security",
    desc: "A comprehensive cryptocurrency token security scanner that analyzes smart contracts across Ethereum, BSC, Polygon, and Solana networks. Detects honeypots, verifies ownership, and assesses liquidity risks.",
    tech: ["HTML", "Tailwind CSS", "JavaScript", "Node.js", "Express", "Ethers.js", "Solana Web3.js"],
    link: "https://tokenshield.netlify.app/",
    images: ["/Images/Screenshot (1716).png"],
    layout: "standard",
    color: "from-blue-500 to-indigo-600"
  },
  {
    title: "Decentralized Auction Marketplace",
    category: "Marketplace",
    desc: "A Web3 auction platform allowing users to create listings and place bids using ETH. Smart contracts manage bidding logic, tracking highest bidders and preventing invalid bids.",
    tech: ["HTML", "Tailwind CSS", "JavaScript", "Web3.js", "Solidity", "Metamask"],
    link: "https://auction-market.netlify.app/",
    images: ["/Images/Screenshot (1587).png"],
    layout: "standard",
    color: "from-yellow-500 to-orange-400"
  },
  {
    title: "CertiVerify",
    category: "Blockchain",
    desc: "A decentralized certificate verification platform deployed on Sepolia Ethereum network. Prevents fraud by allowing instant validation of educational credentials via blockchain.",
    tech: ["HTML", "Tailwind CSS", "JavaScript", "Web3.js", "Solidity", "MetaMask"],
    link: "https://certi-verify.pages.dev/",
    images: ["/Images/Screenshot (1569).png"],
    layout: "standard",
    color: "from-teal-400 to-blue-500"
  },
  {
    title: "TribeChat",
    category: "SocialFi",
    desc: "A decentralized social media platform enabling creators to monetize content through a unique 'Keys' system. Features real-time impression tracking, decentralized profiles, and key trading.",
    tech: ["HTML", "CSS", "JavaScript", "Web3.js", "Solidity", "MetaMask"],
    link: "https://tribechat.pages.dev/",
    images: ["/Images/signup main page.png", "/Images/feed page.png"],
    layout: "standard", 
    color: "from-pink-500 to-rose-500"
  }
];

// --- COMPONENTS ---

const ScrollProgress = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scroll = totalScroll / windowHeight;
      setScrollProgress(scroll);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return <div className="fixed top-0 left-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 z-50 transition-all duration-100" style={{ width: `${scrollProgress * 100}%` }} />;
};

const AnimatedBackground = () => (
  <div className="fixed inset-0 z-[-1] overflow-hidden bg-slate-950">
    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150"></div>
    <motion.div 
      animate={{ 
        scale: [1, 1.2, 1],
        opacity: [0.3, 0.5, 0.3],
        rotate: [0, 90, 0]
      }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      className="absolute -top-1/2 -left-1/2 w-full h-full bg-blue-600/20 rounded-full blur-[120px]" 
    />
    <motion.div 
      animate={{ 
        scale: [1.2, 1, 1.2],
        opacity: [0.3, 0.5, 0.3],
        rotate: [0, -90, 0]
      }}
      transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-purple-600/20 rounded-full blur-[120px]" 
    />
  </div>
);

const Loader = ({ onComplete }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCount(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + 1;
      });
    }, 20);
    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div 
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black text-white"
      exit={{ y: -window.innerHeight, transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
    >
      {/* Logo Animation */}
      <motion.img 
        src="/Images/logo.png" 
        alt="IykeSol Logo" 
        className="w-32 md:w-48 h-auto object-contain mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      />

      <div className="relative">
        <motion.h1 
          className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gray-100 to-gray-600"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          {count}%
        </motion.h1>
        <motion.div 
          className="absolute -bottom-2 left-0 h-1 bg-blue-600"
          initial={{ width: 0 }}
          animate={{ width: `${count}%` }}
        />
      </div>
    </motion.div>
  );
};

const TypewriterCode = () => {
  const codeLines = [
    "const developer = {",
    "  name: 'Kalu Ikechukwu',",
    "  role: 'Full Stack | Blockchain | ML Eng',",
    "  stack: ['React', 'Python', 'Solidity', 'JS'],",
    "  location: 'Worldwide',",
    "  status: 'Ready to Build Your Next Project!',",
    "};"
  ];

  return (
    <div className="font-mono text-sm md:text-base leading-loose">
      {codeLines.map((line, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.4, duration: 0.5 }}
          className="flex items-center"
        >
          <span className="text-gray-600 mr-4 select-none w-6 text-right">{i + 1}</span>
          <span className={
            i === 0 || i === 6 ? "text-purple-400" :
            line.includes("status") ? "text-green-400 font-bold" :
            "text-blue-300"
          }>
            {line}
            {/* Injecting Globe Icon next to location line */}
            {i === 4 && <span className="ml-1 inline-block"><Globe size={16} className="text-blue-400 inline-block"/></span>}
          </span>
        </motion.div>
      ))}
      <motion.div 
        animate={{ opacity: [0, 1, 0] }}
        transition={{ repeat: Infinity, duration: 0.8 }}
        className="w-2 h-5 bg-blue-500 mt-1 ml-10"
      />
    </div>
  );
};

// --- MAIN APP ---

const App = () => {
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  if (loading) return <AnimatePresence><Loader onComplete={() => setLoading(false)} /></AnimatePresence>;

  return (
    <div className="min-h-screen text-white font-sans selection:bg-blue-500/30 selection:text-blue-200">
      <ScrollProgress />
      <AnimatedBackground />

      {/* --- FIXED NAVBAR --- */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-lg border-b border-white/10 bg-[#0f172a]/70">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center relative z-50">
          
          {/* Logo */}
          <div 
            className="flex items-center gap-2 cursor-pointer" 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
             <img src="/Images/logo.png" alt="IykeSol Logo" className="h-10 w-auto object-contain" />
          </div>
          
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-gray-300">
            {['Home', 'Skills', 'Projects', 'Contact'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-white transition-colors relative group">
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all group-hover:w-full"></span>
              </a>
            ))}
          </div>

          {/* Mobile Hamburger Toggle */}
          <div className="md:hidden text-white">
            <button onClick={() => setMenuOpen(!menuOpen)} className="p-2 focus:outline-none active:scale-95 transition-transform">
              {menuOpen ? <X size={32} /> : <Menu size={32} />}
            </button>
          </div>
        </div>
        
        {/* Mobile Dropdown Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="md:hidden fixed top-[80px] left-0 w-full bg-[#0f172a] border-b border-white/10 z-40 shadow-2xl"
            >
              <div className="flex flex-col py-4">
                {['Home', 'Skills', 'Projects', 'Contact'].map((item) => (
                  <a 
                    key={item} 
                    href={`#${item.toLowerCase()}`}
                    onClick={(e) => {
                      e.preventDefault();
                      setMenuOpen(false);
                      const element = document.getElementById(item.toLowerCase());
                      if (element) {
                        // Calculate scroll position to account for fixed header (approx 85px)
                        const y = element.getBoundingClientRect().top + window.scrollY - 85; 
                        window.scrollTo({top: y, behavior: 'smooth'});
                      }
                    }}
                    className="px-8 py-4 text-gray-300 hover:text-white hover:bg-white/5 text-lg font-medium transition-colors border-l-2 border-transparent hover:border-blue-500"
                  >
                    {item}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* HERO SECTION (Static Layout - No Parallax Overlap) */}
      <section id="home" className="relative min-h-screen flex items-center justify-center pt-32 pb-40">
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          
          {/* Text Content */}
          <div className="z-10 order-1 md:order-1">
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="inline-block px-4 py-2 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 mb-6"
              >
                Available for Hire
              </motion.div>
              <h1 className="text-5xl md:text-8xl font-bold leading-tight mb-6">
                Building <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
                  Digital Value.
                </span>
              </h1>
              <div className="text-lg text-gray-400 mb-8 max-w-lg leading-relaxed space-y-4">
                <p>
                  I'm a passionate developer specializing in <span className="text-white font-semibold">website development</span>, <span className="text-white font-semibold">blockchain technology</span>, and <span className="text-white font-semibold">machine learning</span>.
                </p>
                <p>
                  My approach combines technical excellence with creative problem-solving to deliver exceptional results.
                </p>
              </div>
              <div className="flex gap-4">
                <motion.a 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="#projects"
                  className="px-8 py-4 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition flex items-center gap-2"
                >
                  View Work <ChevronRight size={20} />
                </motion.a>
                <motion.a 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="#contact"
                  className="px-8 py-4 border border-white/20 rounded-lg hover:bg-white/5 transition font-medium"
                >
                  Contact Me
                </motion.a>
              </div>
          </div>

          {/* Code Editor */}
          <div className="relative z-0 flex justify-center order-2 md:order-2 mt-12 md:mt-0">
              <div className="relative w-full max-w-[500px] bg-[#1e1e1e] rounded-xl shadow-2xl border border-white/10 transform md:rotate-3 hover:rotate-0 transition-transform duration-500 group">
                <div className="h-10 bg-[#252526] flex items-center px-4 gap-2 border-b border-black/50 rounded-t-xl">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  <div className="ml-4 text-xs text-gray-400 font-mono">portfolio.js</div>
                </div>
                <div className="p-6 md:p-8 overflow-x-auto">
                  <TypewriterCode />
                </div>
                {/* DECORATIVE ICONS */}
                <motion.div className="absolute -right-3 -top-3 md:-right-5 md:-top-5 w-10 h-10 md:w-12 md:h-12 bg-[#2d3748] rounded-lg flex items-center justify-center border border-white/20 shadow-lg z-20" whileHover={{ scale: 1.1, rotate: 10 }}><FaReact size={24} className="text-[#61DAFB]" /></motion.div>
                <motion.div className="absolute -left-3 -bottom-3 md:-left-5 md:-bottom-5 w-10 h-10 md:w-12 md:h-12 bg-[#2d3748] rounded-lg flex items-center justify-center border border-white/20 shadow-lg z-20" whileHover={{ scale: 1.1, rotate: -10 }}><FaPython size={24} className="text-[#3776AB]" /></motion.div>
                <motion.div className="absolute -right-3 bottom-12 md:-right-5 md:bottom-16 w-10 h-10 md:w-12 md:h-12 bg-[#2d3748] rounded-lg flex items-center justify-center border border-white/20 shadow-lg z-20" whileHover={{ scale: 1.1, rotate: 10 }}><SiSolidity size={24} className="text-gray-300" /></motion.div>
                <motion.div className="absolute -left-3 top-12 md:-left-5 md:top-16 w-10 h-10 md:w-12 md:h-12 bg-[#2d3748] rounded-lg flex items-center justify-center border border-white/20 shadow-lg z-20" whileHover={{ scale: 1.1, rotate: -10 }}><FaJs size={24} className="text-[#F7DF1E]" /></motion.div>
              </div>
          </div>
        </div>
      </section>

      {/* TECH STACK */}
      <div className="relative z-20 py-12 bg-black/40 border-y border-white/10 overflow-hidden backdrop-blur-sm">
        <div className="flex animate-infinite-scroll whitespace-nowrap gap-16 min-w-full justify-center items-center">
          {[...techStack, ...techStack].map((tech, i) => (
            <div key={i} className="flex items-center gap-4 text-gray-400 font-bold text-xl uppercase tracking-widest opacity-70 hover:opacity-100 transition-opacity">
               <img src={tech.icon} alt={tech.name} className="w-10 h-10 object-contain" />
               <span>{tech.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* SKILLS */}
      <section id="skills" className="py-32 px-6">
         <div className="container mx-auto max-w-6xl">
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-4xl md:text-5xl font-bold mb-16 text-center">Tech Stack & Skills</motion.h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
               {techStack.map((tech, index) => (
                 <motion.div
                   key={index}
                   initial={{ opacity: 0, scale: 0.5 }}
                   whileInView={{ opacity: 1, scale: 1 }}
                   transition={{ delay: index * 0.05, type: "spring" }}
                   viewport={{ once: true }}
                   whileHover={{ y: -10 }}
                   className="group relative bg-white/5 border border-white/10 p-6 rounded-2xl flex flex-col items-center gap-4 hover:bg-white/10 transition-all cursor-default"
                 >
                   <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity" />
                   <img src={tech.icon} alt={tech.name} className="w-16 h-16 object-contain group-hover:scale-110 transition-transform duration-300 drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]" />
                   <span className="font-semibold tracking-wide text-gray-300 group-hover:text-white">{tech.name}</span>
                 </motion.div>
               ))}
            </div>
         </div>
      </section>

      {/* --- PROJECTS SECTION --- */}
      <section id="projects" className="py-20 px-4 md:px-6 relative">
        <div className="container mx-auto max-w-6xl">
          <motion.div 
             initial={{ opacity: 0, y: 30 }}
             whileInView={{ opacity: 1, y: 0 }}
             className="mb-12 md:mb-20 space-y-4"
          >
            <h2 className="text-4xl md:text-6xl font-bold">Featured Projects</h2>
            <p className="text-lg text-gray-400">A collection of projects that define my expertise.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {projects.map((project, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`bg-[#1e1e1e] rounded-2xl border border-white/10 overflow-hidden hover:border-blue-500/30 transition-all duration-300 flex flex-col ${project.layout === 'featured' ? 'md:col-span-2' : ''}`}
              >
                
                {/* Images Area */}
                <div className="relative bg-gray-900 p-3 md:p-4">
                   {project.images.length > 1 ? (
                     <div className={`grid gap-2 ${project.images.length >= 3 ? 'grid-cols-1 md:grid-cols-3' : 'grid-cols-2'}`}>
                       {project.images.map((img, i) => (
                         <div key={i} className="overflow-hidden rounded-lg border border-white/5 bg-gray-800">
                            <img 
                              src={img} 
                              alt={`${project.title} screenshot`} 
                              className="w-full h-auto object-contain hover:scale-105 transition-transform duration-500" 
                            />
                         </div>
                       ))}
                     </div>
                   ) : (
                     <div className="overflow-hidden rounded-lg border border-white/5 bg-gray-800">
                        <img 
                          src={project.images[0]} 
                          alt={project.title} 
                          className="w-full h-auto max-h-[300px] md:max-h-[450px] object-contain hover:scale-105 transition-transform duration-500" 
                        />
                     </div>
                   )}
                </div>

                {/* Content Area - Optimized for Mobile */}
                <div className="p-5 md:p-8 flex-1 flex flex-col">
                   <div className="mb-3">
                     <span className={`text-xs md:text-sm font-bold uppercase tracking-wider text-transparent bg-clip-text bg-gradient-to-r ${project.color}`}>
                       {project.category}
                     </span>
                   </div>
                   
                   <h3 className="text-xl md:text-3xl font-bold mb-3 text-white">{project.title}</h3>
                   <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-6 flex-1">{project.desc}</p>
                   
                   {/* Tech Stack Tags */}
                   <div className="flex flex-wrap gap-2 mb-6">
                     {project.tech.map(t => (
                       <span key={t} className="px-3 py-1 text-[10px] md:text-xs font-semibold rounded-full bg-white/5 text-gray-300 border border-white/10">
                         {t}
                       </span>
                     ))}
                   </div>

                   <a 
                     href={project.link} 
                     target="_blank" 
                     className="inline-flex w-full md:w-fit justify-center items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-all active:scale-95"
                   >
                     View Project <ExternalLink size={18} />
                   </a>
                </div>

              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- CONTACT --- */}
      <section id="contact" className="py-20 px-6 bg-gradient-to-b from-transparent to-blue-900/10">
        <div className="container mx-auto max-w-4xl text-center">
          
          {/* Contact Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="p-8 md:p-12 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to start a project?</h2>
            <p className="text-lg text-gray-300 mb-8 max-w-xl mx-auto">
              Whether you need a blockchain solution, an AI model, or a full-stack web app, 
              I am ready to bring your vision to life.
            </p>
            
            <div className="flex flex-col md:flex-row justify-center gap-4 flex-wrap">
               <a href="mailto:ikegold9@gmail.com" className="flex items-center justify-center gap-2 px-6 py-3 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition">
                  <Mail size={18} /> ikegold9@gmail.com
               </a>

               <a href="https://www.linkedin.com/in/kalu-ikechukwu-4730683a1" target="_blank" className="flex items-center justify-center gap-2 px-6 py-3 bg-[#0077b5] text-white font-bold rounded-lg hover:brightness-110 transition">
                  <FaLinkedin size={18} /> LinkedIn
               </a>

               <a href="https://github.com/IykeSol" target="_blank" className="flex items-center justify-center gap-2 px-6 py-3 bg-black border border-white/20 rounded-lg hover:bg-white/10 transition">
                  <Github size={18} /> GitHub
               </a>

               <a href="https://x.com/agbaghaSol" target="_blank" className="flex items-center justify-center gap-2 px-6 py-3 bg-black border border-white/20 text-white rounded-lg hover:bg-gray-900 transition">
                  <X size={18} /> X
               </a>

               <a href="https://wa.me/2348126832604" target="_blank" className="flex items-center justify-center gap-2 px-6 py-3 bg-[#25D366] text-white rounded-lg hover:brightness-110 transition">
                  <FaWhatsapp size={18} /> WhatsApp
               </a>
            </div>
          </motion.div>

          {/* --- FOOTER --- */}
          <footer className="border-t border-white/10 pt-8">
            <div className="flex flex-col-reverse md:flex-row justify-between items-center gap-4">
              
              {/* Copyright */}
              <p className="text-gray-400 text-sm">
                © {new Date().getFullYear()} Kalu Ikechukwu. All rights reserved.
              </p>

              {/* Navigation */}
              <div className="flex gap-6 text-sm font-medium text-gray-300">
                <a href="#home" className="hover:text-white transition-colors">Home</a>
                <a href="#projects" className="hover:text-white transition-colors">Projects</a>
                <a href="#skills" className="hover:text-white transition-colors">Skills</a>
              </div>
            </div>
          </footer>
          
        </div>
      </section>
    </div>
  );
};

export default App;