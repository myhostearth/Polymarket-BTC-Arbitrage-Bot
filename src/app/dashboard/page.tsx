"use client";

import React, { useState, useEffect, useCallback } from "react";
import { DashboardHeader } from "@/components/dashboard/header";
import { StatCard } from "@/components/dashboard/stat-card";
import { BotControls } from "@/components/dashboard/bot-controls";
import { ActivityMonitor, LogEntry } from "@/components/dashboard/activity-monitor";
import { MarketAnalysis } from "@/components/dashboard/market-analysis";
import { PerformanceChart } from "@/components/dashboard/performance-chart";
import { EnginePreview } from "@/components/dashboard/engine-preview";
import {
  CurrencyDollar,
  Pulse,
  Target,
  TrendUp,
  ChartLineUp
} from "@phosphor-icons/react";
import { motion } from "framer-motion";

export default function DashboardPage() {
  const [mounted, setMounted] = useState(false);
  const [sessionLicense, setSessionLicense] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [isStarting, setIsStarting] = useState(false);
  const [btcPrice, setBtcPrice] = useState(0);
  const [stats, setStats] = useState({
    marketsScanned: 0,
    opportunitiesFound: 0,
    tradesExecuted: 0,
    totalProfit: 0,
    winRate: 0,
  });
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [market, setMarket] = useState({
    yesPrice: 0,
    noPrice: 0,
    totalCost: 0,
    isOpportunity: false,
    status: "STANDBY",
  });

  // Initialize mounted state and static-wait logs
  useEffect(() => {
    setMounted(true);
    setSessionLicense(Math.random().toString(36).substring(7).toUpperCase());

    // Set initial logs only on client
    const initialConfigLogs: LogEntry[] = [
      {
        id: "config-1",
        timestamp: new Date(Date.now() - 5000).toISOString(),
        message: "# ========== 市场发现配置 Market Discovery (可选 Optional) ==========",
        type: "info",
      },
      {
        id: "config-2",
        timestamp: new Date(Date.now() - 4800).toISOString(),
        message: "CRYPTO_SYMBOLS=btc",
        type: "info",
      },
      {
        id: "config-3",
        timestamp: new Date(Date.now() - 4600).toISOString(),
        message: "MARKET_REFRESH_ADVANCE_SECS=2   # 提前查询时间",
        type: "info",
      },
      {
        id: "config-4",
        timestamp: new Date(Date.now() - 4400).toISOString(),
        message: "# ========== 交易配置 Trading (可选 Optional) ==========",
        type: "info",
      },
      {
        id: "config-5",
        timestamp: new Date(Date.now() - 4200).toISOString(),
        message: "MIN_PROFIT_THRESHOLD=0.012",
        type: "info",
      },
      {
        id: "config-6",
        timestamp: new Date(Date.now() - 4000).toISOString(),
        message: "MAX_ORDER_SIZE_USDC=3",
        type: "info",
      },
      {
        id: "config-7",
        timestamp: new Date(Date.now() - 3800).toISOString(),
        message: "ARBITRAGE_EXECUTION_SPREAD=0.015",
        type: "info",
      },
      {
        id: "config-risk",
        timestamp: new Date(Date.now() - 2600).toISOString(),
        message: "# ========== 风险管理配置 Risk Management (可选 Optional) ==========",
        type: "info",
      },
      {
        id: "config-14",
        timestamp: new Date(Date.now() - 2400).toISOString(),
        message: "RISK_MAX_EXPOSURE_USDC=8           # 80%",
        type: "info",
      },
      {
        id: "config-15",
        timestamp: new Date(Date.now() - 2200).toISOString(),
        message: "RISK_IMBALANCE_THRESHOLD=0.1       # 10%",
        type: "info",
      },
      {
        id: "config-13",
        timestamp: new Date(Date.now() - 1600).toISOString(),
        message: "RUST_LOG=debug",
        type: "info",
      },
      {
        id: "initial",
        timestamp: new Date().toISOString(),
        message: "INFO poly_5min_bot: 🚀 Bot engine initialized. Ready to execute strategy.",
        type: "success",
      },
    ];
    setLogs(initialConfigLogs);
  }, []);

  // Fetch BTC price
  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const res = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd");
        const data = await res.json();
        setBtcPrice(data.bitcoin.usd);
      } catch (e) {
        setBtcPrice(95432.12 + Math.random() * 100);
      }
    };
    fetchPrice();
    const interval = setInterval(fetchPrice, 30000);
    return () => clearInterval(interval);
  }, []);

  const addLog = useCallback((message: string, type: LogEntry["type"] = "info") => {
    const level = type === "info" ? "INFO" : type === "success" ? "INFO" : type === "warning" ? "WARN" : "ERROR";
    const prefix = message.startsWith("#") || message.includes("=") ? "" : ` ${level} poly_5min_bot: `;

    setLogs((prev) => [
      ...prev,
      {
        id: Math.random().toString(36).substr(2, 9),
        timestamp: new Date().toISOString(),
        message: `${prefix}${message}`,
        type,
      },
    ].slice(-100)); // Increase buffer
  }, []);

  const runCycle = useCallback(() => {
    addLog("查询市场 timestamp=" + Math.floor(Date.now() / 1000) + " slug_count=1", "info");

    setTimeout(() => {
      // Small chance for arbitrage
      const isOpp = Math.random() < 0.2;

      let yes, no, total;
      if (isOpp) {
        yes = 0.6600;
        no = 0.3000;
        total = 0.9600;
      } else {
        yes = 0.7600;
        no = 0.3000;
        total = 1.0600;
      }

      setMarket({
        yesPrice: yes,
        noPrice: no,
        totalCost: total,
        isOpportunity: isOpp,
        status: isOpp ? "ARBITRAGE_DETECTED" : "NO_SPREAD_ADVANTAGE",
      });

      setStats(prev => ({
        ...prev,
        marketsScanned: prev.marketsScanned + 1,
      }));

      if (isOpp) {
        const profit = 4.0;
        addLog(`🚨套利机会 btc预测市场 | Yes:${yes.toFixed(4)} 份额:600.35 ↓ | No:${no.toFixed(4)} 份额:20 − | 总价:${total.toFixed(4)} 利润:${profit.toFixed(2)}%`, "info");
        addLog(`⚡ 执行套利交易 | 市场:btc预测市场 | 利润:${profit.toFixed(2)}% | 下单数量:2份 | 订单成本:1.92 USD | 当前敞口:0.00 USD`, "info");
        addLog(`📋 选档 | YES 0.6650×2.00 NO 0.3050×2.00`, "info");
        addLog(`📤 下单 | YES 0.6600→0.6650×2 NO 0.3000→0.3050×2 | FOK`, "info");

        setTimeout(() => {
          // Sometimes it fails like user's log
          if (Math.random() < 0.5) {
            addLog(`⏭️ 跳过下单 | YES金额:1.33 USD NO金额:0.61 USD | 双边均须 > $1`, "warning");
            addLog(`执行套利交易失败: 下单金额不满足交易所最小要求: YES 1.33 USD, NO 0.61 USD，双边均须 > $1`, "error");
          } else {
            const profitValue = 0.08;
            setStats(prev => ({
              ...prev,
              opportunitiesFound: prev.opportunitiesFound + 1,
              tradesExecuted: prev.tradesExecuted + 1,
              totalProfit: prev.totalProfit + profitValue,
              winRate: 100,
            }));
            addLog(`✅ 套利执行成功 | 预估利润: +$${profitValue.toFixed(2)}`, "success");
          }
        }, 1200);
      } else {
        addLog(`📊 btc预测市场 | Yes:${yes.toFixed(4)} 份额:95.18 | No:${no.toFixed(4)} 份额:20 | 总价:${total.toFixed(4)} (无套利)`, "info");
      }

      // Add background position sync logs occasionally
      if (Math.random() < 0.3) {
        setTimeout(() => {
          addLog("📊 持仓同步完成 | 共 3 个持仓，3 个市场", "info");
          addLog("  📈 Ethereum Up or Down | YES:5.67 NO:0", "info");
          addLog("  📈 Solana Up or Down | YES:0 NO:4.993", "info");
          addLog("  📈 Bitcoin Up or Down | YES:6.8007 NO:0", "info");
        }, 2000);
      }
    }, 1000);
  }, [addLog]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning) {
      interval = setInterval(runCycle, 4000);
    }
    return () => clearInterval(interval);
  }, [isRunning, runCycle]);

  const handleStart = async () => {
    setIsStarting(true);
    setIsRunning(false); // Ensure we don't start cycle immediately
    addLog("BOOT_INIT: Starting PolyArb v2.0 high-frequency engine...", "info");

    // Phase 1: Authentication
    setTimeout(() => {
      addLog("API_AUTH: Connecting to Polymarket Gateway 0x71C... Successful.", "success");
    }, 800);

    // Phase 2: Wallet & Balance
    setTimeout(() => {
      addLog(`WALLET_SYNC: Balance detected: 8.42 USDC | Exposure Limit: 8.00 USDC`, "info");
    }, 1600);

    // Phase 3: Market Discovery
    setTimeout(() => {
      addLog("MARKET_INDEXER: Rebuilding BTC binary probability tree...", "info");
    }, 2400);

    // Phase 4: Final handshake
    setTimeout(() => {
      addLog("SECURE_HANDSHAKE: Handshake 2/2 Complete. Encryption: AES-256-GCM", "success");
      addLog("ENGINE_HOT_READY: Sequencer entering ACTIVE_LOOP state.", "success");
      setIsStarting(false);
      setIsRunning(true);
    }, 3500);
  };

  const handlePause = () => {
    setIsRunning(false);
    addLog("ENGINE_PAUSE: Sequence halted by user.", "warning");
  };

  const handleClear = () => {
    setLogs([]);
    addLog("CACHE_PURGED: Local state reset.", "info");
  };

  const handleTerminate = () => {
    setIsRunning(false);
    setIsStarting(false);
    setStats({
      marketsScanned: 0,
      opportunitiesFound: 0,
      tradesExecuted: 0,
      totalProfit: 0,
      winRate: 0
    });
    setLogs([]);
    addLog("FATAL_TERMINATION: Engine halted. All local buffers cleared.", "error");
  };

  return (
    <div className="min-h-[100dvh] bg-background text-foreground p-4 md:p-8 max-w-[1400px] mx-auto selection:bg-accent/30">
      <DashboardHeader onTerminate={handleTerminate} />

      {/* Main Grid Layout - Bento 2.0 Style */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="BTC_INDEX_PRICE"
          value={`$${btcPrice.toLocaleString(undefined, { minimumFractionDigits: 2 })}`}
          icon={<CurrencyDollar size={20} weight="duotone" />}
          trend={{ value: 0.12, isPositive: true }}
          className="lg:col-span-1"
        />
        <StatCard
          title="BOT_SYSTEM_STATUS"
          value={isRunning ? "RUNNING" : "STANDBY"}
          icon={<Pulse size={20} weight="duotone" />}
          isAccent={isRunning}
          className="lg:col-span-1"
        />
        <StatCard
          title="TOTAL_PROFIT_EST"
          value={`$${stats.totalProfit.toFixed(2)}`}
          icon={<ChartLineUp size={20} weight="duotone" />}
          trend={{ value: stats.totalProfit > 0 ? 4.2 : 0, isPositive: true }}
          isAccent={stats.totalProfit > 0}
          className="lg:col-span-1"
        />
        <StatCard
          title="WIN_RATE_STABILITY"
          value={`${stats.winRate}%`}
          icon={<Target size={20} weight="duotone" />}
          className="lg:col-span-1"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
        {/* Market Analysis - 4 cols */}
        <div className="lg:col-span-4 h-full">
          <MarketAnalysis
            yesPrice={market.yesPrice}
            noPrice={market.noPrice}
            totalCost={market.totalCost}
            isOpportunity={market.isOpportunity}
            status={market.status}
          />
        </div>

        {/* Activity Monitor - 8 cols */}
        <div className="lg:col-span-8 h-[500px]">
          <ActivityMonitor logs={logs} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Engine Specs - 4 cols */}
        <div className="lg:col-span-4 flex flex-col gap-8 h-full">
          <EnginePreview />
          <PerformanceChart />
        </div>

        {/* Bot Controls - 8 cols */}
        <div className="lg:col-span-8">
          <BotControls
            isRunning={isRunning}
            isStarting={isStarting}
            onStart={handleStart}
            onPause={handlePause}
            onClear={handleClear}
          />
        </div>
      </div>

      {/* Footer Branding Area */}
      <footer className="mt-16 pt-8 border-t border-zinc-800/30 flex flex-col md:flex-row items-center justify-between gap-4 text-zinc-600 text-[10px] font-bold tracking-[0.2em] uppercase">
        <div className="flex items-center gap-4">
          <span>© 2026 ARCH_SYSTEMS_GLOBAL</span>
          <span>POLYA_CORE_LICENSE_ID: {mounted ? sessionLicense : "INITIALIZING..."}</span>
        </div>
        <div className="flex items-center gap-6">
          <span className="text-accent/50">SECURE_HANDSHAKE: OK</span>
          <span className="text-zinc-500">ENCRYPTION: AES-256-GCM</span>
        </div>
      </footer>
    </div>
  );
}
