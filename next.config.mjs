
/** @type {import('next').NextConfig} */

const nextConfig = {
    output: 'export',
    images: {unoptimized: true},
    exportPathMap: async function () {
        return {
            '/': { page: '/' },
        };
    },
};


export default nextConfig;
