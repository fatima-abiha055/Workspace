export default function About() {
  return (
    <div className="page">
      <div className="page-header container">
        <div className="eyebrow">About us</div>
        <h1>Built for the way modern teams work.</h1>
        <p>
          WorkSpace connects people with flexible desks, private offices and meeting rooms
          across the city, so you can work from wherever suits your day.
        </p>
      </div>

      <div className="container">
        <div className="grid grid-2" style={{ gridTemplateColumns: "1fr 1fr", gap: 40, alignItems: "center", marginBottom: 56 }}>
          <img
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=700&q=80"
            alt="Team working in a coworking space"
            style={{ borderRadius: 16, height: 320, objectFit: "cover" }}
          />
          <div>
            <h2 style={{ fontSize: "1.5rem" }}>Why coworking works</h2>
            <p>
              Flexible working has become the norm rather than the exception. Coworking spaces
              give freelancers, startups and remote teams the infrastructure of a traditional
              office — high-speed internet, meeting rooms, printing — without the overhead of a
              long-term lease.
            </p>
            <p>
              Every workspace on our platform is vetted for quality: comfortable seating, reliable
              Wi-Fi, and a professional environment that helps you do your best work.
            </p>
          </div>
        </div>

        <div className="grid grid-3" style={{ marginBottom: 56 }}>
          <FeatureCard title="Workspace Quality" desc="Every space is inspected for comfort, cleanliness and reliable connectivity." />
          <FeatureCard title="Community" desc="Meet founders, freelancers and teams building something new, right next to you." />
          <FeatureCard title="Productivity" desc="Purpose-built environments designed to help you focus and get more done." />
        </div>

        <div className="section-soft" style={{ borderRadius: 16, padding: "40px 24px" }}>
          <div className="grid grid-4" style={{ textAlign: "center" }}>
            <Stat number="25+" label="Workspaces" />
            <Stat number="10+" label="Meeting Rooms" />
            <Stat number="500+" label="Members" />
            <Stat number="24/7" label="Support" />
          </div>
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ title, desc }) {
  return (
    <div className="card" style={{ padding: 22 }}>
      <h3 style={{ fontSize: "1.05rem" }}>{title}</h3>
      <p style={{ margin: 0 }}>{desc}</p>
    </div>
  );
}

function Stat({ number, label }) {
  return (
    <div>
      <div style={{ fontSize: "2rem", fontWeight: 700, color: "var(--color-primary)" }}>{number}</div>
      <div style={{ color: "var(--color-text-muted)", fontSize: "0.9rem" }}>{label}</div>
    </div>
  );
}
