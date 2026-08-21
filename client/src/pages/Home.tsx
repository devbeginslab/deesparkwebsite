/**
 * Design reminder — Cobalt Botanical Ledger:
 * Editorial, practical wellness commerce using warm paper, Deespark Cobalt,
 * botanical accents, generous whitespace, and untouched source imagery.
 */
import { useEffect, useState, type CSSProperties, type FormEvent } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  CircleCheck,
  ChevronDown,
  Leaf,
  Menu,
  MessageCircle,
  Send,
  ShieldCheck,
  Sparkles,
  Truck,
  X,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";

const WHATSAPP = "https://wa.me/2349030325735";
const isGitHubPagesBuild = import.meta.env.VITE_GITHUB_PAGES === "true";
const assetPath = (filename: string, manusPath: string) =>
  isGitHubPagesBuild ? `${import.meta.env.BASE_URL}assets/${filename}` : manusPath;

const assets = {
  logo: assetPath("deespark-logo-original.png", "/manus-storage/deespark-logo-original_2a1d411c.png"),
  deenormalizer: assetPath("deenormalizer-original.png", "/manus-storage/deenormalizer-original_0aba1700.png"),
  orzaklin: assetPath("orzaklin-original.png", "/manus-storage/orzaklin-original_b6403e64.png"),
  invekior: assetPath("invekior-original.png", "/manus-storage/invekior-original_2a5c481b.png"),
  glassesLookOne: assetPath("glasses-look-one-original.jpeg", "/manus-storage/glasses-look-one-original_b90f6f8b.jpeg"),
  glassesLookTwo: assetPath("glasses-look-two-original.png", "/manus-storage/glasses-look-two-original_91185e6c.png"),
  paperGrain: assetPath("deespark-paper-grain.jpg", "/manus-storage/deespark-paper-grain_c9cabe83.jpg"),
  heroBotanical: assetPath("deespark-hero-botanical-paper.jpg", "/manus-storage/deespark-hero-botanical-paper_e0bd76a9.jpg"),
  eyewearSurface: assetPath("deespark-eyewear-surface.jpg", "/manus-storage/deespark-eyewear-surface_7b1a6550.jpg"),
};

const LOGO = assets.logo;
const surfaceStyles = {
  "--paper-grain": `url("${assets.paperGrain}")`,
  "--hero-botanical": `url("${assets.heroBotanical}")`,
  "--eyewear-surface": `url("${assets.eyewearSurface}")`,
} as CSSProperties & Record<`--${string}`, string>;

const products = [
  {
    number: "01",
    name: "Deenormalizer",
    label: "Herbal Capsules · 30 capsules",
    description:
      "A carefully presented herbal capsule for people exploring everyday heart and general wellness support.",
    image: assets.deenormalizer,
    message: "Hello Deespark Wellness, I would like to order Deenormalizer Herbal Capsules.",
    accent: "cobalt",
    width: 1536,
    height: 1024,
  },
  {
    number: "02",
    name: "Orzaklin",
    label: "Gastrointestinal Herbal Capsule",
    description:
      "A herbal option for customers looking to support a comfortable digestive routine and everyday balance.",
    image: assets.orzaklin,
    message: "Hello Deespark Wellness, I would like to order Orzaklin Herbal Capsule.",
    accent: "green",
    width: 1305,
    height: 1205,
  },
  {
    number: "03",
    name: "Invekior",
    label: "Herbal Capsule · 30 capsules",
    description:
      "A thoughtfully packaged herbal capsule for customers considering a plant-based addition to their wellness routine.",
    image: assets.invekior,
    message: "Hello Deespark Wellness, I would like to order Invekior Herbal Capsule.",
    accent: "marigold",
    width: 1355,
    height: 1160,
  },
];

const eyewear = [
  {
    title: "Everyday frames",
    description: "Polished, wearable frames for a composed daily look.",
    image: assets.glassesLookOne,
    message: "Hello Deespark Wellness, I would like to ask about your everyday eyewear frames.",
    width: 768,
    height: 1360,
  },
  {
    title: "Statement frames",
    description: "Expressive silhouettes chosen to bring a little confidence to your edit.",
    image: assets.glassesLookTwo,
    message: "Hello Deespark Wellness, I would like to ask about your statement eyewear frames.",
    width: 1254,
    height: 1254,
  },
];

function whatsappLink(message: string) {
  return `${WHATSAPP}?text=${encodeURIComponent(message)}`;
}

export default function Home() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [formStatus, setFormStatus] = useState<"idle" | "opening" | "success">("idle");
  const [inquiryCategory, setInquiryCategory] = useState("");
  const [categoryError, setCategoryError] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 14);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const favicon = document.querySelector<HTMLLinkElement>("link[rel='icon']") ?? document.createElement("link");
    favicon.rel = "icon";
    favicon.href = LOGO;
    if (!favicon.parentNode) document.head.appendChild(favicon);
  }, []);

  const closeMenu = () => setOpen(false);

  const handleContactSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!inquiryCategory) {
      setCategoryError(true);
      return;
    }

    const form = event.currentTarget;
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    const category = String(data.get("category") ?? "").trim();
    const contactDetails = [phone ? `Phone: ${phone}` : "", email ? `Email: ${email}` : ""].filter(Boolean).join("\n");
    const enquiry = [
      `Hello Deespark Wellness, my name is ${name}.`,
      `My enquiry category is: ${category}.`,
      "I would like assistance with the following:",
      message,
      contactDetails ? `My contact details:\n${contactDetails}` : "",
    ].filter(Boolean).join("\n\n");

    setFormStatus("opening");
    window.open(whatsappLink(enquiry), "_blank", "noopener,noreferrer");
    window.setTimeout(() => {
      setFormStatus("success");
      form.reset();
      setInquiryCategory("");
      window.setTimeout(() => setFormStatus("idle"), 4800);
    }, 650);
  };

  const resetFormFeedback = () => {
    setFormStatus("idle");
    setCategoryError(false);
  };

  return (
    <div className="site-shell" style={surfaceStyles}>
      <header className={`site-header ${scrolled ? "site-header--scrolled" : ""}`}>
        <div className="header-inner">
          <a className="brand-lockup" href="#top" aria-label="Deespark Wellness home">
            <img src={LOGO} alt="Deespark Wellness" />
            <span className="brand-lockup__wordmark"><strong>Deespark</strong><small>Wellness Company</small></span>
          </a>

          <nav className="desktop-nav" aria-label="Primary navigation">
            <a href="#products">Products</a>
            <a href="#eyewear">Eyewear</a>
            <a href="#why-deespark">Why Deespark</a>
            <a href="#contact">Contact</a>
          </nav>

          <a
            className="header-order"
            href={whatsappLink("Hello Deespark Wellness, I would like to make an order.")}
            target="_blank"
            rel="noreferrer"
          >
            <MessageCircle size={17} />
            <span>Order on WhatsApp</span>
          </a>

          <button
            className="menu-toggle"
            type="button"
            aria-label={open ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X size={24} strokeWidth={1.8} /> : <Menu size={25} strokeWidth={1.8} />}
          </button>
        </div>
      </header>

      <div className={`mobile-menu ${open ? "mobile-menu--open" : ""}`} aria-hidden={!open}>
        <div className="mobile-menu__content">
          <p className="eyebrow">Explore Deespark</p>
          <a href="#products" onClick={closeMenu}>Herbal products <ArrowRight size={18} /></a>
          <a href="#eyewear" onClick={closeMenu}>Eyewear collection <ArrowRight size={18} /></a>
          <a href="#why-deespark" onClick={closeMenu}>Why choose us <ArrowRight size={18} /></a>
          <a href="#contact" onClick={closeMenu}>Contact us <ArrowRight size={18} /></a>
          <a
            className="mobile-menu__whatsapp"
            href={whatsappLink("Hello Deespark Wellness, I would like to make an order.")}
            target="_blank"
            rel="noreferrer"
          >
            <MessageCircle size={19} /> Start a WhatsApp order
          </a>
        </div>
      </div>

      <main id="top">
        <section className="hero-section" aria-labelledby="hero-title">
          <div className="hero-paper" />
          <div className="hero-layout">
            <div className="hero-copy">
              <div className="hero-label"><span /> Deespark Wellness Company</div>
              <h1 id="hero-title">Wellness choices, <em>made easier</em> to explore.</h1>
              <p>
                Explore herbal wellness products and thoughtfully selected eyewear,
                with a clear path to ordering through WhatsApp.
              </p>
              <div className="hero-actions">
                <a
                  className="primary-link"
                  href={whatsappLink("Hello Deespark Wellness, I would like to make an order.")}
                  target="_blank"
                  rel="noreferrer"
                >
                  <MessageCircle size={19} />
                  Order Now
                  <ArrowUpRight size={18} />
                </a>
                <a className="text-link" href="#products">Browse products <ArrowDown /></a>
              </div>
              <div className="hero-note">
                <span className="hero-note__dot" />
                Fast, direct ordering at <strong>090 3032 5735</strong>
              </div>
            </div>

            <div className="hero-product" aria-label="Featured Deenormalizer Herbal Capsules">
              <div className="hero-product__tag">Featured wellness product <ArrowUpRight size={15} /></div>
              <div className="hero-product__frame">
                <img
                  src={assets.deenormalizer}
                  alt="Deenormalizer Herbal Capsules"
                  width={1536}
                  height={1024}
                  fetchPriority="high"
                  decoding="async"
                />
              </div>
              <div className="hero-product__caption">
                <span>Deenormalizer</span>
                <span>30 capsules</span>
              </div>
            </div>
          </div>
          <div className="hero-scroll"><span>Scroll to explore</span><ChevronDown size={18} /></div>
        </section>

        <section className="product-section" id="products" aria-labelledby="products-title">
          <div className="section-heading section-heading--split">
            <div>
              <p className="eyebrow">The herbal edit</p>
              <h2 id="products-title">Find the product that fits your <em>everyday rhythm.</em></h2>
            </div>
            <p className="section-intro">
              Browse our current herbal selection, then use WhatsApp for availability,
              ordering, and questions before you buy.
            </p>
          </div>

          <div className="product-list">
            {products.map((product, index) => (
              <article className={`product-row product-row--${product.accent}`} key={product.name}>
                <div className="product-row__number">{product.number}</div>
                <div className="product-row__image">
                  <img
                    src={product.image}
                    alt={product.name}
                    width={product.width}
                    height={product.height}
                    loading={index === 0 ? "eager" : "lazy"}
                    decoding="async"
                  />
                </div>
                <div className="product-row__details">
                  <p className="product-row__label">{product.label}</p>
                  <h3>{product.name}</h3>
                  <p>{product.description}</p>
                  <a
                    href={whatsappLink(product.message)}
                    target="_blank"
                    rel="noreferrer"
                    className="product-order"
                    aria-label={`Order ${product.name} on WhatsApp`}
                  >
                    <MessageCircle size={17} /> Order Now <ArrowUpRight size={17} />
                  </a>
                </div>
                <div className="product-row__mark"><Leaf size={27} strokeWidth={1.25} /></div>
              </article>
            ))}
          </div>
          <p className="product-disclaimer">
            <ShieldCheck size={17} /> Product information is for general awareness. Please read the pack and speak with a qualified health professional if you have questions about suitability.
          </p>
        </section>

        <section className="eyewear-section" id="eyewear" aria-labelledby="eyewear-title">
          <div className="eyewear-backdrop" />
          <div className="eyewear-inner">
            <div className="eyewear-intro">
              <p className="eyebrow">The eyewear edit</p>
              <p className="ledger-index">02 / Frame journal</p>
              <h2 id="eyewear-title">A considered frame changes the <em>whole look.</em></h2>
              <p>
                Alongside wellness, Deespark offers stylish frames for the everyday moments
                that deserve to feel put together.
              </p>
              <a href={whatsappLink("Hello Deespark Wellness, I would like to ask about your eyewear collection.")} target="_blank" rel="noreferrer" className="secondary-link">
                View eyewear availability <ArrowUpRight size={18} />
              </a>
            </div>
            <div className="eyewear-grid">
              {eyewear.map((item, index) => (
                <article className={`eyewear-card eyewear-card--${index + 1}`} key={item.title}>
                  <div className="eyewear-card__image">
                    <img src={item.image} alt={item.title} width={item.width} height={item.height} loading="lazy" decoding="async" />
                  </div>
                  <div className="eyewear-card__content">
                    <span>0{index + 1}</span>
                    <p className="eyewear-card__meta">Frame note / Style edit</p>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                    <a href={whatsappLink(item.message)} target="_blank" rel="noreferrer" aria-label={`Ask about ${item.title}`}>
                      <ArrowUpRight size={20} />
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="value-section" id="why-deespark" aria-labelledby="value-title">
          <div className="value-section__top">
            <div className="value-section__index">
              <p className="eyebrow">The Deespark way</p>
              <p className="ledger-index">03 / Service notes</p>
            </div>
            <h2 id="value-title">Clear choices. Direct service. <em>Thoughtful details.</em></h2>
          </div>
          <div className="value-grid">
            <article>
              <Leaf size={26} strokeWidth={1.3} />
              <span>01</span>
              <h3>Nature-minded range</h3>
              <p>Herbal products presented clearly so you can begin a more informed conversation about what you need.</p>
            </article>
            <article>
              <Sparkles size={26} strokeWidth={1.3} />
              <span>02</span>
              <h3>Curated with care</h3>
              <p>A selective collection designed to bring wellness and personal style into one easy-to-explore space.</p>
            </article>
            <article>
              <Truck size={26} strokeWidth={1.3} />
              <span>03</span>
              <h3>Simple to order</h3>
              <p>Use WhatsApp to confirm availability, ask your questions, and arrange a straightforward order.</p>
            </article>
          </div>
        </section>

        <section className="contact-section" id="contact" aria-labelledby="contact-title">
          <div className="contact-section__inner">
            <div className="contact-copy">
              <p className="eyebrow">A direct line to Deespark</p>
              <p className="ledger-index">04 / Customer correspondence</p>
              <h2 id="contact-title">Tell us how we can <em>help today.</em></h2>
              <p>
                Send your enquiry below and we will open WhatsApp with your details prepared,
                so you can continue the conversation directly with our team.
              </p>
              <a href={WHATSAPP} target="_blank" rel="noreferrer" className="contact-copy__phone">
                <MessageCircle size={18} /> 090 3032 5735 <ArrowUpRight size={17} />
              </a>
            </div>

            <form className="contact-form" onSubmit={handleContactSubmit}>
              <div className="contact-form__heading">
                <span>04</span>
                <div>
                  <p>Customer correspondence</p>
                  <small>WhatsApp handoff form</small>
                </div>
                <i aria-hidden="true" />
              </div>
              <div className="contact-form__grid">
                <label>
                  <span>Your name <b>*</b></span>
                  <input name="name" type="text" autoComplete="name" required placeholder="Your full name" onChange={resetFormFeedback} />
                </label>
                <label>
                  <span>Phone number</span>
                  <input name="phone" type="tel" autoComplete="tel" inputMode="tel" placeholder="Your preferred number" onChange={resetFormFeedback} />
                </label>
                <label className="contact-form__wide">
                  <span>Email address</span>
                  <input name="email" type="email" autoComplete="email" inputMode="email" placeholder="you@example.com" onChange={resetFormFeedback} />
                </label>
                <label className="contact-form__wide">
                  <span>Enquiry category <b>*</b></span>
                  <input type="hidden" name="category" value={inquiryCategory} />
                  <Select value={inquiryCategory} onValueChange={(value) => { setInquiryCategory(value); setCategoryError(false); setFormStatus("idle"); }}>
                    <SelectTrigger className="contact-form__select" aria-label="Enquiry category" aria-invalid={categoryError}>
                      <SelectValue placeholder="Select what you need help with" />
                    </SelectTrigger>
                    <SelectContent className="contact-form__select-content">
                      <SelectItem value="Products">Products</SelectItem>
                      <SelectItem value="Delivery">Delivery</SelectItem>
                      <SelectItem value="Eyewear">Eyewear</SelectItem>
                      <SelectItem value="General support">General support</SelectItem>
                    </SelectContent>
                  </Select>
                  {categoryError && <small className="contact-form__error">Please select an enquiry category.</small>}
                </label>
                <label className="contact-form__wide">
                  <span>How can we help? <b>*</b></span>
                  <textarea name="message" required rows={4} placeholder="Tell us what you would like to ask about." onChange={resetFormFeedback} />
                </label>
              </div>
              <div className="contact-form__action">
                <button type="submit" disabled={formStatus === "opening"} aria-busy={formStatus === "opening"}>
                  {formStatus === "opening" ? <Spinner /> : <Send size={17} />}
                  {formStatus === "opening" ? "Preparing your message" : "Continue in WhatsApp"}
                  {formStatus !== "opening" && <ArrowUpRight size={17} />}
                </button>
                <div className={`contact-form__status contact-form__status--${formStatus}`} aria-live="polite">
                  {formStatus === "opening" && <><Spinner /> Preparing WhatsApp with your enquiry details.</>}
                  {formStatus === "success" && <><CircleCheck size={17} /> Your enquiry is ready in WhatsApp. We will be happy to help.</>}
                  {formStatus === "idle" && "Your form details are not stored on this website."}
                </div>
              </div>
            </form>
          </div>
        </section>

        <section className="cta-section" aria-labelledby="cta-title">
          <div className="cta-section__line" />
          <div>
            <p className="eyebrow">Ready when you are</p>
            <p className="ledger-index">05 / Direct ordering</p>
            <h2 id="cta-title">Choose a product.<br /><em>Start your WhatsApp order.</em></h2>
          </div>
          <div className="cta-service-note"><span>WhatsApp orders & enquiries</span><strong>090 3032 5735</strong></div>
          <a href={whatsappLink("Hello Deespark Wellness, I would like to make an order.")} target="_blank" rel="noreferrer" className="cta-circle">
            <MessageCircle size={27} />
            <span>Message<br />Deespark</span>
            <ArrowUpRight size={20} />
          </a>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-main">
          <a className="footer-logo" href="#top">
            <img src={LOGO} alt="Deespark Wellness" />
            <span><strong>Deespark</strong><small>Wellness Company</small></span>
          </a>
          <div className="footer-contact">
            <p>For orders & enquiries</p>
            <a href={WHATSAPP} target="_blank" rel="noreferrer">090 3032 5735 <ArrowUpRight size={16} /></a>
          </div>
          <div className="footer-nav">
            <a href="#products">Herbal products</a>
            <a href="#eyewear">Eyewear</a>
            <a href="#why-deespark">Why Deespark</a>
          </div>
        </div>
        <div className="footer-bottom"><span>© {new Date().getFullYear()} Deespark Wellness Company</span><span>Natural wellness & considered style</span></div>
      </footer>

      <a
        className={`floating-whatsapp ${open ? "floating-whatsapp--hidden" : ""}`}
        href={whatsappLink("Hello! Welcome to Deespark Wellness. How can we help you today?")}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat with Deespark on WhatsApp for general customer enquiries"
      >
        <span className="floating-whatsapp__icon"><MessageCircle size={22} strokeWidth={2} /></span>
        <span className="floating-whatsapp__copy">
          <strong>Chat with us</strong>
          <small>General enquiries</small>
        </span>
      </a>
    </div>
  );
}

function ArrowDown() {
  return <ArrowRight size={17} className="arrow-down" />;
}
