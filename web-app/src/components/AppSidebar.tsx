import { NavLink } from "react-router-dom";
import { LayoutDashboard, ClipboardList, History, UserCog } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { to: "/", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/appointment", icon: ClipboardList, label: "Appointment" },
  { to: "/history", icon: History, label: "Patient History" },
  { to: "/profile", icon: UserCog, label: "Profile" },
];

const AppSidebar = () => {
  return (
    <aside className="hidden md:flex flex-col w-64 min-h-screen bg-sidebar-background text-sidebar-foreground border-r border-sidebar-border">
      <div className="p-6 border-b border-sidebar-border">
        <h1 className="text-xl font-bold text-sidebar-foreground tracking-tight">
          <span className="text-sidebar-primary">Medi</span>Portal
        </h1>
        <p className="text-xs text-sidebar-foreground/60 mt-1">Doctor Dashboard</p>
      </div>

      <nav className="flex-1 py-4 px-3 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === "/"}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                isActive
                  ? "bg-sidebar-accent text-sidebar-primary"
                  : "text-sidebar-foreground hover:bg-sidebar-accent/50"
              )
            }
          >
            <item.icon className="h-5 w-5" />
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 mx-3 mb-4 rounded-lg bg-sidebar-accent/50">
        <p className="text-xs text-sidebar-foreground/60">Logged in as</p>
        <p className="text-sm font-medium text-sidebar-foreground mt-0.5">Dr. Sarah Ahmed</p>
        <p className="text-xs text-sidebar-foreground/50">City General Hospital</p>
      </div>
    </aside>
  );
};

export default AppSidebar;
