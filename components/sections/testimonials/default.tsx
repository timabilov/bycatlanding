import { Section } from "../../ui/section";

const TESTIMONIALS = [
  {
    body: (
      <>
        Three weeks out from quals and I used Bycat to chew through{" "}
        <em>11 papers a day</em>. Passed. The live AI sessions are what sold me — like
        having a patient lab-mate at 2am.
      </>
    ),
    name: "Priya S.",
    role: "PhD, Biochem · Stanford",
    avatar: "/user1.png",
  },
  {
    body: (
      <>
        I don&apos;t need another flashcard app. I need one that{" "}
        <em>actually reads the textbook for me</em> and asks the dumb questions I
        forget to ask myself. This does that.
      </>
    ),
    name: "Marco D.",
    role: "Med school · UCL",
    avatar: "/user2.png",
  },
  {
    body: (
      <>
        The hard-quiz difficulty tier is humbling in the best way. Missed three on
        tort law, got alerts all week, aced that section on the mock.
      </>
    ),
    name: "Jenna K.",
    role: "JD candidate · NYU",
    avatar: "/user3.png",
  },
  {
    body: (
      <>
        Uploaded a 3-hour organic chem lecture. Bycat gave me{" "}
        <em>47 flashcards</em>. Read them on the bus. Got a 92. That&apos;s it.
        That&apos;s the review.
      </>
    ),
    name: "James R.",
    role: "Undergrad, Chemistry · Imperial",
    avatar: "/user4.png",
  },
  {
    body: (
      <>
        The live AI tutor sessions at 2am are literally therapy. 10/10 would
        recommend to my enemies.
      </>
    ),
    name: "Theo A.",
    role: "MSc, Computer Science · ETH",
    avatar: "/user5.png",
  },
  {
    body: (
      <>
        Torts was carrying my lowest grade. Bycat kept pinging me with the exact
        questions I kept missing. It nags in a good way.
      </>
    ),
    name: "Alex M.",
    role: "LLB · Oxford",
    avatar: "/user6.png",
  },
];

export default function Testimonials() {
  return (
    <Section>
      <div className="max-w-container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-muted/50 px-3 py-1 text-xs text-muted-foreground mb-4">
            What students say
          </span>
          <h2
            className="text-3xl font-semibold tracking-tight sm:text-4xl"
            style={{ letterSpacing: "-0.03em" }}
          >
            Real reviews from people with real exams.
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <div
              key={i}
              className="flex flex-col gap-4 rounded-2xl border border-border bg-muted/20 p-6 transition-colors hover:border-border/80"
            >
              <p className="flex-1 text-sm leading-relaxed text-foreground">
                &ldquo;{t.body}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="size-8 overflow-hidden rounded-full border border-border flex-shrink-0 bg-muted">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    width={32}
                    height={32}
                    className="size-full object-cover"
                  />
                </div>
                <div>
                  <div className="text-sm font-semibold text-foreground">{t.name}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
