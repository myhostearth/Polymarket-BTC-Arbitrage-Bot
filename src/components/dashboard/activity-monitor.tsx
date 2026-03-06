"use client";

import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { TerminalWindow, Circle } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

export interface LogEntry {
    id: string;
    timestamp: string;
    message: string;
    type: "info" | "success" | "warning" | "error";
}

interface ActivityMonitorProps {
    logs: LogEntry[];
}

export function ActivityMonitor({ logs }: ActivityMonitorProps) {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [mounted, setMounted] = React.useState(false);
    const [sessionId, setSessionId] = React.useState("");

    useEffect(() => {
        setMounted(true);
        setSessionId(Math.random().toString(16).substring(2, 6).toUpperCase());
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [logs]);

    return (
        <Card className="h-full flex flex-col bg-black/40 border-zinc-800/50">
            <CardHeader className="border-b border-white/5 py-4 px-6 flex flex-row items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="flex gap-1.5">
                        <Circle weight="fill" size={10} className="text-rose-500/80" />
                        <Circle weight="fill" size={10} className="text-amber-500/80" />
                        <Circle weight="fill" size={10} className="text-emerald-500/80" />
                    </div>
                    <CardTitle className="flex items-center gap-2 text-[10px] tracking-widest opacity-80">
                        <TerminalWindow size={14} weight="duotone" className="text-accent" />
                        BOT_CORE_STDOUT
                    </CardTitle>
                </div>
                <div className="flex flex-col items-end gap-1">
                    <div className="text-[9px] font-mono text-zinc-500 hidden sm:flex items-center gap-2">
                        <span className="opacity-50">KERNEL:</span>
                        <span className="text-accent/60 font-bold">LNX_X86_64_VA2</span>
                        <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
                    </div>
                    <div className="text-[9px] font-mono text-zinc-600 hidden sm:block uppercase tracking-tighter">
                        SESSION: ARCH_X86_64_0x{mounted ? sessionId : "----"}
                    </div>
                </div>
            </CardHeader>
            <CardContent
                ref={scrollRef}
                className="flex-1 overflow-y-auto p-6 font-mono text-[11px] leading-relaxed space-y-1.5 scroll-smooth"
            >
                <AnimatePresence initial={false}>
                    {logs.map((log) => (
                        <motion.div
                            key={log.id}
                            initial={{ opacity: 0, x: -5 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="flex items-start gap-4 group"
                        >
                            <span className="text-zinc-600 shrink-0 select-none font-mono text-[10px] w-[160px]">
                                {log.timestamp.replace('T', ' ').replace('Z', '')}
                            </span>
                            <span className={cn(
                                "break-all tracking-tight",
                                log.type === "info" && "text-zinc-300",
                                log.type === "success" && "text-emerald-400 font-medium",
                                log.type === "warning" && "text-amber-400 font-medium",
                                log.type === "error" && "text-rose-500 font-bold"
                            )}>
                                {log.message}
                            </span>
                        </motion.div>
                    ))}
                </AnimatePresence>

                {/* Blinking Cursor */}
                <div className="flex items-center gap-2 pt-1">
                    <span className="text-accent shrink-0 select-none">$</span>
                    <motion.div
                        animate={{ opacity: [1, 0] }}
                        transition={{ duration: 0.8, repeat: Infinity }}
                        className="w-2 h-4 bg-accent/60"
                    />
                </div>
            </CardContent>
            <div className="px-6 py-3 border-t border-white/5 bg-white/[0.02] flex items-center justify-between">
                <div className="text-[10px] text-zinc-500">REALTIME_STREAM_ACTIVE</div>
                <div className="flex items-center gap-2">
                    <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"
                    />
                    <span className="text-[10px] text-zinc-400 font-mono tracking-tighter">LIVE_FEED</span>
                </div>
            </div>
        </Card>
    );
}

