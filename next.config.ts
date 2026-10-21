import type { NextConfig } from 'next';

// Old addresses (previous React site and the WordPress site) → new pages, so existing links and Google rankings carry over.
const legacyCourseSlugs: Record<string, string> = {
  // WordPress course pages on hammond.edu.au
  'certificate-iii-in-individual-support': 'chc33021-certificate-iii-individual-support-ageing',
  'chc43121-certificate-iv-in-disability-support': 'chc43121-certificate-iv-disability-support',
  'certificate-iv-in-ageing-support': 'chc43015-certificate-iv-ageing-support',
  'chc40225-certificate-iv-in-school-based-education-support': 'chc40225-certificate-iv-school-based-education-support',
  'certificate-iii-in-early-childhood-education-and-care': 'chc30125-certificate-iii-early-childhood-education-and-care',
  'diploma-of-early-childhood-education-and-care': 'chc50125-diploma-early-childhood-education-and-care',
  'certificate_iv_in_mental_health': 'chc43315-certificate-iv-mental-health',
  'certificate-iv-in-mental-health-peer-work': 'chc43515-certificate-iv-mental-health-peer-work',
  'diploma-of-mental-health': 'chc53315-diploma-mental-health',
  'chc52025-diploma-of-community-services': 'chc52025-diploma-community-services',
  'advanced-diploma-of-community-sector-management': 'chc62015-advanced-diploma-community-sector-management',
  'certificate-iv-in-leisure-and-health': 'chc43415-certificate-iv-leisure-and-health',
  'chcss00070-assist-clients-with-medication-skill-set': 'chcss00070-assist-clients-with-medication-skill-set',
  'chcss00093-alcohol-and-other-drugs-skill-set': 'chcss00093-alcohol-and-other-drugs-skill-set',
  'chcss00137-palliative-approach': 'chcss00137-palliative-approach-skill-set',
};

// Previous React site used /course/<id>
const oldReactIds: Record<string, string> = {
  chc30125: 'chc30125-certificate-iii-early-childhood-education-and-care',
  chc50125: 'chc50125-diploma-early-childhood-education-and-care',
  chc40225: 'chc40225-certificate-iv-school-based-education-support',
  'chc33021-ageing': 'chc33021-certificate-iii-individual-support-ageing',
  'chc33021-disability': 'chc33021-certificate-iii-individual-support-disability',
  chc43015: 'chc43015-certificate-iv-ageing-support',
  chc43121: 'chc43121-certificate-iv-disability-support',
  chc43315: 'chc43315-certificate-iv-mental-health',
  chc43415: 'chc43415-certificate-iv-leisure-and-health',
  chc43515: 'chc43515-certificate-iv-mental-health-peer-work',
  chc53315: 'chc53315-diploma-mental-health',
  chc52025: 'chc52025-diploma-community-services',
  chc62015: 'chc62015-advanced-diploma-community-sector-management',
  'skill-set-palliative': 'chcss00137-palliative-approach-skill-set',
  'skill-set-medication': 'chcss00070-assist-clients-with-medication-skill-set',
  'skill-set-aod': 'chcss00093-alcohol-and-other-drugs-skill-set',
};

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    remotePatterns: [{ protocol: 'https', hostname: 'images.unsplash.com' }],
    formats: ['image/avif', 'image/webp'],
  },
  async redirects() {
    return [
      { source: '/about-us', destination: '/about', permanent: true },
      { source: '/contact-us', destination: '/contact', permanent: true },
      { source: '/enquire_now', destination: '/enquire', permanent: true },
      { source: '/enquire-now', destination: '/enquire', permanent: true },
      { source: '/student-info', destination: '/student-information', permanent: true },
      { source: '/privacy', destination: '/privacy-policy', permanent: true },
      { source: '/recognition-of-prior-learning', destination: '/student-information#rpl', permanent: true },
      { source: '/course_fees', destination: '/student-information#payment-options', permanent: true },
      { source: '/enroll/:id', destination: '/enquire', permanent: true },
      { source: '/checkout/:id', destination: '/enquire', permanent: true },
      { source: '/success/:id', destination: '/enquire', permanent: true },
      ...Object.entries(oldReactIds).map(([from, to]) => ({ source: `/course/${from}`, destination: `/courses/${to}`, permanent: true })),
      ...Object.entries(legacyCourseSlugs).map(([from, to]) => ({ source: `/${from}`, destination: `/courses/${to}`, permanent: true })),
    ];
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
    ];
  },
};

export default nextConfig;
