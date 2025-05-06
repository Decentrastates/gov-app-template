/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  transpilePackages: ["@aragon/gov-ui-kit"],
  webpack: (config) => {
    config.externals.push("pino-pretty", "lokijs", "encoding");
    return config;
  },
};

module.exports = nextConfig;
