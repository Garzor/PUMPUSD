import { Link } from "react-router-dom";
import { Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-background/50 backdrop-blur-sm">
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Links */}
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <Link to="#" className="hover:text-foreground transition-colors">
              Docs
            </Link>
            <Link to="#" className="hover:text-foreground transition-colors">
              Terms
            </Link>
            <Link to="#" className="hover:text-foreground transition-colors">
              Privacy
            </Link>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              <Twitter className="w-4 h-4" />
            </a>
          </div>

          {/* Disclaimer */}
          <p className="text-xs text-muted-foreground/70 text-center md:text-right max-w-md">
            1% fee · 50% to creators · immutable
          </p>
        </div>
      </div>
    </footer>
  );
}
