// Hero — native-feeling: phone with live AI chat orb + topographic bg + contextual floating chips

const HERO_COPY = {
  badge_new: "New",
  badge_text: "Bycat AI mobile app is out",
  h1_line1: "Study less. Master more.",
  h1_line2: "Stay sharp.",
  sub: "Drop any PDF, video, or lecture — Bycat turns it into flashcards, quizzes, and live drill sessions in seconds.",
  cta_web: "Web platform",
  cta_app: "App Store",
  // Phone chat copy — edit here to localize
  live: "LIVE",
  session: "Practice · Cell Biology",
  welcome: "Tuesday drill — picked up where you left off.",
  question_label: "Question 1 of 5",
  ai_name: "Bycat",
  mic_pill: "Mic paused — Bycat is speaking",
  orb_caption: "Bycat is purring along.",
};

const HERO_PILLS = [
  { id: "pdfs", label: "PDFs", icon: "pdf" },
  { id: "videos", label: "Videos", icon: "video" },
  { id: "audio", label: "Audio", icon: "audio" },
  { id: "notes", label: "Notes", icon: "notes" },
];

const AvatarStack = () => {
  const avatars = ["JM","SK","AL","TR","DP"];
  const bgs = ["#be185d","#6366f1","#0ea5e9","#d97706","#059669"];
  return (
    <div className="avatars">
      {avatars.map((a, i) => (
        <div key={i} className="avatar-fallback" style={{ background: bgs[i] }}>{a}</div>
      ))}
    </div>
  );
};

// Procedural topographic SVG lines — matches existing site's aesthetic
const TopoLines = () => {
  const lines = [];
  for (let i = 0; i < 14; i++) {
    const r = 30 + i * 22;
    const cx = 200 + Math.sin(i * 1.3) * 20;
    const cy = 200 + Math.cos(i * 0.7) * 20;
    const d = `M ${cx - r} ${cy} C ${cx - r/2} ${cy - r * (0.7 + Math.sin(i)*0.1)}, ${cx + r/2} ${cy - r * (0.7 + Math.cos(i)*0.1)}, ${cx + r} ${cy} C ${cx + r/2} ${cy + r * (0.7 + Math.sin(i+1)*0.1)}, ${cx - r/2} ${cy + r * (0.7 + Math.cos(i+1)*0.1)}, ${cx - r} ${cy} Z`;
    lines.push(<path key={i} d={d} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="1" />);
  }
  return (
    <svg className="topo-lines" viewBox="0 0 400 400" preserveAspectRatio="xMidYMid slice">
      {lines}
    </svg>
  );
};

/* ---------- Animated wavy orb (mimics screenshot: pink→orange blob that breathes) ---------- */
const WavyOrb = ({ size = 58, speaking = true }) => {
  const [t, setT] = React.useState(0);
  React.useEffect(() => {
    if (!speaking) return;
    let raf;
    const start = performance.now();
    const tick = (now) => {
      setT((now - start) / 1000);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [speaking]);

  // build a closed bezier ring with modulated radii
  const points = 16;
  const cx = 50, cy = 50;
  const baseR = 32;
  const amp = speaking ? 3.2 : 1.0;
  const pts = [];
  for (let i = 0; i < points; i++) {
    const ang = (i / points) * Math.PI * 2;
    const r =
      baseR +
      Math.sin(ang * 3 + t * 2.1) * amp +
      Math.sin(ang * 5 - t * 1.3) * (amp * 0.6) +
      Math.cos(ang * 2 + t * 0.9) * (amp * 0.4);
    pts.push({ x: cx + Math.cos(ang) * r, y: cy + Math.sin(ang) * r });
  }
  // smooth closed path via Catmull-Rom-ish
  let d = "";
  for (let i = 0; i < points; i++) {
    const p0 = pts[(i - 1 + points) % points];
    const p1 = pts[i];
    const p2 = pts[(i + 1) % points];
    const p3 = pts[(i + 2) % points];
    if (i === 0) d += `M ${p1.x.toFixed(2)} ${p1.y.toFixed(2)} `;
    const c1x = p1.x + (p2.x - p0.x) / 6;
    const c1y = p1.y + (p2.y - p0.y) / 6;
    const c2x = p2.x - (p3.x - p1.x) / 6;
    const c2y = p2.y - (p3.y - p1.y) / 6;
    d += `C ${c1x.toFixed(2)} ${c1y.toFixed(2)}, ${c2x.toFixed(2)} ${c2y.toFixed(2)}, ${p2.x.toFixed(2)} ${p2.y.toFixed(2)} `;
  }
  d += "Z";

  return (
    <svg width={size} height={size} viewBox="0 0 100 100">
      <defs>
        <linearGradient id="orbGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ec4899" />
          <stop offset="60%" stopColor="#f97316" />
          <stop offset="100%" stopColor="#f59e0b" />
        </linearGradient>
      </defs>
      <path d={d} fill="none" stroke="url(#orbGrad)" strokeWidth="3.5" strokeLinejoin="round" />
    </svg>
  );
};

/* ---------- Typewriter chat turns (script driven) ---------- */
const CHAT_SCRIPT = [
  { who: "ai-label", text: HERO_COPY.ai_name },
  { who: "ai-sub",   text: HERO_COPY.question_label },
  { who: "ai",       text: "Name two things mitochondria do besides making ATP." },
  { who: "user",     text: "uhh… signaling?" },
  { who: "ai-label", text: HERO_COPY.ai_name },
  { who: "ai",       text: "Close. From your lecture: calcium buffering and apoptosis. Want me to drill this tomorrow at 8pm?" },
];

const useChatFlow = () => {
  const [step, setStep] = React.useState(0);       // index into script
  const [typed, setTyped] = React.useState("");    // text being currently typed
  const [turns, setTurns] = React.useState([]);    // committed turns

  React.useEffect(() => {
    if (step >= CHAT_SCRIPT.length) {
      // restart after pause
      const t = setTimeout(() => { setTurns([]); setStep(0); setTyped(""); }, 4500);
      return () => clearTimeout(t);
    }
    const cur = CHAT_SCRIPT[step];
    // Labels appear instantly; text types out
    if (cur.who === "ai-label" || cur.who === "ai-sub") {
      setTurns(prev => [...prev, cur]);
      const t = setTimeout(() => setStep(s => s + 1), 250);
      return () => clearTimeout(t);
    }
    // typewriter
    let i = 0;
    setTyped("");
    const speed = cur.who === "user" ? 90 : 28;
    const iv = setInterval(() => {
      i++;
      setTyped(cur.text.slice(0, i));
      if (i >= cur.text.length) {
        clearInterval(iv);
        setTimeout(() => {
          setTurns(prev => [...prev, cur]);
          setTyped("");
          setStep(s => s + 1);
        }, 550);
      }
    }, speed);
    return () => clearInterval(iv);
  }, [step]);

  return { turns, typed, step, current: CHAT_SCRIPT[step] };
};

const ChatTurn = ({ turn, typed }) => {
  const text = typed ?? turn.text;
  if (turn.who === "ai-label") return <div className="ct-label">{turn.text}</div>;
  if (turn.who === "ai-sub")   return <div className="ct-sub">{turn.text}</div>;
  if (turn.who === "ai")       return <div className="ct-ai">{text}{typed !== undefined && <span className="caret"/>}</div>;
  if (turn.who === "user")     return <div className="ct-user">{text}{typed !== undefined && <span className="caret"/>}</div>;
  return null;
};

const PhoneLiveChat = () => {
  const { turns, typed, current } = useChatFlow();
  const aiSpeaking = current && (current.who === "ai" || current.who === "ai-label" || current.who === "ai-sub");

  return (
    <div className="hero-phone">
      <div className="phone-inner">
        <div className="notch" />
        <div className="phone-status">
          <span>21:57</span>
          <span className="status-right">
            <Icon name="signal" size={9}/>
            <Icon name="wifi" size={9}/>
            <span className="battery" />
          </span>
        </div>

        <div className="chat-screen">
          {/* top row: LIVE pill + session + close */}
          <div className="chat-top">
            <span className="live-pill-top"><span className="pulse"/> {HERO_COPY.live}</span>
            <span className="counter">{HERO_COPY.session}</span>
            <span style={{marginLeft:"auto", color:"#ef4444", fontSize:13, fontWeight:600}}>×</span>
          </div>
          <div className="chat-welcome">{HERO_COPY.welcome}</div>

          {/* chat log */}
          <div className="chat-log">
            {turns.map((t, i) => <ChatTurn key={i} turn={t} />)}
            {typed && <ChatTurn turn={current} typed={typed} />}
          </div>

          {/* footer: mic paused + orb centered */}
          <div className="chat-footer">
            <div className="mic-pill">
              <Icon name="mic-off" size={9}/> {HERO_COPY.mic_pill}
            </div>
            <div className="orb-wrap">
              <WavyOrb size={62} speaking={aiSpeaking}/>
            </div>
            <div className="ai-speaking">{HERO_COPY.orb_caption}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

const HeroVisual = () => (
  <div className="hero-visual">
    <div className="topo-card">
      <TopoLines />
    </div>

    <PhoneLiveChat />

    {/* Cat mascot — peeking from top-left, watching the practice session */}
    <div className="mascot-peek">
      <img src="assets/bycat-icon.png" alt=""/>
      <div className="mascot-bubble">
        <div className="mb-title">Nice try!</div>
        <div className="mb-sub">You got 4 / 5 right.</div>
      </div>
    </div>

    {/* Floating chips — contextual, convey feature breadth */}
    <div className="float-chip fc-1">
      <span className="ico"><Icon name="video" size={12}/></span>
      YouTube → Notes
    </div>
    <div className="float-chip fc-2">
      <span className="ico"><Icon name="pdf" size={12}/></span>
      PDF parsed · 12 pages
    </div>
    <div className="float-chip fc-4">
      <span className="ico"><Icon name="sparkle" size={12}/></span>
      47 flashcards ready
    </div>

    {/* Smart alert card — convey: YOU ask Bycat to set quiz alerts on weak topics */}
    <div className="alert-card">
      <div className="ac-head">
        <span className="ac-bell">
          <Icon name="bell" size={13}/>
          <span className="bell-dot"/>
        </span>
        <div className="ac-title">Quiz alert set</div>
        <div className="ac-time">just now</div>
      </div>
      <div className="ac-body">
        <span className="ac-kbd">You:</span> “Quiz me on <b>cell cycle</b> until I stop missing it.”
      </div>
      <div className="ac-foot">
        <span className="ac-pill"><span className="ac-dot"/> On</span>
        <span className="ac-meta">Pings you when ready</span>
      </div>
    </div>
  </div>
);

const Hero = () => {
  const [activePill, setActivePill] = React.useState("notes");
  return (
    <section className="hero">
      <div className="wrap">
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <SaleBar />
        </div>

        <div className="hero-grid">
          <div>
            <a className="new-chip" href="#">
              <span className="pill">{HERO_COPY.badge_new}</span>
              {HERO_COPY.badge_text}
              <Icon name="arrow" size={12} />
            </a>

            <h1>
              {HERO_COPY.h1_line1}<br/>{HERO_COPY.h1_line2}
            </h1>

            <div className="hero-pills">
              {HERO_PILLS.map(p => (
                <button
                  key={p.id}
                  className={`hero-pill ${activePill === p.id ? "active" : ""}`}
                  onClick={() => setActivePill(p.id)}
                >
                  <Icon name={p.icon} size={14} />
                  {p.label}
                </button>
              ))}
            </div>

            <p className="hero-sub">
              {HERO_COPY.sub}
            </p>

            <div className="hero-ctas">
              <a href="#" className="btn btn-lg btn-primary">
                <Icon name="globe" size={18}/> {HERO_COPY.cta_web}
              </a>
              <a href="#" className="btn btn-lg">
                <Icon name="apple" size={20}/> {HERO_COPY.cta_app}
              </a>
            </div>

            {/* Avatars + short credibility line — no fake star rating */}
            <div className="trust-row">
              <AvatarStack />
              <div className="trust-copy">
                <div className="trust-line">
                  Used by <b>20,000+ students</b> at Stanford, UCL, NYU & 300 more.
                </div>
                <div className="trust-sub">Free for the first week — no card, no catch.</div>
              </div>
            </div>
          </div>

          <HeroVisual />
        </div>
      </div>
    </section>
  );
};

Object.assign(window, { Hero, HeroVisual, TopoLines, WavyOrb, PhoneLiveChat });
