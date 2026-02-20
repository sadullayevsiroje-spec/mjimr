import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: '/admin/',
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: '/admin/',
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
