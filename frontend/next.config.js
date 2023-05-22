/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: process.env.NEXT_PUBLIC_SERVER_HOSTNAME,
        port: "",
        pathname: "/media/**",
      },
    ],
  },
};

module.exports = nextConfig;
