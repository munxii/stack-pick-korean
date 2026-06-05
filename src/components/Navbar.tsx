import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
  { path: "/", label: "홈" },
  { path: "/category/ai", label: "탐색" },
  { path: "/compare", label: "비교" },
  { path: "/stack-builder", label: "스택 빌더" },
];

export default function Navbar() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b bg-card/80 backdrop-blur-lg">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-bold text-xl">
          <span className="text-primary">⚡</span>
          <span>StackPick</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                location.pathname === item.path
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-2">
          <Link to="/auth">
            <Button variant="outline" size="sm">로그인</Button>
          </Link>
          <Link to="/auth?mode=signup">
            <Button size="sm">회원가입</Button>
          </Link>
        </div>

        {/* Mobile menu button */}
        <button className="md:hidden p-2" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <div className="md:hidden border-t bg-card p-4 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setMobileOpen(false)}
              className="block px-4 py-2 rounded-lg text-sm font-medium hover:bg-secondary"
            >
              {item.label}
            </Link>
          ))}
          <div className="flex gap-2 pt-2">
            <Link to="/auth" className="flex-1" onClick={() => setMobileOpen(false)}>
              <Button variant="outline" size="sm" className="w-full">로그인</Button>
            </Link>
            <Link to="/auth?mode=signup" className="flex-1" onClick={() => setMobileOpen(false)}>
              <Button size="sm" className="w-full">회원가입</Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
