import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import {
  Sprout,
  LayoutDashboard,
  Sparkles,
  HandHeart,
  Users,
  Stethoscope,
  Baby,
  LifeBuoy,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from "@tanstack/react-query";

const navItems = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { to: "/dashboard/ai-support", label: "AI Support", icon: Sparkles },
  { to: "/dashboard/common-ground", label: "Common Ground", icon: HandHeart },
  { to: "/dashboard/community", label: "Parent Community", icon: Users },
  { to: "/dashboard/therapists", label: "Therapists", icon: Stethoscope },
  { to: "/dashboard/childcare", label: "Childcare", icon: Baby },
  { to: "/dashboard/sos", label: "SOS Childcare", icon: LifeBuoy },
  { to: "/dashboard/settings", label: "Settings", icon: Settings },
] as const;

export interface SessionProfile {
  fullName: string;
  role: string;
  email: string;
}

export function DashboardShell({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profile, setProfile] = useState<SessionProfile | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user || cancelled) return;
      const [{ data: profileRow }, { data: roleRow }] = await Promise.all([
        supabase.from("profiles").select("full_name").eq("id", user.id).maybeSingle(),
        supabase.from("user_roles").select("role").eq("user_id", user.id).maybeSingle(),
      ]);
      if (cancelled) return;
      setProfile({
        fullName: profileRow?.full_name || user.email?.split("@")[0] || "Friend",
        role: roleRow?.role ?? "parent",
        email: user.email ?? "",
      });
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  async function handleSignOut() {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    toast.success("Signed out. See you soon!");
    navigate({ to: "/auth", replace: true });
  }

  const roleLabel =
    profile?.role === "childcare_provider"
      ? "Childcare Provider"
      : profile?.role === "therapist"
        ? "Therapist"
        : "Parent";

  const nav = (
    <nav className="flex flex-1 flex-col gap-1 px-3 py-4">
      {navItems.map((item) => {
        const active = item.exact ? pathname === item.to : pathname.startsWith(item.to);
        return (
          <Link
            key={item.to}
            to={item.to}
            onClick={() => setMobileOpen(false)}
            className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold transition-colors ${
              active
                ? "bg-sidebar-accent text-sidebar-accent-foreground"
                : "text-sidebar-foreground/75 hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground"
            }`}
          >
            <item.icon className="h-4 w-4 shrink-0" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );

  return (
    <div className="flex min-h-screen bg-background">
      {/* Desktop sidebar */}
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col bg-sidebar md:flex">
        <div className="flex h-16 items-center gap-2 border-b border-sidebar-border px-5">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
            <Sprout className="h-4 w-4" />
          </span>
          <span className="text-lg font-extrabold tracking-tight text-sidebar-foreground">
            Nurturely
          </span>
        </div>
        {nav}
        <div className="border-t border-sidebar-border p-3">
          <div className="mb-2 rounded-lg px-3 py-2">
            <p className="truncate text-sm font-bold text-sidebar-foreground">
              {profile?.fullName ?? "…"}
            </p>
            <p className="text-xs text-sidebar-foreground/60">{roleLabel}</p>
          </div>
          <button
            onClick={handleSignOut}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold text-sidebar-foreground/75 transition-colors hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground"
          >
            <LogOut className="h-4 w-4" />
            Sign out
          </button>
        </div>
      </aside>

      {/* Mobile header + drawer */}
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border/60 bg-background/90 px-4 backdrop-blur md:hidden">
          <Link to="/dashboard" className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Sprout className="h-4 w-4" />
            </span>
            <span className="text-lg font-extrabold text-foreground">Nurturely</span>
          </Link>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            className="rounded-lg p-2 text-foreground transition-colors hover:bg-secondary"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </header>

        {mobileOpen && (
          <div className="fixed inset-0 z-40 md:hidden">
            <div
              className="absolute inset-0 bg-foreground/30"
              onClick={() => setMobileOpen(false)}
            />
            <aside className="absolute left-0 top-0 flex h-full w-72 flex-col bg-sidebar shadow-xl">
              <div className="flex h-16 items-center justify-between border-b border-sidebar-border px-5">
                <span className="text-lg font-extrabold text-sidebar-foreground">Nurturely</span>
                <button
                  onClick={() => setMobileOpen(false)}
                  aria-label="Close menu"
                  className="rounded-lg p-1.5 text-sidebar-foreground/75 hover:bg-sidebar-accent/60"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              {nav}
              <div className="border-t border-sidebar-border p-3">
                <button
                  onClick={handleSignOut}
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold text-sidebar-foreground/75 transition-colors hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground"
                >
                  <LogOut className="h-4 w-4" />
                  Sign out
                </button>
              </div>
            </aside>
          </div>
        )}

        <main className="min-w-0 flex-1 px-4 py-8 sm:px-6 lg:px-10">{children}</main>
      </div>
    </div>
  );
}

export function useDashboardProfile() {
  return null;
}
