/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    R2_ACCOUNT_ID: '4a060a552db0cd85005e3d39fbee6576',
    R2_BUCKET_NAME: 'cuddlo-renders',
    R2_PUBLIC_URL: 'https://pub-ca03005f70414320a607d3cf04544c31.r2.dev',
    RESEND_TO: 'hello@cuddlo.pet',
    RESEND_FROM: 'hello@cuddlo.pet',
    NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN: 'cxrkkh-q2.myshopify.com',
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.shopify.com' },
    ],
  },
}
export default nextConfig

import('@opennextjs/cloudflare').then(m => m.initOpenNextCloudflareForDev());
