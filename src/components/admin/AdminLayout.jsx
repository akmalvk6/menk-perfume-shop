import { Boxes, ClipboardList, LayoutDashboard, LogOut } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";

const links = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { to: "/admin/products", label: "Products", icon: Boxes },
  { to: "/admin/orders", label: "Orders", icon: ClipboardList },
];

export default function AdminLayout({ children }) {
  const navigate = useNavigate();

  function logout() {
    sessionStorage.removeItem("menk-admin-auth");
    navigate("/admin/login", { replace: true });
  }

  return (
    <div className="min-h-screen bg-stone-100">
      <aside className="fixed inset-x-0 top-0 z-30 border-b border-stone-200 bg-white md:bottom-0 md:right-auto md:w-64 md:border-b-0 md:border-r">
        <div className="flex h-16 items-center justify-between px-5 md:h-auto md:flex-col md:items-start md:gap-8 md:py-6">
          <div>
            <p className="font-display text-2xl font-bold text-rosewood">Menk.in</p>
            <p className="hidden text-xs font-semibold uppercase tracking-wide text-stone-500 md:block">
              Admin
            </p>
          </div>
          <div className="flex items-center gap-2 md:w-full md:flex-col">
            {links.map((link) => {
              const Icon = link.icon;
              return (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === "/admin"}
                  className={({ isActive }) =>
                    `btn w-full justify-start px-3 ${isActive ? "bg-rosewood text-white" : "bg-white text-stone-700 hover:bg-stone-100"}`
                  }
                >
                  <Icon size={17} />
                  <span className="hidden md:inline">{link.label}</span>
                </NavLink>
              );
            })}
            <button type="button" className="btn-secondary w-full justify-start px-3" onClick={logout}>
              <LogOut size={17} />
              <span className="hidden md:inline">Logout</span>
            </button>
          </div>
        </div>
      </aside>
      <div className="px-4 pb-10 pt-24 md:ml-64 md:px-8 md:pt-8">
        <div className="mx-auto max-w-6xl">{children}</div>
      </div>
    </div>
  );
}
