import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/admin-login/'],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/admin/', '/admin-login/'],
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
