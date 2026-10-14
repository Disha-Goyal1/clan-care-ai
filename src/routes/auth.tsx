import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Sprout, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Sign in or create your account — Nurturely" },
      {
        name: "description",
        content: "Create your Nurturely account or sign in to your family dashboard.",
      },
      { property: "og:title", content: "Join Nurturely" },
      {
        property: "og:description",
        content: "Create your Nurturely account or sign in to your family dashboard.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AuthPage,
});

type Role = "parent" | "therapist" | "childcare_provider";

const roleOptions: { value: Role; label: string; hint: string }[] = [
  { value: "parent", label: "Parent", hint: "I'm here for my family" },
  { value: "therapist", label: "Therapist", hint: "I support families professionally" },
  { value: "childcare_provider", label: "Childcare Provider", hint: "I offer childcare services" },
];

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signup" | "login">("signup");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<Role>("parent");
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setError(null);
    setNotice(null);

    const trimmedEmail = email.trim();
    if (mode === "signup" && !fullName.trim()) {
      setError("Please enter your full name.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    setSubmitting(true);
    try {
      if (mode === "signup") {
        const { data, error: signUpError } = await supabase.auth.signUp({
          email: trimmedEmail,
          password,
          options: {
            data: { full_name: fullName.trim(), role },
            emailRedirectTo: window.location.origin,
          },
        });
        if (signUpError) {
          setError(
            signUpError.message.toLowerCase().includes("already")
              ? "An account with this email already exists. Try signing in instead."
              : signUpError.message,
          );
          return;
        }
        if (data.session) {
          toast.success("Welcome to Nurturely!");
          navigate({ to: "/dashboard" });
          return;
        }
        setNotice(
          "Almost there! We've sent a confirmation link to your email. Confirm it, then sign in.",
        );
        setMode("login");
      } else {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email: trimmedEmail,
          password,
        });
        if (signInError) {
          setError(
            signInError.message.toLowerCase().includes("invalid")
              ? "Incorrect email or password. Please try again."
              : signInError.message,
          );
          return;
        }
        toast.success("Welcome back!");
        navigate({ to: "/dashboard" });
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="border-b border-border/60">
        <div className="mx-auto flex h-16 max-w-6xl items-center px-4 sm:px-6">
          <Link to="/" className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <Sprout className="h-5 w-5" />
            </span>
            <span className="text-xl font-extrabold tracking-tight text-foreground">Nurturely</span>
          </Link>
        </div>
      </header>

      <main className="flex flex-1 items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="rounded-2xl border border-border/70 bg-card p-8 shadow-sm">
            <h1 className="text-2xl font-extrabold tracking-tight text-foreground">
              {mode === "signup" ? "Create your account" : "Welcome back"}
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {mode === "signup"
                ? "Your village starts here. It takes less than a minute."
                : "Sign in to continue to your family dashboard."}
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4" noValidate>
              {mode === "signup" && (
                <div>
                  <label htmlFor="fullName" className="mb-1.5 block text-sm font-semibold text-foreground">
                    Full name
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    autoComplete="name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full rounded-lg border border-input bg-background px-3.5 py-2.5 text-sm text-foreground outline-none transition-shadow focus:ring-2 focus:ring-ring"
                    placeholder="Jordan Rivera"
                  />
                </div>
              )}

              <div>
                <label htmlFor="email" className="mb-1.5 block text-sm font-semibold text-foreground">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-lg border border-input bg-background px-3.5 py-2.5 text-sm text-foreground outline-none transition-shadow focus:ring-2 focus:ring-ring"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label htmlFor="password" className="mb-1.5 block text-sm font-semibold text-foreground">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  autoComplete={mode === "signup" ? "new-password" : "current-password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-lg border border-input bg-background px-3.5 py-2.5 text-sm text-foreground outline-none transition-shadow focus:ring-2 focus:ring-ring"
                  placeholder="At least 8 characters"
                />
              </div>

              {mode === "signup" && (
                <fieldset>
                  <legend className="mb-1.5 text-sm font-semibold text-foreground">I am a…</legend>
                  <div className="grid gap-2">
                    {roleOptions.map((option) => (
                      <label
                        key={option.value}
                        className={`flex cursor-pointer items-center gap-3 rounded-lg border px-3.5 py-2.5 transition-colors ${
                          role === option.value
                            ? "border-primary bg-accent/40"
                            : "border-input bg-background hover:bg-secondary"
                        }`}
                      >
                        <input
                          type="radio"
                          name="role"
                          value={option.value}
                          checked={role === option.value}
                          onChange={() => setRole(option.value)}
                          className="accent-[#3F6252]"
                        />
                        <span>
                          <span className="block text-sm font-semibold text-foreground">
                            {option.label}
                          </span>
                          <span className="block text-xs text-muted-foreground">{option.hint}</span>
                        </span>
                      </label>
                    ))}
                  </div>
                </fieldset>
              )}

              {error && (
                <p role="alert" className="rounded-lg bg-destructive/10 px-3.5 py-2.5 text-sm font-medium text-destructive">
                  {error}
                </p>
              )}
              {notice && (
                <p role="status" className="rounded-lg bg-accent/40 px-3.5 py-2.5 text-sm font-medium text-foreground">
                  {notice}
                </p>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-bold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 disabled:opacity-60"
              >
                {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
                {mode === "signup" ? "Create account" : "Sign in"}
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-muted-foreground">
              {mode === "signup" ? "Already have an account?" : "New to Nurturely?"}{" "}
              <button
                type="button"
                onClick={() => {
                  setMode(mode === "signup" ? "login" : "signup");
                  setError(null);
                  setNotice(null);
                }}
                className="font-bold text-primary hover:underline"
              >
                {mode === "signup" ? "Sign in" : "Create an account"}
              </button>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
