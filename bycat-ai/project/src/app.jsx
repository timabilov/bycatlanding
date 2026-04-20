// Root app

const App = () => {
  const initialTheme = (window.__TWEAKS__ && window.__TWEAKS__.theme) || "dark";
  const [theme, setTheme] = React.useState(initialTheme);
  const [tweaksOn, setTweaksOn] = React.useState(false);

  React.useEffect(() => {
    document.body.dataset.theme = theme;
    try {
      window.parent.postMessage({ type: "__edit_mode_set_keys", edits: { theme } }, "*");
    } catch(e) {}
  }, [theme]);

  // Tweaks protocol — register listener FIRST, then announce
  React.useEffect(() => {
    const onMsg = (e) => {
      if (!e.data || !e.data.type) return;
      if (e.data.type === "__activate_edit_mode") setTweaksOn(true);
      if (e.data.type === "__deactivate_edit_mode") setTweaksOn(false);
    };
    window.addEventListener("message", onMsg);
    try {
      window.parent.postMessage({ type: "__edit_mode_available" }, "*");
    } catch(e) {}
    return () => window.removeEventListener("message", onMsg);
  }, []);

  const toggleTheme = () => setTheme(t => t === "dark" ? "light" : "dark");

  return (
    <>
      <Nav theme={theme} onToggleTheme={toggleTheme}/>
      <Hero/>
      <DemoVideo/>
      <StatsStrip/>
      <HowItWorks/>
      <TikTokCarousel/>
      <UniversityRail/>
      <Testimonials/>
      <Compare/>
      <Pricing/>
      <FinalCta/>
      <Footer/>
      <SparkleCursor/>
      <EasterEgg/>
      <TweaksPanel theme={theme} setTheme={setTheme} active={tweaksOn}/>
    </>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App/>);
