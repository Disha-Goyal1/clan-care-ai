import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Sparkles,
  Users,
  HeartHandshake,
  Stethoscope,
  Baby,
  ShieldCheck,
  Lock,
  HandHeart,
  ArrowRight,
  Sprout,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Nurturely — An AI Family Ecosystem" },
      {
        name: "description",
        content:
          "Nurturely brings AI parenting support, a warm parent community, trusted therapists, and reliable childcare together in one place. Parenting wasn't meant to be done alone.",
      },
      { property: "og:title", content: "Nurturely — An AI Family Ecosystem" },
      {
        property: "og:description",
        content:
          "AI support, parent community, therapists, and childcare in one calm, trusted place.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LandingPage,
});

const features = [
  {
    icon: Sparkles,
    title: "AI Support",
    description:
      "Gentle, judgement-free answers to your parenting questions — day or night, whenever you need a steady voice.",
  },
  {
    icon: HandHeart,
    title: "Common Ground",
    description:
      "Understand your child better with age-aware guidance and insights that help you meet them where they are.",
  },
  {
    icon: Users,
    title: "Parent Community",
    description:
      "Connect with parents who truly get it. Share wins, ask questions, and find your people in moderated groups.",
  },
  {
    icon: Stethoscope,
    title: "Therapist Support",
    description:
      "Browse vetted family therapists, read their approaches, and book appointments without the phone tag.",
  },
  {
    icon: Baby,
    title: "Childcare",
    description:
      "Find trusted childcare providers near you, book care, and set up a backup chain for the days that go sideways.",
  },
];

const steps = [
  {
    step: "1",
    title: "Create your account",
    description: "Tell us a little about your family and what kind of support you're looking for.",
  },
  {
    step: "2",
    title: "Add your children",
    description: "Build gentle profiles so guidance, insights, and care options fit each child.",
  },
  {
    step: "3",
    title: "Lean on your village",
    description: "Ask the AI, join the community, book a therapist, or arrange care — all in one place.",
  },
];

const testimonials = [
  {
    quote:
      "I finally stopped doom-scrolling parenting forums at 2am. Nurturely's AI support talks me down with actual, sensible guidance.",
    name: "Sample testimonial — Priya, mother of two",
  },
  {
    quote:
      "The backup childcare chain saved my job interview when our usual sitter cancelled. I didn't know I needed it until I did.",
    name: "Sample testimonial — Marcus, single dad",
  },
  {
    quote:
      "Finding a therapist who understands blended families felt impossible. Here it took one afternoon.",
    name: "Sample testimonial — Elena & Tom, parents of three",
  },
];

function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link to="/" className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <Sprout className="h-5 w-5" />
            </span>
            <span className="text-xl font-extrabold tracking-tight text-foreground">Nurturely</span>
          </Link>
          <nav className="hidden items-center gap-6 text-sm font-medium text-muted-foreground md:flex">
            <a href="#features" className="transition-colors hover:text-foreground">
              Features
            </a>
            <a href="#how-it-works" className="transition-colors hover:text-foreground">
              How it works
            </a>
            <a href="#trust" className="transition-colors hover:text-foreground">
              Trust &amp; safety
            </a>
          </nav>
          <div className="flex items-center gap-2">
            <Link
              to="/auth"
              className="rounded-lg px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
            >
              Sign in
            </Link>
            <Link
              to="/auth"
              className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-4 pb-20 pt-16 sm:px-6 sm:pt-24">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-4 inline-block rounded-full bg-secondary px-4 py-1.5 text-sm font-semibold text-secondary-foreground">
            Parenting wasn't meant to be done alone.
          </p>
          <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-foreground sm:text-6xl">
            An AI Family Ecosystem.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Nurturely brings everything a modern family needs into one calm place — AI parenting
            support, a community that understands, trusted therapists, and childcare you can count
            on, even at the last minute.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              to="/auth"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-8 py-3.5 text-base font-bold text-primary-foreground shadow-md transition-all hover:bg-primary/90 sm:w-auto"
            >
              Get Started <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href="#features"
              className="inline-flex w-full items-center justify-center rounded-xl border border-border bg-card px-8 py-3.5 text-base font-bold text-foreground transition-colors hover:bg-secondary sm:w-auto"
            >
              Explore Features
            </a>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="border-y border-border/60 bg-secondary/50 py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
              Everything your family needs, in one place
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Five kinds of support, designed to work together — so you never have to figure it out
              alone.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="rounded-2xl border border-border/70 bg-card p-7 shadow-sm transition-shadow hover:shadow-md"
              >
                <span className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-accent/60 text-primary">
                  <feature.icon className="h-5 w-5" />
                </span>
                <h3 className="text-lg font-bold text-foreground">{feature.title}</h3>
                <p className="mt-2 leading-relaxed text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
              How it works
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Three gentle steps to a more supported family life.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {steps.map((item) => (
              <div key={item.step} className="text-center">
                <span className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-xl font-extrabold text-primary-foreground">
                  {item.step}
                </span>
                <h3 className="text-lg font-bold text-foreground">{item.title}</h3>
                <p className="mt-2 leading-relaxed text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust & safety */}
      <section id="trust" className="border-y border-border/60 bg-secondary/50 py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
              Trust, safety, and privacy first
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Your family's information is deeply personal. We treat it that way.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                icon: ShieldCheck,
                title: "Vetted professionals",
                description:
                  "Therapists and childcare providers are reviewed before they appear in the directory.",
              },
              {
                icon: Lock,
                title: "Private by default",
                description:
                  "Your children's profiles and family data are visible only to you, protected by secure authentication.",
              },
              {
                icon: HeartHandshake,
                title: "Moderated community",
                description:
                  "Community spaces are guided by clear kindness rules, so support stays supportive.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-border/70 bg-card p-7 text-center shadow-sm"
              >
                <span className="mx-auto mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-accent/60 text-primary">
                  <item.icon className="h-5 w-5" />
                </span>
                <h3 className="text-lg font-bold text-foreground">{item.title}</h3>
                <p className="mt-2 leading-relaxed text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
              Loved by parents like you
            </h2>
            <p className="mt-4 text-sm font-medium text-muted-foreground">
              Sample testimonials shown for demonstration purposes.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((item) => (
              <figure
                key={item.name}
                className="rounded-2xl border border-border/70 bg-card p-7 shadow-sm"
              >
                <blockquote className="leading-relaxed text-foreground">
                  &ldquo;{item.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-4 text-sm font-semibold text-muted-foreground">
                  {item.name}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border/60 bg-primary py-16">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h2 className="text-3xl font-extrabold tracking-tight text-primary-foreground">
            You don't have to do this alone.
          </h2>
          <p className="mt-4 text-lg text-primary-foreground/80">
            Join Nurturely today and find your village.
          </p>
          <Link
            to="/auth"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-background px-8 py-3.5 text-base font-bold text-foreground shadow-md transition-colors hover:bg-secondary"
          >
            Get Started <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/60 bg-background py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-4 sm:flex-row sm:px-6">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Sprout className="h-4 w-4" />
            </span>
            <span className="font-extrabold text-foreground">Nurturely</span>
          </div>
          <nav className="flex flex-wrap items-center justify-center gap-6 text-sm font-medium text-muted-foreground">
            <a href="#features" className="transition-colors hover:text-foreground">
              About
            </a>
            <a href="mailto:hello@nurturely.example" className="transition-colors hover:text-foreground">
              Contact
            </a>
            <span className="cursor-pointer transition-colors hover:text-foreground">
              Privacy Policy
            </span>
            <span className="cursor-pointer transition-colors hover:text-foreground">Terms</span>
          </nav>
          <p className="text-sm text-muted-foreground">© 2026 Nurturely</p>
        </div>
      </footer>
    </div>
  );
}
