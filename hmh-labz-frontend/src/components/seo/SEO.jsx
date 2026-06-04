import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ 
  title, 
  description, 
  image = 'https://hmhlabz.com/og-image.png', 
  url = 'https://hmhlabz.com' 
}) => {
  const defaultTitle = 'HMH Labz | Strategy + Build | Book a Fit Call';
  const defaultDescription = "Stop losing hours to manual work. We build custom AI workflows and operations systems for service businesses. Book a 20-minute Fit Call to see if you're ready.";
  
  const siteTitle = 'HMH Labz | Strategy + Build';
  const fullTitle = title ? `${title} | ${siteTitle}` : defaultTitle;
  const metaDescription = description || defaultDescription;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfessionalService",
        "@id": "https://hmhlabz.com/#organization",
        "name": "HMH Labz",
        "url": "https://hmhlabz.com/",
        "logo": "https://hmhlabz.com/assets/logo.png",
        "description": "Strategy and build in one team. We diagnose what your business needs, then we ship it.",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Anna Nagar, Chennai",
          "addressRegion": "Tamil Nadu",
          "addressCountry": "IN"
        },
        "contactPoint": {
          "@type": "ContactPoint",
          "email": "hello@hmhlabz.com",
          "contactType": "customer service",
          "availableLanguage": ["English"]
        },
        "potentialAction": {
          "@type": "ReserveAction",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": "https://hmhlabz.com/#contact",
            "inLanguage": "en-US",
            "actionPlatform": [
              "http://schema.org/DesktopWebPlatform",
              "http://schema.org/MobileWebPlatform"
            ]
          },
          "result": {
            "@type": "Reservation",
            "name": "Book a 20-min Fit Call"
          }
        }
      },
      {
        "@type": "Service",
        "name": "AI Opportunity Audit",
        "provider": { "@id": "https://hmhlabz.com/#organization" },
        "description": "A short, structured diagnostic of where AI and automation can realistically move the needle in your business.",
        "url": "https://hmhlabz.com/services/audit"
      },
      {
        "@type": "Service",
        "name": "Implementation Sprint",
        "provider": { "@id": "https://hmhlabz.com/#organization" },
        "description": "We take a single high-impact opportunity and build it into a working operational system—live in production.",
        "url": "https://hmhlabz.com/services/sprint"
      },
      {
        "@type": "Service",
        "name": "Digital Transformation",
        "provider": { "@id": "https://hmhlabz.com/#organization" },
        "description": "A multi-system engagement that rebuilds how your operations run with connected workflows, automation, and AI.",
        "url": "https://hmhlabz.com/services/transform"
      }
    ]
  };

  return (
    <Helmet>
      {/* Standard Metadata */}
      <title>{fullTitle}</title>
      <meta name="description" content={metaDescription} />

      {/* OpenGraph Tags */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />

      {/* Twitter Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={image} />

      {/* Canonical Link */}
      <link rel="canonical" href={url} />

      {/* JSON-LD Schema Markup */}
      <script type="application/ld+json">
        {JSON.stringify(jsonLd)}
      </script>
    </Helmet>
  );
};

export default SEO;
