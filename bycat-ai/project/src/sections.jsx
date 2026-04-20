// Generic sections: demo video, how it works, stats, testimonials, comparison, final CTA

const DemoVideo = () => (
  <section className="section" id="demo">
    <div className="wrap">
      <div className="section-head">
        <span className="eyebrow-pill"><span className="dot" style={{width:6,height:6,borderRadius:999,background:"var(--pink)",boxShadow:"0 0 10px var(--pink)"}}/> 90-second demo</span>
        <h2>See it turn a 3-hour lecture into a studied topic.</h2>
      </div>
      <div className="demo-frame">
        <div className="topo"/>
        <button className="play-btn" aria-label="Play demo">
          <Icon name="play" size={28}/>
        </button>
        <div className="demo-caption">Processing note…</div>
      </div>
    </div>
  </section>
);

const HowItWorks = () => (
  <section className="section" id="how">
    <div className="wrap">
      <div className="section-head">
        <span className="eyebrow-pill">How it works</span>
        <h2>Three steps, zero excuses.</h2>
        <p>You do the uploading. Bycat does the reading, summarising, quizzing, and nagging-you-to-study.</p>
      </div>
      <div className="steps">
        <div className="step-card">
          <div className="num">01</div>
          <h3>Drop anything in</h3>
          <p>Lecture video, textbook PDF, voice memo, whiteboard photo, a YouTube link. Combine them into one note if you want.</p>
          <div className="visual">
            <div style={{display:"flex",gap:8,flexWrap:"wrap",justifyContent:"center",padding:16}}>
              {["pdf","video","audio","notes"].map(n=>(
                <div key={n} style={{padding:"10px 12px",borderRadius:10,background:"var(--surface-2)",border:"1px solid var(--border)",display:"flex",alignItems:"center",gap:6,fontSize:12}}>
                  <Icon name={n} size={13}/>
                  {n === "pdf" ? "slides.pdf" : n === "video" ? "lecture.mp4" : n === "audio" ? "memo.m4a" : "notes.md"}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="step-card">
          <div className="num">02</div>
          <h3>Bycat reads it</h3>
          <p>Real synthesis, not copy-paste. You get a structured summary, a transcript you can search, flashcards, and three difficulty tiers of quiz.</p>
          <div className="visual">
            <div style={{width:"80%",padding:12,borderRadius:10,background:"var(--bg)",border:"1px solid var(--border)"}}>
              <div style={{height:6,background:"var(--surface-2)",borderRadius:999,marginBottom:6,overflow:"hidden"}}>
                <div style={{height:"100%",width:"72%",background:"var(--grad-pink)",borderRadius:999,animation:"blink 1.5s infinite"}}/>
              </div>
              <div style={{fontSize:11,color:"var(--text-dim)",textAlign:"center"}}>Generating flashcards… 72%</div>
            </div>
          </div>
        </div>

        <div className="step-card">
          <div className="num">03</div>
          <h3>Drill until it sticks</h3>
          <p>Live AI sessions twice daily. Quiz alerts for the questions you keep missing. Unlocks the next tier when you're actually ready.</p>
          <div className="visual">
            <div style={{display:"flex",gap:8,alignItems:"center"}}>
              <div className="live-orb" style={{width:44,height:44}}/>
              <div style={{fontSize:13,color:"var(--text)"}}>Live AI session in 2h</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const StatsStrip = () => {
  const [notes, setNotes] = React.useState(2847293);
  const [online, setOnline] = React.useState(1247);
  const [sessions, setSessions] = React.useState(18409);
  React.useEffect(() => {
    const id = setInterval(() => {
      setNotes(n => n + Math.floor(Math.random() * 4) + 1);
      setOnline(n => Math.max(900, Math.min(1800, n + (Math.random() > 0.5 ? 1 : -1))));
      setSessions(n => n + (Math.random() > 0.7 ? 1 : 0));
    }, 1400);
    return () => clearInterval(id);
  }, []);
  const fmt = (n) => n.toLocaleString();
  return (
    <div className="wrap">
      <div className="stats-strip">
        <div className="stat-cell"><div className="num live mono">{fmt(notes)}</div><div className="label"><span className="live-dot"/>Notes generated</div></div>
        <div className="stat-cell"><div className="num mono">{fmt(online)}</div><div className="label"><span className="live-dot"/>Studying now</div></div>
        <div className="stat-cell"><div className="num mono">{fmt(sessions)}</div><div className="label">AI sessions today</div></div>
        <div className="stat-cell"><div className="num">4.9★</div><div className="label">App Store rating</div></div>
      </div>
    </div>
  );
};

const TESTIMONIALS = [
  { body: (<>Three weeks out from quals and I used Bycat to chew through <em>11 papers a day</em>. Passed. The live AI sessions are what sold me — like having a patient lab-mate at 2am.</>), name: "Priya S.", role: "PhD, Biochem · Stanford", initials: "PS" },
  { body: (<>I don't need another flashcard app. I need one that <em>actually reads the textbook for me</em> and asks the dumb questions I forget to ask myself. This does that.</>), name: "Marco D.", role: "Med school · UCL", initials: "MD" },
  { body: (<>The hard-quiz difficulty tier is humbling in the best way. Missed three on tort law, got alerts all week, aced that section on the mock.</>), name: "Jenna K.", role: "JD candidate · NYU", initials: "JK" },
];

const UNIVERSITIES = [
  { name: "Stanford",     sub: "University", style: "serif-sans" },
  { name: "HARVARD",      sub: "· UNIVERSITY", style: "serif-caps" },
  { name: "MIT",          sub: "",            style: "sans-bold" },
  { name: "Oxford",       sub: "",            style: "old-serif" },
  { name: "Cambridge",    sub: "",            style: "old-serif" },
  { name: "Yale",         sub: "University",  style: "serif-sans" },
  { name: "PRINCETON",    sub: "",            style: "serif-caps" },
  { name: "Columbia",     sub: "University",  style: "serif-sans" },
  { name: "UCL",          sub: "",            style: "sans-bold" },
  { name: "Imperial",     sub: "College London", style: "serif-sans" },
  { name: "Berkeley",     sub: "· UC",         style: "serif-sans" },
  { name: "NYU",          sub: "",            style: "sans-bold" },
  { name: "ETH Z\u00FCrich", sub: "",         style: "sans-bold" },
  { name: "Tsinghua",     sub: "清華",         style: "serif-sans" },
  { name: "Tokyo",        sub: "東京大學",     style: "serif-sans" },
];

const UniLogo = ({ name, sub, style }) => (
  <div className={`uni uni-${style}`}>
    <span className="uni-name">{name}</span>
    {sub && <span className="uni-sub">{sub}</span>}
  </div>
);

const UniversityRail = () => {
  // Duplicate for seamless marquee
  const list = [...UNIVERSITIES, ...UNIVERSITIES];
  return (
    <section className="section uni-section" aria-label="Universities">
      <div className="wrap">
        <div className="uni-label">Real students from 300+ universities</div>
      </div>
      <div className="uni-rail">
        <div className="uni-track">
          {list.map((u,i)=> <UniLogo key={i} {...u}/>)}
        </div>
      </div>
    </section>
  );
};

const Testimonials = () => (
  <section className="section" id="reviews-text">
    <div className="wrap">
      <div className="section-head">
        <span className="eyebrow-pill">What students say</span>
        <h2>Real reviews from people with real exams.</h2>
      </div>
      <div className="testimonials">
        {TESTIMONIALS.map((t,i)=>(
          <div key={i} className="testimonial">
            <div className="body">"{t.body}"</div>
            <div className="who">
              <div className="avatar">{t.initials}</div>
              <div>
                <div className="name">{t.name}</div>
                <div className="role">{t.role}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const COMPARE_ROWS = [
  {
    feat: "Live voice practice sessions",
    bsub: "Real back-and-forth. Interrupt. Ask follow-ups. Bycat grades your answer live.",
    gsub: "Text-only. You read, you guess, you close the tab.",
    bycat: true, generic: false,
  },
  {
    feat: "One note from many sources",
    bsub: "Combine PDFs, lecture videos, YouTube, voice memos & slides into one unified study note.",
    gsub: "One attachment at a time. No cross-referencing between sources.",
    bycat: true, generic: "partial",
  },
  {
    feat: "On-demand quiz inside chat",
    bsub: "Say “quiz me on chapter 4” mid-conversation — 5 questions, graded instantly, no tab switch.",
    gsub: "Kinda. You'll copy the answers. It won't remember what you missed tomorrow.",
    bycat: true, generic: "partial",
  },
  {
    feat: "You set the alerts, Bycat follows up",
    bsub: "“Drill me on cell cycle until I nail it.” Bycat pings you when you're due and tracks your progress.",
    gsub: "No memory between sessions. No scheduling. Every chat starts at zero.",
    bycat: true, generic: false,
  },
  {
    feat: "Grounded in your actual material",
    bsub: "Answers cite your lecture, your slides, your highlights. No made-up sources.",
    gsub: "Confidently makes up citations. You find out at the exam.",
    bycat: true, generic: false,
  },
];

const Compare = () => (
  <section className="section" id="compare">
    <div className="wrap">
      <div className="section-head">
        <span className="eyebrow-pill">Why Bycat</span>
        <h2>Built for studying. Not a chatbot in a trench coat.</h2>
        <p>Generic AI is a blank page. Bycat remembers your material, holds a voice conversation, quizzes you on demand, and pings you when you're due.</p>
      </div>
      <div className="compare-wrap">
        <div className="compare-head">
          <div>What you actually need</div>
          <div className="bycat"><img src="assets/bycat-icon.png" alt=""/> Bycat AI</div>
          <div>Generic AI chat</div>
        </div>
        {COMPARE_ROWS.map((r,i)=>(
          <div key={i} className="compare-row compare-row-rich">
            <div className="feat">
              <div className="feat-title">{r.feat}</div>
            </div>
            <div className="cell-yes">
              <div className="cell-top"><span className="mark yes-mark"><Icon name="check" size={14}/></span> Yes</div>
              <div className="cell-sub">{r.bsub}</div>
            </div>
            <div className="cell-no">
              <div className="cell-top">
                <span className="mark no-mark">
                  {r.generic === "partial" ? <Icon name="sliders" size={12}/> : <Icon name="x" size={12}/>}
                </span>
                {r.generic === "partial" ? "Kinda" : "No"}
              </div>
              <div className="cell-sub">{r.gsub}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const FinalCta = () => (
  <section className="section">
    <div className="wrap">
      <div className="final-cta">
        <span className="eyebrow-pill" style={{marginBottom:16}}>Your exam isn't going to study itself</span>
        <h2>Be honest — how's the cramming going?</h2>
        <p>Start free this week. Keep it if it works. Cancel in two taps if it doesn't. The cat won't take it personally. Much.</p>
        <div style={{display:"flex",gap:10,justifyContent:"center",flexWrap:"wrap"}}>
          <a href="#pricing" className="btn btn-lg btn-primary"><Icon name="zap" size={14}/> Start 7-day free</a>
          <a href="#" className="btn btn-lg"><Icon name="apple" size={16}/> Get the app</a>
        </div>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="footer">
    <img className="footer-cat" src="assets/bycat-icon.png" alt=""/>
    <div className="wrap">
      <div className="footer-grid">
        <div>
          <div className="footer-brand"><img src="assets/bycat-icon.png" alt=""/> Bycat AI</div>
          <p className="footer-tag">The study tool that reads your textbook for you, drills you on what you miss, and keeps its paws off your GPA.</p>
          <div style={{display:"flex",gap:8,marginTop:18}}>
            <a className="icon-btn" aria-label="Discord" href="#"><Icon name="discord"/></a>
            <a className="icon-btn" aria-label="X" href="#"><Icon name="x_social"/></a>
            <a className="icon-btn" aria-label="Web" href="#"><Icon name="globe"/></a>
          </div>
        </div>
        <div className="footer-col">
          <h4>Product</h4>
          <a href="#how">How it works</a>
          <a href="#reviews">Reviews</a>
          <a href="#pricing">Pricing</a>
          <a href="#">iOS app</a>
          <a href="#">Android app</a>
        </div>
        <div className="footer-col">
          <h4>Company</h4>
          <a href="#">Blog</a>
          <a href="#">Careers (1 open)</a>
          <a href="#">Press kit</a>
          <a href="#">Contact</a>
        </div>
        <div className="footer-col">
          <h4>Legal</h4>
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
          <a href="#">Refunds</a>
          <a href="#">Status</a>
        </div>
      </div>
      <div className="footer-bottom">
        <div>© 2026 Bycat Labs — made with <span className="meow">nine lives</span> of effort.</div>
        <div className="mono" style={{fontSize:11}}>v0.27.0 · built by a tiny team, not a tiny bot</div>
      </div>
    </div>
  </footer>
);

Object.assign(window, { DemoVideo, HowItWorks, StatsStrip, Testimonials, Compare, FinalCta, Footer, UniversityRail });
