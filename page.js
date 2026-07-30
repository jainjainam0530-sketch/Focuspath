import LegalShell from '@/components/legal-shell'

export const metadata = {
  title: 'Terms of Service — FocusPath',
  description: 'The terms that govern your use of the FocusPath platform and FOCUS AI mentor.',
}

export default function TermsPage() {
  return (
    <LegalShell title="Terms of Service" eyebrow="POLICY • TERMS" updated="June 2026">
      <div className="callout">
        By using FocusPath, you agree to these terms. Please read them carefully — they exist to protect you and every student on the platform.
      </div>

      <h2>1. Acceptance of terms</h2>
      <p>
        These Terms of Service (“Terms”) form a binding agreement between you and FocusPath. By accessing the FocusPath website, installing the mobile APK, or interacting with FOCUS (our AI mentor), you accept these Terms in full. If you do not agree, do not use the service.
      </p>

      <h2>2. Eligibility</h2>
      <ul>
        <li>You must be at least 13 years old to use FocusPath.</li>
        <li>If you are between 13 and 18, you confirm that a parent or legal guardian is aware of and consents to your use of the platform.</li>
        <li>You must have the legal capacity to enter into this agreement in your country of residence.</li>
      </ul>

      <h2>3. Your responsibilities</h2>
      <ul>
        <li>Use FocusPath honestly, respectfully, and for personal educational and career guidance purposes.</li>
        <li>Do not use the platform to send spam, hateful, unlawful, sexually explicit, or harmful content.</li>
        <li>Do not attempt to reverse engineer, disrupt, or gain unauthorised access to any part of the service or its infrastructure.</li>
        <li>Do not impersonate another person, misrepresent your affiliation, or submit false information.</li>
        <li>You are responsible for any content you submit through reviews, feedback, or messages to FOCUS.</li>
      </ul>

      <h2>4. Intellectual property</h2>
      <p>
        The FocusPath name, FOCUS AI mentor, brand marks, UI, animations, code, and content are the intellectual property of the founder, Jainam, and are protected under applicable copyright and trademark laws. You may not copy, redistribute, sublicense, or create derivative works without written permission.
      </p>
      <p>
        You retain ownership of the content you submit (reviews, messages, feedback). By submitting content you grant FocusPath a worldwide, royalty-free, non-exclusive licence to display, store, and use it in connection with running and improving the platform.
      </p>

      <h2>5. AI guidance disclaimer</h2>
      <p>
        <strong>FocusPath provides AI-assisted guidance. It does not guarantee any specific educational, exam, career, financial, or life outcome.</strong> FOCUS is a mentor, not an oracle. Always consult trusted teachers, mentors, and family before making important decisions. FocusPath is not a substitute for professional counselling, medical care, or legal advice.
      </p>

      <h2>6. Limitation of liability</h2>
      <p>
        To the fullest extent permitted by law, FocusPath, its founder, and its contributors will not be liable for any indirect, incidental, consequential, or special damages arising out of or in connection with your use of the platform, including but not limited to loss of data, missed opportunities, or academic outcomes. The platform is provided on an “as is” and “as available” basis, without warranties of any kind.
      </p>

      <h2>7. Suspension and termination</h2>
      <p>
        We may suspend or terminate your access to FocusPath at any time, without notice, if you violate these Terms, misuse the service, or engage in activity that harms other students, the platform, or third parties. You may stop using FocusPath at any time.
      </p>

      <h2>8. Changes to the service and to these Terms</h2>
      <p>
        FocusPath is under active development. Features may be added, changed, or removed as the platform evolves. We may update these Terms from time to time; material changes will be reflected in the “Updated” date at the top of this page. Continued use of FocusPath after an update means you accept the revised Terms.
      </p>

      <h2>9. Governing law and jurisdiction</h2>
      <p>
        These Terms are governed by the laws of India, without regard to its conflict-of-laws principles. Any dispute arising from or related to these Terms or your use of FocusPath will be subject to the exclusive jurisdiction of the competent courts located in India.
      </p>

      <h2>10. Contact</h2>
      <p>
        Questions about these Terms may be sent to <a href="mailto:focus@focuspath.ai">focus@focuspath.ai</a> or through the <a href="/#contact">Contact section</a>. We aim to respond within 48 hours.
      </p>
    </LegalShell>
  )
}
