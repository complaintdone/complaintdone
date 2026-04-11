// scripts/generate-sitemap.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = 'https://complaintdone.com';
// Only include company pages that actually exist
const COMPANIES = [
  "british-gas",
  "sky",
  "bt",
  "vodafone",
  "virgin-media",
  "currys",
  "o2",
  "amazon-uk",
  "royal-mail",
  "edf-energy",
];

const BLOG_POSTS = [
  "how-to-write-a-complaint-letter-uk",
  "consumer-rights-act-2015-refund-guide",
  "how-to-escalate-complaint-to-ombudsman-uk",
  "british-gas-complaint-guide-2026",
  "formal-complaint-letter-template-uk",
];

function generateSitemap() {
  const now = new Date().toISOString().split('T')[0];

  const staticPages = [
    { url: '', priority: '1.0', changefreq: 'weekly' },
    { url: '/complaint', priority: '0.9', changefreq: 'weekly' },
    { url: '/blog', priority: '0.9', changefreq: 'weekly' },
    { url: '/about', priority: '0.7', changefreq: 'monthly' },
    { url: '/examples', priority: '0.8', changefreq: 'weekly' },
    { url: '/contact', priority: '0.6', changefreq: 'monthly' },
    { url: '/terms', priority: '0.5', changefreq: 'yearly' },
    { url: '/privacy', priority: '0.5', changefreq: 'yearly' },
  ];

  const companyPages = COMPANIES.map(company => ({
    url: `/companies/${company}`,
    priority: '0.8',
    changefreq: 'monthly'
  }));

  const blogPages = BLOG_POSTS.map(slug => ({
    url: `/blog/${slug}`,
    priority: '0.8',
    changefreq: 'monthly'
  }));

  const allPages = [...staticPages, ...companyPages, ...blogPages];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages.map(page => `  <url>
    <loc>${BASE_URL}${page.url}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  const publicDir = path.join(__dirname, '../public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), xml);
  console.log('✅ Sitemap generated with', allPages.length, 'URLs');
  console.log('📄 Saved to public/sitemap.xml');
}

generateSitemap();
