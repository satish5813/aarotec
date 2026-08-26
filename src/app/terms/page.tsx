import type { Metadata } from "next";
import LegalPage, {
  Bullets,
  Callout,
  InlineLink,
  Mail,
  P,
  SubHeading,
  Tel,
  type LegalSection,
} from "@/components/legal/LegalPage";
import { BUSINESS, SITE_URL } from "@/lib/site";

const TITLE = "Terms of Service";
const DESCRIPTION = `The terms on which ${BUSINESS.name} provides this website, quotations, smart home products, installation and warranty support to customers in India.`;
const DOMAIN = SITE_URL.replace(/^https?:\/\//, "");

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/terms" },
  openGraph: {
    type: "article",
    siteName: BUSINESS.name,
    title: `${TITLE} | ${BUSINESS.name}`,
    description: DESCRIPTION,
    url: `${SITE_URL}/terms`,
    images: [{ url: BUSINESS.ogImage, alt: BUSINESS.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${TITLE} | ${BUSINESS.name}`,
    description: DESCRIPTION,
    images: [BUSINESS.ogImage],
  },
};

const SECTIONS: LegalSection[] = [
  {
    id: "agreement",
    heading: "Agreement to these terms",
    body: (
      <>
        <P>
          These Terms of Service (“Terms”) govern your use of {DOMAIN} and any
          enquiry, quotation, purchase or service you make with{" "}
          {BUSINESS.legalName} (“{BUSINESS.name}”, “we”, “us” or “our”). By
          browsing this website or submitting your details to us, you agree to
          these Terms.
        </P>
        <P>
          If you do not agree with them, please do not use this website. Where a
          separate signed quotation, work order or purchase agreement exists
          between you and us, that document takes precedence over these Terms to
          the extent the two conflict.
        </P>
      </>
    ),
  },
  {
    id: "who-we-are",
    heading: "Who we are",
    body: (
      <>
        <P>
          {BUSINESS.legalName} designs and supplies smart home automation
          products — touch panels, smart locks, sensors, controllers and the
          connected ecosystem around them — to residential and commercial
          customers in India. We are based in {BUSINESS.city},{" "}
          {BUSINESS.region}.
        </P>
        <P>
          You can reach us on{" "}
          <Tel label={BUSINESS.phone} href={BUSINESS.phoneHref} /> or at{" "}
          <Mail address={BUSINESS.email} />.
        </P>
      </>
    ),
  },
  {
    id: "use-of-site",
    heading: "Using this website",
    body: (
      <>
        <P>
          You may use this website to learn about our products and to contact us
          about them. You agree not to:
        </P>
        <Bullets
          items={[
            <>
              Use the site for any unlawful purpose, or in any way that damages,
              disables or overburdens it.
            </>,
            <>
              Attempt to gain unauthorised access to any part of the site, its
              servers, or our internal systems.
            </>,
            <>
              Submit false, misleading or someone else’s personal details
              through our forms.
            </>,
            <>
              Use automated systems to scrape, harvest or copy content from the
              site without our written permission.
            </>,
            <>
              Introduce viruses, malicious code or any material designed to
              interfere with the site.
            </>,
          ]}
        />
        <P>
          We may suspend or withdraw access to the website, in whole or in part,
          at any time and without notice. We do not guarantee that the site will
          always be available or uninterrupted.
        </P>
      </>
    ),
  },
  {
    id: "products",
    heading: "Products, specifications and pricing",
    body: (
      <>
        <P>
          We work hard to describe our products accurately, but the content on
          this website is for general information and is not a binding offer.
        </P>
        <Bullets
          items={[
            <>
              <strong className="font-medium text-text">
                Images are illustrative.
              </strong>{" "}
              Product photography, renders and 3D models on this site may differ
              from the delivered product in colour, finish or minor detail
              because of photography, lighting and screen calibration.
            </>,
            <>
              <strong className="font-medium text-text">
                Specifications may change.
              </strong>{" "}
              We continually improve our products and may change specifications,
              features or firmware without notice. The specification confirmed
              in your written quotation is the one that applies to your order.
            </>,
            <>
              <strong className="font-medium text-text">
                Prices are quoted individually.
              </strong>{" "}
              We do not sell directly through this website. Pricing depends on
              your configuration, quantity, site conditions and location, and is
              confirmed in a written quotation.
            </>,
            <>
              <strong className="font-medium text-text">
                Availability is not guaranteed
              </strong>{" "}
              until we confirm your order in writing.
            </>,
          ]}
        />
      </>
    ),
  },
  {
    id: "orders",
    heading: "Enquiries, quotations and orders",
    body: (
      <>
        <P>
          Submitting an enquiry form does not create a contract. It is an
          invitation for us to contact you. A contract is formed only when we
          issue a written quotation or proforma invoice and you accept it,
          together with any advance payment we ask for.
        </P>
        <Bullets
          items={[
            <>
              Quotations are valid for the period stated on them, and for 30 days
              where no period is stated.
            </>,
            <>
              Prices are exclusive of GST and any other applicable taxes unless
              stated otherwise. Taxes are charged at the rate in force on the
              date of invoice.
            </>,
            <>
              Payment terms, including any advance, are those set out in the
              quotation or invoice. We may withhold dispatch or installation
              until due payments are received.
            </>,
            <>
              Delivery and installation timelines given to you are good-faith
              estimates. They depend on site readiness and factors such as
              supply and logistics that may be outside our control.
            </>,
            <>
              Risk in the goods passes to you on delivery. Ownership passes only
              when we have received payment in full.
            </>,
          ]}
        />
      </>
    ),
  },
  {
    id: "installation",
    heading: "Installation and site conditions",
    body: (
      <>
        <P>
          Smart home products are installed into your existing electrical
          infrastructure. Correct installation matters both for the product to
          work and for your safety.
        </P>
        <Bullets
          items={[
            <>
              Installation must be carried out by a qualified electrician —
              either our team, our authorised partner, or a licensed
              professional you engage.
            </>,
            <>
              You are responsible for providing safe, ready site access, a
              stable power supply with proper earthing, and, where our products
              need it, a working Wi-Fi network.
            </>,
            <>
              Where site conditions require additional work — rewiring, changing
              back-boxes, civil work — this may be quoted and charged
              separately.
            </>,
            <>
              We are not responsible for faults, damage or safety issues caused
              by pre-existing wiring defects, voltage fluctuation outside the
              product’s rated range, water ingress, or installation carried out
              contrary to our instructions.
            </>,
          ]}
        />
      </>
    ),
  },
  {
    id: "warranty",
    heading: "Warranty",
    body: (
      <>
        <P>
          Our smart panels carry a manufacturer warranty against defects in
          materials and workmanship for the period stated in your invoice or
          product documentation — up to 7 years on selected panels. Other
          products in the range carry the warranty period stated for that
          product.
        </P>
        <SubHeading>What the warranty covers</SubHeading>
        <P>
          Repair or, at our discretion, replacement of a product that develops a
          manufacturing defect under normal domestic use during the warranty
          period.
        </P>
        <SubHeading>What it does not cover</SubHeading>
        <Bullets
          items={[
            <>
              Physical damage, cracked glass, liquid damage, fire, pest damage or
              damage in transit after delivery.
            </>,
            <>
              Damage from voltage surges, lightning, incorrect supply voltage or
              improper earthing.
            </>,
            <>
              Products installed, modified, opened or repaired by anyone other
              than a qualified electrician or our authorised service partner.
            </>,
            <>
              Normal wear, cosmetic ageing, or consumables such as batteries in
              accessories.
            </>,
            <>
              Faults caused by third-party equipment, your internet connection,
              or changes made by third-party voice assistant or app platforms.
            </>,
          ]}
        />
        <P>
          To make a warranty claim, contact us on{" "}
          <Tel label={BUSINESS.phone} href={BUSINESS.phoneHref} /> with your
          invoice details. Warranty service is provided in the locations we
          service; transport charges may apply outside them.
        </P>
      </>
    ),
  },
  {
    id: "cancellation",
    heading: "Cancellation and returns",
    body: (
      <>
        <P>
          Because our systems are configured and often customised for a specific
          site, cancellation and return terms are set out in your quotation.
          Unless that document says otherwise:
        </P>
        <Bullets
          items={[
            <>
              An order may be cancelled before dispatch, subject to deduction of
              any costs already incurred by us.
            </>,
            <>
              Customised, made-to-order or already-installed products cannot be
              returned.
            </>,
            <>
              A product delivered damaged or defective must be reported to us
              within 48 hours of delivery, with photographs, so we can arrange
              replacement.
            </>,
            <>
              Approved refunds are made to the original payment method, normally
              within 14 working days of approval.
            </>,
          ]}
        />
      </>
    ),
  },
  {
    id: "software",
    heading: "App, software and connected services",
    body: (
      <>
        <P>
          Some products work with a mobile application and cloud services. We
          grant you a personal, non-exclusive, non-transferable licence to use
          that software with products you have purchased, for as long as you own
          them.
        </P>
        <Bullets
          items={[
            <>
              You may not copy, reverse-engineer, decompile or redistribute the
              software or its firmware.
            </>,
            <>
              We may deliver updates that change or improve features. Some
              updates are necessary for security and may be applied
              automatically.
            </>,
            <>
              Remote and voice control depend on your internet connection and on
              third-party platforms such as Amazon Alexa or Google Assistant. We
              are not responsible for their availability or for changes they
              make.
            </>,
            <>
              You are responsible for keeping your account credentials
              confidential and for activity carried out through your account.
            </>,
          ]}
        />
      </>
    ),
  },
  {
    id: "ip",
    heading: "Intellectual property",
    body: (
      <>
        <P>
          All content on this website — including the {BUSINESS.name} name and
          logo, product names, text, photography, 3D models, illustrations,
          design and code — is owned by us or our licensors and is protected by
          copyright and trade mark law.
        </P>
        <P>
          You may view and print pages for your own reference. You may not
          reproduce, republish, distribute or use our content or branding for
          commercial purposes without our prior written permission. Trade marks
          of third parties are the property of their respective owners and are
          referenced only descriptively.
        </P>
      </>
    ),
  },
  {
    id: "third-party",
    heading: "Third-party services and links",
    body: (
      <>
        <P>
          This website may link to, or interoperate with, services we do not
          control — including Meta’s platforms, Google services, voice
          assistants and payment providers. Links are provided for convenience
          and are not an endorsement.
        </P>
        <P>
          We are not responsible for the content, policies or practices of third
          parties. Your use of their services is governed by their own terms and
          privacy policies.
        </P>
      </>
    ),
  },
  {
    id: "disclaimers",
    heading: "Disclaimers",
    body: (
      <>
        <P>
          This website and its content are provided “as is” and “as available”.
          To the extent permitted by law, we exclude all warranties,
          representations and conditions not expressly set out in these Terms or
          in your quotation.
        </P>
        <P>
          In particular, we do not warrant that the website will be
          uninterrupted, error-free or free of harmful components, or that
          information on it is complete or current at all times. Nothing here
          excludes the statutory rights available to you as a consumer under the
          Consumer Protection Act, 2019 or any other law that cannot be
          excluded.
        </P>
      </>
    ),
  },
  {
    id: "liability",
    heading: "Limitation of liability",
    body: (
      <>
        <P>
          To the fullest extent permitted by law, {BUSINESS.name} will not be
          liable for indirect, incidental, special or consequential loss,
          including loss of profit, loss of data, loss of use, or loss arising
          from the unavailability of a connected feature.
        </P>
        <P>
          Our total liability arising out of or in connection with any product or
          service, whether in contract, tort or otherwise, is limited to the
          amount you actually paid us for the product or service that gave rise
          to the claim.
        </P>
        <Callout>
          Nothing in these Terms limits our liability for death or personal
          injury caused by our negligence, for fraud, or for any other liability
          that cannot lawfully be limited.
        </Callout>
      </>
    ),
  },
  {
    id: "indemnity",
    heading: "Indemnity",
    body: (
      <P>
        You agree to indemnify and hold {BUSINESS.name}, its directors,
        employees and partners harmless against any claim, loss, damage or
        expense arising from your breach of these Terms, your misuse of the
        website or our products, or your violation of any law or third-party
        right.
      </P>
    ),
  },
  {
    id: "force-majeure",
    heading: "Events outside our control",
    body: (
      <P>
        We are not liable for any delay or failure to perform caused by events
        beyond our reasonable control — including natural disasters, fire,
        flood, epidemic, war, civil unrest, strikes, failure of public
        infrastructure or utilities, government action, or interruption of
        internet or telecommunications services. Where such an event occurs, we
        will let you know and agree a revised timeline with you.
      </P>
    ),
  },
  {
    id: "privacy",
    heading: "Privacy",
    body: (
      <P>
        Personal information you give us is handled in accordance with our{" "}
        <InlineLink href="/privacy-policy">Privacy Policy</InlineLink>, which
        forms part of these Terms. It explains what we collect, how we use it,
        how Meta Lead Ads data is handled, and how to request deletion of your
        data.
      </P>
    ),
  },
  {
    id: "governing-law",
    heading: "Governing law and jurisdiction",
    body: (
      <P>
        These Terms and any dispute arising out of them or out of your use of
        this website or our products are governed by the laws of India. The
        courts at {BUSINESS.city}, {BUSINESS.region} have exclusive jurisdiction,
        except that we may bring proceedings to enforce our intellectual
        property rights in any competent court. We will always try to resolve a
        complaint with you directly first.
      </P>
    ),
  },
  {
    id: "changes",
    heading: "Changes to these terms",
    body: (
      <P>
        We may revise these Terms from time to time to reflect changes in our
        products, our business or the law. The version published on this page is
        the one that applies, and the date at the top shows when it was last
        revised. Continuing to use the website after a change means you accept
        the revised Terms. Terms that applied to an order already placed
        continue to govern that order.
      </P>
    ),
  },
  {
    id: "contact",
    heading: "Contact us",
    body: (
      <>
        <P>
          For any question about these Terms, a quotation, an order or a
          warranty claim:
        </P>
        <Callout>
          <dl className="space-y-3">
            <div>
              <dt className="label font-semibold text-muted">Phone</dt>
              <dd className="mt-1">
                <Tel label={BUSINESS.phone} href={BUSINESS.phoneHref} />
              </dd>
            </div>
            <div>
              <dt className="label font-semibold text-muted">Email</dt>
              <dd className="mt-1">
                <Mail address={BUSINESS.email} />
              </dd>
            </div>
            <div>
              <dt className="label font-semibold text-muted">Business</dt>
              <dd className="mt-1 text-text">
                {BUSINESS.legalName}, {BUSINESS.city}, {BUSINESS.region}, India
              </dd>
            </div>
          </dl>
        </Callout>
      </>
    ),
  },
];

export default function TermsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `${TITLE} | ${BUSINESS.name}`,
    description: DESCRIPTION,
    url: `${SITE_URL}/terms`,
    isPartOf: { "@type": "WebSite", name: BUSINESS.name, url: SITE_URL },
    publisher: { "@type": "Organization", name: BUSINESS.name, url: SITE_URL },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <LegalPage
        eyebrow="Legal"
        title="Terms of Service"
        intro={
          <>
            These terms cover how you may use this website and the basis on
            which {BUSINESS.name} provides quotations, products, installation
            and warranty support to customers in India.
          </>
        }
        sections={SECTIONS}
      />
    </>
  );
}
