import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Sparkles,
  HandHeart,
  Users,
  Stethoscope,
  Baby,
  LifeBuoy,
} from "lucide-react";
import { DashboardShell } from "@/components/DashboardShell";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated/dashboard")({
  head: () => ({
    meta: [
      { title: "Your dashboard — Nurturely" },
      { name: "description", content: "Your Nurturely family dashboard." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: DashboardPage,
});

const cards = [
  {
    icon: Sparkles,
    title: "AI Support",
    description: "Ask a parenting question and get gentle, practical guidance.",
  },
  {
    icon: HandHeart,
    title: "Common Ground",
    description: "Understand your child's world with age-aware insights.",
  },
  {
    icon: Users,
    title: "Parent Community",
    description: "Share, ask, and connect with parents who get it.",
  },
  {
    icon: Stethoscope,
    title: "Therapist Support",
    description: "Browse vetted family therapists and book appointments.",
  },
  {
    icon: Baby,
    title: "Childcare",
    description: "Find trusted childcare providers and manage bookings.",
  },
  {
    icon: LifeBuoy,
    title: "SOS Childcare",
    description: "Set up your backup care chain for last-minute emergencies.",
  },
] as const;

function DashboardPage() {
  const [firstName, setFirstName] = useState<string>("there");

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user || cancelled) return;
      const { data: profileRow } = await supabase
        .from("profiles")
        .select("full_name")
        .eq("id", user.id)
        .maybeSingle();
      if (cancelled) return;
      const name = profileRow?.full_name?.trim().split(" ")[0];
      if (name) setFirstName(name);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <DashboardShell>
      <div className="mx-auto max-w-5xl">
        <header className="mb-8">
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground">
            Hello, {firstName}
          </h1>
          <p className="mt-2 text-muted-foreground">
            Welcome to your village. What does your family need today?
          </p>
        </header>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((card) => (
            <div
              key={card.title}
              className="rounded-2xl border border-border/70 bg-card p-6 shadow-sm"
            >
              <span className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-accent/60 text-primary">
                <card.icon className="h-5 w-5" />
              </span>
              <h2 className="flex items-center gap-2 text-lg font-bold text-foreground">
                {card.title}
                <span className="rounded-full bg-secondary px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-muted-foreground">
                  Next stage
                </span>
              </h2>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                {card.description}
              </p>
            </div>
          ))}
        </div>

        <section className="mt-10 rounded-2xl border border-border/70 bg-secondary/60 p-6">
          <h2 className="text-lg font-bold text-foreground">Getting started</h2>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>• Add your children's profiles so guidance fits their ages (coming in the next update).</li>
            <li>• Try AI Support with a question that's on your mind.</li>
            <li>• Say hello in the Parent Community — someone there understands.</li>
          </ul>
        </section>
      </div>
    </DashboardShell>
  );
}
