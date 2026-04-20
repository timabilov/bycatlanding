// Sparkle cursor trail + easter egg + tweaks panel

const SparkleCursor = () => {
  React.useEffect(() => {
    let lastSpawn = 0;
    const onMove = (e) => {
      const now = performance.now();
      if (now - lastSpawn < 60) return;
      lastSpawn = now;
      const s = document.createElement("div");
      s.className = "sparkle-trail";
      s.style.left = (e.clientX - 4) + "px";
      s.style.top = (e.clientY - 4) + "px";
      // small random hue variance
      const colors = ["#f472b6", "#ec4899", "#a78bfa", "#60a5fa"];
      const c = colors[Math.floor(Math.random() * colors.length)];
      s.style.background = c;
      s.style.boxShadow = `0 0 8px ${c}`;
      document.body.appendChild(s);
      setTimeout(() => s.remove(), 800);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);
  return null;
};

const EasterEgg = () => {
  const [count, setCount] = React.useState(0);
  const [toast, setToast] = React.useState(null);
  const [unlocked, setUnlocked] = React.useState(false);

  React.useEffect(() => {
    window.__bumpEgg = () => {
      setCount(c => {
        const next = c + 1;
        const messages = {
          1: "meow.",
          3: "the cat notices you.",
          5: "the cat purrs.",
          7: "ok you have the cat's attention now.",
          9: "🎁 achievement unlocked: cat whisperer",
        };
        if (messages[next]) {
          setToast(messages[next]);
          setTimeout(() => setToast(null), 2400);
        }
        if (next === 9) setUnlocked(true);
        return next;
      });
    };
    return () => { delete window.__bumpEgg; };
  }, []);

  if (!toast) return null;
  return (
    <div className="egg-toast">
      <span style={{fontSize:18}}>🐾</span>
      <span style={{fontSize:14}}>{toast}</span>
      {unlocked && count === 9 && <span className="mono" style={{fontSize:11, color:"var(--pink-2)"}}>CODE: NINELIVES</span>}
    </div>
  );
};

const TweaksPanel = ({ theme, setTheme, active }) => {
  if (!active) return null;
  return (
    <div className="tweaks-panel">
      <h5>Tweaks</h5>
      <div className="tweak-row">
        <span>Theme</span>
        <div className="toggle">
          <button className={theme==="dark"?"active":""} onClick={()=>setTheme("dark")}>Dark</button>
          <button className={theme==="light"?"active":""} onClick={()=>setTheme("light")}>Light</button>
        </div>
      </div>
      <div style={{fontSize:11, color:"var(--text-mute)", marginTop:8, lineHeight:1.4}}>
        Tip: click the cat mascot. Nine times. Seriously.
      </div>
    </div>
  );
};

Object.assign(window, { SparkleCursor, EasterEgg, TweaksPanel });
