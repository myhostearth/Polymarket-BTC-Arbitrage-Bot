"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
    ArrowRight,
    Cpu,
    ShieldCheck,
    Swap,
    ChartLineUp,
    Globe,
    Database,
    Detective,
    WarningCircle,
    Lightning,
    Pulse,
    GithubLogo,
    X
} from "@phosphor-icons/react";

const features = [
    {
        icon: <Globe size={24} />,
        title: "Market Discovery",
        description: "Automated fetching of 'Up/Down' 5-minute binary markets via Gamma API with UTC window synchronization.",
        id: "discovery"
    },
    {
        icon: <Database size={24} />,
        title: "Order Book Integrity",
        description: "Deep CLOB order book monitoring for YES and NO contracts with real-time liquidity analysis.",
        id: "monitoring"
    },
    {
        icon: <Swap size={24} />,
        title: "Arbitrage Execution",
        description: "Atomic simultaneous execution of YES and NO positions when aggregate costs drop below parity thresholds.",
        id: "execution"
    },
    {
        icon: <ShieldCheck size={24} />,
        title: "Risk Containment",
        description: "Dynamic USDC exposure caps and imbalance thresholds with configurable slippage controls.",
        id: "risk"
    },
    {
        icon: <Pulse size={24} />,
        title: "Position Optimization",
        description: "Periodical position merging logic to redeem fully matched contracts and reclaim USDC liquidity.",
        id: "optimization"
    },
    {
        icon: <Cpu size={24} />,
        title: "Rust Core Engine",
        description: "High-concurrency Rust implementation for sub-500ms market polling and execution latency.",
        id: "engine"
    }
];

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-[#020202] text-zinc-100 overflow-hidden selection:bg-accent/30 selection:text-white">
            {/* Premium Background Elements */}
            <div className="fixed inset-0 z-0">
                <div className="absolute top-0 -left-[10%] w-[60%] h-[60%] rounded-full bg-accent/10 blur-[150px] animate-pulse" />
                <div className="absolute bottom-0 -right-[5%] w-[40%] h-[40%] rounded-full bg-emerald-950/20 blur-[120px]" />
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-150 contrast-150 mix-blend-overlay pointer-events-none" />
            </div>

            {/* Navigation */}
            <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-8">
                <div className="max-w-7xl mx-auto flex items-center justify-between backdrop-blur-md bg-white/[0.01] border border-white/5 px-8 py-4 rounded-full">
                    <div className="flex items-center gap-3">
                        <span className="font-bold tracking-tighter text-lg uppercase">PolyArb_V2</span>
                    </div>
                    <div className="hidden md:flex items-center gap-10">
                        <div className="flex items-center gap-6 mr-4 pr-6 border-r border-white/10">
                            <Link href="https://github.com/whatapponthetime/Polymarket-BTC-Arbitrage-Bot.git" target="_blank">
                                <motion.div whileHover={{ scale: 1.1, color: "#fff" }} className="text-zinc-500 cursor-pointer">
                                    <GithubLogo size={20} weight="fill" />
                                </motion.div>
                            </Link>
                            <Link href="https://x.com" target="_blank">
                                <motion.div whileHover={{ scale: 1.1, color: "#fff" }} className="text-zinc-500 cursor-pointer">
                                    <X size={18} weight="bold" />
                                </motion.div>
                            </Link>
                        </div>
                        <Link href="#features" className="text-xs font-bold text-zinc-400 hover:text-white transition-colors tracking-widest uppercase">System_Heuristics</Link>
                        <Link href="#architecture" className="text-xs font-bold text-zinc-400 hover:text-white transition-colors tracking-widest uppercase">Kernel_Core</Link>
                        <Link href="/dashboard">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-6 py-2 bg-zinc-100 text-black text-[10px] font-black uppercase tracking-[0.2em] rounded-full hover:bg-accent hover:text-black transition-colors"
                            >
                                Launch_Terminal
                            </motion.button>
                        </Link>
                    </div>
                </div>
            </nav>

            <main className="relative z-10 pt-48 pb-20 px-6">
                {/* Hero Section */}
                <section className="max-w-7xl mx-auto mb-40">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
                        {/* Text Content (Left - 7 columns) */}
                        <motion.div
                            initial={{ opacity: 0, x: -40 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1.2, delay: 0.2 }}
                            className="lg:col-span-7 flex flex-col items-start text-left order-1"
                        >
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/5 bg-white/[0.02] text-accent text-[10px] font-bold uppercase tracking-widest mb-8 backdrop-blur-sm">
                                <div className="w-1.5 h-1.5 rounded-full bg-accent animate-ping" />
                                Real-time Execution Module Enabled
                            </div>

                            <h1 className="text-5xl lg:text-7xl font-bold tracking-tight mb-6 bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent leading-[1.05] -ml-1">
                                Algorithmic <br /> Arbitrage
                                <span className="block mt-2 text-3xl lg:text-5xl text-zinc-500 font-medium">for Prediction Markets</span>
                            </h1>

                            <p className="max-w-xl text-zinc-400 text-lg md:text-xl mb-12 font-medium leading-relaxed opacity-90">
                                The PolyArb_V2 engine conducts sub-second analysis of 5-minute binary markets, identifying and executing spread inefficiencies at high speed.
                            </p>

                            <div className="flex flex-col sm:flex-row items-center gap-6 w-full sm:w-auto">
                                <Link href="/dashboard" className="w-full sm:w-auto">
                                    <motion.button
                                        whileHover={{ scale: 1.05, y: -2 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="w-full sm:w-auto px-10 py-4 bg-accent text-black font-black text-sm uppercase tracking-[0.2em] rounded-2xl shadow-[0_15px_30px_rgba(16,185,129,0.2)] group relative overflow-hidden"
                                    >
                                        <span className="relative z-10 flex items-center justify-center gap-3">
                                            Launch Terminal
                                            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                        </span>
                                    </motion.button>
                                </Link>
                                <Link href="https://github.com/whatapponthetime/Polymarket-BTC-Arbitrage-Bot.git" target="_blank" className="w-full sm:w-auto">
                                    <button className="w-full sm:w-auto px-10 py-4 text-zinc-400 hover:text-white font-bold text-sm uppercase tracking-[0.2em] border-b border-white/5 hover:border-white/40 transition-all">
                                        Documentation_MD
                                    </button>
                                </Link>
                            </div>
                        </motion.div>

                        {/* Video Showcase (Right - 5 columns) */}
                        <motion.div
                            initial={{ opacity: 0, x: 40, filter: "blur(20px)" }}
                            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                            transition={{ duration: 1.6, ease: [0.23, 1, 0.32, 1] }}
                            className="lg:col-span-5 relative order-2 flex justify-center lg:justify-end mt-12 lg:mt-0"
                        >
                            {/* Ambient Glow behind video */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-accent/20 blur-[100px] rounded-full opacity-50 pointer-events-none" />

                            <div className="relative w-full max-w-[480px]">
                                <video
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                    className="w-full h-auto object-contain mix-blend-screen opacity-100 drop-shadow-[0_0_30px_rgba(16,185,129,0.2)]"
                                >
                                    <source src="/pol.webm" type="video/webm" />
                                </video>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* System Heuristics - Features */}
                <section id="features" className="max-w-7xl mx-auto mb-40">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {features.map((feature, idx) => (
                            <motion.div
                                key={feature.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: idx * 0.1 }}
                                className="group p-8 rounded-[2rem] bg-zinc-900/40 border border-white/5 hover:border-accent/40 transition-all duration-500 hover:bg-zinc-900/60"
                            >
                                <div className="w-12 h-12 rounded-2xl bg-zinc-800 flex items-center justify-center text-zinc-400 group-hover:bg-accent group-hover:text-black transition-all duration-500 mb-8 group-hover:scale-110">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-bold mb-4 tracking-tight group-hover:text-accent transition-colors">
                                    {feature.title}
                                </h3>
                                <p className="text-zinc-500 text-sm leading-relaxed group-hover:text-zinc-400 transition-colors">
                                    {feature.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Workflow Showcase */}
                <section id="architecture" className="max-w-7xl mx-auto mb-40 text-center">
                    <h2 className="text-4xl font-bold tracking-tighter mb-4">SYSTEM_WORKFLOW_PROTOCOL</h2>
                    <p className="text-zinc-500 mb-16 text-sm uppercase tracking-widest font-bold opacity-60">Sequence Logic of the Arbitrage Kernel</p>

                    <div className="relative p-10 md:p-20 rounded-[3rem] bg-zinc-900/50 border border-white/5 overflow-hidden">
                        <div className="absolute top-0 right-0 p-8">
                            <div className="flex gap-1.5 grayscale opacity-30">
                                <div className="w-2 h-2 rounded-full bg-red-500" />
                                <div className="w-2 h-2 rounded-full bg-amber-500" />
                                <div className="w-2 h-2 rounded-full bg-emerald-500" />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-0 relative z-10">
                            {[
                                { step: "01", label: "SCAN_KERNEL", content: "Gamma Market Discovery", status: "READY" },
                                { step: "02", label: "ANALYSIS_UNIT", content: "Probability Spread Detection", status: "ACTIVE" },
                                { step: "03", label: "EXECUTION_GATE", content: "Simultaneous Atomic Trades", status: "PENDING" },
                                { step: "04", label: "LIQUIDITY_HUB", content: "Merge & Redeem Cycle", status: "COLD" }
                            ].map((item) => (
                                <div key={item.step} className="flex flex-col items-center">
                                    <div className="w-full flex items-center justify-center mb-8">
                                        <div className="h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent w-full hidden md:block" />
                                        <div className="w-14 h-14 rounded-full bg-accent text-black flex items-center justify-center font-black text-xs z-20 shadow-[0_0_20px_rgba(16,185,129,0.5)]">
                                            {item.step}
                                        </div>
                                        <div className="h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent w-full hidden md:block" />
                                    </div>
                                    <h4 className="font-black text-[10px] tracking-[0.3em] uppercase mb-4 opacity-40">{item.label}</h4>
                                    <p className="text-sm font-bold max-w-[150px] mx-auto text-zinc-300">{item.content}</p>
                                    <div className="mt-6 px-3 py-1 rounded-full border border-white/5 bg-white/5 text-[9px] font-bold tracking-widest text-zinc-500 opacity-60">
                                        STATUS: {item.status}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Visual Connector for Mobile */}
                        <div className="md:hidden flex flex-col items-center gap-12 mt-12 grayscale opacity-20">
                            <ArrowRight size={20} className="rotate-90" />
                            <ArrowRight size={20} className="rotate-90" />
                            <ArrowRight size={20} className="rotate-90" />
                        </div>
                    </div>
                </section>

                {/* Final CTA */}
                <section className="max-w-4xl mx-auto text-center py-20">
                    <div className="p-1 liquid-glass rounded-[2rem] bg-accent/5 overflow-hidden">
                        <div className="bg-[#050505] p-16 rounded-[1.8rem] flex flex-col items-center">
                            <ShieldCheck size={48} weight="duotone" className="text-accent mb-8" />
                            <h2 className="text-4xl font-bold tracking-tight mb-6">Institutional Grade Reliability</h2>
                            <p className="text-zinc-500 mb-10 max-w-lg">
                                The PolyArb_V2 system is built with Rust for guaranteed safety and deterministic performance in volatile environments.
                            </p>
                            <Link href="/dashboard">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-12 py-5 bg-white text-black font-black text-sm uppercase tracking-[0.3em] rounded-2xl hover:bg-accent transition-colors"
                                >
                                    Initialize_Connection
                                </motion.button>
                            </Link>
                        </div>
                    </div>
                </section>
            </main>

            <footer className="relative z-10 border-t border-white/5 py-20 px-6">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 text-zinc-600">
                    <div className="col-span-1 md:col-span-2">
                        <div className="flex items-center gap-3 mb-6">
                            <span className="font-bold tracking-tighter text-white/80 uppercase">Polymarket_Arbitrage_Engine</span>
                        </div>
                        <p className="text-xs leading-relaxed max-w-xs uppercase font-bold tracking-widest opacity-60">
                            This engine interacts with real markets and real funds. Decentralized prediction markets involve significant risk. Use at your own discretion.
                        </p>
                    </div>
                    <div>
                        <h5 className="text-white text-xs font-bold uppercase tracking-widest mb-6">Protocols</h5>
                        <ul className="space-y-4 text-[10px] font-bold uppercase tracking-widest">
                            <li className="hover:text-accent cursor-pointer transition-colors">Risk_Management_V1</li>
                            <li className="hover:text-accent cursor-pointer transition-colors">Security_Handshake</li>
                            <li className="hover:text-accent cursor-pointer transition-colors">Yield_Optimizer</li>
                        </ul>
                    </div>
                    <div>
                        <h5 className="text-white text-xs font-bold uppercase tracking-widest mb-6">Resources</h5>
                        <ul className="space-y-4 text-[10px] font-bold uppercase tracking-widest">
                            <li><Link href="https://github.com/whatapponthetime/Polymarket-BTC-Arbitrage-Bot.git" className="hover:text-accent transition-colors">GitHub_Repo</Link></li>
                            <li className="hover:text-accent cursor-pointer transition-colors">Rust_Docs</li>
                            <li className="hover:text-accent cursor-pointer transition-colors">API_Reference</li>
                        </ul>
                    </div>
                </div>
                <div className="max-w-7xl mx-auto mt-20 flex flex-col md:flex-row items-center justify-between text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-800">
                    <span>© 2026 ARCH_SYSTEMS_GLOBAL. ALL_LOGS_SECURED.</span>
                    <div className="flex gap-4 items-center">
                        <span>LICENSE_KEY: VALID</span>
                        <span className="text-accent underline">STATUS: NOMINAL</span>
                    </div>
                </div>
            </footer>
        </div>
    );
}
