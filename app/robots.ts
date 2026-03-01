import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/secret-admin-panel-x9k2m7p4/'],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/admin/', '/secret-admin-panel-x9k2m7p4/'],
      },
      {
        userAgent: 'Googlebot-Scholar',
        allow: '/',
        crawlDelay: 0,
      },
    ],
    sitemap: 'https://mjimr.vercel.app/sitemap.xml',
  }
}
