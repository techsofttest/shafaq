import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    qualities: [75, 90, 95],
    unoptimized:true,
    remotePatterns:[
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
          {
        protocol:"http",
        hostname:"localhost",        
        port:"8000",
        pathname:"*/uploads/**"
      },
       {
        protocol: "https",
        hostname: "demo.janamithrasociety.com",
        pathname: "/shafaqgroup/public/uploads/**",
      },
    ],
  },
};

export default nextConfig;
