import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Wallet } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Overview", path: "/" },
  { label: "Create Coin", path: "/dashboard" },
  { label: "Flywheel", path: "/dashboard" },
  { label: "Docs", path: "/learn" },
];

interface NavigationProps {
  walletConnected: boolean;
  onConnectWallet: () => void;
}

export function Navigation({ walletConnected, onConnectWallet }: NavigationProps) {
  const location = useLocation();
  const isOverview = location.pathname === "/";
  const showHeaderBar = !isOverview;

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        showHeaderBar
          ? "bg-background/80 backdrop-blur-xl border-b border-white/10"
          : "bg-transparent"
      )}
    >
      <nav className={cn(
        "container mx-auto px-6 flex items-center justify-between transition-all",
        showHeaderBar ? "py-4" : "py-6"
      )}>
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-12 h-12 rounded-lg overflow-hidden flex items-center justify-center">
            <img
              src="/ChatGPT Image Jan 3, 2026 at 02_12_07 PM.png"
              alt="USDPUMP"
              className="w-full h-full object-contain"
            />
          </div>
          <span className={cn(
            "font-semibold text-lg tracking-tight group-hover:text-primary transition-colors",
            isOverview ? "text-foreground" : "text-foreground"
          )}>
            USDPUMP
          </span>
        </Link>

        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "text-sm font-medium transition-colors relative",
                isOverview
                  ? "text-foreground/90 hover:text-foreground"
                  : location.pathname === item.path
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {item.label}
              {location.pathname === item.path && (
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full" />
              )}
            </Link>
          ))}
        </div>

        {/* Wallet Button */}
        <Button
          onClick={onConnectWallet}
          variant={walletConnected ? "outline" : "default"}
          className={cn(
            "gap-2 font-medium transition-all",
            !walletConnected && "bg-secondary hover:bg-secondary/90 hover:shadow-[0_0_20px_-5px_rgba(124,92,255,0.4)] text-secondary-foreground"
          )}
        >
          <Wallet className="w-4 h-4" />
          {walletConnected ? "Connected" : "Select Wallet"}
        </Button>
      </nav>
    </header>
  );
}
