/** @type {import('next').NextConfig} */
const webpack = require("webpack");

const { parsed: myEnv } = require("dotenv").config({
  path: "app/.env.local",
});

const nextConfig = {
  images: {
    domains: ["image.tmdb.org"],
  },
};

module.exports = nextConfig;
