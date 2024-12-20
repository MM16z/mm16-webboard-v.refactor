/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'localhost',
            },
            {
                protocol: 'https',
                hostname: 'www.mm16-webboard.shop',
            },
        ],
    },
    experimental: {
        staleTimes: {
            dynamic: 0,
            static: 0,
        },
    }
};

export default nextConfig;
