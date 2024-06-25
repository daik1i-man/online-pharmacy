/** @type {import('next').NextConfig} */

const nextConfig = {
    async redirects() {
        return [
            {
                source: '/',
                destination: '/dashboard/categories',
                permanent: false,
                has: [
                    {
                        type: 'cookie',
                        key: 'admin_id',
                        value: '^(?!$).*'
                    }
                ]
            }
        ]
    },
};

export default nextConfig;
