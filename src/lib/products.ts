const CDN =
  "https://whitelion-assets.blr1.cdn.digitaloceanspaces.com/website/home/products";

export type Variant = { color: string; src: string };

export type Product = {
  slug: string;
  name: string;
  tagline: string;
  desc: string;
  long: string;
  variants: Variant[];
  highlights: string[];
  features: { title: string; desc: string }[];
  specs: { k: string; v: string }[];
};

export const PRODUCTS: Product[] = [
  {
    slug: "posh",
    name: "Posh",
    tagline: "The Evolution of Class",
    desc: "Smart touch panels with an elegant design and precise control.",
    long: "Posh brings a refined glass face to everyday control — lights, fans and scenes respond to a single, satisfying touch, online or off.",
    variants: [
      { color: "#000000", src: `${CDN}/PoshBlack.png` },
      { color: "#EFEFEF", src: `${CDN}/PoshWhite.png` },
    ],
    highlights: ["Capacitive glass touch", "Local + app control", "7-year warranty"],
    features: [
      { title: "Edge-lit glass", desc: "A tempered, anti-glare face with an always-on status glow." },
      { title: "Works offline", desc: "Touch and automations keep working even without internet." },
      { title: "Scenes & schedules", desc: "One tap sets a whole room; routines run on time or presence." },
      { title: "Voice ready", desc: "Pairs with Alexa and Google Assistant for hands-free control." },
      { title: "Retrofit friendly", desc: "Fits a standard back-box — upgrade without rewiring." },
      { title: "Surge protected", desc: "Built-in protection keeps the electronics safe." },
    ],
    specs: [
      { k: "Power", v: "AC 100–240V, 50/60Hz" },
      { k: "Connectivity", v: "Wi-Fi 2.4GHz + RF mesh" },
      { k: "Finish", v: "Toughened glass" },
      { k: "Install", v: "Standard modular back-box" },
      { k: "Warranty", v: "7 years" },
    ],
  },
  {
    slug: "quartz",
    name: "Quartz",
    tagline: "Pinnacle of Beauty",
    desc: "Frameless toughened-glass panels with a stunning modern aesthetic.",
    long: "Quartz removes the frame entirely — an edge-to-edge sheet of toughened glass that sits almost flush with the wall for a clean, architectural look.",
    variants: [
      { color: "#000000", src: `${CDN}/QuartzBlack.png` },
      { color: "#EFEFEF", src: `${CDN}/QuartzWhite.png` },
    ],
    highlights: ["Frameless glass", "Slim profile", "Local + app control"],
    features: [
      { title: "Frameless face", desc: "Edge-to-edge toughened glass with no visible bezel." },
      { title: "Ambient glow", desc: "Soft indicators that find every key in the dark." },
      { title: "Scenes & schedules", desc: "Whole-room moods on a single tap or timer." },
      { title: "Voice ready", desc: "Works with popular voice assistants." },
      { title: "Offline-first", desc: "A local mesh keeps control instant and reliable." },
      { title: "Retrofit friendly", desc: "Drops into existing back-boxes." },
    ],
    specs: [
      { k: "Power", v: "AC 100–240V, 50/60Hz" },
      { k: "Connectivity", v: "Wi-Fi 2.4GHz + RF mesh" },
      { k: "Finish", v: "Frameless toughened glass" },
      { k: "Install", v: "Standard modular back-box" },
      { k: "Warranty", v: "7 years" },
    ],
  },
  {
    slug: "airtouch",
    name: "AirTouch",
    tagline: "Elegantly Smooth. Instinctively Responsive.",
    desc: "Matte-finish smart panels with a smooth touch and surge protection.",
    long: "AirTouch trades shine for a soft matte surface that resists fingerprints and glare, with a responsive multi-zone touch grid.",
    variants: [
      { color: "#000000", src: `${CDN}/AirTouchBlack.png` },
      { color: "#EFEFEF", src: `${CDN}/AirTouchWhite.png` },
    ],
    highlights: ["Anti-glare matte", "Surge protection", "Multi-zone touch"],
    features: [
      { title: "Matte surface", desc: "Fingerprint and glare resistant in any light." },
      { title: "Multi-zone grid", desc: "Independent touch zones for every load." },
      { title: "Surge protected", desc: "Hardened against spikes and fluctuations." },
      { title: "Scenes & schedules", desc: "Automations by time, presence or weather." },
      { title: "Voice ready", desc: "Alexa and Google Assistant compatible." },
      { title: "Offline-first", desc: "Keeps working when the network doesn't." },
    ],
    specs: [
      { k: "Power", v: "AC 100–240V, 50/60Hz" },
      { k: "Connectivity", v: "Wi-Fi 2.4GHz + RF mesh" },
      { k: "Finish", v: "Matte polymer" },
      { k: "Install", v: "Standard modular back-box" },
      { k: "Warranty", v: "7 years" },
    ],
  },
  {
    slug: "airglass",
    name: "AirGlass",
    tagline: "Luxuriously Sleek. Effortlessly Smart.",
    desc: "Premium glass panels with master control and smart features.",
    long: "AirGlass is the master panel — a premium glass surface that orchestrates lights, fans, curtains and scenes across the entire home from one place.",
    variants: [
      { color: "#000000", src: `${CDN}/AirGlassBlack.png` },
      { color: "#EFEFEF", src: `${CDN}/AirGlassWhite.png` },
    ],
    highlights: ["Master control", "Premium glass", "Whole-home scenes"],
    features: [
      { title: "Master dial", desc: "Adjust brightness, fan speed and scenes precisely." },
      { title: "Whole-home control", desc: "Trigger any room or scene from a single panel." },
      { title: "Premium glass", desc: "A luxurious, durable toughened-glass face." },
      { title: "Scenes & schedules", desc: "Build routines that run themselves." },
      { title: "Voice ready", desc: "Hands-free via Alexa and Google Assistant." },
      { title: "Offline-first", desc: "Reliable local control, always." },
    ],
    specs: [
      { k: "Power", v: "AC 100–240V, 50/60Hz" },
      { k: "Connectivity", v: "Wi-Fi 2.4GHz + RF mesh" },
      { k: "Finish", v: "Premium toughened glass" },
      { k: "Install", v: "Standard modular back-box" },
      { k: "Warranty", v: "7 years" },
    ],
  },
  {
    slug: "airsensor",
    name: "AirSensor",
    tagline: "Smart Sensors. Precise Control.",
    desc: "360° smart detection with adjustable lux control.",
    long: "AirSensor watches the room so the home can respond — presence, motion and light level drive automations that simply run themselves.",
    variants: [{ color: "#0e1117", src: `${CDN}/AirSensor.png` }],
    highlights: ["360° detection", "Adjustable lux", "Automation trigger"],
    features: [
      { title: "360° coverage", desc: "Full-room presence and motion detection." },
      { title: "Lux aware", desc: "Adjustable light threshold so lights act only when needed." },
      { title: "Instant triggers", desc: "Drives scenes the moment a room is occupied." },
      { title: "Energy saver", desc: "Turns things off automatically when a room empties." },
      { title: "Discreet design", desc: "A compact dome that blends into the ceiling." },
      { title: "Offline-first", desc: "Runs locally for instant response." },
    ],
    specs: [
      { k: "Detection", v: "360° presence + motion" },
      { k: "Lux control", v: "Adjustable threshold" },
      { k: "Connectivity", v: "RF mesh" },
      { k: "Mounting", v: "Ceiling / wall" },
      { k: "Warranty", v: "2 years" },
    ],
  },
  {
    slug: "airblaster",
    name: "AirBlaster",
    tagline: "Master Your Home, Effortlessly.",
    desc: "Smart Wi-Fi IR remote for TVs, ACs and more.",
    long: "AirBlaster brings legacy infrared appliances onto the app — control your TV, AC and more from anywhere, and add them to scenes.",
    variants: [{ color: "#15171f", src: `${CDN}/AirBlaster.png` }],
    highlights: ["360° IR", "Wi-Fi", "Universal remote"],
    features: [
      { title: "360° infrared", desc: "Line-of-sight reach across the whole room." },
      { title: "Universal library", desc: "Works with thousands of TVs, ACs and devices." },
      { title: "In your scenes", desc: "Add IR appliances to automations and routines." },
      { title: "Remote access", desc: "Control from anywhere over the app." },
      { title: "Compact puck", desc: "A small disc that sits anywhere discreetly." },
      { title: "Easy setup", desc: "Pair and learn remotes in minutes." },
    ],
    specs: [
      { k: "Control", v: "360° infrared" },
      { k: "Connectivity", v: "Wi-Fi 2.4GHz" },
      { k: "Power", v: "USB 5V" },
      { k: "App", v: "iOS & Android" },
      { k: "Warranty", v: "2 years" },
    ],
  },
  {
    slug: "airhome",
    name: "AirHome",
    tagline: "Your Home, Smarter & Safer.",
    desc: "All-in-one app for smart home control and security.",
    long: "AirHome is the single control surface for the entire ecosystem — rooms, scenes, schedules, energy and security, in your pocket.",
    variants: [{ color: "#2f6bff", src: `${CDN}/AirHome.png` }],
    highlights: ["One app", "Remote access", "Family sharing"],
    features: [
      { title: "Whole-home view", desc: "Every room, device and scene in one place." },
      { title: "Routines", desc: "Automations by time, presence or weather." },
      { title: "Energy insights", desc: "Live usage that helps trim the bill." },
      { title: "Family access", desc: "Shared control with custom permissions." },
      { title: "Secure cloud", desc: "Encrypted remote access from anywhere." },
      { title: "Voice & widgets", desc: "Assistant support and quick-access widgets." },
    ],
    specs: [
      { k: "Platforms", v: "iOS & Android" },
      { k: "Access", v: "Local + secure cloud" },
      { k: "Security", v: "End-to-end encrypted" },
      { k: "Assistants", v: "Alexa, Google" },
      { k: "Price", v: "Free with devices" },
    ],
  },
  {
    slug: "airlock",
    name: "AirLock",
    tagline: "Smart Security, Seamless Living.",
    desc: "5-in-1 smart lock — fingerprint, passcode, RFID, key and app access.",
    long: "AirLock secures the front door five ways and keeps a clear log of every entry — convenient for the family, controlled for you.",
    variants: [{ color: "#1c1f27", src: `${CDN}/AirLockB1.png` }],
    highlights: ["5-in-1 access", "Entry log", "App unlock"],
    features: [
      { title: "Fingerprint", desc: "Fast, secure biometric unlock." },
      { title: "Passcode & RFID", desc: "PIN and card access for the whole family." },
      { title: "Mechanical key", desc: "A physical key as a reliable fallback." },
      { title: "App & remote", desc: "Lock, unlock and grant access from anywhere." },
      { title: "Activity log", desc: "See exactly who entered and when." },
      { title: "Auto-lock", desc: "Re-locks itself so the door is never left open." },
    ],
    specs: [
      { k: "Access", v: "Fingerprint, PIN, RFID, key, app" },
      { k: "Power", v: "Battery + emergency power port" },
      { k: "Alerts", v: "Real-time app notifications" },
      { k: "Material", v: "Hardened alloy body" },
      { k: "Warranty", v: "2 years" },
    ],
  },
  {
    slug: "accessories",
    name: "Accessories",
    tagline: "Enhance Every Smart Moment.",
    desc: "Smart add-ons for seamless home automation.",
    long: "A range of modules and add-ons that complete the system — extend, adapt and finish any installation cleanly.",
    variants: [{ color: "#0e1117", src: `${CDN}/Accessories.png` }],
    highlights: ["Modular", "Plug & play", "System-wide"],
    features: [
      { title: "Gang modules", desc: "Expand control to more loads and rooms." },
      { title: "Adapters", desc: "Bridge legacy fittings into the smart system." },
      { title: "Plug & play", desc: "Add-ons that pair in seconds." },
      { title: "Clean finish", desc: "Designed to match the panel family." },
      { title: "Reliable", desc: "Built to the same quality standard." },
      { title: "Future-ready", desc: "Grow the setup whenever you like." },
    ],
    specs: [
      { k: "Type", v: "Modular add-ons" },
      { k: "Compatibility", v: "Full ecosystem" },
      { k: "Install", v: "Tool-free pairing" },
      { k: "Warranty", v: "2 years" },
    ],
  },
];

export function getProduct(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}
