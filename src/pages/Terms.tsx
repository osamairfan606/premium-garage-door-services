import { Link } from 'react-router-dom';
import Legal from './Legal';
import { site } from '../config/site';
import { locationList } from '../config/locations';
import { firstTimeOffer } from '../config/content';

export default function Terms() {
  return (
    <Legal
      title="Terms & Conditions"
      path="/terms"
      description={`Terms and conditions for using the ${site.name} website and requesting estimates.`}
      sections={[
        {
          title: 'Acceptance of terms',
          body: <p>By using this website you agree to these Terms &amp; Conditions. If you do not agree, please do not use the website. These terms apply to the website only; work performed at your property is governed by the estimate, invoice or agreement you receive from {site.legalName}.</p>,
        },
        {
          title: 'Website information',
          body: <p>We aim to keep the information on this website accurate and up to date, but it is provided for general information only. Service availability, appointment times and pricing are confirmed by our team when you contact us.</p>,
        },
        {
          title: 'Estimates and appointments',
          body: <p>Submitting a request through this website does not create a confirmed appointment or a binding contract. Our team will contact you to confirm details. Onsite estimates are free; any work is carried out only after you approve the recommended service and price.</p>,
        },
        {
          id: 'first-time-discount',
          title: 'First-time customer discount',
          body: (
            <>
              <p>{firstTimeOffer.body}</p>
              <ul>{firstTimeOffer.terms.map(t => <li key={t}>{t}</li>)}</ul>
            </>
          ),
        },
        {
          title: 'Same-day and emergency service',
          body: <p>Same-day service is offered whenever possible and depends on technician availability, location and parts. Emergency service is available 24/7 by phone; arrival times are confirmed when you call.</p>,
        },
        {
          title: 'Satisfaction guarantee',
          body: <p>Our satisfaction guarantee means we work to make sure your door operates properly before we leave. Specific warranty terms for parts and labor, where applicable, are provided in writing with your invoice.</p>,
        },
        {
          title: 'Images and content',
          body: <p>Some photographs on this website are licensed stock images used for illustration and do not depict specific projects completed by {site.name}. All website content, including our logo and branding, belongs to {site.legalName} or its licensors and may not be reused without permission.</p>,
        },
        {
          title: 'Limitation of liability',
          body: <p>To the fullest extent permitted by law, {site.legalName} is not liable for indirect or consequential losses arising from use of this website. Nothing in these terms limits liability that cannot be limited by law.</p>,
        },
        {
          title: 'Privacy',
          body: <p>Our <Link to="/privacy-policy">Privacy Policy</Link> explains how we handle personal information.</p>,
        },
        {
          title: 'Contact',
          body: (
            <ul>
              {locationList.map(l => (
                <li key={l.id}>{l.label}: <a href={l.phoneHref} data-location={l.id}>{l.phoneDisplay}</a></li>
              ))}
            </ul>
          ),
        },
      ]}
    />
  );
}
