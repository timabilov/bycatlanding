// Pricing section

const PLANS = [
  {
    name: "Weekly",
    strike: "$5.99",
    price: "$0.00",
    per: "/week",
    desc: "Try it this week. No card nag. Cancel in two taps.",
    feats: ["Unlimited notes", "2× daily live AI tutoring", "AI chat", "Unlimited quizzes & flashcards", "Quiz notifications"],
    cta: "Start 7-day access",
    featured: false,
  },
  {
    name: "Monthly",
    strike: "$11.99",
    price: "$6.99",
    per: "/month",
    desc: "Our most-picked plan. Month-to-month, no surprises.",
    feats: ["Unlimited notes", "2× daily live AI tutoring", "AI chat", "Unlimited quizzes & flashcards", "Quiz notifications", "Priority processing"],
    cta: "Get monthly",
    featured: false,
  },
  {
    name: "Annual",
    strike: "$6.67",
    price: "$5.49",
    per: "/month",
    billed: "Billed annually ($65.84/yr)",
    desc: "Best value. Pay once, obsess about grades all year.",
    feats: ["Everything in monthly", "2 months free", "Early-access features", "Founder's Discord", "First-class email support"],
    cta: "Get annual plan",
    badge: "+2 months free",
    featured: true,
  },
];

const Pricing = () => {
  const { d, h, m, s } = useCountdown();
  const pad = (n) => String(n).padStart(2, "0");
  return (
    <section className="section" id="pricing">
      <div className="wrap">
        <div className="section-head">
          <span className="eyebrow-pill">Pricing</span>
          <h2>Invest in your grades.</h2>
          <p>Choose the plan that fits your study schedule. Cancel anytime, even after the hard quiz humbles you.</p>
          <div style={{marginTop:22}}>
            <SaleBar />
          </div>
        </div>

        <div className="pricing-grid">
          {PLANS.map((plan, i) => (
            <div key={i} className={`plan ${plan.featured ? "featured" : ""}`}>
              {plan.badge && <div className="badge">{plan.badge}</div>}
              <div className="plan-name">{plan.name}</div>
              <div className="plan-price">
                <span className="strike">{plan.strike}</span>
                <span className="now">{plan.price}</span>
                <span className="per">{plan.per}</span>
              </div>
              {plan.billed && <div style={{fontSize:12, color:"var(--text-mute)", marginBottom:4}}>{plan.billed}</div>}
              <div className="plan-desc">{plan.desc}</div>
              <ul className="plan-feats">
                {plan.feats.map((f,j)=>(
                  <li key={j}>
                    <span className="check"><Icon name="check" size={12}/></span>
                    {f}
                  </li>
                ))}
              </ul>
              <div className="plan-cta">
                <a href="#" className={`btn btn-lg ${plan.featured ? "btn-primary" : ""}`}>
                  {plan.cta}
                </a>
              </div>
            </div>
          ))}
        </div>

        <div style={{textAlign:"center", marginTop:32, color:"var(--text-mute)", fontSize:13}}>
          30-day no-questions refund · Student discount available · Prices in USD
        </div>
      </div>
    </section>
  );
};

Object.assign(window, { Pricing });
