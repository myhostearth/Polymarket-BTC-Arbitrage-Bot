"use client";

import React from "react";
import { motion } from "framer-motion";
import { Play, Pause, Trash, ShieldCheck, Pulse } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

interface BotControlsProps {
    isRunning: boolean;
    isStarting?: boolean;
    onStart: () => void;
    onPause: () => void;
    onClear: () => void;
}

export function BotControls({ isRunning, isStarting, onStart, onPause, onClear }: BotControlsProps) {
    return (
        <div className="flex flex-wrap items-center justify-center gap-4 p-6 liquid-glass rounded-[2.5rem] bg-black/20 border-zinc-800/50 px-8 py-6">
            <div className="flex items-center gap-3 mr-4 pr-6 border-r border-zinc-800 hidden md:flex">
                <ShieldCheck size={24} weight="duotone" className="text-accent" />
                <div>
                    <div className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">Bot Security</div>
                    <div className="text-xs font-semibold text-zinc-300">MPC Multi-Sig Active</div>
                </div>
            </div>

            <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98, y: 1 }}
                onClick={onStart}
                disabled={isRunning || isStarting}
                className={cn(
                    "flex items-center gap-2 px-8 py-3 rounded-2xl font-bold text-sm transition-all duration-300",
                    (isRunning || isStarting)
                        ? "bg-zinc-800/50 text-zinc-500 cursor-not-allowed border border-transparent"
                        : "bg-accent text-accent-foreground hover:shadow-accent/20 hover:shadow-xl border border-accent/20"
                )}
            >
                {isStarting ? (
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                        <Pulse weight="fill" size={18} />
                    </motion.div>
                ) : (
                    <Play weight="fill" size={18} />
                )}
                {isStarting ? "INITIALIZING..." : "START_ENGINE"}
            </motion.button>

            <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98, y: 1 }}
                onClick={onPause}
                disabled={!isRunning}
                className={cn(
                    "flex items-center gap-2 px-8 py-3 rounded-2xl font-bold text-sm transition-all duration-300 border",
                    !isRunning
                        ? "bg-zinc-800/50 text-zinc-500 cursor-not-allowed border-transparent"
                        : "bg-amber-500/10 text-amber-500 border-amber-500/20 hover:bg-amber-500/20"
                )}
            >
                <Pause weight="fill" size={18} />
                PAUSE_SEQUENCER
            </motion.button>

            <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98, y: 1 }}
                onClick={onClear}
                className="flex items-center gap-2 px-8 py-3 rounded-2xl font-bold text-sm transition-all duration-300 border border-zinc-800 text-zinc-400 hover:bg-zinc-800 hover:text-rose-400"
            >
                <Trash weight="duotone" size={18} />
                CLEAR_CACHE
            </motion.button>
        </div>
    );
}
