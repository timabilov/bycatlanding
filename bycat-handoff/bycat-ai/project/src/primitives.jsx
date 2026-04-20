// Shared primitives: icons, nav, sale banner, small helpers

const Icon = ({ name, size = 16, className = "", ...rest }) => {
  const common = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round", className, ...rest };
  const paths = {
    pdf: <><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5"/></>,
    video: <><rect x="3" y="6" width="14" height="12" rx="2"/><path d="m17 10 4-2v8l-4-2z"/></>,
    audio: <><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="3" fill="currentColor"/></>,
    notes: <><path d="M8 6h13M8 12h13M8 18h13"/><circle cx="4" cy="6" r="1" fill="currentColor"/><circle cx="4" cy="12" r="1" fill="currentColor"/><circle cx="4" cy="18" r="1" fill="currentColor"/></>,
    arrow: <><path d="M5 12h14M13 5l7 7-7 7"/></>,
    play: <path d="M8 5v14l11-7z" fill="currentColor"/>,
    sparkle: <><path d="M12 2v5M12 17v5M2 12h5M17 12h5M5.6 5.6l3.5 3.5M14.9 14.9l3.5 3.5M5.6 18.4l3.5-3.5M14.9 9.1l3.5-3.5"/></>,
    star: <path d="M12 2l2.9 6.9L22 10l-5.5 4.7L18 22l-6-3.6L6 22l1.5-7.3L2 10l7.1-1.1z" fill="currentColor" stroke="none"/>,
    check: <path d="M5 12l5 5 9-11"/>,
    x: <><path d="M18 6L6 18"/><path d="M6 6l12 12"/></>,
    moon: <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/>,
    sun: <><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></>,
    apple: <path d="M17.6 13.3c0-2.8 2.3-4.2 2.4-4.2-1.3-1.9-3.3-2.2-4-2.2-1.7-.2-3.3 1-4.2 1-.9 0-2.2-1-3.7-1-1.9 0-3.6 1.1-4.6 2.8-2 3.4-.5 8.4 1.4 11.1.9 1.4 2 2.9 3.5 2.8 1.4-.1 1.9-.9 3.6-.9 1.7 0 2.1.9 3.6.9 1.5 0 2.4-1.4 3.3-2.8 1-1.6 1.5-3.1 1.5-3.2 0 0-2.8-1.1-2.8-4.3zM14.8 5.1c.8-.9 1.3-2.2 1.1-3.5-1.1.1-2.4.7-3.2 1.6-.7.8-1.3 2.1-1.1 3.4 1.2.1 2.4-.6 3.2-1.5z" fill="currentColor" stroke="none"/>,
    globe: <><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/></>,
    x_social: <path d="M18 4l-6 8 6 8M6 4l6 8-6 8" />,
    discord: <><path d="M8 12a1 1 0 100-2 1 1 0 000 2z" fill="currentColor"/><path d="M16 12a1 1 0 100-2 1 1 0 000 2z" fill="currentColor"/><path d="M5 18l-1 3 3-1c1.5.6 3.2 1 5 1s3.5-.4 5-1l3 1-1-3c1.2-1.5 2-3.6 2-6 0-5-3.6-8-9-8S3 7 3 12c0 2.4.8 4.5 2 6z"/></>,
    menu: <><path d="M3 6h18M3 12h18M3 18h18"/></>,
    zap: <path d="M13 2L3 14h8l-1 8 10-12h-8z"/>,
    upload: <><path d="M12 15V3M7 8l5-5 5 5M5 21h14"/></>,
    brain: <path d="M12 5a3 3 0 0 0-3 3v1a3 3 0 0 0-2 5.5V16a3 3 0 0 0 5 2.2A3 3 0 0 0 17 16v-1.5A3 3 0 0 0 15 9V8a3 3 0 0 0-3-3z"/>,
    heart: <path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.5-7 10-7 10z" fill="currentColor"/>,
    chat: <path d="M21 12a8 8 0 0 1-8 8 8 8 0 0 1-4-1l-4 1 1-4a8 8 0 1 1 15-4z"/>,
    share: <><circle cx="6" cy="12" r="2"/><circle cx="18" cy="6" r="2"/><circle cx="18" cy="18" r="2"/><path d="M8 11l8-4M8 13l8 4"/></>,
    music: <><path d="M9 18V6l11-3v12"/><circle cx="6" cy="18" r="3"/><circle cx="17" cy="15" r="3"/></>,
    flame: <path d="M12 2s-3 4-3 8a3 3 0 0 0 3 3 3 3 0 0 0 3-3c0-1.5-.5-3-1-4 2 1 5 4 5 8a7 7 0 1 1-14 0c0-5 4-8 7-12z"/>,
    clock: <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>,
    book: <path d="M4 4v16h15a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1H4zM4 4v16M8 4v16"/>,
    cards: <><rect x="3" y="5" width="14" height="16" rx="2"/><path d="M7 1h14a1 1 0 0 1 1 1v14"/></>,
    sliders: <><path d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6"/></>,
    bell: <><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10 21a2 2 0 0 0 4 0"/></>,
    "mic-off": <><path d="M2 2l20 20M9 9v3a3 3 0 0 0 5 2M15 9V6a3 3 0 0 0-6 0M5 12a7 7 0 0 0 12 5M12 19v3"/></>,
    signal: <><path d="M2 18h2v2H2zM7 14h2v6H7zM12 10h2v10h-2zM17 6h2v14h-2z" fill="currentColor" stroke="none"/></>,
    wifi: <><path d="M2 9a15 15 0 0 1 20 0M5 13a10 10 0 0 1 14 0M8.5 16.5a5 5 0 0 1 7 0"/><circle cx="12" cy="20" r="1.2" fill="currentColor" stroke="none"/></>,
  };
  return <svg {...common}>{paths[name]}</svg>;
};

const Nav = ({ theme, onToggleTheme }) => (
  <nav className="nav">
    <div className="wrap nav-inner">
      <a href="#" className="brand">
        <div className="brand-icon"><img src="assets/bycat-icon.png" alt="Bycat"/></div>
        <span>Bycat AI</span>
      </a>
      <div className="nav-links">
        <a href="#how">How it works</a>
        <a href="#reviews">Reviews</a>
        <a href="#compare">Compare</a>
        <a href="#pricing">Pricing</a>
        <a href="#blog">Blog</a>
      </div>
      <div className="nav-right">
        <button className="icon-btn" aria-label="Discord"><Icon name="discord" /></button>
        <button className="icon-btn" aria-label="X"><Icon name="x_social" /></button>
        <button className="icon-btn" aria-label="Theme" onClick={onToggleTheme}>
          <Icon name={theme === "dark" ? "sun" : "moon"} />
        </button>
        <a href="#pricing" className="btn btn-sm btn-primary" style={{marginLeft: 4}}>Get started</a>
      </div>
    </div>
  </nav>
);

// Animated countdown → fake fixed-ish ending
const useCountdown = () => {
  const target = React.useMemo(() => {
    // 15d 15h 56m from "now" on first render
    return Date.now() + (15 * 24 * 3600 + 15 * 3600 + 56 * 60) * 1000;
  }, []);
  const [now, setNow] = React.useState(Date.now());
  React.useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const diff = Math.max(0, target - now);
  const s = Math.floor(diff / 1000);
  const d = Math.floor(s / 86400);
  const h = Math.floor((s % 86400) / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  return { d, h, m, s: sec };
};

const SaleBar = () => {
  const { d, h, m, s } = useCountdown();
  const pad = (n) => String(n).padStart(2, "0");
  return (
    <div className="sale-bar">
      <span className="tag"><Icon name="flame" size={11}/>SALE</span>
      <span>50% off annual plans</span>
      <span className="sep"/>
      <span className="countdown">
        <Icon name="clock" size={12}/>
        <span className="mono">{d}d {pad(h)}h {pad(m)}m {pad(s)}s</span>
      </span>
      <Icon name="arrow" size={13}/>
    </div>
  );
};

Object.assign(window, { Icon, Nav, SaleBar, useCountdown });
