export const pages = {
  '/': {
    title: 'HMH Labz | Strategy + Build | Book a Fit Call',
    description: 'We help service businesses scale by building custom AI workflows and operations systems.',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'ProfessionalService',
      name: 'HMH Labz',
      url: 'https://hmhlabz.com',
      description: 'Strategy and build consultancy helping businesses identify and implement AI-driven improvements.',
      areaServed: ['AE', 'IN'],
      sameAs: []
    }
  },
  '/about': {
    title: 'About Us | HMH Labz',
    description: "Stop losing hours to manual work. We build custom AI workflows and operations systems for service businesses. Book a 20-minute Fit Call to see if you're ready.",
    schema: {
      '@context': 'https://schema.org',
      '@type': 'AboutPage',
      url: 'https://hmhlabz.com/about',
      about: { '@type': 'Organization', name: 'HMH Labz' }
    }
  },
  '/contact': {
    title: 'Contact Us | HMH Labz',
    description: "Stop losing hours to manual work. We build custom AI workflows and operations systems for service businesses. Book a 20-minute Fit Call to see if you're ready.",
    schema: {
      '@context': 'https://schema.org',
      '@type': 'ContactPage',
      url: 'https://hmhlabz.com/contact'
    }
  },
  '/insights': {
    title: 'Insights & Field Notes | HMH Labz',
    description: 'Deep dives into AI strategy, workflow automation, and the systems driving modern service businesses.',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      url: 'https://hmhlabz.com/insights',
      name: 'Insights & Field Notes'
    }
  },
  '/services/audit': {
    title: 'AI Opportunity Audit | HMH Labz',
    description: "Most businesses don't have an AI problem — they have a prioritisation problem. There are dozens of things you could automate, and no clear way to tell which ones are worth the money. The Audit is a short, structured engagement that replaces that guesswork with a ranked, evidence-based plan.",
    schema: [
      {
        '@context': 'https://schema.org',
        '@type': 'Service',
        serviceType: 'AI Opportunity Audit',
        provider: { '@type': 'Organization', name: 'HMH Labz', url: 'https://hmhlabz.com' },
        url: 'https://hmhlabz.com/services/audit',
        description: 'Assessment engagement to identify where AI can create value before committing to a build.'
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://hmhlabz.com' },
          { '@type': 'ListItem', position: 2, name: 'Services', item: 'https://hmhlabz.com/services' },
          { '@type': 'ListItem', position: 3, name: 'AI Opportunity Audit', item: 'https://hmhlabz.com/services/audit' }
        ]
      }
    ]
  },
  '/services/sprint': {
    title: 'Implementation Sprint | HMH Labz',
    description: "The graveyard of corporate AI is full of pilots that never reached production. The Sprint exists to avoid that outcome entirely: we take a single, well-defined opportunity and build it into a system that is live, used, and owned by you — within weeks, for a fixed fee.",
    schema: [
      {
        '@context': 'https://schema.org',
        '@type': 'Service',
        serviceType: 'Implementation Sprint',
        provider: { '@type': 'Organization', name: 'HMH Labz', url: 'https://hmhlabz.com' },
        url: 'https://hmhlabz.com/services/sprint',
        description: 'Fixed-fee 3–6 week engagement to ship one AI-driven workflow into production.'
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://hmhlabz.com' },
          { '@type': 'ListItem', position: 2, name: 'Services', item: 'https://hmhlabz.com/services' },
          { '@type': 'ListItem', position: 3, name: 'Implementation Sprint', item: 'https://hmhlabz.com/services/sprint' }
        ]
      }
    ]
  },
  '/services/transform': {
    title: 'Digital Transformation | HMH Labz',
    description: "When the friction isn't in one process but in how everything connects, a single system won't fix it. Transformation is our most comprehensive engagement: we rebuild how your operations run as a connected whole — multiple systems, automation, and AI, designed around your business and delivered alongside your team.",
    schema: [
      {
        '@context': 'https://schema.org',
        '@type': 'Service',
        serviceType: 'Digital Transformation',
        provider: { '@type': 'Organization', name: 'HMH Labz', url: 'https://hmhlabz.com' },
        url: 'https://hmhlabz.com/services/transform',
        description: 'Phased 3–6 month engagement rebuilding operations as a connected, AI-enabled whole.'
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://hmhlabz.com' },
          { '@type': 'ListItem', position: 2, name: 'Services', item: 'https://hmhlabz.com/services' },
          { '@type': 'ListItem', position: 3, name: 'Digital Transformation', item: 'https://hmhlabz.com/services/transform' }
        ]
      }
    ]
  }
};
