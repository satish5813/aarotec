// Furniture catalogue. Every piece is solid ash wood and ash veneer, stained
// in one of seven finishes and made to order by Indian artisans. Content and
// imagery sourced from the BEC Furniture collections we supply. No pricing is
// published — every piece is quoted on enquiry.

export type Category =
  | "work-tables"
  | "beds"
  | "storage"
  | "media-consoles"
  | "chairs"
  | "coffee-tables"
  | "end-tables";

export type Collection = "loop" | "flow" | "clutch" | "nest" | "wave" | "wind";

export type FurnitureProduct = {
  slug: string;
  name: string;
  collection: Collection;
  category: Category;
  /** Designer's one-paragraph description. */
  story: string;
  /** Sizes offered — "as shown" dimensions or configurable variants. */
  sizes: string[];
  features: string[];
  materials: string[];
  assembly: string;
  delivery: string;
  images: string[];
  /** Photographed finish — used for the swatch on cards. */
  shownIn: string;
  /** Aspect hint for the masonry grid. */
  tall?: boolean;
};

const img = (base: string, n: number) =>
  Array.from({ length: n }, (_, i) => `/furniture/${base}-${i + 1}.webp`);

const ASH = ["Ash wood & ash veneer", "Stained in your chosen finish", "Open-grain matte polish"];
const DRAWERS = ["Upholstered drawers", "Bottom-mount soft-closing channels"];
const HINGES = ["Self-closing shutter hinges"];

export const CATEGORIES: { key: Category; label: string }[] = [
  { key: "work-tables", label: "Work tables" },
  { key: "beds", label: "Beds" },
  { key: "storage", label: "Storage" },
  { key: "media-consoles", label: "Media consoles" },
  { key: "chairs", label: "Chairs" },
  { key: "coffee-tables", label: "Coffee tables" },
  { key: "end-tables", label: "End tables" },
];

export const COLLECTIONS: Record<
  Collection,
  { name: string; idea: string; desc: string; hero: string; wide?: string }
> = {
  loop: {
    name: "Loop",
    idea: "A free-standing volume that spirals into itself.",
    desc: "Symmetry, seamlessness and harmony — hardwood legs rise from the floor and meld into a continuous loop that clutches the user in its span.",
    hero: "/furniture/loop-work-table-3.webp",
    wide: "/furniture/loop-chair-2.webp",
  },
  flow: {
    name: "Flow",
    idea: "Rounded extremities in continuous motion.",
    desc: "Horizontality and geometric simplicity. Every Flow piece — bed, table, console, chair — shares the same rounded language, so a room reads as one thought.",
    hero: "/furniture/flow-media-console-1.webp",
    wide: "/furniture/flow-bed-2.webp",
  },
  clutch: {
    name: "Clutch",
    idea: "A monocoque with chamfered edges.",
    desc: "Perceived as a pure symmetrical form, Clutch hides its dynamism: liftable tops, interlocking mitred drawers and generous storage inside a tapered silhouette.",
    hero: "/furniture/clutch-storage-2.webp",
    wide: "/furniture/clutch-coffee-table-2.webp",
  },
  nest: {
    name: "Nest",
    idea: "Free-form curves that nest within one another.",
    desc: "Extruded organic profiles, punctured with organically shaped perforations, create a nest for the objects of daily life — from bookshelves to bars.",
    hero: "/furniture/nest-storage-2.webp",
    wide: "/furniture/nest-storage-3.webp",
  },
  wave: {
    name: "Wave",
    idea: "A symphony of varying curved profiles.",
    desc: "Inspired by ocean waves, radial curves ripple across beds and storage in a continuous sense of motion.",
    hero: "/furniture/wave-storage-2.webp",
    wide: "/furniture/wave-bed-2.webp",
  },
  wind: {
    name: "Wind",
    idea: "A sculpture you can work at.",
    desc: "A single sweeping gesture in stained ash — the Wind work table is furniture as sculpture, with drawers tucked into the curve.",
    hero: "/furniture/wind-work-table-4.webp",
    wide: "/furniture/wind-work-table-2.webp",
  },
};

/** The seven stains every piece is offered in. */
export const FINISHES = [
  { name: "Oak", hex: "#c9a675" },
  { name: "Teak", hex: "#9a6a3c" },
  { name: "Walnut", hex: "#5b3a25" },
  { name: "Forest", hex: "#4a5a3a" },
  { name: "Fire", hex: "#8f3a2a" },
  { name: "Ocean", hex: "#2c5670" },
  { name: "Charcoal", hex: "#2b2a2a" },
] as const;

export const FURNITURE_PRODUCTS: FurnitureProduct[] = [
  // ─── LOOP ─────────────────────────────────────────────────────────────
  {
    slug: "loop-work-table",
    name: "Loop Work Table",
    collection: "loop",
    category: "work-tables",
    story:
      "Designed as a free-standing volume that spirals into a loop, the work table expresses qualities of symmetry, seamlessness and harmony.",
    sizes: ["900 × 600 × 780 mm", "1200 × 600 × 780 mm", "1500 × 600 × 780 mm"],
    features: ["Cable organiser", "Stationery organiser", "Storage drawers"],
    materials: [...ASH, ...DRAWERS, ...HINGES],
    assembly: "Flat-packed. Simple self-assembly; guide and tools in the drawer.",
    delivery: "Made to order · about 50 days · free pan-India delivery",
    images: img("loop-work-table", 5),
    shownIn: "Walnut",
  },
  {
    slug: "loop-chair",
    name: "Loop Chair",
    collection: "loop",
    category: "chairs",
    story:
      "Hardwood legs ascending from the ground up meld into a loop, comfortably clutching the user in its span.",
    sizes: ["Standard dining / desk height"],
    features: ["Performance upholstery in your choice of fabric", "Send us your own upholstery"],
    materials: [...ASH, "Performance upholstery fabric as selected"],
    assembly: "Delivered fully assembled.",
    delivery: "Made to order · about 50 days · free pan-India delivery",
    images: img("loop-chair", 5),
    shownIn: "Walnut · White bouclé",
    tall: true,
  },

  // ─── FLOW ─────────────────────────────────────────────────────────────
  {
    slug: "flow-work-table",
    name: "Flow Work Table",
    collection: "flow",
    category: "work-tables",
    story:
      "Hosting ample storage, Flow imparts a continuous sense of movement owing to its rounded extremities.",
    sizes: ["1500 × 600 × 780 mm", "Drawers on left or right"],
    features: ["Cable organiser", "Stationery organiser", "Storage drawers"],
    materials: [...ASH, ...DRAWERS, ...HINGES],
    assembly: "Flat-packed in two boxes; professional assembly may be required.",
    delivery: "Made to order · about 50 days · free pan-India delivery",
    images: img("flow-work-table", 5),
    shownIn: "Charcoal",
  },
  {
    slug: "flow-lite-work-table",
    name: "Flow Lite Work Table",
    collection: "flow",
    category: "work-tables",
    story:
      "The lighter, sleeker variant of Flow terminates at rounded extremities, imparting a sense of weightlessness.",
    sizes: ["900 × 600 × 780 mm", "1200 × 600 × 780 mm"],
    features: ["Cable organiser", "Stationery organiser", "Storage drawers"],
    materials: [...ASH, ...DRAWERS, ...HINGES],
    assembly: "Flat-packed. Simple self-assembly; guide and tools in the drawer.",
    delivery: "Made to order · about 50 days · free pan-India delivery",
    images: img("flow-lite-work-table", 5),
    shownIn: "Oak",
  },
  {
    slug: "flow-bed",
    name: "Flow Bed",
    collection: "flow",
    category: "beds",
    story:
      "Articulated with rounded edges, the Flow bed rests on a firm foundation and is terminated by an extended headboard. The void in its foundation can be used for storage.",
    sizes: ["Queen · 2025 × 2200 × 1100 mm", "King · 2175 × 2200 × 1100 mm", "Mattress: Queen 1675 × 1980 · King 1825 × 1980"],
    features: ["Extended headboard", "Under-foundation storage"],
    materials: [...ASH],
    assembly: "Flat-packed in three boxes; professional assembly recommended.",
    delivery: "Made to order · about 50 days · free pan-India delivery",
    images: img("flow-bed", 5),
    shownIn: "Teak",
  },
  {
    slug: "flow-chair",
    name: "Flow Chair",
    collection: "flow",
    category: "chairs",
    story:
      "The form and details of the Flow chair seamlessly harmonise and unify with its counterparts in the collection.",
    sizes: ["Standard dining / desk height"],
    features: ["Performance upholstery in your choice of fabric", "Send us your own upholstery"],
    materials: ["Ash wood", "Stained in your chosen finish", "Open-grain matte polish", "Performance upholstery fabric as selected"],
    assembly: "Delivered fully assembled.",
    delivery: "Made to order · about 50 days · free pan-India delivery",
    images: img("flow-chair", 5),
    shownIn: "Oak · Peanut",
    tall: true,
  },
  {
    slug: "flow-media-console",
    name: "Flow Media Console",
    collection: "flow",
    category: "media-consoles",
    story:
      "Exhibiting effects of horizontality and geometric simplicity, the Flow media console integrates a combination of storage compartments, maximising the volume for function.",
    sizes: ["1800 × 450 × 450 mm"],
    features: ["Cable organiser", "Storage drawers"],
    materials: [...ASH, ...DRAWERS, ...HINGES],
    assembly: "Delivered fully assembled.",
    delivery: "Made to order · about 50 days · free pan-India delivery",
    images: img("flow-media-console", 5),
    shownIn: "Forest",
  },
  {
    slug: "flow-end-table",
    name: "Flow End Table",
    collection: "flow",
    category: "end-tables",
    story:
      "Pairs with the Flow bed or stands alone as an independent storage unit — a small piece of considerable versatility.",
    sizes: ["500 × 500 × 500 mm"],
    features: ["Cable organiser", "Storage drawers"],
    materials: [...ASH, ...DRAWERS],
    assembly: "Delivered fully assembled.",
    delivery: "Made to order · about 50 days · free pan-India delivery",
    images: img("flow-end-table", 5),
    shownIn: "Teak",
  },

  // ─── CLUTCH ───────────────────────────────────────────────────────────
  {
    slug: "clutch-work-table",
    name: "Clutch Work Table",
    collection: "clutch",
    category: "work-tables",
    story:
      "A monocoque with narrowing sides and chamfered edges articulates the form of the Clutch work table.",
    sizes: ["1200 × 600 × 780 mm", "With or without monitor stand"],
    features: ["Cable organiser", "Monitor stand / shelf", "Storage drawers"],
    materials: [...ASH, "Upholstered drawer", "Bottom-mount soft-closing channels", ...HINGES],
    assembly: "Delivered assembled; monitor shelf placed by hand.",
    delivery: "Made to order · about 50 days · free pan-India delivery",
    images: img("clutch-work-table", 5),
    shownIn: "Walnut",
  },
  {
    slug: "clutch-coffee-table",
    name: "Clutch Coffee Table",
    collection: "clutch",
    category: "coffee-tables",
    story:
      "A multifunctional sculpture. Perceived as a symmetrical form, the Clutch coffee table mysteriously offers dynamic solutions: liftable platforms and substantial storage space.",
    sizes: ["750 × 900 × 450 mm", "900 × 900 × 450 mm"],
    features: ["Extendable, liftable table-tops", "Storage drawers", "Internal storage compartment"],
    materials: [...ASH, ...DRAWERS, "Table-lift mechanism with damper"],
    assembly: "Delivered fully assembled.",
    delivery: "Made to order · about 50 days · free pan-India delivery",
    images: img("clutch-coffee-table", 5),
    shownIn: "Teak",
  },
  {
    slug: "clutch-media-console",
    name: "Clutch Media Console",
    collection: "clutch",
    category: "media-consoles",
    story:
      "A symmetrical form articulated with chamfered edges, offering a display platform atop three drawers for media devices and objects.",
    sizes: ["1500 × 500 × 500 mm"],
    features: ["Cable organiser", "Three storage drawers"],
    materials: [...ASH, ...DRAWERS],
    assembly: "Delivered fully assembled.",
    delivery: "Made to order · about 50 days · free pan-India delivery",
    images: img("clutch-media-console", 5),
    shownIn: "Oak",
  },
  {
    slug: "clutch-storage",
    name: "Clutch Storage",
    collection: "clutch",
    category: "storage",
    story:
      "A sense of ascent and movement owing to its tapered geometry. As the drawers slide, mitred edges interlock, supplementing the purity of the form.",
    sizes: ["900 × 600 × 780 mm"],
    features: ["Four interlocking drawers"],
    materials: [...ASH, ...DRAWERS],
    assembly: "Delivered fully assembled.",
    delivery: "Made to order · about 50 days · free pan-India delivery",
    images: img("clutch-storage", 5),
    shownIn: "Teak",
    tall: true,
  },
  {
    slug: "clutch-end-table",
    name: "Clutch End Table",
    collection: "clutch",
    category: "end-tables",
    story:
      "Pairs seamlessly with our beds and offers open storage or a display platform, along with a drawer for closed storage.",
    sizes: ["600 × 500 × 500 mm"],
    features: ["Cable organiser", "Storage drawer", "Open display shelf"],
    materials: [...ASH, ...DRAWERS],
    assembly: "Delivered fully assembled.",
    delivery: "Made to order · about 50 days · free pan-India delivery",
    images: img("clutch-end-table", 5),
    shownIn: "Walnut",
  },

  // ─── NEST ─────────────────────────────────────────────────────────────
  {
    slug: "nest-work-table",
    name: "Nest Work Table",
    collection: "nest",
    category: "work-tables",
    story:
      "A dynamic composition of free-form curves unifying as a whole: an extruded curve makes the table top, soaring beyond while resting on two identical volumes of storage drawers.",
    sizes: ["1800 × 1000 × 780 mm"],
    features: ["Cable organiser", "Stationery organiser", "Storage drawers"],
    materials: [...ASH, ...DRAWERS, ...HINGES],
    assembly: "Flat-packed in three boxes; professional assembly recommended.",
    delivery: "Made to order · about 60 days · free pan-India delivery",
    images: img("nest-work-table", 5),
    shownIn: "Oak",
  },
  {
    slug: "nest-l-work-table",
    name: "Nest-L Work Table",
    collection: "nest",
    category: "work-tables",
    story:
      "The Nest work table extended into an L: a sweeping desk paired with a matching storage cabinet for the corner office.",
    sizes: ["Table · 1650 × 750 × 780 mm", "Storage · 1500 × 450 × 630 mm"],
    features: ["Cable organiser", "Stationery organiser", "Storage drawers", "Storage cabinet"],
    materials: [...ASH, ...DRAWERS, ...HINGES],
    assembly: "Flat-packed in two boxes; professional assembly recommended.",
    delivery: "Made to order · about 60 days · free pan-India delivery",
    images: img("nest-l-work-table", 5),
    shownIn: "Walnut",
  },
  {
    slug: "nest-storage",
    name: "Nest Storage",
    collection: "nest",
    category: "storage",
    story:
      "An extruded organic profile punctured with organically shaped perforations creates a nest for household objects. In two heights — a bookshelf, a shoe rack or general storage.",
    sizes: ["1200 × 400 × 1200 mm", "1200 × 400 × 2100 mm"],
    features: ["Open perforated shelving", "Two heights"],
    materials: [...ASH],
    assembly: "Short variant assembled; tall variant needs professional assembly.",
    delivery: "Made to order · about 50 days · free pan-India delivery",
    images: img("nest-storage", 5),
    shownIn: "Teak",
    tall: true,
  },
  {
    slug: "nest-ii-storage",
    name: "Nest-II Storage",
    collection: "nest",
    category: "storage",
    story:
      "The multipurpose Nest-II can be used as a bar, a media console or for storage in general. It stands as a sleek, functional volume.",
    sizes: ["1800 × 500 × 850 mm"],
    features: ["Bar, console or sideboard", "Shuttered compartments"],
    materials: [...ASH, ...HINGES],
    assembly: "Delivered fully assembled.",
    delivery: "Made to order · about 50 days · free pan-India delivery",
    images: img("nest-ii-storage", 5),
    shownIn: "Walnut",
  },
  {
    slug: "nest-media-console",
    name: "Nest Media Console",
    collection: "nest",
    category: "media-consoles",
    story:
      "Two curved surfaces interlock into a multilayered console. The upper platform, free of apparent support, soars atop an organic volume of four shutters opening to ample storage.",
    sizes: ["1800 × 450 × 600 mm"],
    features: ["Cable organiser", "Four shuttered compartments"],
    materials: [...ASH, ...HINGES],
    assembly: "Delivered fully assembled.",
    delivery: "Made to order · about 50 days · free pan-India delivery",
    images: img("nest-media-console", 5),
    shownIn: "Walnut",
  },
  {
    slug: "nest-end-table",
    name: "Nest End Table",
    collection: "nest",
    category: "end-tables",
    story:
      "A single extruded curve, hollowed into a nest — a stool, a bedside table, a plinth for the things you reach for.",
    sizes: ["450 × 225 × 450 mm", "550 × 275 × 550 mm"],
    features: ["Two sizes", "Stackable silhouette"],
    materials: [...ASH],
    assembly: "Delivered fully assembled.",
    delivery: "Made to order · about 50 days · free pan-India delivery",
    images: img("nest-end-table", 5),
    shownIn: "Oak · Fire",
  },

  // ─── WAVE ─────────────────────────────────────────────────────────────
  {
    slug: "wave-bed",
    name: "Wave Bed",
    collection: "wave",
    category: "beds",
    story:
      "Inspired by ocean waves, the Wave bed is encompassed by a continuous sense of motion owing to a symphony of varying curved profiles. The base doubles as storage.",
    sizes: ["Queen · 1925 × 2225 × 1100 mm", "King · 2075 × 2225 × 1100 mm", "Mattress: Queen 1675 × 1980 · King 1825 × 1980"],
    features: ["Curved headboard", "Under-bed storage"],
    materials: [...ASH],
    assembly: "Flat-packed in three boxes; professional assembly recommended.",
    delivery: "Made to order · about 60 days · free pan-India delivery",
    images: img("wave-bed", 5),
    shownIn: "Walnut",
  },
  {
    slug: "wave-storage",
    name: "Wave Storage",
    collection: "wave",
    category: "storage",
    story:
      "A composition of radial curves resembling ocean waves, the Wave storage offers a variety of functional possibilities using retractable shelves.",
    sizes: ["600 × 650 × 2100 mm"],
    features: ["Retractable shelves for customisable compartment heights"],
    materials: [...ASH, ...HINGES],
    assembly: "Delivered fully assembled.",
    delivery: "Made to order · about 50 days · free pan-India delivery",
    images: img("wave-storage", 5),
    shownIn: "Ocean",
    tall: true,
  },

  // ─── WIND ─────────────────────────────────────────────────────────────
  {
    slug: "wind-work-table",
    name: "Wind Work Table",
    collection: "wind",
    category: "work-tables",
    story:
      "A single sweeping gesture in stained ash. The Wind work table is furniture as sculpture, with drawers tucked into the curve.",
    sizes: ["1650 × 750 × 875 mm"],
    features: ["Sculpted monocoque", "Storage drawers"],
    materials: [...ASH, ...DRAWERS],
    assembly: "Flat-packed in two boxes; professional assembly recommended.",
    delivery: "Made to order · about 50 days · free pan-India delivery",
    images: img("wind-work-table", 5),
    shownIn: "Fire",
  },
];

export const getFurnitureProduct = (slug: string) =>
  FURNITURE_PRODUCTS.find((p) => p.slug === slug);

export const FURNITURE_REVIEWS = [
  {
    quote:
      "Thoughtfully designed, flawlessly finished — ahead of schedule — and a sophisticated addition to the bedroom. My second piece in a year and I couldn't be happier.",
    name: "Loop work table owner",
    city: "Hyderabad",
  },
  {
    quote:
      "The table and chair pair beautifully together. The charcoal finish is amazing.",
    name: "Flow set owner",
    city: "Vijayawada",
  },
  {
    quote:
      "Came in nicely packaged boxes, easy to assemble, and it looks exactly like the pictures. Overall very happy with the purchase.",
    name: "Nest work table owner",
    city: "Visakhapatnam",
  },
  {
    quote: "Excellent products and great craftsmanship. Would recommend to anyone looking for quality furniture.",
    name: "Clutch storage owner",
    city: "Guntur",
  },
];

export const FURNITURE_FAQ = [
  {
    q: "Is every piece really made to order?",
    a: "Yes. Nothing is stocked. Once you confirm the piece, size and finish, it is built for you by hand and delivered in about 50 days — 60 for the largest desks and beds.",
  },
  {
    q: "What is it made of?",
    a: "Solid ash wood and ash veneer, stained in one of seven finishes and sealed with an open-grain matte polish so the grain stays visible and tactile. Drawers are upholstered and run on bottom-mount soft-closing channels.",
  },
  {
    q: "Can I choose the finish and the size?",
    a: "Every piece comes in Oak, Teak, Walnut, Forest, Fire, Ocean or Charcoal. Most work tables and beds are offered in two or three sizes. Chairs take your choice of performance upholstery — or send us your own fabric.",
  },
  {
    q: "Do I need to assemble it?",
    a: "Smaller pieces arrive fully assembled. Larger desks and beds are flat-packed with a guide and tools; where professional assembly is recommended we arrange it.",
  },
  {
    q: "Is delivery included?",
    a: "Yes — free pan-India delivery on every piece.",
  },
  {
    q: "Can I see a piece before ordering?",
    a: "Call or WhatsApp us and we will walk you through finish samples and photographs of the exact piece in your chosen stain.",
  },
];
