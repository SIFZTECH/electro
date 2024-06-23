/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "electro-api.sifztech.com",
      },
      {
        protocol: "https",
        hostname: "electro-api.sifztech.comundefined",
      },
    ],
  },
};

export default nextConfig;
