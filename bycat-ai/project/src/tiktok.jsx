// TikTok-style 9:16 carousel with fake reviews

const TIKTOK_REVIEWS = [
  { handle: "@studywithmira", caption: "POV: you dropped your entire 400-page textbook into Bycat at 2am 😭 bycat said bet", quote: "I cried. Then I aced it.", hashtag: "#studytok #bycatai", likes: "48.2K", comments: "1,204", shares: "892", music: "original sound — mira" },
  { handle: "@phd.survival", caption: "My quals in 3 weeks. Bycat reading 11 papers a day. This is fine. This is fine.", quote: "11 papers / day.", hashtag: "#phdlife #gradschool", likes: "127K", comments: "3,412", shares: "9,204", music: "aesthetic piano — lofi" },
  { handle: "@medschoolmatt", caption: "Hard quiz tier said 'no' three times. I study three different sections now. Coincidence? No.", quote: "Humbled. Healed.", hashtag: "#medschool #usmle", likes: "72.8K", comments: "2,108", shares: "4,401", music: "study beats — lofi girl" },
  { handle: "@lawschool.jenna", caption: "Torts was carrying my lowest grade. Bycat kept pinging me with the exact questions I kept missing.", quote: "It nags in a good way.", hashtag: "#lawschool #1L", likes: "33.1K", comments: "824", shares: "1,290", music: "focus — ambient" },
  { handle: "@theoandstudy", caption: "The live AI tutor sessions at 2am are literally therapy. 10/10 would recommend to my enemies.", quote: "2am therapy sessions.", hashtag: "#studyvibes", likes: "91.7K", comments: "2,840", shares: "5,612", music: "rainy night — study" },
  { handle: "@chloe.studies", caption: "I uploaded a 3-hour organic chem lecture. Bycat gave me 47 flashcards. Read them on the bus. Got a 92.", quote: "92. On the bus.", hashtag: "#orgochem #stem", likes: "56.4K", comments: "1,612", shares: "2,104", music: "lofi study — chill" },
];

const TikTokPhone = ({ review, index }) => (
  <div className="phone">
    <div className="phone-notch"/>
    <div className="phone-screen">
      <div className="tiktok-bg"/>
      <div className="tt-user">
        <span>Following</span>
        <span className="active">For You</span>
      </div>

      <div className="tt-watermark">
        <div className="logo"><img src="assets/bycat-icon.png" alt=""/></div>
        <div className="quote">"{review.quote}"</div>
        <div className="hashtag">— using Bycat AI</div>
      </div>

      <div className="tt-sidebar">
        <div className="avatar"/>
        <div className="action">
          <span className="icon"><Icon name="heart" size={22}/></span>
          <div>{review.likes}</div>
        </div>
        <div className="action">
          <span className="icon"><Icon name="chat" size={22}/></span>
          <div>{review.comments}</div>
        </div>
        <div className="action">
          <span className="icon"><Icon name="share" size={22}/></span>
          <div>{review.shares}</div>
        </div>
      </div>

      <div className="tt-bottom">
        <div className="handle">{review.handle}</div>
        <div className="cap">{review.caption}</div>
        <div className="music"><Icon name="music" size={11}/> {review.music}</div>
      </div>
    </div>
  </div>
);

const TikTokCarousel = () => {
  const trackRef = React.useRef(null);
  const [paused, setPaused] = React.useState(false);

  React.useEffect(() => {
    let raf;
    let last = performance.now();
    const tick = (t) => {
      const dt = t - last; last = t;
      if (!paused && trackRef.current) {
        const el = trackRef.current;
        el.scrollLeft += dt * 0.04; // px/ms
        const max = el.scrollWidth - el.clientWidth;
        if (el.scrollLeft >= max - 4) el.scrollLeft = 0;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [paused]);

  // duplicate set so loop feels seamless
  const items = [...TIKTOK_REVIEWS, ...TIKTOK_REVIEWS];

  return (
    <section className="section" id="reviews">
      <div className="wrap">
        <div className="section-head">
          <span className="eyebrow-pill">
            <Icon name="flame" size={12} style={{color:"var(--pink)"}}/> Trending on TikTok
          </span>
          <h2>Real students. Real all-nighters.</h2>
          <p>Tagged us, posted themselves, cried in public. We just made the tool.</p>
        </div>
      </div>

      <div
        className="tiktok-rail"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div className="tiktok-track" ref={trackRef}>
          {items.map((r, i) => <TikTokPhone key={i} review={r} index={i}/>)}
        </div>
      </div>

      <div className="wrap" style={{textAlign:"center", marginTop:24}}>
        <a href="#" className="btn btn-sm"><Icon name="flame" size={13}/> See 200+ more on TikTok</a>
      </div>
    </section>
  );
};

Object.assign(window, { TikTokCarousel });
