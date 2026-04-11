// src/components/SEO.tsx
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonical?: string;
  ogImage?: string;
  type?: 'website' | 'article';
  noindex?: boolean;
}

export const SEO = ({
  title = 'ComplaintDone - Professional AI Complaint Letters',
  description = 'Generate professionally formatted complaint letters in under 60 seconds. AI-powered, legal references included. £3 (UK) or $5 (USA). Fast, effective, delivered to your inbox.',
  keywords = 'complaint letter, consumer rights, formal complaint, complaint template, UK consumer law, FTC complaint',
  canonical,
  ogImage = 'https://complaintdone.com/og-image.png',
  type = 'website',
  noindex = false,
}: SEOProps) => {
  const fullTitle = title.includes('ComplaintDone') ? title : `${title} | ComplaintDone`;
  const url = canonical || 'https://complaintdone.com';

  return (
    <Helmet>
      {/* Google Search Console verification */}
      <meta name="google-site-verification" content="6K4fH3AHvJ79HNtEcGUqwAsUUdwi_-bJSnhAlCc6CuY" />
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      {noindex && <meta name="robots" content="noindex,nofollow" />}
      <link rel="canonical" href={url} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={ogImage} />

      {/* Structured Data (JSON-LD) */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "ComplaintDone",
          "url": "https://complaintdone.com",
          "description": description,
          "applicationCategory": "BusinessApplication",
          "offers": {
            "@type": "AggregateOffer",
            "priceCurrency": "GBP",
            "lowPrice": "3.00",
            "highPrice": "5.00"
          },
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.8",
            "ratingCount": "127"
          }
        })}
      </script>
    </Helmet>
  );
};
