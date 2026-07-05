import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { pages } from '../../seo/pages';

const SITE_URL = 'https://hmhlabz.com';

export default function SEO({ title, description, image, schema }) {
  const { pathname } = useLocation();
  const isDynamicSEO = pathname.startsWith('/insights');
  
  // If we are on an insight route and this is the global SEO (no props passed), render nothing!
  // This prevents duplicate tags because Insights/InsightDetail mount their own <SEO> with props.
  if (isDynamicSEO && !title && !schema) return null;
  
  // Fall back to pages.js for static routes if props aren't provided
  const page = pages[pathname] || pages['/'];
  
  const finalTitle = title || page.title;
  const finalDescription = description || page.description;
  const finalImage = image || 'https://hmhlabz.com/og-image.png';
  const finalSchema = schema || page.schema;
  
  const canonicalUrl = `${SITE_URL}${pathname === '/' ? '' : pathname}`;

  return (
    <Helmet>
      <title>{finalTitle}</title>
      <meta name="description" content={finalDescription} />
      <link rel="canonical" href={canonicalUrl} />

      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={finalImage} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={finalDescription} />
      <meta name="twitter:image" content={finalImage} />

      {Array.isArray(finalSchema) ? (
        finalSchema.map((schemaObj, i) => (
          <script key={i} type="application/ld+json">
            {JSON.stringify(schemaObj)}
          </script>
        ))
      ) : (
        finalSchema && (
          <script type="application/ld+json">
            {JSON.stringify(finalSchema)}
          </script>
        )
      )}
    </Helmet>
  );
}
