import LegalShell from '@/components/legal-shell'

export const metadata = {
  title: 'Privacy Policy — FocusPath',
  description: 'How FocusPath collects, uses, and protects student data. Your privacy is our first principle.',
}

export default function PrivacyPage() {
  return (
    <LegalShell title="Privacy Policy" eyebrow="POLICY • PRIVACY" updated="June 2026">
      <div className="callout">
        FocusPath is committed to protecting the privacy and security of every student using our platform.
      </div>

      <h2>1. Introduction</h2>
      <p>
        FocusPath (“we”, “our”, “the platform”) is an AI-powered student mentor built by Jainam, a 16-year-old founder based in India. This Privacy Policy explains what information we collect from you when you use the FocusPath website, mobile APK, or interact with FOCUS — our AI mentor.
      </p>
      <p>
        By using FocusPath you agree to the practices described here. If you do not agree, please do not use the service.
      </p>

      <h2>2. Information we collect</h2>
      <ul>
        <li><strong>Information you provide:</strong> your name (optional), class or role (optional), email or contact handle (optional), messages you send to FOCUS, reviews you post, and feedback, feature requests, or bug reports you submit.</li>
        <li><strong>Usage data:</strong> anonymous counters such as APK download totals, page interactions, and conversation counts. These are stored without personal identifiers.</li>
        <li><strong>Device and browser data:</strong> when you use the site or app your browser or device may send basic technical information (browser type, screen size, session identifier) to help us keep the experience stable.</li>
        <li><strong>Voice input:</strong> if you use the optional voice interaction with FOCUS, speech recognition happens locally in your browser. FocusPath does not record or store your voice.</li>
      </ul>

      <h2>3. Why we collect it</h2>
      <ul>
        <li>To let FOCUS deliver personalised, contextual guidance during your conversation.</li>
        <li>To publish the reviews you choose to submit to our public Student Voices wall.</li>
        <li>To read and act on your feedback, feature suggestions, and bug reports.</li>
        <li>To measure aggregate usage so we can improve the product for every student.</li>
        <li>To respond to messages you send through the Contact section.</li>
      </ul>

      <h2>4. How we store and protect data</h2>
      <p>
        All submissions are stored in a managed MongoDB database with encryption in transit (TLS/HTTPS). Access is restricted to the founder and authorised maintainers. We do not store passwords, biometric data, or payment information. Session identifiers are generated as UUIDs and do not reveal your identity.
      </p>

      <h2>5. Third-party services</h2>
      <ul>
        <li><strong>AI model provider:</strong> when you chat with FOCUS or post a review, your message is sent to a third-party large-language-model provider (currently OpenAI, routed through the Emergent integration platform) to generate a response. These providers process your message under their own privacy terms and do not associate it with your identity.</li>
        <li><strong>Hosting:</strong> the platform is served through the Emergent cloud platform.</li>
        <li><strong>File hosting:</strong> the FocusPath APK is delivered via a third-party file-sharing service (currently MediaFire).</li>
      </ul>
      <p>
        We do not sell or rent your data to any third party for advertising or profiling.
      </p>

      <h2>6. Your rights</h2>
      <ul>
        <li><strong>Access:</strong> request a copy of the data associated with you or your session.</li>
        <li><strong>Correction:</strong> ask us to correct any inaccurate information you have submitted.</li>
        <li><strong>Deletion:</strong> ask us to delete a specific review, message, or submission you made. If you are under 18, a parent or guardian may make this request on your behalf.</li>
        <li><strong>Withdrawal:</strong> stop using FocusPath at any time. Your existing data will be removed on request.</li>
      </ul>

      <h2>7. Data retention</h2>
      <p>
        Chat and review data is retained for as long as it remains useful to the running of FocusPath or until you request its deletion. Anonymous aggregate counters may be retained indefinitely for historical measurement. Backups are rotated regularly and expire within 90 days.
      </p>

      <h2>8. Children’s privacy</h2>
      <p>
        FocusPath is designed for students aged 13–25. If you are under 13 you may only use FocusPath with the consent of a parent or guardian. We do not knowingly collect personal information from children under 13. If you believe a child under 13 has provided us with personal information, contact us and we will delete it promptly.
      </p>

      <h2>9. Changes to this policy</h2>
      <p>
        We may update this policy from time to time. Material changes will be reflected in the “Updated” date at the top of this page. Continued use of FocusPath after an update means you accept the revised policy.
      </p>

      <h2>10. Contact us</h2>
      <p>
        For any privacy question, deletion request, or concern, please write to us at <a href="mailto:focus@focuspath.ai">focus@focuspath.ai</a> or use the <a href="/#contact">Contact section</a> on our homepage. We aim to respond within 48 hours.
      </p>
    </LegalShell>
  )
}
