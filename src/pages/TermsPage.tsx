import React from 'react';
import LegalPageLayout from '../components/LegalPageLayout';
import { useLegalPageHead } from '../hooks/useLegalPageHead';
import { SITE_ORIGIN } from '../lib/site';

const TermsPage: React.FC = () => {
  useLegalPageHead({
    title: 'Terms of Use',
    description:
      'Terms of use for SKIZEN website and services at skizen.in — acceptable use, intellectual property, liability, and governing law.',
    canonicalPath: '/terms',
  });

  return (
    <LegalPageLayout
      title="Terms of Use"
      intro="Last updated: 12 April 2026. By accessing or using the SKIZEN website and services, you agree to these terms. If you do not agree, please do not use our site or services."
    >
      <section>
        <h2>Agreement</h2>
        <p>
          These Terms of Use (“Terms”) govern your use of the website at{' '}
          <a href={SITE_ORIGIN}>{SITE_ORIGIN.replace('https://', '')}</a> and related communications with SKIZEN
          (“SKIZEN”, “we”, “us”) in Hyderabad, India. Separate written agreements (such as statements of work or
          master services agreements) apply to specific client engagements and prevail over these Terms where they
          conflict.
        </p>
      </section>

      <section>
        <h2>Services and information</h2>
        <p>
          Content on this website describes our capabilities in software engineering, product delivery, and related services. It is for
          general information only and does not constitute a binding offer or guarantee of results. Proposals,
          timelines, and deliverables are confirmed only in signed contracts or written confirmations.
        </p>
      </section>

      <section>
        <h2>Acceptable use</h2>
        <p>You agree not to:</p>
        <ul>
          <li>Use the site in any way that violates applicable laws or regulations</li>
          <li>Attempt to gain unauthorised access to our systems, networks, or data</li>
          <li>Introduce malware, scrape the site in a way that impairs performance, or overload our infrastructure</li>
          <li>Misrepresent your identity or affiliation when contacting us or submitting forms</li>
          <li>Use our branding, logos, or content in a manner that implies endorsement without permission</li>
        </ul>
      </section>

      <section>
        <h2>Intellectual property</h2>
        <p>
          Unless otherwise stated, SKIZEN or its licensors own the website design, text, graphics, logos, and other
          materials. You may view and print reasonable portions for personal or internal business use related to
          evaluating our services. Any other reproduction, distribution, or modification requires our prior written
          consent. Client deliverables are governed by the applicable project agreement.
        </p>
      </section>

      <section>
        <h2>Third-party content and links</h2>
        <p>
          Our site may reference or link to third-party websites, tools, or platforms. We are not responsible for
          their content, availability, or practices. Use of third-party services is at your own risk and subject to
          their terms.
        </p>
      </section>

      <section>
        <h2>Disclaimer of warranties</h2>
        <p>
          The website and its content are provided “as is” and “as available” without warranties of any kind, whether
          express or implied, including implied warranties of merchantability, fitness for a particular purpose, or
          non-infringement, to the fullest extent permitted by law.
        </p>
      </section>

      <section>
        <h2>Limitation of liability</h2>
        <p>
          To the maximum extent permitted by applicable law, SKIZEN and its team shall not be liable for any indirect,
          incidental, special, consequential, or punitive damages, or for loss of profits, data, or goodwill, arising
          from your use of the website or reliance on its content. Our total liability for claims arising from website
          use (where not excluded by law) shall not exceed the amount you paid us specifically for access to the site
          in the twelve months preceding the claim, or INR 5,000, whichever is greater, except where liability cannot
          be limited by law.
        </p>
      </section>

      <section>
        <h2>Indemnity</h2>
        <p>
          You agree to indemnify and hold harmless SKIZEN from claims, damages, losses, or expenses (including
          reasonable legal fees) arising from your violation of these Terms or misuse of the website, except to the
          extent caused by our wilful misconduct.
        </p>
      </section>

      <section>
        <h2>Governing law and disputes</h2>
        <p>
          These Terms are governed by the laws of India, without regard to conflict-of-law rules. Subject to
          mandatory consumer protections where applicable, courts in Hyderabad, Telangana, India shall have exclusive
          jurisdiction over disputes arising from these Terms or website use, unless we agree otherwise in writing.
        </p>
      </section>

      <section>
        <h2>Changes</h2>
        <p>
          We may update these Terms periodically. The “Last updated” date reflects the current version. Your continued
          use of the website after changes are posted constitutes acceptance of the revised Terms where permitted by
          law.
        </p>
      </section>

      <section>
        <h2>Contact</h2>
        <p>
          For questions about these Terms: <a href="mailto:info@skizen.in">info@skizen.in</a>
          <br />
          Phone: <a href="tel:+916305680890">+91 63056 80890</a>
        </p>
      </section>
    </LegalPageLayout>
  );
};

export default TermsPage;
