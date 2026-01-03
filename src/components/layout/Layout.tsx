import { ReactNode, useState } from "react";
import { useLocation } from "react-router-dom";
import { Navigation } from "./Navigation";
import { Footer } from "./Footer";
import { BackgroundSystem } from "@/components/ui/BackgroundSystem";
import { WalletConnectModal } from "@/components/ui/WalletConnectModal";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletModalOpen, setWalletModalOpen] = useState(false);
  const location = useLocation();

  const handleConnectWallet = () => {
    if (walletConnected) {
      setWalletConnected(false);
    } else {
      setWalletModalOpen(true);
    }
  };

  const handleSelectWallet = (walletName: string) => {
    // In a real app, this would connect to the actual wallet
    console.log(`Connecting to ${walletName}...`);
    setWalletConnected(true);
  };

  return (
    <BackgroundSystem>
      <div className="relative z-10 flex flex-col min-h-screen">
        <Navigation
          walletConnected={walletConnected}
          onConnectWallet={handleConnectWallet}
        />
        <main className="flex-1">
          {location.pathname === "/" ? children : <div className="pt-20">{children}</div>}
        </main>
        <Footer />
        <WalletConnectModal
          open={walletModalOpen}
          onOpenChange={setWalletModalOpen}
          onSelectWallet={handleSelectWallet}
        />
      </div>
    </BackgroundSystem>
  );
}
