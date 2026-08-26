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

const TITLE = "Privacy Policy";
const DESCRIPTION = `How ${BUSINESS.name} collects, uses and protects the personal information you share with us — including data received through Meta (Facebook and Instagram) Lead Ads — and how to request deletion of your data.`;
const DOMAIN = SITE_URL.replace(/^https?:\/\//, "");

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/privacy-policy" },
  openGraph: {
    type: "article",
    siteName: BUSINESS.name,
    title: `${TITLE} | ${BUSINESS.name}`,
    description: DESCRIPTION,
    url: `${SITE_URL}/privacy-policy`,
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
    id: "who-we-are",
    heading: "Who we are",
    body: (
      <>
        <P>
          {BUSINESS.legalName} (“{BUSINESS.name}”, “we”, “us” or “our”) designs
          and supplies smart home automation products — touch panels, smart
          locks, sensors and the connected ecosystem around them. We operate
          from {BUSINESS.city}, {BUSINESS.region}, India, and serve customers
          across India.
        </P>
        <P>
          This policy explains what personal information we collect through{" "}
          <InlineLink href={SITE_URL}>{DOMAIN}</InlineLink> and through our
          advertising on Meta platforms, why we collect it, who we share it
          with, and the choices you have. It applies to everyone who visits our
          website or submits an enquiry to us.
        </P>
        <P>
          We are the data fiduciary (data controller) for the information
          described here. If you disagree with this policy, please do not submit
          your details to us.
        </P>
      </>
    ),
  },
  {
    id: "information-we-collect",
    heading: "Information we collect",
    body: (
      <>
        <SubHeading>Information you give us directly</SubHeading>
        <P>
          When you fill in an enquiry or “book a demo” form on our website, or
          submit a lead form in one of our Meta ads, we collect:
        </P>
        <Bullets
          items={[
            <>
              <strong className="font-medium text-text">Full name</strong> — so
              we know who we are speaking to.
            </>,
            <>
              <strong className="font-medium text-text">Email address</strong> —
              to send you product information and quotations.
            </>,
            <>
              <strong className="font-medium text-text">Phone number</strong> —
              our primary way of responding to enquiries.
            </>,
            <>
              <strong className="font-medium text-text">City</strong> — so we
              can route you to the right installation team and tell you whether
              we service your area.
            </>,
            <>
              Anything else you choose to tell us in a message, on a call or
              over WhatsApp.
            </>,
          ]}
        />

        <SubHeading>Information collected automatically</SubHeading>
        <P>
          When a form is submitted, our server also records a small amount of
          technical context alongside it:
        </P>
        <Bullets
          items={[
            <>
              The <strong className="font-medium text-text">page or ad</strong>{" "}
              the enquiry came from, so we know which campaign to credit.
            </>,
            <>
              Your{" "}
              <strong className="font-medium text-text">
                browser and device type
              </strong>{" "}
              (the user-agent string), used to detect automated spam
              submissions.
            </>,
            <>
              The{" "}
              <strong className="font-medium text-text">date and time</strong>{" "}
              of the submission.
            </>,
          ]}
        />
        <P>
          We also use a privacy-friendly, aggregate analytics service that
          counts page views and performance metrics. It does not use cookies and
          does not build a profile of you as an individual.
        </P>

        <SubHeading>What we do not collect</SubHeading>
        <P>
          We do not ask for and do not want your financial account details,
          passwords, government identity numbers, or any sensitive personal data
          such as health, biometric, caste, religious or political information.
          Please do not send these to us. We do not collect video, audio or
          sensor data from installed devices through this website.
        </P>
      </>
    ),
  },
  {
    id: "how-we-use",
    heading: "How we use your information",
    body: (
      <>
        <P>We use the information above only for the following purposes:</P>
        <Bullets
          items={[
            <>
              <strong className="font-medium text-text">
                To contact you about our products.
              </strong>{" "}
              This is the main reason we collect your details — to call, email
              or message you about the smart home products you enquired about,
              answer your questions, and arrange a demo or site visit.
            </>,
            <>
              <strong className="font-medium text-text">
                To prepare quotations and proposals
              </strong>{" "}
              suited to your home, city and requirements.
            </>,
            <>
              <strong className="font-medium text-text">
                To provide service and support
              </strong>{" "}
              — installation scheduling, warranty queries and after-sales help.
            </>,
            <>
              <strong className="font-medium text-text">
                To send occasional updates
              </strong>{" "}
              about new products or offers, where you have agreed to receive
              them. You can opt out at any time and we will stop.
            </>,
            <>
              <strong className="font-medium text-text">
                To prevent spam and abuse
              </strong>{" "}
              and to keep our website secure and working correctly.
            </>,
            <>
              <strong className="font-medium text-text">
                To measure our advertising
              </strong>{" "}
              in aggregate — how many enquiries a campaign produced — so we
              spend our budget sensibly.
            </>,
          ]}
        />
        <Callout>
          <strong className="font-medium text-text">
            We do not sell your data.
          </strong>{" "}
          We do not sell, rent or trade your personal information to anyone, and
          we do not share your contact details with other companies for their
          own marketing.
        </Callout>
        <SubHeading>Our legal basis</SubHeading>
        <P>
          We process your information on the basis of the consent you give when
          you voluntarily submit a form, and to take steps at your request
          before entering into a contract with you. Where we keep records for
          tax, warranty or accounting purposes, we do so to comply with Indian
          law. We process personal data in accordance with the Digital Personal
          Data Protection Act, 2023 and the Information Technology Act, 2000 and
          the rules made under them.
        </P>
      </>
    ),
  },
  {
    id: "meta-lead-ads",
    heading: "Meta (Facebook and Instagram) Lead Ads",
    body: (
      <>
        <P>
          We advertise on Facebook and Instagram, which are operated by Meta
          Platforms, Inc. Some of those advertisements use{" "}
          <strong className="font-medium text-text">Lead Ads</strong> — an
          instant form that opens inside the Facebook or Instagram app rather
          than on our website.
        </P>
        <SubHeading>How the data reaches us</SubHeading>
        <Bullets
          items={[
            <>
              Meta may pre-fill the form with the name, email address and phone
              number already on your Facebook or Instagram profile. You can edit
              any pre-filled field before submitting, and you can close the form
              without submitting it.
            </>,
            <>
              Nothing is shared with us until you tap submit. Submitting the
              form is your consent for Meta to pass those details to{" "}
              {BUSINESS.name}.
            </>,
            <>
              We then receive your name, email, phone number and city, and treat
              them exactly like an enquiry made on our own website — governed by
              this policy.
            </>,
            <>
              We use those details to contact you about the smart home products
              advertised. We do not use them for any unrelated purpose.
            </>,
          ]}
        />
        <SubHeading>Meta’s own role</SubHeading>
        <P>
          While you are on Facebook or Instagram, Meta processes your data as an
          independent controller under its own privacy policy, which we do not
          control. Meta also tells us, in aggregate, how our ads performed. To
          review or change what Meta holds about you, or to manage how your data
          is used for advertising, see{" "}
          <InlineLink external href="https://www.facebook.com/privacy/policy/">
            Meta’s Privacy Policy
          </InlineLink>{" "}
          and your{" "}
          <InlineLink external href="https://accountscenter.facebook.com/">
            Meta Accounts Center
          </InlineLink>
          .
        </P>
        <P>
          We do not currently upload customer lists to Meta to build custom or
          lookalike audiences. If that ever changes, we will update this policy
          before we do so.
        </P>
      </>
    ),
  },
  {
    id: "cookies",
    heading: "Cookies and similar technologies",
    body: (
      <>
        <P>
          Our public website is deliberately light on tracking. We do not use
          advertising or profiling cookies on {DOMAIN}, and there is no cookie
          banner because there is nothing non-essential to consent to.
        </P>
        <Bullets
          items={[
            <>
              <strong className="font-medium text-text">
                Strictly necessary cookies.
              </strong>{" "}
              A single sign-in cookie is set only for our own staff when they
              log in to the internal enquiry dashboard. Visitors never receive
              it.
            </>,
            <>
              <strong className="font-medium text-text">Analytics.</strong> We
              measure page views and site speed using a cookieless, aggregate
              analytics service. It does not identify you or follow you across
              other websites.
            </>,
            <>
              <strong className="font-medium text-text">
                Fonts and images.
              </strong>{" "}
              Typefaces are served from our own domain. Some product photography
              is delivered through third-party content delivery networks, which
              necessarily see the IP address your browser connects from in order
              to send the image.
            </>,
          ]}
        />
        <P>
          If you reach us through a Facebook or Instagram ad, Meta may have set
          cookies on your device in its own apps or website before you arrived.
          Those are governed by Meta’s policies, and you can control them in
          your Meta account settings or your browser settings. Most browsers
          also let you block or delete cookies entirely; our website will
          continue to work if you do.
        </P>
      </>
    ),
  },
  {
    id: "third-parties",
    heading: "Third parties we share data with",
    body: (
      <>
        <P>
          We keep the list of people who can see your data as short as possible.
          We share it only with service providers who help us run the business,
          and only so far as they need it:
        </P>
        <Bullets
          items={[
            <>
              <strong className="font-medium text-text">
                Meta Platforms, Inc.
              </strong>{" "}
              — where you submitted a Lead Ad form, Meta is the source of the
              data and retains its own copy under its own policy.
            </>,
            <>
              <strong className="font-medium text-text">Google LLC</strong> —
              where we use Google services such as advertising, business
              messaging or a Google Workspace account, your enquiry may be
              stored or processed there. Google acts under its own privacy
              policy.
            </>,
            <>
              <strong className="font-medium text-text">
                Our hosting and analytics provider
              </strong>{" "}
              — which runs the servers this website is delivered from and stores
              enquiry records on our behalf.
            </>,
            <>
              <strong className="font-medium text-text">
                Installation and service partners
              </strong>{" "}
              — where a site visit or installation is arranged, we pass on the
              minimum needed (typically your name, phone number and address) so
              the technician can reach you.
            </>,
            <>
              <strong className="font-medium text-text">
                Professional advisers and authorities
              </strong>{" "}
              — accountants, auditors or lawyers where required, and government
              or law enforcement bodies where we are legally obliged to
              disclose.
            </>,
          ]}
        />
        <P>
          Some of these providers operate servers outside India. Where your data
          is transferred abroad, we rely on the provider’s contractual
          commitments to protect it to the standard described in this policy.
        </P>
      </>
    ),
  },
  {
    id: "retention",
    heading: "How long we keep your data",
    body: (
      <>
        <P>
          We keep enquiry records for as long as we have a genuine reason to:
        </P>
        <Bullets
          items={[
            <>
              <strong className="font-medium text-text">
                Enquiries that do not become orders
              </strong>{" "}
              are kept for up to 24 months, then deleted. Smart home purchases
              are often planned well in advance, and customers frequently return
              to us months later.
            </>,
            <>
              <strong className="font-medium text-text">
                Customer records
              </strong>{" "}
              are kept for the duration of the product warranty (up to 7 years
              on our panels) so we can honour warranty and service claims.
            </>,
            <>
              <strong className="font-medium text-text">
                Invoices and tax records
              </strong>{" "}
              are kept for the period Indian tax law requires.
            </>,
          ]}
        />
        <P>
          You can ask us to delete your data sooner at any time — see{" "}
          <InlineLink href="#data-deletion">
            how to request data deletion
          </InlineLink>
          .
        </P>
      </>
    ),
  },
  {
    id: "security",
    heading: "How we protect your data",
    body: (
      <>
        <P>
          Our website is served over encrypted HTTPS connections. Enquiry
          records are held in an access-controlled system that only authorised{" "}
          {BUSINESS.name} staff can sign in to, and access is limited to the
          people who need it to answer your enquiry. Passwords protecting that
          system are not stored in plain text.
        </P>
        <P>
          No system is perfectly secure, and we cannot guarantee absolute
          security of data sent over the internet. If a breach ever affects your
          personal data, we will notify you and the relevant authority as
          required by law.
        </P>
      </>
    ),
  },
  {
    id: "your-rights",
    heading: "Your rights",
    body: (
      <>
        <P>
          You have the following rights over the personal information we hold
          about you:
        </P>
        <Bullets
          items={[
            <>
              <strong className="font-medium text-text">Access</strong> — ask
              for a copy of the data we hold about you and a summary of how it
              is being processed.
            </>,
            <>
              <strong className="font-medium text-text">Correction</strong> —
              ask us to correct anything inaccurate, incomplete or out of date.
            </>,
            <>
              <strong className="font-medium text-text">Erasure</strong> — ask
              us to delete your data where we no longer need it for the purpose
              you gave it to us for.
            </>,
            <>
              <strong className="font-medium text-text">
                Withdraw consent
              </strong>{" "}
              — tell us to stop contacting you, at any time, without giving a
              reason. Withdrawing consent does not affect processing already
              carried out.
            </>,
            <>
              <strong className="font-medium text-text">
                Object to marketing
              </strong>{" "}
              — ask to be removed from promotional calls, emails or messages
              while remaining a customer.
            </>,
            <>
              <strong className="font-medium text-text">
                Grievance redressal
              </strong>{" "}
              — raise a complaint with us and have it addressed. If you are not
              satisfied with our response, you may escalate to the Data
              Protection Board of India.
            </>,
            <>
              <strong className="font-medium text-text">Nominate</strong> —
              nominate another person to exercise these rights on your behalf in
              the event of your death or incapacity.
            </>,
          ]}
        />
        <P>
          To exercise any of these, contact us using the details in{" "}
          <InlineLink href="#contact">Contact us</InlineLink>. We will respond
          within 30 days. We may ask you to confirm your identity first, so that
          we do not disclose your data to someone else.
        </P>
      </>
    ),
  },
  {
    id: "data-deletion",
    heading: "How to request data deletion",
    body: (
      <>
        <P>
          You can ask us to delete everything we hold about you, at any time,
          and it costs nothing.
        </P>
        <Callout>
          <p className="font-medium text-text">To request deletion:</p>
          <ol className="mt-3 space-y-2">
            <li>
              1. Email <Mail address={BUSINESS.email} /> with the subject line{" "}
              <span className="font-medium text-text">“Delete my data”</span>,
              or call us on{" "}
              <Tel label={BUSINESS.phone} href={BUSINESS.phoneHref} />.
            </li>
            <li>
              2. Tell us the name, phone number and email address you originally
              gave us, so we can find your record.
            </li>
            <li>
              3. We will confirm your identity, delete your data, and email you
              to confirm — normally within 7 working days and always within 30
              days.
            </li>
          </ol>
        </Callout>
        <P>
          Once deleted, your record is removed from our enquiry system and from
          any copy held in our internal spreadsheets, and we will stop
          contacting you. We may need to retain a minimal record — for example
          an invoice — where tax law obliges us to keep it, and we will tell you
          if that applies.
        </P>
        <SubHeading>Data held by Meta</SubHeading>
        <P>
          Deleting your data with us does not delete the copy Meta holds from a
          Lead Ad, because Meta is a separate controller. To remove that, use
          the{" "}
          <InlineLink external href="https://accountscenter.facebook.com/">
            Meta Accounts Center
          </InlineLink>{" "}
          or Facebook’s and Instagram’s own settings for downloading and
          deleting your information.
        </P>
      </>
    ),
  },
  {
    id: "children",
    heading: "Children’s privacy",
    body: (
      <>
        <P>
          Our website and products are sold to adults — typically homeowners,
          builders and interior designers. We do not knowingly collect personal
          data from anyone under 18 years of age, and we do not direct our
          advertising at children.
        </P>
        <P>
          If you believe a child has submitted their details to us, contact us
          and we will delete the record promptly.
        </P>
      </>
    ),
  },
  {
    id: "changes",
    heading: "Changes to this policy",
    body: (
      <>
        <P>
          We may update this policy as our products, advertising or legal
          obligations change. The date at the top of this page always shows when
          it was last revised, and the current version is the one published
          here.
        </P>
        <P>
          If we ever make a change that materially affects how we use data you
          have already given us, we will tell you directly before it takes
          effect.
        </P>
      </>
    ),
  },
  {
    id: "contact",
    heading: "Contact us",
    body: (
      <>
        <P>
          For any question about this policy, to exercise your rights, or to
          raise a privacy grievance, reach the {BUSINESS.name} privacy contact:
        </P>
        <Callout>
          <dl className="space-y-3">
            <div>
              <dt className="label font-semibold text-muted">Email</dt>
              <dd className="mt-1">
                <Mail address={BUSINESS.email} />
              </dd>
            </div>
            <div>
              <dt className="label font-semibold text-muted">Phone</dt>
              <dd className="mt-1">
                <Tel label={BUSINESS.phone} href={BUSINESS.phoneHref} />
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
        <P>
          We aim to acknowledge every privacy request within 3 working days and
          resolve it within 30 days. If you are not satisfied with how we have
          handled your complaint, you may escalate it to the Data Protection
          Board of India.
        </P>
      </>
    ),
  },
];

export default function PrivacyPolicyPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `${TITLE} | ${BUSINESS.name}`,
    description: DESCRIPTION,
    url: `${SITE_URL}/privacy-policy`,
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
        title="Privacy Policy"
        intro={
          <>
            This policy explains what personal information {BUSINESS.name}{" "}
            collects when you enquire with us — on this website or through a
            Facebook or Instagram lead form — how we use it, and how to have it
            deleted.
          </>
        }
        sections={SECTIONS}
      />
    </>
  );
}
