"use client";

import React from "react";
import { Cpu, Pulse, ArrowsLeftRight, GithubLogo, X } from "@phosphor-icons/react";
import { motion } from "framer-motion";
import Link from "next/link";

interface DashboardHeaderProps {
    onTerminate?: () => void;
}

export function DashboardHeader({ onTerminate }: DashboardHeaderProps) {
    const [latency, setLatency] = React.useState(1.2);

    React.useEffect(() => {
        const interval = setInterval(() => {
            setLatency(0.8 + Math.random() * 0.9);
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    return (
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 py-10 mb-8 border-b border-zinc-800/50">
            <Link href="/" className="flex items-center gap-5 group">
                <motion.div
                    whileHover={{ rotate: 180 }}
                    transition={{ duration: 0.8, ease: "anticipate" }}
                    className="w-14 h-14 bg-accent flex items-center justify-center rounded-2xl shadow-[0_0_30px_-5px_theme(colors.accent)] group-hover:scale-105 transition-transform"
                >
                    <Cpu weight="fill" size={32} className="text-zinc-950" />
                </motion.div>
                <div>
                    <div className="flex items-center gap-3">
                        <h1 className="text-2xl font-black tracking-tighter uppercase italic group-hover:text-accent transition-colors">PolyArb</h1>
                        <div className="px-2 py-0.5 rounded-full bg-accent/10 border border-accent/20 text-[10px] font-bold text-accent uppercase tracking-widest">v2.0_2026</div>
                    </div>
                    <p className="text-xs text-zinc-500 font-medium tracking-tight">BTC/USD High-Frequency Arbitrage Sequencer</p>
                </div>
            </Link>

            <div className="flex items-center gap-6">
                <div className="flex items-center gap-4 px-5 py-3 rounded-2xl bg-white/[0.02] border border-white/5">
                    <div className="flex flex-col items-end">
                        <span className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest">Network_Latency</span>
                        <span className="text-xs font-mono font-bold text-emerald-400">{latency.toFixed(2)}ms</span>
                    </div>
                    <Pulse size={20} weight="duotone" className="text-emerald-500/50 animate-pulse" />
                </div>

                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-4 mr-4 pr-4 border-r border-zinc-800/50">
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

                    <Link href="/" className="flex items-center gap-2 group cursor-pointer border border-white/5 bg-white/[0.02] px-4 py-2 rounded-xl hover:bg-white/[0.05] transition-all">
                        <ArrowsLeftRight size={16} className="text-zinc-500 group-hover:text-accent group-hover:-translate-x-0.5 transition-all" />
                        <span className="text-[10px] lowercase font-bold text-zinc-400 group-hover:text-white transition-colors">exit_to_landing</span>
                    </Link>

                    <button
                        onClick={onTerminate}
                        className="flex items-center gap-2 group cursor-pointer opacity-50 hover:opacity-100 transition-opacity bg-transparent border-none"
                    >
                        <span className="text-[10px] font-bold text-zinc-500 group-hover:text-rose-500 transition-colors uppercase">TERMINATE_ENGINE</span>
                    </button>
                </div>
            </div>
        </header>
    );
}
