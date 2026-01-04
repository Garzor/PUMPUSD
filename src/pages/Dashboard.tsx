import { useState } from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
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
import {
  Wallet,
  ArrowRight,
  TrendingUp,
  Zap,
  Activity,
  Info,
  Flame,
  Upload,
  ChevronUp,
  FileText,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";

type FlywheelMode = "balanced" | "buyback" | "liquidity" | "burn";

export function Dashboard() {
  const [walletConnected, setWalletConnected] = useState(false);
  const [tokenName, setTokenName] = useState("");
  const [ticker, setTicker] = useState("");
  const [description, setDescription] = useState("");
  const [tokenImage, setTokenImage] = useState<File | null>(null);
  const [socialLinksOpen, setSocialLinksOpen] = useState(true);
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [twitterUrl, setTwitterUrl] = useState("");
  const [telegramUrl, setTelegramUrl] = useState("");
  const [discordUrl, setDiscordUrl] = useState("");
  const [flywheelMode, setFlywheelMode] = useState<FlywheelMode>("balanced");
  const [frequency, setFrequency] = useState("5m");
  const [buyPressure, setBuyPressure] = useState([50]);
  const [burnIntensity, setBurnIntensity] = useState([30]);
  const [autoApply, setAutoApply] = useState(true);
  const [publicLogs, setPublicLogs] = useState(true);
  const [simulateOpen, setSimulateOpen] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setTokenImage(file);
    }
  };

  const descriptionLength = description.length;

  return (
    <div className="page-enter container mx-auto px-6 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Two Column Layout - Token Creation Form */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* LEFT COLUMN - Token Details */}
          <div className="space-y-6">
            {/* Token Details */}
            <GlassCard className="p-6">
              <h3 className="text-lg font-semibold mb-6">Token Details</h3>
              
              {/* Token Image Upload */}
              <div className="mb-6">
                <Label className="mb-2 block">Token Image</Label>
                <label className="flex flex-col items-center justify-center w-32 h-32 border-2 border-dashed border-white/10 rounded-lg cursor-pointer hover:border-white/20 transition-colors bg-muted/30">
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                  {tokenImage ? (
                    <div className="w-full h-full flex items-center justify-center">
                      <img
                        src={URL.createObjectURL(tokenImage)}
                        alt="Token preview"
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                  ) : (
                    <>
                      <Upload className="w-6 h-6 text-muted-foreground mb-2" />
                      <span className="text-xs text-muted-foreground">Upload</span>
                    </>
                  )}
                </label>
              </div>

              {/* Name Field */}
              <div className="mb-4">
                <Label htmlFor="token-name">Name</Label>
                <Input
                  id="token-name"
                  placeholder="e.g. Creator Token"
                  value={tokenName}
                  onChange={(e) => setTokenName(e.target.value)}
                  className="mt-2 bg-muted/50 border-border/50"
                />
              </div>

              {/* Ticker Field */}
              <div className="mb-4">
                <Label htmlFor="ticker">Ticker</Label>
                <Input
                  id="ticker"
                  placeholder="e.g. CREAT"
                  value={ticker}
                  onChange={(e) => setTicker(e.target.value)}
                  className="mt-2 bg-muted/50 border-border/50"
                />
              </div>

              {/* Description Field */}
              <div className="mb-4">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your token..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  maxLength={200}
                  className="mt-2 bg-muted/50 border-border/50 min-h-[100px] resize-none"
                />
                <div className="flex justify-end mt-1">
                  <span className="text-xs text-muted-foreground">
                    {descriptionLength}/200
                  </span>
                </div>
              </div>
            </GlassCard>

            {/* Add Social Links */}
            <GlassCard className="p-6">
              <Collapsible open={socialLinksOpen} onOpenChange={setSocialLinksOpen}>
                <CollapsibleTrigger className="flex items-center justify-between w-full mb-4">
                  <h3 className="text-lg font-semibold">Add social links</h3>
                  <ChevronUp
                    className={cn(
                      "w-4 h-4 text-muted-foreground transition-transform",
                      socialLinksOpen && "rotate-180"
                    )}
                  />
                </CollapsibleTrigger>
                <CollapsibleContent className="space-y-4">
                  <div>
                    <Label htmlFor="website-url">Website URL</Label>
                    <Input
                      id="website-url"
                      placeholder="https://..."
                      value={websiteUrl}
                      onChange={(e) => setWebsiteUrl(e.target.value)}
                      className="mt-2 bg-muted/50 border-border/50"
                    />
                  </div>
                  <div>
                    <Label htmlFor="twitter-url">Twitter/X URL</Label>
                    <Input
                      id="twitter-url"
                      placeholder="https://x.com/..."
                      value={twitterUrl}
                      onChange={(e) => setTwitterUrl(e.target.value)}
                      className="mt-2 bg-muted/50 border-border/50"
                    />
                  </div>
                  <div>
                    <Label htmlFor="telegram-url">Telegram URL</Label>
                    <Input
                      id="telegram-url"
                      placeholder="https://t.me/..."
                      value={telegramUrl}
                      onChange={(e) => setTelegramUrl(e.target.value)}
                      className="mt-2 bg-muted/50 border-border/50"
                    />
                  </div>
                  <div>
                    <Label htmlFor="discord-url">Discord URL</Label>
                    <Input
                      id="discord-url"
                      placeholder="https://discord.gg/..."
                      value={discordUrl}
                      onChange={(e) => setDiscordUrl(e.target.value)}
                      className="mt-2 bg-muted/50 border-border/50"
                    />
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </GlassCard>
          </div>

          {/* RIGHT COLUMN - Launch Summary */}
          <div>
            <GlassCard className="p-6">
              <h3 className="text-lg font-semibold mb-6">Launch Summary</h3>

              {/* Token Preview */}
              <div className="flex items-center gap-4 mb-6 p-4 rounded-lg bg-muted/30">
                <div className="w-12 h-12 rounded-lg bg-background flex items-center justify-center border border-border/50">
                  {tokenImage ? (
                    <img
                      src={URL.createObjectURL(tokenImage)}
                      alt="Token"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  ) : (
                    <div className="w-full h-full bg-muted/50 rounded-lg" />
                  )}
                </div>
                <div>
                  <p className="font-semibold">{tokenName || "Token Name"}</p>
                  <p className="text-sm text-muted-foreground">
                    ${ticker || "TICKER"}
                  </p>
                </div>
              </div>

              {/* Fee Recipient */}
              <div className="mb-4">
                <p className="text-sm text-muted-foreground mb-1">Fee Recipient</p>
                <p className="text-sm">
                  {walletConnected ? "Your connected wallet" : "Not connected"}
                </p>
              </div>

              {/* Fee Split */}
              <div className="mb-6">
                <p className="text-sm text-muted-foreground mb-2">Fee Split</p>
                <div className="flex justify-between text-sm">
                  <span>Recipient</span>
                  <span className="font-medium">100%</span>
                </div>
                <div className="flex justify-between text-sm mt-1">
                  <span>You</span>
                  <span className="font-medium">0%</span>
                </div>
              </div>

              {/* Cost Breakdown */}
              <div className="mb-6 space-y-3 pb-6 border-b border-border/50">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Platform fee</span>
                  <span>0.02 SOL</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">Estimated total</span>
                  <span className="font-semibold text-primary">0.02 SOL</span>
                </div>
              </div>

              {/* Connect Wallet Button */}
              <Button
                onClick={() => setWalletConnected(!walletConnected)}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-6 rounded-lg shadow-[0_0_20px_-5px_rgba(184,246,196,0.4)] hover:shadow-[0_0_30px_-5px_rgba(184,246,196,0.6)] mb-4"
              >
                <Wallet className="w-4 h-4 mr-2" />
                {walletConnected ? "Wallet Connected" : "Connect Wallet"}
              </Button>

              {/* Disclaimer */}
              <p className="text-xs text-muted-foreground text-center mb-4">
                Wallet-signed. Non-custodial. We never access your private keys.
              </p>

              {/* Links */}
              <div className="flex items-center justify-center gap-6 text-sm">
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
                >
                  Need to claim fees?
                  <ArrowRight className="w-3 h-3" />
                </a>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
                >
                  Read Docs
                  <FileText className="w-3 h-3" />
                </a>
              </div>
            </GlassCard>
          </div>
        </div>

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
              className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-300 shadow-[0_0_20px_-5px_rgba(184,246,196,0.4)] hover:shadow-[0_0_30px_-5px_rgba(184,246,196,0.6)] rounded-lg"
            >
              Activate Flywheel
            </Button>
            <Button
              variant="outline"
              className="flex-1 border-2 hover:shadow-[0_0_20px_-5px_rgba(184,246,196,0.3)] transition-all duration-300 bg-transparent rounded-lg"
              style={{
                borderColor: "rgba(255, 255, 255, 0.2)",
              }}
              onClick={() => setSimulateOpen(true)}
            >
              Simulate
            </Button>
          </div>
        </GlassCard>
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
