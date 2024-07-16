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
      {
        protocol: "https",
        hostname: "electro-api.sifztech.comnull",
      },
      {
        protocol: "https",
        hostname: "www.countryflags.io",
      },
      {
        protocol: "https",
        hostname: "www.leoncycle.com.au",
      },
    ],
  },
};

export default nextConfig;
