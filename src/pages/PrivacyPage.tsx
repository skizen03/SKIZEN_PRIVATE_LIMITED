import React from 'react';
import LegalPageLayout from '../components/LegalPageLayout';
import { useLegalPageHead } from '../hooks/useLegalPageHead';
import { SITE_ORIGIN } from '../lib/site';

const PrivacyPage: React.FC = () => {
  useLegalPageHead({
    title: 'Privacy Policy',
    description:
      'SKIZEN privacy policy: how we collect, use, and protect personal information when you use skizen.in and our services.',
    canonicalPath: '/privacy',
  });

  return (
    <LegalPageLayout
      title="Privacy Policy"
      intro="Last updated: 12 April 2026. This policy describes how SKIZEN (“we”, “us”) handles information when you visit our website or engage our services."
    >
      <section>
        <h2>Who we are</h2>
        <p>
          SKIZEN is a software and technology company based in Hyderabad, India. Our website is operated at{' '}
          <a href={SITE_ORIGIN}>{SITE_ORIGIN.replace('https://', '')}</a>. For privacy-related requests, contact us at{' '}
          <a href="mailto:info@skizen.in">info@skizen.in</a> or +91 63056 80890.
        </p>
      </section>

      <section>
        <h2>Information we collect</h2>
        <p>We may collect the following categories of information, depending on how you interact with us:</p>
        <ul>
          <li>
            <strong>Information you provide</strong> — such as name, email address, phone number, company name, and
            project details when you submit contact forms, email us, or sign up for updates.
          </li>
          <li>
            <strong>Technical and usage data</strong> — such as IP address, browser type, device type, general location
            (country/city), pages viewed, and referring URLs, collected through cookies and similar technologies.
          </li>
          <li>
            <strong>Communication records</strong> — records of enquiries, proposals, and support correspondence when
            you work with us as a client or prospect.
          </li>
        </ul>
      </section>

      <section>
        <h2>How we use your information</h2>
        <p>We use personal information for purposes including:</p>
        <ul>
          <li>Responding to enquiries and delivering proposals or contracts</li>
          <li>Providing software development, integrations, and related professional services to clients</li>
          <li>Operating, securing, and improving our website and internal tools</li>
          <li>Sending newsletters or updates where you have opted in (you may unsubscribe at any time)</li>
          <li>Complying with legal obligations and protecting our legitimate interests</li>
        </ul>
      </section>

      <section>
        <h2>Legal bases (where applicable)</h2>
        <p>
          If you are in a jurisdiction that requires a legal basis for processing (for example, certain cross-border
          contexts), we rely on consent, performance of a contract, legitimate interests (such as operating our
          business and securing our systems), and legal obligation as appropriate to the activity.
        </p>
      </section>

      <section>
        <h2>Cookies and analytics</h2>
        <p>
          We may use cookies and similar technologies to remember preferences, measure traffic, and understand how
          visitors use our site. You can control cookies through your browser settings. Disabling cookies may affect
          some features of the website.
        </p>
      </section>

      <section>
        <h2>Sharing of information</h2>
        <p>
          We do not sell your personal information. We may share information with trusted service providers who assist
          us (for example, hosting, email delivery, or analytics), subject to confidentiality and purpose limitations.
          We may also disclose information if required by law, court order, or to protect the rights, safety, and
          security of SKIZEN, our clients, or the public.
        </p>
      </section>

      <section>
        <h2>Data retention</h2>
        <p>
          We retain personal information only as long as necessary for the purposes described above, including to
          meet legal, accounting, or reporting requirements. Retention periods vary depending on the nature of the data
          and our relationship with you.
        </p>
      </section>

      <section>
        <h2>Security</h2>
        <p>
          We implement reasonable technical and organisational measures designed to protect personal information.
          No method of transmission over the internet is completely secure; we encourage you to use strong passwords
          and protect your own devices and accounts.
        </p>
      </section>

      <section>
        <h2>Your rights</h2>
        <p>
          Depending on applicable law, you may have the right to access, correct, delete, or restrict processing of
          your personal data, or to object to certain processing. To exercise these rights, contact us at{' '}
          <a href="mailto:info@skizen.in">info@skizen.in</a>. We will respond within a reasonable timeframe.
        </p>
      </section>

      <section>
        <h2>Third-party links</h2>
        <p>
          Our website may link to third-party sites or tools (for example, social platforms or partner tools). Their
          privacy practices are governed by their own policies; we are not responsible for those sites.
        </p>
      </section>

      <section>
        <h2>Children</h2>
        <p>
          Our services are directed at businesses and adults. We do not knowingly collect personal information from
          children. If you believe we have collected such information, please contact us so we can delete it.
        </p>
      </section>

      <section>
        <h2>Changes to this policy</h2>
        <p>
          We may update this Privacy Policy from time to time. The “Last updated” date at the top will reflect the
          latest version. Continued use of our website after changes constitutes acceptance of the updated policy
          where permitted by law.
        </p>
      </section>

      <section>
        <h2>Contact</h2>
        <p>
          Questions about this Privacy Policy: <a href="mailto:info@skizen.in">info@skizen.in</a>
          <br />
          Phone: <a href="tel:+916305680890">+91 63056 80890</a>
        </p>
      </section>
    </LegalPageLayout>
  );
};

export default PrivacyPage;
