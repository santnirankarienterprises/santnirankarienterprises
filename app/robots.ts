import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/api/', '/candidate/', '/employer/'],
    },
    sitemap: 'https://www.santnirankarienterprise.co.in/sitemap.xml',
  }
}
