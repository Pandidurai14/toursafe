import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    output: "export",
    images: {
        unoptimized: true,
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
            },
            {
                protocol: 'https',
                hostname: 'plus.unsplash.com',
            },
        ],
    },
    basePath: process.env.NODE_ENV === "production" ? "/toursafe" : "",
    assetPrefix: process.env.NODE_ENV === "production" ? "/toursafe/" : "",
};

export default nextConfig;
