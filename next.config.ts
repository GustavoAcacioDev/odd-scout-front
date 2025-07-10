import type { NextConfig } from "next";


const nextConfig: NextConfig = {
  /* config options here */
  output: 'standalone'
};

if (process.env.REMOVE_LOGS === 'true') {
  nextConfig.compiler = {
    removeConsole: {
      exclude: ['error'],
    },
  }
}

export default nextConfig;
