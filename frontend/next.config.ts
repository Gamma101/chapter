/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "books.google.com",
        pathname: "/**",
      },
    ],
    domains: ["books.google.com"],
  },
}

module.exports = nextConfig
