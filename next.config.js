const withPlugins = require("next-compose-plugins");
const nextEnv = require("next-env");
const dotenvLoad = require("dotenv-load");

dotenvLoad();

const config = {
  images: {
    domains: ["image.tmdb.org", "via.placeholder.com"],
  },
};

const withNextEnv = nextEnv();
module.exports = withPlugins([withNextEnv()], config);
