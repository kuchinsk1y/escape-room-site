import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['myappstorage123.blob.core.windows.net'], // добавляем домен
  },
};

export default nextConfig;
