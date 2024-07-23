// next.config.mjs
export default {
    images: {
        domains: ['i.ytimg.com'],
    },
    async rewrites() {
        return [
            {
                source: '/api/socket',
                destination: '/api/socket',
            },
        ];
    },
};
