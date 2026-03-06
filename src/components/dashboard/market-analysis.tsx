"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ChartPolar, TrendUp, TrendDown, CurrencyDollar } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

interface MarketAnalysisProps {
    yesPrice: number;
    noPrice: number;
    totalCost: number;
    isOpportunity: boolean;
    status: string;
}

export function MarketAnalysis({ yesPrice, noPrice, totalCost, isOpportunity, status }: MarketAnalysisProps) {
    return (
        <Card className="h-full flex flex-col">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <ChartPolar size={16} weight="duotone" className="text-accent" />
                    Market Selection
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between p-4 rounded-2xl bg-white/[0.03] border border-white/5">
                        <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">Asset</span>
                        <span className="text-sm font-semibold">BTC 5m Binaries</span>
                    </div>

                    <div className="flex flex-col gap-2">
                        <div className="flex items-center justify-between p-4 rounded-2xl bg-emerald-500/[0.03] border border-emerald-500/10">
                            <div className="flex items-center gap-2">
                                <TrendUp size={16} className="text-emerald-400" />
                                <span className="text-xs font-semibold text-emerald-400/80">YES_CONTRACT</span>
                            </div>
                            <span className="font-mono font-bold text-emerald-400">${yesPrice.toFixed(2)}</span>
                        </div>

                        <div className="flex items-center justify-between p-4 rounded-2xl bg-rose-500/[0.03] border border-rose-500/10">
                            <div className="flex items-center gap-2">
                                <TrendDown size={16} className="text-rose-400" />
                                <span className="text-xs font-semibold text-rose-400/80">NO_CONTRACT</span>
                            </div>
                            <span className="font-mono font-bold text-rose-400">${noPrice.toFixed(2)}</span>
                        </div>
                    </div>

                    <div className="flex items-center justify-between p-4 rounded-2xl bg-accent/[0.03] border border-accent/10">
                        <div className="flex items-center gap-2">
                            <CurrencyDollar size={16} className="text-accent" />
                            <span className="text-xs font-semibold text-accent/80">TOTAL_EXPOSURE</span>
                        </div>
                        <span className="font-mono font-bold text-accent">${totalCost.toFixed(2)}</span>
                    </div>
                </div>

                <motion.div
                    animate={isOpportunity ? { scale: [1, 1.02, 1] } : {}}
                    transition={{ duration: 0.5, repeat: isOpportunity ? Infinity : 0 }}
                    className={cn(
                        "mt-4 p-5 rounded-2xl text-center font-bold text-xs uppercase tracking-[0.2em] relative overflow-hidden",
                        isOpportunity
                            ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
                            : "bg-zinc-800/30 text-zinc-500 border border-zinc-800/50"
                    )}
                >
                    {isOpportunity && (
                        <motion.div
                            initial={{ x: "-100%" }}
                            animate={{ x: "100%" }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-400/10 to-transparent skew-x-12"
                        />
                    )}
                    <span className="relative z-10">{status}</span>
                </motion.div>
            </CardContent>
        </Card>
    );
}
