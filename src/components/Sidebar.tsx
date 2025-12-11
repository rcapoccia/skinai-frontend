import { Home, LayoutDashboard, ClipboardList, FolderOpen, User, HelpCircle, LogOut } from "lucide-react";
import { useLocation } from "wouter";
import { toast } from "sonner";

export default function Sidebar() {
  const [location, setLocation] = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("skinai_user");
    toast.success("Disconnesso con successo");
    setLocation("/");
  };

  const links = [
    { icon: Home, label: "Home", path: "/" },
    { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
    { icon: ClipboardList, label: "Nuova analisi", path: "/questionario" },
    { icon: FolderOpen, label: "Le tue analisi", path: "/analisi" },
    { icon: User, label: "Profilo", path: "/profilo" },
    { icon: HelpCircle, label: "FAQ", path: "/faq" }
  ];

  return (
    <aside className="hidden lg:flex flex-col w-64 bg-sidebar border-r border-sidebar-border h-screen sticky top-0">
      <div className="p-6">
        <img src="/logo.png" alt="SkinAI" className="h-12" />
      </div>

      <nav className="flex-1 px-4 space-y-1">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = location === link.path;
          return (
            <button
              key={link.path}
              onClick={() => setLocation(link.path)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                isActive
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-accent/50"
              }`}
            >
              <Icon className="h-5 w-5" strokeWidth={1.5} />
              <span className="text-sm font-medium">{link.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="p-4">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sidebar-foreground hover:bg-sidebar-accent/50 transition-colors"
        >
          <LogOut className="h-5 w-5" strokeWidth={1.5} />
          <span className="text-sm font-medium">Esci</span>
        </button>
      </div>
    </aside>
  );
}
