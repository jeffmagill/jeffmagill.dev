
/** @type {import('next').NextConfig} */

const nextConfig = {
    output: 'export',
    images: {unoptimized: true},
    exportPathMap: async function () {
        return {
            '/': { page: '/' },
            '/projects': { page: '/projects' },
        };
    },
};


export default nextConfig;
