import { Home, Info, Mail, Sparkles, LogOut, User } from "lucide-react";
import { useSession } from "../context/SessionContext";

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export function Navbar({ currentPage, onNavigate }: NavbarProps) {
  const { user, logout } = useSession();

  const navItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "about", label: "About Us", icon: Info },
    { id: "contact", label: "Contact Us", icon: Mail },
    { id: "tool", label: "Get Started", icon: Sparkles },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo */}
          <button
            onClick={() => onNavigate("home")}
            className="flex items-center gap-2"
          >
            <Home className="w-8 h-8 text-[var(--color-primary)]" />
            <span
              className="text-2xl"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              DecorVista
            </span>
          </button>

          {/* Nav Items */}
          <div className="hidden md:flex items-center gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className="flex items-center gap-2 px-5 py-2 rounded-lg transition-all"
                  style={{
                    backgroundColor: isActive
                      ? "var(--color-primary)"
                      : "transparent",
                    color: isActive ? "white" : "var(--color-text)",
                  }}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </button>
              );
            })}
          </div>

          {/* User + Logout */}
          {user && (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <User className="w-4 h-4" />
                <span>{user.name}</span>
              </div>

              <button
                onClick={logout}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-red-600 border border-red-500 hover:bg-red-500 hover:text-white transition-all"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
