/** @type {import('next').NextConfig} */
const nextConfig = {}
const path = require('path')

module.exports = {
    sassOptions: {
      includePaths: [path.join(__dirname, 'styles')],
    },
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'i.imgur.com',
          port: '',
          pathname: '/**',
        },
        {
          protocol: 'https',
          hostname: '13.211.10.154',
          port: '',
          pathname: '/**',
        },
      ],
    },
    babel: {
      presets: [
        // Add your presets here
      ],
      plugins: [
        // Add your plugins here
      ],
    },
    env: {
      NEXT_PUBLIC_API_URL: 'https://13.211.10.154/api/1.0',
    },

    // Next.js Redirects for user authentication
    async redirects() {
      return [
        // this redirect will be applied
        {
          source: '/login',
          has: [
            {
              type: 'cookie',
              key: 'access_token',
            },
          ],
          permanent: false,  
          destination: '/',
        },
        // this redirect will NOT be applied
        {
          source: '/',
          missing: [
            {
              type: 'cookie',
              key: 'access_token',
            },
          ],
          permanent: false,   // 希望該頁面驗證是暫時的
          destination: '/login',
        },
        {
          source: '/posts/demo',
          missing: [
            {
              type: 'cookie',
              key: 'access_token',
            },
          ],
          permanent: false,
          destination: '/login',
        },
        {
          source: '/user/demo',
          missing: [
            {
              type: 'cookie',
              key: 'access_token',
            },
          ],
          permanent: false,
          destination: '/login',
        },
      ];
    },
}