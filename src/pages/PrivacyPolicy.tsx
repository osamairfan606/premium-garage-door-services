import { Link } from 'react-router-dom';
import Legal from './Legal';
import { site } from '../config/site';
import { locationList } from '../config/locations';

export default function PrivacyPolicy() {
  return (
    <Legal
      title="Privacy Policy"
      path="/privacy-policy"
      description={`How ${site.name} collects, uses and protects the personal information you share through our website and quote request forms.`}
      sections={[
        {
          title: 'Who we are',
          body: <p>This website is operated by {site.legalName} (“{site.name}”, “we”, “us”). This policy explains how we handle personal information collected through this website, by phone and through our quote request forms.</p>,
        },
        {
          title: 'Information we collect',
          body: (
            <>
              <p>When you request an estimate or contact us, we may collect:</p>
              <ul>
                <li>Your name, phone number and email address</li>
                <li>Your service address or ZIP code and preferred service location (Chicago or Indianapolis)</li>
                <li>Details about your garage door, the service you need and your preferred appointment date and time</li>
                <li>Any other information you choose to include in your message</li>
              </ul>
              <p>We may also collect limited technical information automatically, such as your browser type, device, pages visited and approximate location, through standard server logs and analytics tools.</p>
            </>
          ),
        },
        {
          title: 'How we use your information',
          body: (
            <ul>
              <li>To respond to your request, schedule appointments and provide estimates and services</li>
              <li>To contact you by phone, text message or email about your request</li>
              <li>To route your request to the correct local team</li>
              <li>To improve our website and customer service</li>
              <li>To comply with legal obligations</li>
            </ul>
          ),
        },
        {
          title: 'Sharing your information',
          body: <p>We do not sell your personal information. We share it only with service providers who help us operate our business (for example, website hosting, form processing and scheduling tools), when required by law, or to protect our rights. These providers may only use your information to perform services for us.</p>,
        },
        {
          title: 'Cookies and analytics',
          body: <p>Our website may use cookies and similar technologies to remember preferences and understand how visitors use the site. You can control cookies through your browser settings. Disabling cookies will not prevent you from contacting us.</p>,
        },
        {
          title: 'Data retention and security',
          body: <p>We keep personal information only as long as needed for the purposes described above or as required by law, and we use reasonable administrative and technical safeguards to protect it. No method of transmission over the internet is completely secure.</p>,
        },
        {
          title: 'Your choices',
          body: <p>You may ask us to access, correct or delete the personal information we hold about you, or to stop contacting you, by calling the line for your location. Some state laws may give you additional rights.</p>,
        },
        {
          title: 'Children’s privacy',
          body: <p>Our services are intended for adults. We do not knowingly collect personal information from children under 13.</p>,
        },
        {
          title: 'Changes to this policy',
          body: <p>We may update this policy from time to time. The effective date at the top of this page shows when it was last revised.</p>,
        },
        {
          title: 'Contact us',
          body: (
            <>
              <p>Questions about this policy? Contact the team for your location:</p>
              <ul>
                {locationList.map(l => (
                  <li key={l.id}>{l.label}: <a href={l.phoneHref} data-location={l.id}>{l.phoneDisplay}</a></li>
                ))}
              </ul>
              <p>See also our <Link to="/terms">Terms &amp; Conditions</Link>.</p>
            </>
          ),
        },
      ]}
    />
  );
}
