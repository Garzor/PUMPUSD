import { useState } from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { mockTokens, mockActivityLogs, type Token, type ActivityLog } from "@/lib/mockData";
import {
  Wallet,
  Search,
  Import,
  ArrowRight,
  TrendingUp,
  Droplets,
  Zap,
  Activity,
  AlertTriangle,
  CheckCircle2,
  Clock,
  ExternalLink,
  Info,
  Flame,
  BarChart3,
} from "lucide-react";
import { cn } from "@/lib/utils";

type FlywheelMode = "balanced" | "buyback" | "liquidity" | "burn";
type ActionFilter = "all" | "capture" | "apply" | "burn" | "lp";

export function Dashboard() {
  const [walletConnected, setWalletConnected] = useState(false);
  const [selectedToken, setSelectedToken] = useState<Token | null>(mockTokens[0]);
  const [searchQuery, setSearchQuery] = useState("");
  const [mintAddress, setMintAddress] = useState("");
  const [flywheelMode, setFlywheelMode] = useState<FlywheelMode>("balanced");
  const [frequency, setFrequency] = useState("5m");
  const [buyPressure, setBuyPressure] = useState([50]);
  const [burnIntensity, setBurnIntensity] = useState([30]);
  const [autoApply, setAutoApply] = useState(true);
  const [publicLogs, setPublicLogs] = useState(true);
  const [actionFilter, setActionFilter] = useState<ActionFilter>("all");
  const [simulateOpen, setSimulateOpen] = useState(false);
  const [checkerAddress, setCheckerAddress] = useState("");

  const filteredTokens = mockTokens.filter(
    (token) =>
      token.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      token.symbol.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredLogs = mockActivityLogs.filter(
    (log) => actionFilter === "all" || log.action === actionFilter
  );

  const formatTime = (date: Date) => {
    const mins = Math.floor((Date.now() - date.getTime()) / 60000);
    if (mins < 1) return "Just now";
    if (mins < 60) return `${mins}m ago`;
    return `${Math.floor(mins / 60)}h ago`;
  };

  const getActionColor = (action: ActivityLog["action"]) => {
    switch (action) {
      case "capture":
        return "text-primary";
      case "apply":
        return "text-secondary";
      case "burn":
        return "text-accent";
      case "lp":
        return "text-cyan-400";
    }
  };

  return (
    <div className="page-enter container mx-auto px-6 py-8">
      <div className="grid lg:grid-cols-[280px_1fr_320px] gap-6">
        {/* LEFT COLUMN */}
        <div className="space-y-6">
          {/* Wallet Card */}
          <GlassCard className="p-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center">
                <Wallet className="w-5 h-5 text-secondary" />
              </div>
              <div>
                <h3 className="font-semibold">Wallet</h3>
                <p className="text-xs text-muted-foreground">
                  {walletConnected ? "Connected" : "Not connected"}
                </p>
              </div>
            </div>
            <Button
              onClick={() => setWalletConnected(!walletConnected)}
              variant={walletConnected ? "outline" : "default"}
              className={cn(
                "w-full transition-all duration-300",
                !walletConnected && "bg-secondary hover:bg-secondary/90 hover:shadow-[0_0_20px_-5px_rgba(124,92,255,0.4)]"
              )}
            >
              {walletConnected ? "Disconnect" : "Select Wallet"}
            </Button>
          </GlassCard>

          {/* Your Tokens */}
          <GlassCard className="p-5">
            <h3 className="font-semibold mb-4">Your Tokens</h3>
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search tokens..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 bg-muted/50 border-border/50"
              />
            </div>
            <div className="space-y-2 max-h-[300px] overflow-y-auto">
              {walletConnected ? (
                filteredTokens.map((token) => (
                  <button
                    key={token.id}
                    onClick={() => setSelectedToken(token)}
                    className={cn(
                      "w-full p-3 rounded-lg text-left transition-all border",
                      selectedToken?.id === token.id
                        ? "bg-primary/10 border-primary/30"
                        : "hover:bg-muted/50 border-transparent"
                    )}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium">{token.symbol}</span>
                      <span
                        className={cn(
                          "text-xs px-2 py-0.5 rounded-full",
                          token.status === "graduated"
                            ? "bg-primary/10 text-primary"
                            : "bg-secondary/10 text-secondary"
                        )}
                      >
                        {token.status}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground truncate">
                      {token.mint.slice(0, 8)}...{token.mint.slice(-4)}
                    </p>
                  </button>
                ))
              ) : (
                <div className="w-full p-6 rounded-lg text-center border border-dashed border-white/10">
                  <Wallet className="w-8 h-8 text-muted-foreground/50 mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground mb-1">Connect Wallet</p>
                  <p className="text-xs text-muted-foreground/70">Connect your wallet to view tokens</p>
                </div>
              )}
            </div>
          </GlassCard>

          {/* Import Token */}
          <GlassCard className="p-5">
            <div className="flex items-center gap-2 mb-4">
              <Import className="w-4 h-4 text-muted-foreground" />
              <h3 className="font-semibold">Import Token</h3>
            </div>
            <Input
              placeholder="Mint address..."
              value={mintAddress}
              onChange={(e) => setMintAddress(e.target.value)}
              className="mb-3 bg-muted/50 border-border/50 font-mono text-xs"
            />
            <Button className="w-full" variant="outline" disabled={!mintAddress}>
              Import & Configure
            </Button>
            <div className="mt-4 space-y-2 text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-muted flex items-center justify-center text-[10px]">1</span>
                Import
              </div>
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-muted flex items-center justify-center text-[10px]">2</span>
                Configure
              </div>
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-muted flex items-center justify-center text-[10px]">3</span>
                Activate
              </div>
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-muted flex items-center justify-center text-[10px]">4</span>
                Monitor
              </div>
            </div>
          </GlassCard>
        </div>

        {/* MIDDLE COLUMN - Token Console */}
        <div className="space-y-6">
          {/* Selected Token Overview */}
          {selectedToken && (
            <GlassCard className="p-6" glow>
              <div className="flex items-start justify-between mb-6">
                <div>
                  {walletConnected ? (
                    <>
                      <h2 className="text-2xl font-bold">{selectedToken.name}</h2>
                      <p className="text-muted-foreground">{selectedToken.symbol}</p>
                    </>
                  ) : (
                    <>
                      <h2 className="text-2xl font-bold text-muted-foreground">Connect Wallet</h2>
                      <p className="text-muted-foreground/70 text-sm">Connect your wallet to view token details</p>
                    </>
                  )}
                </div>
                {walletConnected && (
                  <span
                    className={cn(
                      "px-3 py-1 rounded-full text-sm font-medium",
                      selectedToken.status === "graduated"
                        ? "bg-primary/10 text-primary"
                        : "bg-secondary/10 text-secondary"
                    )}
                  >
                    {selectedToken.status === "graduated" ? "Graduated" : "Bonding"}
                  </span>
                )}
              </div>

              <div className="grid grid-cols-3 gap-6 mb-6">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Price</p>
                  <p className="text-xl font-semibold">
                    {walletConnected ? `$${selectedToken.price.toFixed(4)}` : "$0.0000"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Liquidity</p>
                  <p className="text-xl font-semibold">
                    {walletConnected ? `$${selectedToken.liquidity.toLocaleString()}` : "$0"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">24h Change</p>
                  <p className="text-xl font-semibold text-muted-foreground">
                    {walletConnected ? (
                      <span className={selectedToken.change24h > 0 ? "text-primary" : "text-destructive"}>
                        {selectedToken.change24h > 0 ? "+" : ""}
                        {selectedToken.change24h}%
                      </span>
                    ) : (
                      "0%"
                    )}
                  </p>
                </div>
              </div>

              {/* Mini sparkline placeholder */}
              <div className="h-16 rounded-lg bg-muted/30 flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-muted-foreground/50" />
                <span className="ml-2 text-sm text-muted-foreground/50">Price Chart</span>
              </div>
            </GlassCard>
          )}

          {/* Flywheel Settings */}
          <GlassCard className="p-6">
            <h3 className="text-lg font-semibold mb-6">Flywheel Settings</h3>

            {/* Mode Selector */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <Label>Mode</Label>
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="w-3.5 h-3.5 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="max-w-xs">Choose how the flywheel distributes captured value</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {(["balanced", "buyback", "liquidity", "burn"] as FlywheelMode[]).map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setFlywheelMode(mode)}
                    className={cn(
                      "py-2 px-3 rounded-lg text-sm font-medium transition-all capitalize border",
                      flywheelMode === mode
                        ? "bg-primary text-primary-foreground border-primary/30"
                        : "bg-muted/30 text-muted-foreground hover:bg-muted/50 border-transparent"
                    )}
                  >
                    {mode}
                  </button>
                ))}
              </div>
            </div>

            {/* Frequency */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <Label>Cycle Frequency</Label>
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="w-3.5 h-3.5 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="max-w-xs">How often the flywheel processes and applies momentum</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <Select value={frequency} onValueChange={setFrequency}>
                <SelectTrigger className="bg-muted/50 border-border/50">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1m">Every 1 minute</SelectItem>
                  <SelectItem value="5m">Every 5 minutes</SelectItem>
                  <SelectItem value="15m">Every 15 minutes</SelectItem>
                  <SelectItem value="1h">Every 1 hour</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Sliders */}
            <div className="space-y-6 mb-6">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-primary" />
                    <Label>Buy Pressure vs LP</Label>
                  </div>
                  <span className="text-sm text-muted-foreground">{buyPressure[0]}%</span>
                </div>
                <Slider
                  value={buyPressure}
                  onValueChange={setBuyPressure}
                  max={100}
                  step={5}
                  className="[&_[role=slider]]:bg-primary"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>More LP</span>
                  <span>More Buy</span>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Flame className="w-4 h-4 text-accent" />
                    <Label>Burn Intensity</Label>
                  </div>
                  <span className="text-sm text-muted-foreground">{burnIntensity[0]}%</span>
                </div>
                <Slider
                  value={burnIntensity}
                  onValueChange={setBurnIntensity}
                  max={100}
                  step={5}
                  className="[&_[role=slider]]:bg-accent"
                />
              </div>
            </div>

            {/* Toggles */}
            <div className="space-y-4 mb-6 pb-6 border-b border-border/50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-secondary" />
                  <Label>Auto-apply momentum</Label>
                </div>
                <Switch checked={autoApply} onCheckedChange={setAutoApply} />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-muted-foreground" />
                  <Label>Public logs</Label>
                </div>
                <Switch checked={publicLogs} onCheckedChange={setPublicLogs} />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button 
                className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground transition-all duration-300 shadow-[0_0_20px_-5px_rgba(255,122,24,0.4)] hover:shadow-[0_0_30px_-5px_rgba(255,122,24,0.6)]"
              >
                Activate Flywheel
              </Button>
              <Button
                variant="outline"
                className="flex-1 border-2 hover:shadow-[0_0_20px_-5px_rgba(77,231,255,0.3)] transition-all duration-300 bg-transparent"
                style={{
                  borderColor: "rgba(77, 231, 255, 0.5)",
                }}
                onClick={() => setSimulateOpen(true)}
              >
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Simulate
                </span>
              </Button>
            </div>
          </GlassCard>

          {/* Wallet & Rewards Checker */}
          <GlassCard className="p-6">
            <h3 className="text-lg font-semibold mb-4">Wallet & Rewards Checker</h3>
            <div className="flex gap-3 mb-4">
              <Input
                placeholder="Enter wallet address..."
                value={checkerAddress}
                onChange={(e) => setCheckerAddress(e.target.value)}
                className="bg-muted/30 border-white/10 font-mono text-xs"
              />
              <Button 
                variant="outline" 
                disabled={!checkerAddress}
                className="border-white/10 hover:border-white/20"
              >
                Check
              </Button>
            </div>
            <div className="grid grid-cols-3 gap-4 p-4 rounded-lg bg-muted/30">
              <div className="text-center">
                <p className="text-xs text-muted-foreground mb-1">SOL Balance</p>
                <p className="font-semibold">--</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-muted-foreground mb-1">Fee Estimate</p>
                <p className="font-semibold">--</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-muted-foreground mb-1">Last Claim</p>
                <p className="font-semibold">--</p>
              </div>
            </div>
          </GlassCard>
        </div>

        {/* RIGHT COLUMN */}
        <div className="space-y-6">
          {/* Activity Logs */}
          <GlassCard className="p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Activity Logs</h3>
            </div>
            {walletConnected ? (
              <>
                <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
                  {(["all", "capture", "apply", "burn", "lp"] as ActionFilter[]).map((filter) => (
                    <button
                      key={filter}
                      onClick={() => setActionFilter(filter)}
                      className={cn(
                        "px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-all capitalize border",
                        actionFilter === filter
                          ? "bg-primary/10 text-primary border-primary/30"
                          : "bg-muted/30 text-muted-foreground hover:bg-muted/50 border-transparent"
                      )}
                    >
                      {filter}
                    </button>
                  ))}
                </div>
                <div className="space-y-2 max-h-[400px] overflow-y-auto">
                  {filteredLogs.map((log) => (
                    <div
                      key={log.id}
                      className="p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className={cn("text-sm font-medium capitalize", getActionColor(log.action))}>
                          {log.action}
                        </span>
                        <span className="text-xs text-muted-foreground">{formatTime(log.timestamp)}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">{log.amount} SOL</span>
                        <a
                          href="#"
                          className="text-xs text-muted-foreground hover:text-primary flex items-center gap-1"
                        >
                          {log.txHash}
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="py-12 text-center border border-dashed border-white/10 rounded-lg">
                <Activity className="w-10 h-10 text-muted-foreground/50 mx-auto mb-3" />
                <p className="text-sm text-muted-foreground mb-1">Connect Wallet</p>
                <p className="text-xs text-muted-foreground/70">Connect your wallet to view activity logs</p>
              </div>
            )}
          </GlassCard>

          {/* System Status */}
          <GlassCard className="p-5">
            <h3 className="font-semibold mb-4">System Status</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  <span className="text-sm">Engine</span>
                </div>
                <span className="text-sm font-medium text-primary">Active</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">Last cycle</span>
                </div>
                <span className="text-sm text-muted-foreground">2 min ago</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ArrowRight className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">Next cycle</span>
                </div>
                <span className="text-sm text-muted-foreground">3:24</span>
              </div>
            </div>
          </GlassCard>

          {/* Risk Alerts */}
          <GlassCard className="p-5">
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="w-4 h-4 text-accent" />
              <h3 className="font-semibold">Risk Checks</h3>
            </div>
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 rounded-lg bg-accent/5 border border-accent/20">
                <AlertTriangle className="w-4 h-4 text-accent mt-0.5" />
                <div>
                  <p className="text-sm font-medium">LP below threshold</p>
                  <p className="text-xs text-muted-foreground">Consider increasing liquidity allocation</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
                <CheckCircle2 className="w-4 h-4 text-primary mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Volatility normal</p>
                  <p className="text-xs text-muted-foreground">Market conditions stable</p>
                </div>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>

      {/* Simulate Modal */}
      <Dialog open={simulateOpen} onOpenChange={setSimulateOpen}>
        <DialogContent className="glass-card border-border/50">
          <DialogHeader>
            <DialogTitle>Flywheel Simulation</DialogTitle>
            <DialogDescription>
              Preview how your current settings would perform over 24 hours
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-muted/30">
                <p className="text-sm text-muted-foreground mb-1">Est. Buy Pressure</p>
                <p className="text-xl font-semibold text-primary">+$12,450</p>
              </div>
              <div className="p-4 rounded-lg bg-muted/30">
                <p className="text-sm text-muted-foreground mb-1">Est. LP Added</p>
                <p className="text-xl font-semibold text-secondary">+$8,320</p>
              </div>
              <div className="p-4 rounded-lg bg-muted/30">
                <p className="text-sm text-muted-foreground mb-1">Est. Tokens Burned</p>
                <p className="text-xl font-semibold text-accent">245,000</p>
              </div>
              <div className="p-4 rounded-lg bg-muted/30">
                <p className="text-sm text-muted-foreground mb-1">Cycles (24h)</p>
                <p className="text-xl font-semibold">288</p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground text-center">
              * Estimates based on current market conditions and settings
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
