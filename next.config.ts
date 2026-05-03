import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath:
    process.env.NODE_ENV === "development"
      ? undefined
      : "/calculation-training",
  assetPrefix:
    process.env.NODE_ENV === "development"
      ? undefined
      : "/calculation-training/",
};

export default nextConfig;
