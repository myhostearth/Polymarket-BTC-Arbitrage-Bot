"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardTitle, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import React from "react";

interface StatCardProps {
    title: string;
    value: string | number;
    icon?: React.ReactNode;
    trend?: {
        value: number;
        isPositive: boolean;
    };
    className?: string;
    isAccent?: boolean;
}

export function StatCard({ title, value, icon, trend, className, isAccent }: StatCardProps) {
    return (
        <Card className={cn("group transition-all duration-300 hover:border-accent/40 hover:shadow-accent/5", className)}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 p-6 pb-2">
                <CardTitle className="text-xs">{title}</CardTitle>
                {icon && <div className="text-muted-foreground/50 transition-colors group-hover:text-accent">{icon}</div>}
            </CardHeader>
            <CardContent className="p-6 pt-0">
                <div className="relative overflow-hidden inline-block">
                    <div className={cn(
                        "text-3xl font-bold font-mono tracking-tighter",
                        isAccent ? "text-accent" : "text-foreground"
                    )}>
                        {value}
                    </div>
                    {/* Real-time scanning effect */}
                    <motion.div
                        initial={{ top: "-100%" }}
                        animate={{ top: "100%" }}
                        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/5 to-transparent h-4 w-full"
                    />
                </div>
                {trend && (
                    <p className={cn(
                        "text-[10px] mt-1 font-medium",
                        trend.isPositive ? "text-emerald-400" : "text-rose-400"
                    )}>
                        {trend.isPositive ? "+" : "-"}{trend.value}% since last hour
                    </p>
                )}

                {/* Subtle breathing indicator for perpetual motion as per skill */}
                <div className="absolute top-2 right-2 flex gap-1 items-center">
                    <motion.div
                        animate={{ opacity: [0.3, 0.7, 0.3] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        className={cn("w-1 h-1 rounded-full", isAccent ? "bg-accent" : "bg-zinc-700")}
                    />
                </div>
            </CardContent>
        </Card>
    );
}
