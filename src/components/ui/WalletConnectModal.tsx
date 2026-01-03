import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface WalletOption {
  name: string;
  icon: React.ReactNode;
  onClick: () => void;
}

interface WalletConnectModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelectWallet: (walletName: string) => void;
}

// Phantom Wallet Icon
const PhantomIcon = () => (
  <div className="w-12 h-12 rounded-xl overflow-hidden flex items-center justify-center shadow-lg">
    <img
      src="/phantom.png"
      alt="Phantom"
      className="w-full h-full object-contain"
    />
  </div>
);

// Solflare Wallet Icon
const SolflareIcon = () => (
  <div className="w-12 h-12 rounded-xl overflow-hidden flex items-center justify-center shadow-lg">
    <img
      src="/solflare.jpeg"
      alt="Solflare"
      className="w-full h-full object-contain"
    />
  </div>
);

export function WalletConnectModal({
  open,
  onOpenChange,
  onSelectWallet,
}: WalletConnectModalProps) {
  const wallets: WalletOption[] = [
    {
      name: "Phantom",
      icon: <PhantomIcon />,
      onClick: () => {
        onSelectWallet("Phantom");
        onOpenChange(false);
      },
    },
    {
      name: "Solflare",
      icon: <SolflareIcon />,
      onClick: () => {
        onSelectWallet("Solflare");
        onOpenChange(false);
      },
    },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="glass-card border-white/10 p-0 max-w-md overflow-hidden bg-background/95 backdrop-blur-xl">
        <div className="p-8 pb-6">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center mb-2 text-foreground">
              Connect a wallet on
            </DialogTitle>
            <DialogDescription className="text-center text-muted-foreground text-lg font-normal">
              Solana to continue
            </DialogDescription>
          </DialogHeader>
        </div>

        <div className="px-6 pb-6 space-y-3">
          {wallets.map((wallet) => (
            <button
              key={wallet.name}
              onClick={wallet.onClick}
              className={cn(
                "w-full flex items-center gap-4 p-5 rounded-xl border transition-all duration-300",
                "bg-white/5 hover:bg-white/10 border-white/10 hover:border-primary/40",
                "hover:shadow-[0_0_25px_-5px_rgba(77,231,255,0.4)] hover:scale-[1.02]",
                "group cursor-pointer"
              )}
            >
              <div className="flex-shrink-0 transition-transform group-hover:scale-110">
                {wallet.icon}
              </div>
              <span className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors flex-1 text-left">
                {wallet.name}
              </span>
              <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.5 15L12.5 10L7.5 5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-primary"
                  />
                </svg>
              </div>
            </button>
          ))}
        </div>

        <div className="px-6 pb-6">
          <p className="text-xs text-center text-muted-foreground/70">
            By connecting a wallet, you agree to Echo's Terms of Service and Privacy Policy
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}

