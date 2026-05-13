import { Link, useLocation } from "react-router-dom";
import { Zap } from "lucide-react";

export default function NavBar() {
  const location = useLocation();

  const links = [
    { label: "Home", to: "/" },
    { label: "IC Quiz", to: "/quiz?type=ic" },
    { label: "Manager Quiz", to: "/quiz?type=manager" },
    { label: "Team Dashboard", to: "/manager-dashboard" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-border">
      <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-space font-bold text-foreground hover:text-primary transition-colors">
          <Zap className="w-5 h-5 text-primary" />
          AI Skills Ladder
        </Link>
        <div className="flex items-center gap-1">
          {links.map(link => {
            const isActive = location.pathname + location.search === link.to || (link.to === "/" && location.pathname === "/");
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? "bg-primary/15 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}