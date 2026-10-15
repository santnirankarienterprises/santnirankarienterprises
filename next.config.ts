import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.1.9", "192.168.31.218", "10.154.59.101", "localhost:3000", "localhost:3001","192.168.29.128","172.21.159.101"],
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "santnirankarienterprises.in",
          },
        ],
        destination: "https://www.santnirankarienterprises.in/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
