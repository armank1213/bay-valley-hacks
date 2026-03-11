import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import ScrollReveal from "@/components/ScrollReveal";

const orgs = [
  {
    name: "Dublin High Hack Club",
    city: "Dublin",
    focus: "Student-led hackathons & weekly builds",
  },
  {
    name: "Foothill HS Computer Science Club",
    city: "Pleasanton",
    focus: "Competitive programming & project sprints",
  },
  {
    name: "Amador Valley HS Coding Club",
    city: "Pleasanton",
    focus: "Beginner-friendly workshops & web dev",
  },
  {
    name: "Granada HS Tech & Innovation",
    city: "Livermore",
    focus: "Hardware, apps, and community projects",
  },
];

const CollaboratorsSection = () => {
  return (
    <section
      id="collaborators"
      className="relative py-20 px-6 max-w-6xl mx-auto"
    >
      <div className="absolute inset-0 -z-10 opacity-40 pointer-events-none">
        <div className="absolute -top-32 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-10 w-72 h-72 bg-glow-secondary/5 rounded-full blur-3xl" />
      </div>

      <div className="flex flex-col gap-10 lg:flex-row lg:items-start">
        <ScrollReveal className="flex-1 space-y-6" delayMs={50}>
          <p className="text-xs font-mono uppercase tracking-[0.3em] text-muted-foreground">
            Tri-Valley collaborators
          </p>
          <h2 className="text-3xl sm:text-4xl font-display font-semibold tracking-tight">
            High school hackathon organizations{" "}
            <span className="text-gradient-primary">powering Bay Valley</span>
          </h2>
          <p className="text-muted-foreground max-w-xl">
            We are building Bay Valley Hacks alongside some of the most active
            student tech communities in the Tri-Valley. These organizations
            help shape workshops, mentoring, and outreach so the event truly
            reflects local students.
          </p>

          <div className="grid gap-4 sm:grid-cols-2">
            {orgs.map((org, i) => (
              <ScrollReveal
                key={org.name}
                delayMs={140 + i * 70}
                className="h-full"
              >
                <Card className="glass border border-border/60 backdrop-blur-xl h-full">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base font-display">
                      {org.name}
                    </CardTitle>
                    <p className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground">
                      {org.city}, CA
                    </p>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-sm text-muted-foreground">{org.focus}</p>
                  </CardContent>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal className="flex-1 mt-4 lg:mt-0" delayMs={150}>
          <div className="glass relative rounded-3xl border border-border/60 p-5 md:p-6 aspect-[4/3] overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-background to-glow-secondary/5" />

            <div className="relative z-10 h-full flex flex-col">
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs font-mono uppercase tracking-[0.25em] text-muted-foreground">
                  Tri-Valley map
                </p>
                <Separator className="w-16 bg-border/70" />
              </div>

              <div className="relative flex-1 rounded-2xl bg-background/70 border border-dashed border-border/70 overflow-hidden">
                {/* Simple stylized map */}
                <div className="absolute inset-0 opacity-40 pointer-events-none">
                  <div className="absolute left-1/4 top-1/3 w-40 h-40 rounded-full bg-primary/5 blur-3xl" />
                  <div className="absolute right-1/4 bottom-1/4 w-32 h-32 rounded-full bg-glow-secondary/5 blur-3xl" />
                </div>

                <div className="relative h-full w-full">
                  {/* Pleasanton */}
                  <div className="absolute left-[32%] top-[48%] flex flex-col items-start gap-1">
                    <span className="flex items-center gap-1.5">
                      <span className="h-2.5 w-2.5 rounded-full bg-primary shadow-[0_0_12px_rgba(250,204,21,0.9)]" />
                      <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground">
                        Pleasanton
                      </span>
                    </span>
                    <span className="rounded-full bg-primary/5 px-2 py-0.5 text-[10px] font-mono text-foreground">
                      Amador Valley & Foothill
                    </span>
                  </div>

                  {/* Dublin */}
                  <div className="absolute left-[55%] top-[35%] flex flex-col items-start gap-1">
                    <span className="flex items-center gap-1.5">
                      <span className="h-2.5 w-2.5 rounded-full bg-primary shadow-[0_0_12px_rgba(250,204,21,0.9)]" />
                      <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground">
                        Dublin
                      </span>
                    </span>
                    <span className="rounded-full bg-primary/5 px-2 py-0.5 text-[10px] font-mono text-foreground">
                      Dublin High Hack Club
                    </span>
                  </div>

                  {/* Livermore */}
                  <div className="absolute left-[65%] bottom-[22%] flex flex-col items-start gap-1">
                    <span className="flex items-center gap-1.5">
                      <span className="h-2.5 w-2.5 rounded-full bg-primary shadow-[0_0_12px_rgba(250,204,21,0.9)]" />
                      <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground">
                        Livermore
                      </span>
                    </span>
                    <span className="rounded-full bg-primary/5 px-2 py-0.5 text-[10px] font-mono text-foreground">
                      Granada HS Tech & Innovation
                    </span>
                  </div>

                  {/* Legend */}
                  <div className="absolute left-3 bottom-3 rounded-xl bg-background/90 border border-border/60 px-3 py-2 flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-primary shadow-[0_0_8px_rgba(250,204,21,0.9)]" />
                    <span className="text-[10px] font-mono text-muted-foreground">
                      Partner high school organization
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default CollaboratorsSection;

