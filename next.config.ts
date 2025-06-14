import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      new URL("https://res.cloudinary.com/**"),
      new URL("https://lh3.googleusercontent.com/**"),
      new URL("https://developers.google.com/**")
    ]
  }
}

export default nextConfig
