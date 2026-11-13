import React, { useEffect, useRef, useState } from "react";
import { ArrowUpRight, ArrowDown, Menu, X, Linkedin } from "lucide-react";
import {
  profile,
  chapters,
  ventures,
  bookTopics,
  // insights,
  opportunities,
  beliefs,
} from "./data.js";
import { copy } from "./content.js";

const items = [
  ["philosophy", "Philosophy"],
  ["journey", "Journey"],
  ["ventures", "Ventures"],
  ["book", "The Book"],
  // ["insights", "Insights"],
];
function Eyebrow({ number, children, light = false }) {
  return (
    <div className={"eyebrow " + (light ? "light" : "")}>
      <span>{number}</span>
      <span>{children}</span>
    </div>
  );
}
function Paragraphs({ items, className = "" }) {
  return (
    <div className={"paragraphs " + className}>
      {items?.map((p, i) => (
        <p key={i}>{p}</p>
      ))}
    </div>
  );
}
function External({ href, children, className = "" }) {
  return (
    <a
      className={className}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
      <ArrowUpRight size={16} />
    </a>
  );
}
function Header() {
  const [open, setOpen] = useState(false);
  const trigger = useRef(null);
  const drawer = useRef(null);
  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    drawer.current?.querySelector("button")?.focus();
    function onKey(event) {
      if (event.key === "Escape") setOpen(false);
      if (event.key !== "Tab") return;
      const nodes = drawer.current?.querySelectorAll("a[href], button");
      const first = nodes?.[0];
      const last = nodes?.[nodes.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    }
    function onResize() {
      if (window.innerWidth >= 1024) setOpen(false);
    }
    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
      trigger.current?.focus();
    };
  }, [open]);
  return (
    <header className="site-header">
      <a href="#top" className="brand" onClick={() => setOpen(false)}>
        RN<span className="brand-dot">.</span>
        <span className="brand-caption">RAJA NARAYANASAMY</span>
      </a>
      <nav className="nav" aria-label="Main navigation">
        {items.map(([id, t]) => (
          <a key={id} href={"#" + id} onClick={() => setOpen(false)}>
            {t}
          </a>
        ))}
        <a
          className="nav-connect"
          href="#connect"
          onClick={() => setOpen(false)}
        >
          Let's connect <ArrowUpRight size={14} />
        </a>
      </nav>
      <button
        ref={trigger}
        className="menu-toggle"
        aria-label={open ? "Close navigation" : "Open navigation"}
        aria-expanded={open}
        aria-controls="mobile-navigation"
        onClick={() => setOpen(!open)}
      >
        {open ? <X /> : <Menu />}
      </button>
      {open && (
        <div className="menu-layer">
          <div className="menu-backdrop" onClick={() => setOpen(false)} />
          <div
            ref={drawer}
            className="menu-drawer"
            id="mobile-navigation"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
          >
            <div className="drawer-heading">
              <span>Menu</span>
              <button aria-label="Close menu" onClick={() => setOpen(false)}>
                <X />
              </button>
            </div>
            <nav aria-label="Mobile navigation">
              {items.map(([id, label]) => (
                <a key={id} href={`#${id}`} onClick={() => setOpen(false)}>
                  {label}
                  <ArrowUpRight size={19} />
                </a>
              ))}
            </nav>
            <a
              className="drawer-cta"
              href="#connect"
              onClick={() => setOpen(false)}
            >
              GET IN TOUCH <ArrowUpRight size={15} />
            </a>
            <div className="drawer-social">
              <span>CONNECT</span>
              <External href={profile.linkedin}>LinkedIn</External>
              <a href={`mailto:${profile.email}`}>Email</a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section className="thought-hero" id="top">
      <div className="thought-hero-inner">
        <div className="thought-hero-content">
          <div className="thought-badge">ENGINEER · ENTREPRENEUR · AUTHOR</div>

          <h1 className="thought-title">
            <span>Raja</span>
            <em>Narayanasamy.</em>
          </h1>

          <div className="thought-bottom">
            <div className="thought-description">
              <p>
                Building intelligent products and technology businesses.
                Engineer, entrepreneur, author and strategic advisor.
              </p>
            </div>

            <a href="#philosophy" className="thought-cta">
              <span className="thought-cta-circle">
                <ArrowDown size={22} strokeWidth={1.4} />
              </span>
              <span>EXPLORE THE JOURNEY</span>
            </a>
          </div>
        </div>

        <figure className="thought-photo">
          <img src={profile.portrait} alt="Raja Narayanasamy" />
          <figcaption>
            RAJA NARAYANASAMY / ENGINEER · ENTREPRENEUR · AUTHOR
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

function Philosophy() {
  return (
    <section id="philosophy" className="dark philosophy section-pad">
      <div className="wrap">
        <Eyebrow number="01 /" light>
          THE PHILOSOPHY
        </Eyebrow>
        <div className="philosophy-grid">
          <h2>
            Built on <em>experience.</em> Driven by possibility.
          </h2>
          <div className="philosophy-right">
            <p className="lead-on-dark">{copy.introduction[0]}</p>
            <p>{copy.introduction[1]}</p>
            <div className="three-pillars">
              <div>
                <span>01</span>
                {copy.foundations[0]}
              </div>
              <div>
                <span>02</span>
                {copy.foundations[1]}
              </div>
              <div>
                <span>03</span>
                {copy.foundations[2]}
              </div>
            </div>
          </div>
        </div>
        <div className="profile-metrics">
          <div>
            <strong>
              28<span>+</span>
            </strong>
            <span>YEARS IN TECHNOLOGY</span>
          </div>
          <div>
            <strong>
              120<span>+</span>
            </strong>
            <span>ENGINEERS / R&D CENTRE</span>
          </div>
          <div>
            <strong>03</strong>
            <span>TECHNOLOGY VENTURES</span>
          </div>
          <div>
            <strong>01</strong>
            <span>PUBLISHED BOOK</span>
          </div>
        </div>
      </div>
    </section>
  );
}
function Intro() {
  return (
    <section className="section-pad origin">
      <div className="wrap origin-grid">
        <div>
          <Eyebrow number="02 /">THE BEGINNING</Eyebrow>
          <h2 className="display">
            It started
            <br />
            with <em>curiosity.</em>
          </h2>
          <p className="statement">{copy.storyEnd}</p>
        </div>
        <div className="story-copy">
          <Paragraphs items={copy.story} />
          <div className="line-note">
            <span>THE THREAD THAT CONNECTS IT ALL</span>
            <strong>Engineering → People → Business</strong>
          </div>
        </div>
      </div>
    </section>
  );
}
function Journey() {
  return (
    <section id="journey" className="section-pad journey">
      <div className="wrap">
        <Eyebrow number="03 /">THE JOURNEY</Eyebrow>
        <div className="section-head">
          <h2 className="display">
            A life of <em>building.</em>
          </h2>
          <p>
            From engineering to organisations to creating technology businesses.
          </p>
        </div>
        <div className="timeline">
          {chapters.map((c, i) => (
            <article key={c.number} className="timeline-row">
              <div className="timeline-num">
                {c.number}
                <span className="timeline-marker" />
              </div>
              <div className="timeline-heading">
                <span>{c.label}</span>
                <h3>{c.title}</h3>
                {c.timeline && (
                  <div className="company-tags">
                    {c.timeline.map((x) => (
                      <b key={x}>{x}</b>
                    ))}
                  </div>
                )}
              </div>
              <div className="timeline-text">
                {c.lead && <p className="italic-lead">{c.lead}</p>}
                <Paragraphs items={c.paragraphs} />
                {c.more && (
                  <Paragraphs className="timeline-more" items={c.more} />
                )}{" "}
                {c.milestone && (
                  <div className="fact-milestone">
                    <strong>120+</strong>
                    <span>engineers / within three years</span>
                  </div>
                )}
                {c.quote && <blockquote>“{c.quote}”</blockquote>}
              </div>
            </article>
          ))}
        </div>
        <div className="timeline-outro">
          <span>05 / THE ENTREPRENEUR</span>
          <p>{copy.entrepreneur}</p>
        </div>
      </div>
    </section>
  );
}
function Ventures() {
  return (
    <section id="ventures" className="section-pad ventures-section">
      <div className="wrap">
        <Eyebrow number="04 /">ENTERPRISE & VENTURES</Eyebrow>
        <div className="section-head">
          <h2 className="display">
            Ideas into <em>enterprise.</em>
          </h2>
          <p>Turning technical capability into real-world opportunity.</p>
        </div>
        <div className="venture-list">
          {ventures.map((v, i) => (
            <article className="venture-row" key={v.name}>
              <span className="venture-index">0{i + 1}</span>
              <div>
                <h3>{v.name}</h3>
                <p className="venture-subtitle">{v.title}</p>
              </div>
              <p className="venture-description">{v.description}</p>
              <span className="venture-category">
                {v.initial} / TECHNOLOGY VENTURE
              </span>
            </article>
          ))}
        </div>
        {/* <div className="intelligent" id="intelligent-products">
          <div>
            <Eyebrow number="IN FOCUS /">INTELLIGENT PRODUCTS</Eyebrow>
            <h3>
              When AI meets
              <br />
              <em>the physical world.</em>
            </h3>
            <Paragraphs items={copy.ai} />
            <div className="tech-tags">
              {copy.technologies.map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>
          </div>
          <div className="intelligent-aside">
            <span className="aside-big">01→04</span>
            <div className="process">
              {["Sense", "Understand", "Decide", "Act"].map((n, i) => (
                <div key={n}>
                  <span>0{i + 1}</span>
                  {n}
                </div>
              ))}
            </div>
            <p>{copy.productEvolution}</p>
          </div>
        </div> */}
        {/* <div className="nemilink-panel">
          <div>
            <span>SPOTLIGHT / NEMILINK TECHNOLOGIES</span>
            <h3>
              Building intelligent
              <br />
              products.
            </h3>
          </div>
          <div>
            <Paragraphs items={copy.nemilink} />
            <External href={profile.nemilinkUrl} className="under-link">
              Explore Nemilink
            </External>
          </div>
        </div> */}
      </div>
    </section>
  );
}
function Book() {
  return (
    <section id="book" className="book-section section-pad">
      <div className="wrap">
        <Eyebrow number="05 /">THE PUBLISHED BOOK</Eyebrow>
        <div className="book-grid">
          <div className="book-visual">
            <div className="book-glow" />
            <img
              src={profile.bookCover}
              alt={`${copy.bookTitle} book cover`}
              loading="lazy"
              decoding="async"
            />
            <span>AN IDEA, NOW IN PRINT</span>
          </div>
          <div className="book-content">
            <div className="small-label">BY RAJA NARAYANASAMY</div>
            <h2 className="display">
              Experience,
              <br />
              <em>put into words.</em>
            </h2>
            <p className="book-name">{copy.bookTitle}</p>
            <p className="book-subtitle">{copy.bookSubtitle}</p>
            <Paragraphs items={copy.book} />
            <External href={profile.bookUrl} className="book-button">
              Explore the book on Amazon
            </External>
          </div>
        </div>
        <div className="inside-book">
          <span>WHAT'S INSIDE /</span>
          <div>
            {bookTopics.map((t) => (
              <span key={t}>{t}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
function Beliefs() {
  return (
    <section className="dark section-pad beliefs-section">
      <div className="wrap">
        <Eyebrow number="06 /" light>
          IDEAS THAT GUIDE ME
        </Eyebrow>
        <h2 className="display">
          The things
          <br />
          <em>I believe.</em>
        </h2>
        <div className="belief-grid">
          {beliefs.map((b, i) => (
            <article key={b.title}>
              <span>0{i + 1} / PERSPECTIVE</span>
              <h3>{b.title}</h3>
              <p>{b.description}</p>
            </article>
          ))}
        </div>
        <div className="beyond">
          <span>BEYOND BUSINESS</span>
          <p>{copy.beyond}</p>
        </div>
      </div>
    </section>
  );
}
function Insights() {
  return (
    <section id="insights" className="section-pad insights-section">
      <div className="wrap">
        <Eyebrow number="07 /">WRITING & PERSPECTIVES</Eyebrow>
        <div className="section-head">
          <h2 className="display">
            Thinking <em>out loud.</em>
          </h2>
          <p>{copy.insights}</p>
        </div>
        <div className="insight-rows">
          {insights.map((item, i) => (
            <article key={item.title}>
              <span>0{i + 1}</span>
              <div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
              {item.url ? (
                <External href={item.url}>Read insight</External>
              ) : (
                <span className="insight-kind">PERSPECTIVE</span>
              )}
            </article>
          ))}
        </div>
        <External href={profile.linkedin} className="under-link">
          Follow the conversation on LinkedIn
        </External>
      </div>
    </section>
  );
}
function Next() {
  return (
    <section className="next-section section-pad" id="next">
      <div className="wrap">
        <Eyebrow number="07 /">THE NEXT CHAPTER</Eyebrow>
        <div className="next-lead">
          <h2 className="display">
            Still <em>building.</em>
          </h2>
          <p>{copy.next}</p>
        </div>
        <div className="next-split">
          <div>
            <p>{copy.closing}</p>
            <div className="future-words">
              SEE. <span>UNDERSTAND.</span> DECIDE. <span>ACT.</span>
            </div>
            <p>{copy.future}</p>
          </div>
          <div className="opportunity-list">
            {opportunities.map((o, i) => (
              <article key={o.title}>
                <span>0{i + 1}</span>
                <h3>{o.title}</h3>
                <Paragraphs items={o.paragraphs} />
                {o.images && (
                  <div className="opportunity-images">
                    {o.images.map((img, imgIdx) => (
                      <figure key={imgIdx} className="opportunity-image-item">
                        <img
                          src={img.src}
                          alt={img.caption || "Engagement photo"}
                          loading="lazy"
                        />
                        {(img.caption || img.event) && (
                          <figcaption>
                            {img.caption && <strong>{img.caption}</strong>}
                            {img.event && <span>{img.event}</span>}
                          </figcaption>
                        )}
                      </figure>
                    ))}
                  </div>
                )}
                {o.cta && (
                  <a
                    href={
                      o.href === "#intelligent-products"
                        ? "#connect"
                        : (o.href || "#connect")
                    }
                  >
                    {o.cta} ↗
                  </a>
                )}
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
const faqs = [
  [
    "What can we collaborate on?",
    "Technology business development, India market entry, strategic partnerships, engineering capability building and intelligent product strategy. Share your context and we can explore the right next step.",
  ],
  [
    "Can I discuss an advisory opportunity?",
    "Yes. Areas of interest include AI, Edge AI, Physical AI, intelligent products, industrial technology and technology services. Please include the organisation, the challenge and the role you have in mind.",
  ],
  [
    "What topics do you speak about?",
    "Intelligent products, Edge AI, Physical AI, product engineering, GCCs, technology entrepreneurship and building technology businesses. Get in touch with your audience, event format and proposed date.",
  ],
  [
    "Where can I find the book?",
    "Engineering Intelligent Products: Practical Guide to AI, Edge, and Data Integration is linked in the book section above, where you can explore it on Amazon.",
  ],
];
function FAQ() {
  return (
    <section className="faq-section section-pad">
      <div className="wrap faq-layout">
        <div>
          <Eyebrow number="08 /">A FEW ANSWERS</Eyebrow>
          <h2 className="display">
            Before we
            <br />
            <em>begin.</em>
          </h2>
          <p>Good conversations start with a little clarity.</p>
        </div>
        <div className="faq-list">
          {faqs.map(([question, answer]) => (
            <details key={question}>
              <summary>
                {question}
                <span aria-hidden="true">+</span>
              </summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
function Contact() {
  function prepareEmail(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const subject = encodeURIComponent(
      `Website enquiry from ${data.get("name")}`,
    );
    const body = encodeURIComponent(
      `Name: ${data.get("name")}\nEmail: ${data.get("email")}\n\n${data.get("message")}`,
    );
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
  }
  return (
    <footer id="connect" className="footer">
      <div className="wrap">
        <Eyebrow number="LET'S CONNECT /">THE CONVERSATION CONTINUES</Eyebrow>
        <div className="footer-body">
          <div>
            <h2>
              Ready to
              <br />
              <em>collaborate?</em>
            </h2>
            <Paragraphs items={copy.contact} />
            <div className="contact-links">
              <span className="small-label">EMAIL</span>
              <a href={`mailto:${profile.email}`} className="footer-email">
                {profile.email} <ArrowUpRight size={23} />
              </a>
              <External href={profile.linkedin} className="footer-link">
                <Linkedin size={16} /> LinkedIn
              </External>
            </div>
          </div>
          <form className="contact-form" onSubmit={prepareEmail}>
            <label htmlFor="contact-name">FULL NAME</label>
            <input
              id="contact-name"
              name="name"
              autoComplete="name"
              placeholder="Your name"
              required
              maxLength={120}
            />
            <label htmlFor="contact-email">BUSINESS EMAIL</label>
            <input
              id="contact-email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="you@company.com"
              required
              maxLength={254}
            />
            <label htmlFor="contact-message">WHAT ARE YOU BUILDING?</label>
            <textarea
              id="contact-message"
              name="message"
              rows={5}
              placeholder="Tell me about your idea, opportunity or challenge…"
              required
              maxLength={5000}
            />
            <button type="submit">
              LET'S START A CONVERSATION <ArrowUpRight size={17} />
            </button>
            <p className="form-note">
              Opens your email app with your message ready to send.
            </p>
          </form>
        </div>
        <div className="footer-end">
          <span>RAJA NARAYANASAMY © {new Date().getFullYear()}</span>
          <span>ENGINEER AT HEART. BUILDER BY NATURE.</span>
          <a href="#top">BACK TO TOP ↑</a>
        </div>
      </div>
    </footer>
  );
}
export default function App() {
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <Header />
      <main id="main-content">
        <Hero />
        <Philosophy />
        <Intro />
        <Journey />
        <Ventures />
        <Book />
        <Beliefs />
        {/* <Insights /> */}
        <Next />
        <FAQ />
      </main>
      <Contact />
    </>
  );
}
