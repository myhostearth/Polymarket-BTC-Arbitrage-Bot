"use client";

import React from "react";
import { Cpu, Code, Database, Shield, TerminalWindow, FileCode } from "@phosphor-icons/react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function EnginePreview() {
    const specs = [
        { label: "Core Runtime", value: "Rust 1.80+ (Tokio)", icon: <TerminalWindow size={14} /> },
        { label: "Network Protocol", value: "Alloy & Gamma v1.2", icon: <Database size={14} /> },
        { label: "Security Kernel", value: "AES-256-GCM / Ring", icon: <Shield size={14} /> },
    ];

    return (
        <Card className="h-full border-white/5 bg-zinc-950/20 backdrop-blur-xl">
            <CardHeader className="p-6">
                <CardTitle className="text-[10px] tracking-[0.2em] flex items-center gap-2">
                    <Cpu size={16} className="text-accent" />
                    Binary_Engine_State
                </CardTitle>
            </CardHeader>
            <CardContent className="px-6 pb-6 pt-2">
                <div className="space-y-3">
                    {specs.map((item, i) => (
                        <div key={i} className="flex items-center justify-between p-3 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-colors group">
                            <div className="flex items-center gap-2.5 text-zinc-500 group-hover:text-zinc-300 transition-colors">
                                {item.icon}
                                <span className="text-[9px] font-bold uppercase tracking-widest leading-none">{item.label}</span>
                            </div>
                            <span className="text-[10px] font-mono text-zinc-400 group-hover:text-accent transition-colors">{item.value}</span>
                        </div>
                    ))}
                </div>

                <div className="mt-6 p-4 rounded-2xl bg-accent/[0.03] border border-accent/10 relative overflow-hidden group">
                    <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-2">
                        <span className="flex items-center gap-1">
                            <FileCode size={12} />
                            Codebase_Integrity
                        </span>
                        <span className="text-accent">99.2% Validated</span>
                    </div>
                    <div className="h-1 w-full bg-zinc-800/50 rounded-full overflow-hidden">
                        <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: "99.2%" }}
                            transition={{ duration: 2, ease: "easeOut" }}
                            className="h-full bg-accent shadow-[0_0_10px_rgba(16,185,129,0.5)]" 
                        />
                    </div>
                    
                    {/* Decorative Background Scanning Line */}
                    <motion.div
                        animate={{ x: ["-100%", "200%"] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-accent/5 to-transparent w-40 skew-x-[45deg]"
                    />
                </div>
            </CardContent>
        </Card>
    );
}
