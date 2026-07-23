import type { MetadataRoute } from 'next'

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'https://brinowatt.eu'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/calculator/results'],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  }
}
