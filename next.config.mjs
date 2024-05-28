/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "electro-api.sifztech.com",
        port: "",
        pathname: "",
      },
    ],
  },
};

export default nextConfig;
