import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ 
  title, 
  description, 
  image = 'https://hmhlabz.com/og-image.png', 
  url = 'https://hmhlabz.com' 
}) => {
  const siteTitle = 'HMH Labz | Strategy + Build';
  const fullTitle = title ? `${title} | ${siteTitle}` : siteTitle;
  const defaultDescription = 'HMH Labz is a digital transformation laboratory focused on strategy and build for modern operations.';

  return (
    <Helmet>
      {/* Standard Metadata */}
      <title>{fullTitle}</title>
      <meta name="description" content={description || defaultDescription} />

      {/* OpenGraph Tags */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description || defaultDescription} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />

      {/* Twitter Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description || defaultDescription} />
      <meta name="twitter:image" content={image} />

      {/* Canonical Link */}
      <link rel="canonical" href={url} />
    </Helmet>
  );
};

export default SEO;
