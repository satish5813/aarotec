// Portable power station catalogue. Content and imagery sourced from the
// EcoFlow India range we supply; specifications are indicative and confirmed
// at the time of enquiry. No pricing is published — every lead is quoted.

export type Series = "river" | "delta";

export type PowerProduct = {
  slug: string;
  name: string;
  series: Series;
  /** One-line positioning used on cards. */
  tagline: string;
  /** Short paragraph for the detail page hero. */
  intro: string;
  capacityWh: number;
  outputW: number;
  surgeW: number;
  /** Minutes to reach the stated charge level on AC. */
  chargeMinutes: number;
  chargeNote: string;
  cycles: string;
  weightKg: number;
  dimensionsCm: string;
  outlets: string;
  solarW: number;
  /** Extra battery expansion, if supported. */
  expandable?: string;
  /** Marketing highlights, 3 items for cards. */
  highlights: [string, string, string];
  features: { title: string; desc: string }[];
  images: string[];
  bestFor: string[];
  badge?: string;
};

const img = (base: string, n: number) =>
  Array.from({ length: n }, (_, i) => `/power/${base}-${i + 1}.webp`);

export const POWER_PRODUCTS: PowerProduct[] = [
  // ─── RIVER: light, grab-and-go ────────────────────────────────────────
  {
    slug: "river-3",
    name: "RIVER 3",
    series: "river",
    tagline: "The everyday essential",
    intro:
      "Small enough for a shelf, strong enough to run a fan, a router and every phone in the house through a full evening cut. RIVER 3 switches to backup in under 10 milliseconds, so the Wi-Fi never blinks.",
    capacityWh: 245,
    outputW: 300,
    surgeW: 600,
    chargeMinutes: 60,
    chargeNote: "0–100% on AC in about 1 hour",
    cycles: "3,000+ cycles to 80%",
    weightKg: 3.5,
    dimensionsCm: "25.5 × 21.2 × 11.1",
    outlets: "AC ×2 · USB-A ×2 · USB-C 100W ×1 · Car ×1",
    solarW: 110,
    highlights: ["10 ms UPS switchover", "Whisper quiet, 30 dB", "3.5 kg — carry it anywhere"],
    features: [
      { title: "Built-in UPS", desc: "Plug your router, TV or CPAP through RIVER 3 and it takes over in under 10 ms when the mains drops." },
      { title: "X-Stream charging", desc: "Back to full from a wall socket in about an hour — faster than most phones." },
      { title: "LFP for the long haul", desc: "Lithium iron phosphate cells rated for 3,000+ cycles: roughly ten years of daily use." },
      { title: "GaN, not fans", desc: "Gallium-nitride electronics keep it small, cool and quiet enough for a bedside table." },
      { title: "App control", desc: "Check charge, set limits and switch ports on or off from your phone." },
      { title: "Solar ready", desc: "Pairs with a 110 W panel for fully off-grid weekends." },
    ],
    images: img("river-3", 4),
    bestFor: ["Wi-Fi & TV backup", "Study desk", "Weekend trips"],
  },
  {
    slug: "river-3-plus",
    name: "RIVER 3 Plus",
    series: "river",
    tagline: "The home-office UPS",
    intro:
      "RIVER 3 Plus is a desk-side UPS that grows with you. Start with 286 Wh for a laptop-and-monitor setup, then clip on an extra battery when you need a full day of runtime.",
    capacityWh: 286,
    outputW: 600,
    surgeW: 1200,
    chargeMinutes: 60,
    chargeNote: "0–100% on AC in about 1 hour",
    cycles: "3,000+ cycles to 80%",
    weightKg: 4.7,
    dimensionsCm: "25.5 × 21.2 × 11.1",
    outlets: "AC ×3 · USB-A ×2 · USB-C 100W ×1 · Car ×1",
    solarW: 220,
    expandable: "Up to 858 Wh with the RIVER 3 extra battery",
    highlights: ["Expandable to 858 Wh", "600 W runs 90% of home appliances", "Sub-10 ms UPS"],
    features: [
      { title: "Expandable by design", desc: "Pogo-pin connection — no cables — stacks an extra battery in seconds." },
      { title: "X-Boost to 1,200 W", desc: "Runs kettles, blenders and hair dryers that would trip lesser units." },
      { title: "Sub-10 ms switchover", desc: "Certified UPS behaviour keeps NAS drives and PCs alive through the flicker." },
      { title: "1-hour recharge", desc: "Top up between meetings, not overnight." },
      { title: "3,000+ cycles", desc: "LFP chemistry rated for a decade of daily use." },
      { title: "Silent operation", desc: "30 dB — quieter than a library, ideal for the study." },
    ],
    images: img("river-3-plus", 4),
    bestFor: ["Work from home", "NAS & PC backup", "Small clinics"],
    badge: "Expandable",
  },
  {
    slug: "river-3-max",
    name: "RIVER 3 Max",
    series: "river",
    tagline: "All-day desk power",
    intro:
      "RIVER 3 Max is the Plus with its extra battery already fitted: 572 Wh that carries a laptop, monitor, router and a pedestal fan through an entire working day.",
    capacityWh: 572,
    outputW: 600,
    surgeW: 1200,
    chargeMinutes: 70,
    chargeNote: "0–100% on AC in about 70 minutes",
    cycles: "3,000+ cycles to 80%",
    weightKg: 7.5,
    dimensionsCm: "25.5 × 21.2 × 22",
    outlets: "AC ×3 · USB-A ×2 · USB-C 100W ×1 · Car ×1",
    solarW: 220,
    expandable: "Add a second battery to reach 858 Wh",
    highlights: ["572 Wh all-day capacity", "600 W / 1,200 W X-Boost", "Still one-hand portable"],
    features: [
      { title: "Two-tier stack", desc: "Main unit and battery lock together with pogo pins — no wiring, no fuss." },
      { title: "All-day runtime", desc: "About 12 hours for a typical laptop-and-monitor workstation." },
      { title: "X-Boost", desc: "Pushes 1,200 W equivalent for high-draw appliances." },
      { title: "UPS mode", desc: "Under 10 ms switchover for sensitive electronics." },
      { title: "Fast solar", desc: "220 W solar input for off-grid charging in under 3 hours." },
      { title: "App control", desc: "Monitor input, output and remaining time in real time." },
    ],
    images: img("river-3-max", 4),
    bestFor: ["Full-day WFH", "Shops & counters", "Camping"],
  },
  {
    slug: "river-3-max-plus",
    name: "RIVER 3 Max Plus",
    series: "river",
    tagline: "Maximum RIVER",
    intro:
      "The largest RIVER: 858 Wh of quiet, portable capacity that runs a refrigerator overnight or a full home office for two days on a single charge.",
    capacityWh: 858,
    outputW: 600,
    surgeW: 1200,
    chargeMinutes: 80,
    chargeNote: "0–100% on AC in about 80 minutes",
    cycles: "3,000+ cycles to 80%",
    weightKg: 9.3,
    dimensionsCm: "25.5 × 21.2 × 30",
    outlets: "AC ×3 · USB-A ×2 · USB-C 100W ×1 · Car ×1",
    solarW: 220,
    highlights: ["858 Wh — biggest RIVER", "Runs a fridge overnight", "Under 10 kg"],
    features: [
      { title: "858 Wh capacity", desc: "Enough for a 100 W fridge for roughly 7–8 hours." },
      { title: "Quiet as a whisper", desc: "30 dB operation — fine for the bedroom." },
      { title: "X-Boost 1,200 W", desc: "Handles mixers, kettles and irons." },
      { title: "Fast AC recharge", desc: "Back to full in about 80 minutes." },
      { title: "Solar ready", desc: "220 W input for weekend cabins and campsites." },
      { title: "10-year battery", desc: "3,000+ LFP cycles with full BMS protection." },
    ],
    images: img("river-3-max-plus", 4),
    bestFor: ["Fridge backup", "Two-day WFH", "Road trips"],
  },
  {
    slug: "river-2",
    name: "RIVER 2",
    series: "river",
    tagline: "The proven compact",
    intro:
      "RIVER 2 is the compact classic: 256 Wh, six outlets and the same one-hour recharge, in a handle-topped box that lives in a cupboard until the power goes.",
    capacityWh: 256,
    outputW: 300,
    surgeW: 600,
    chargeMinutes: 60,
    chargeNote: "0–100% on AC in 1 hour",
    cycles: "3,000+ cycles to 80%",
    weightKg: 3.5,
    dimensionsCm: "24.5 × 21.4 × 14.2",
    outlets: "AC ×1 · USB-A ×2 · USB-C 60W ×1 · Car ×1",
    solarW: 110,
    highlights: ["1-hour AC recharge", "6 devices at once", "3.5 kg, built-in handle"],
    features: [
      { title: "1-hour recharge", desc: "X-Stream charging fills it faster than anything in its class." },
      { title: "Six outlets", desc: "AC, USB-A, USB-C and car port — everything charges together." },
      { title: "LFP cells", desc: "3,000+ cycles before dropping to 80% capacity." },
      { title: "Solar in 2.3 hours", desc: "With a 110 W panel on a clear day." },
      { title: "Advanced BMS", desc: "Voltage, current and temperature monitored continuously." },
      { title: "Featherweight", desc: "3.5 kg with a moulded carry handle." },
    ],
    images: img("river-2", 3),
    bestFor: ["Cupboard backup", "Students", "Picnics"],
  },
  {
    slug: "river-2-max",
    name: "RIVER 2 Max",
    series: "river",
    tagline: "Eleven outlets, one hour",
    intro:
      "512 Wh, 500 W and eleven outlets. RIVER 2 Max runs a 43-inch TV, a set-top box and a fan through a four-hour evening cut with room to spare.",
    capacityWh: 512,
    outputW: 500,
    surgeW: 1000,
    chargeMinutes: 60,
    chargeNote: "0–100% on AC in 1 hour",
    cycles: "3,000+ cycles to 80%",
    weightKg: 6.1,
    dimensionsCm: "27 × 26 × 19.6",
    outlets: "AC ×2 · USB-A ×3 · USB-C 100W ×1 · DC ×2 · Car ×1",
    solarW: 220,
    highlights: ["11 outlets", "1,000 W X-Boost", "1-hour recharge"],
    features: [
      { title: "Eleven outlets", desc: "Run the TV, router, fan and every phone simultaneously." },
      { title: "X-Boost 1,000 W", desc: "Enough for a kettle or a small induction plate." },
      { title: "1-hour recharge", desc: "X-Stream AC charging at 660 W." },
      { title: "220 W solar", desc: "Clean top-ups in about 2.3 hours of good sun." },
      { title: "LFP longevity", desc: "3,000+ cycles — almost ten years of daily use." },
      { title: "6.1 kg", desc: "Light enough for one hand, sturdy enough for the boot." },
    ],
    images: img("river-2-max", 4),
    bestFor: ["Living-room backup", "Small shops", "Outdoor events"],
  },
  {
    slug: "river-2-pro",
    name: "RIVER 2 Pro",
    series: "river",
    tagline: "Runs 80% of appliances",
    intro:
      "768 Wh and 800 W of output push RIVER 2 Pro into serious-appliance territory: microwaves, mixers and coolers run without a second thought.",
    capacityWh: 768,
    outputW: 800,
    surgeW: 1600,
    chargeMinutes: 70,
    chargeNote: "0–100% on AC in 70 minutes",
    cycles: "3,000+ cycles to 80%",
    weightKg: 7.8,
    dimensionsCm: "27 × 26 × 19.6",
    outlets: "AC ×3 · USB-A ×3 · USB-C 100W ×1 · DC ×2 · Car ×1",
    solarW: 220,
    highlights: ["800 W / 1,600 W X-Boost", "768 Wh capacity", "70-minute recharge"],
    features: [
      { title: "Serious output", desc: "1,600 W with X-Boost covers roughly 80% of household appliances." },
      { title: "70-minute recharge", desc: "The fastest in its class." },
      { title: "Eleven outlets", desc: "From 800 W AC to 100 W USB-C." },
      { title: "Solar in 3.5 hours", desc: "220 W solar input." },
      { title: "LFP + BMS", desc: "3,000+ cycles, fully monitored." },
      { title: "Handle-topped", desc: "7.8 kg with an integrated grab handle." },
    ],
    images: img("river-2-pro", 4),
    bestFor: ["Kitchen appliances", "Cooler & camp kitchen", "Site work"],
  },

  // ─── DELTA: whole-home backup ─────────────────────────────────────────
  {
    slug: "delta-3-air",
    name: "DELTA 3 1000 Air",
    series: "delta",
    tagline: "The generator alternative",
    intro:
      "DELTA 3 1000 Air is the quiet way to run a home through an outage. 960 Wh keeps fans, lights, TV and a fridge going for hours, recharges in two hours and sits happily on a kitchen counter.",
    capacityWh: 960,
    outputW: 500,
    surgeW: 800,
    chargeMinutes: 120,
    chargeNote: "0–100% on AC in 2 hours",
    cycles: "4,000+ cycles to 80%",
    weightKg: 9.9,
    dimensionsCm: "22 × 22.3 × 26.3",
    outlets: "AC ×1 · USB-A ×1 · USB-C ×1 · Car ×1",
    solarW: 500,
    highlights: ["960 Wh in under 10 kg", "4,000+ cycle LFP", "30 dB — whisper quiet"],
    features: [
      { title: "All-day home essentials", desc: "Fans, lights, TV and fridge through 2- to 8-hour cuts." },
      { title: "No fumes, no noise", desc: "A clean replacement for the petrol generator." },
      { title: "2-hour recharge", desc: "1,000 W X-Stream AC input." },
      { title: "4,000+ cycles", desc: "Rated for well over ten years of daily use." },
      { title: "500 W solar", desc: "Fast, free daytime charging." },
      { title: "Counter-top size", desc: "A 22 cm cube that weighs less than 10 kg." },
    ],
    images: img("delta-3-air", 4),
    bestFor: ["Fridge + fans", "Apartments", "Home nursing"],
    badge: "New launch",
  },
  {
    slug: "delta-3",
    name: "DELTA 3",
    series: "delta",
    tagline: "Fastest charging in class",
    intro:
      "1,024 Wh, 1,800 W and thirteen outlets: DELTA 3 runs almost everything in the house, and X-Stream charging refills it in under an hour.",
    capacityWh: 1024,
    outputW: 1800,
    surgeW: 2600,
    chargeMinutes: 56,
    chargeNote: "0–100% on AC in 56 minutes",
    cycles: "4,000+ cycles to 80%",
    weightKg: 12.5,
    dimensionsCm: "39.8 × 20 × 28.4",
    outlets: "AC ×4 · USB-A ×2 · USB-C 140W ×2 · DC ×2 · Car ×1",
    solarW: 500,
    expandable: "Up to 5 kWh with extra batteries",
    highlights: ["56-minute full recharge", "13 outlets", "1,800 W / 2,600 W X-Boost"],
    features: [
      { title: "56-minute charge", desc: "Five ways to charge — AC, solar, car, generator and dual AC+solar." },
      { title: "1,800 W output", desc: "Runs 99% of home appliances, ACs included on X-Boost." },
      { title: "13 outlets", desc: "Four AC sockets plus 140 W USB-C." },
      { title: "Built-in UPS", desc: "Under 10 ms switchover for desktops and NAS." },
      { title: "4,000+ cycles", desc: "The most durable LFP pack in the range." },
      { title: "Expandable", desc: "Stack extra batteries up to 5 kWh." },
    ],
    images: img("delta-3", 4),
    bestFor: ["Whole-room backup", "Home office + kitchen", "Small offices"],
  },
  {
    slug: "delta-3-plus",
    name: "DELTA 3 Plus",
    series: "delta",
    tagline: "Zero-downtime home backup",
    intro:
      "DELTA 3 Plus adds a sub-10 ms UPS and 5 kWh of expansion headroom to the DELTA 3 platform — a smart, silent backbone for the connected home.",
    capacityWh: 1024,
    outputW: 1800,
    surgeW: 2600,
    chargeMinutes: 56,
    chargeNote: "0–100% on AC in 56 minutes",
    cycles: "4,000+ cycles to 80%",
    weightKg: 12.5,
    dimensionsCm: "39.8 × 20 × 28.4",
    outlets: "AC ×4 · USB-A ×2 · USB-C 140W ×2 · DC ×2 · Car ×1",
    solarW: 1000,
    expandable: "Up to 5 kWh with extra batteries",
    highlights: ["<10 ms UPS switchover", "Expandable to 5 kWh", "1,000 W dual solar"],
    features: [
      { title: "Zero-downtime assurance", desc: "Under 10 ms input switchover keeps servers and medical devices live." },
      { title: "Smart home ready", desc: "Automations and scheduling from the app." },
      { title: "1,000 W solar", desc: "Dual solar inputs for fast, free charging." },
      { title: "1,800 W output", desc: "2,600 W with X-Boost." },
      { title: "4,000+ cycles", desc: "Long-life LFP with full BMS." },
      { title: "Expandable", desc: "Grow to 5 kWh as the household grows." },
    ],
    images: img("delta-3-plus", 4),
    bestFor: ["Servers & NAS", "Smart homes", "Clinics"],
  },
  {
    slug: "delta-3-1500",
    name: "DELTA 3 1500",
    series: "delta",
    tagline: "Big capacity, light build",
    intro:
      "1,536 Wh in a 16 kg body. DELTA 3 1500 carries the whole living room — TV, fans, lights and fridge — through a long evening, then refills in about 90 minutes.",
    capacityWh: 1536,
    outputW: 1800,
    surgeW: 2400,
    chargeMinutes: 90,
    chargeNote: "0–100% on AC in 1.5 hours",
    cycles: "4,000+ cycles to 80%",
    weightKg: 16,
    dimensionsCm: "39.8 × 20 × 28.4",
    outlets: "AC ×4 · USB-A ×2 · USB-C 140W ×2 · DC ×2 · Car ×1",
    solarW: 500,
    highlights: ["1,536 Wh capacity", "1,800 W / 2,400 W X-Boost", "1.5-hour recharge"],
    features: [
      { title: "Uninterrupted living", desc: "Built-in UPS with under 15 ms switchover." },
      { title: "Powers 99% of appliances", desc: "Including 1.5-ton ACs on X-Boost." },
      { title: "Ultra-fast charge", desc: "Power-ready in 30 minutes, full in 90." },
      { title: "4,000+ cycles", desc: "A decade-plus of daily use." },
      { title: "500 W solar", desc: "Clean daytime recharge." },
      { title: "Light for its size", desc: "16 kg with dual carry handles." },
    ],
    images: img("delta-3-1500", 4),
    bestFor: ["Living room + kitchen", "Long outages", "Farmhouses"],
  },
  {
    slug: "delta-2",
    name: "DELTA 2",
    series: "delta",
    tagline: "The expandable classic",
    intro:
      "DELTA 2 is the proven all-rounder: 1 kWh that grows to 3 kWh, 1,800 W of output and 80% charge in 50 minutes.",
    capacityWh: 1024,
    outputW: 1800,
    surgeW: 3600,
    chargeMinutes: 50,
    chargeNote: "0–80% on AC in 50 minutes",
    cycles: "3,000+ cycles to 80%",
    weightKg: 12,
    dimensionsCm: "40 × 21.1 × 28.1",
    outlets: "AC ×4 · USB-A ×4 · USB-C ×2 · DC ×2 · Car ×1",
    solarW: 500,
    expandable: "1–3 kWh with extra batteries",
    highlights: ["Expandable 1–3 kWh", "1,800 W / 3,600 W X-Boost", "0–80% in 50 min"],
    features: [
      { title: "Expandable capacity", desc: "Add one or two batteries to reach 3 kWh." },
      { title: "7× faster charging", desc: "0–80% in 50 minutes from a wall socket." },
      { title: "Power almost anything", desc: "1,800 W with 15 outlets." },
      { title: "500 W solar", desc: "Charge on the roof, at camp or off-grid." },
      { title: "Built to last", desc: "3,000+ LFP cycles with smart BMS." },
      { title: "App control", desc: "Wi-Fi and Bluetooth monitoring." },
    ],
    images: img("delta-2", 3),
    bestFor: ["Growing households", "RV & vans", "Small businesses"],
  },
  {
    slug: "delta-2-max",
    name: "DELTA 2 Max",
    series: "delta",
    tagline: "Two kilowatt-hours, six on tap",
    intro:
      "2,048 Wh out of the box, 6 kWh with expansion, and dual AC-plus-solar charging that refills it in under an hour. DELTA 2 Max is home backup that doesn't compromise.",
    capacityWh: 2048,
    outputW: 2400,
    surgeW: 3400,
    chargeMinutes: 43,
    chargeNote: "0–80% in 43 minutes with dual charging",
    cycles: "3,000+ cycles to 80%",
    weightKg: 23,
    dimensionsCm: "49.7 × 24.2 × 30.5",
    outlets: "AC ×4 · USB-A ×4 · USB-C ×2 · DC ×2 · Car ×1",
    solarW: 1000,
    expandable: "Up to 6 kWh with two extra batteries",
    highlights: ["2,048 Wh → 6 kWh", "2,400 W output", "Dual AC + solar charging"],
    features: [
      { title: "Dual charging", desc: "AC and solar together for the fastest refill in the range." },
      { title: "2,400 W output", desc: "3,400 W with X-Boost — kitchen and AC ready." },
      { title: "Expandable to 6 kWh", desc: "A full night for the whole house." },
      { title: "1,000 W solar", desc: "Free daytime charging in about 2.3 hours." },
      { title: "3,000+ cycles", desc: "LFP for the long haul." },
      { title: "Rugged", desc: "Built for outdoor and site conditions." },
    ],
    images: img("delta-2-max", 4),
    bestFor: ["Whole-home backup", "Villas", "Events & sites"],
  },
  {
    slug: "delta-2-pro",
    name: "DELTA 2 Pro",
    series: "delta",
    tagline: "The home battery",
    intro:
      "3.6 kWh that scales to 10.8 kWh and beyond: DELTA 2 Pro is a wheeled home battery that keeps a full household — ACs included — running through the longest outage.",
    capacityWh: 3600,
    outputW: 3600,
    surgeW: 4500,
    chargeMinutes: 160,
    chargeNote: "0–100% on AC in about 2.7 hours",
    cycles: "3,500+ cycles to 80%",
    weightKg: 45,
    dimensionsCm: "63.5 × 28.5 × 41.6",
    outlets: "AC ×4 · USB-A ×4 · USB-C ×2 · DC ×2 · Car ×1 · Anderson",
    solarW: 1600,
    expandable: "3.6 kWh → 10.8 kWh; up to 25 kWh with Smart Home Panel",
    highlights: ["3,600 Wh → 10.8 kWh", "3,600 W / 4,500 W X-Boost", "1,600 W solar"],
    features: [
      { title: "Whole-home capacity", desc: "Expandable to 10.8 kWh, or 25 kWh with the Smart Home Panel." },
      { title: "3,600 W output", desc: "Runs ACs, geysers and pumps." },
      { title: "1,600 W solar", desc: "Charges from the roof in a few hours." },
      { title: "Wheeled chassis", desc: "Telescopic handle and wheels — moves like luggage." },
      { title: "3,500+ cycles", desc: "The longest-rated LFP pack we sell." },
      { title: "Smart integration", desc: "Ties into home panels and EV charging." },
    ],
    images: img("delta-2-pro", 4),
    bestFor: ["Entire villa", "Farms & clinics", "Off-grid living"],
    badge: "Flagship",
  },
];

export const getPowerProduct = (slug: string) =>
  POWER_PRODUCTS.find((p) => p.slug === slug);

export const SERIES = {
  river: {
    name: "RIVER",
    strap: "Light. Quick. Everywhere.",
    desc: "Under 10 kg, one-hour recharge and a built-in UPS — for desks, bedrooms, cars and campsites.",
    range: "245 – 858 Wh",
  },
  delta: {
    name: "DELTA",
    strap: "Whole-home backup, no generator.",
    desc: "One to three-and-a-half kilowatt-hours, expandable to 25 kWh, with output to run ACs and fridges.",
    range: "960 Wh – 3.6 kWh (expandable)",
  },
} as const;

/** Typical appliance draws (watts) for the runtime estimator. */
export const APPLIANCES = [
  { name: "Wi-Fi router", w: 10 },
  { name: "LED bulbs (×4)", w: 36 },
  { name: "Laptop", w: 60 },
  { name: "Ceiling fan", w: 75 },
  { name: "43\" LED TV", w: 90 },
  { name: "Refrigerator", w: 120 },
  { name: "CPAP machine", w: 60 },
  { name: "Desktop PC + monitor", w: 250 },
  { name: "Mixer grinder", w: 550 },
  { name: "Microwave", w: 1100 },
  { name: "1-ton inverter AC", w: 1000 },
] as const;

export const POWER_FAQ = [
  {
    q: "How is this different from a home inverter?",
    a: "A portable power station is a sealed, plug-and-play unit: no wiring, no acid batteries, no installer. It sits on a shelf, recharges from any socket in about an hour, switches over in milliseconds and can go with you in the car.",
  },
  {
    q: "What can a 1 kWh unit actually run?",
    a: "Roughly: a fridge for 7–8 hours, a fan and TV together for 5–6 hours, or a laptop for 12–14 hours. Use the runtime estimator above for your own appliances — real-world figures are usually within 10–15% of it.",
  },
  {
    q: "Can it run an air conditioner?",
    a: "DELTA units with 1,800 W or more can run a 1-ton inverter AC. Runtime depends on capacity; a DELTA 2 Max gives around 1.5–2 hours, and expandable models extend that with extra batteries.",
  },
  {
    q: "How long do the batteries last?",
    a: "All units use lithium iron phosphate (LFP) cells rated for 3,000–4,000 full cycles before they drop to 80% capacity. That is roughly ten years of a full cycle every day.",
  },
  {
    q: "Is it safe indoors?",
    a: "Yes. There is no combustion, no fumes and no noise beyond a quiet fan. A battery management system monitors voltage, current and temperature continuously.",
  },
  {
    q: "Do you supply solar panels?",
    a: "Yes — foldable 110 W to 400 W panels that pair directly with every unit. Tell us what you want to charge and we will size it.",
  },
  {
    q: "What about warranty and service?",
    a: "Every unit carries a manufacturer warranty of up to 5 years with pan-India service support. We handle registration and claims for you.",
  },
];
