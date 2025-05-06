// @ts-check

/** @type {import('next-i18next').UserConfig} */
module.exports = {
  i18n: {
    defaultLocale: "zh",
    locales: ["en", "zh"],
  },
  /** To avoid issues when deploying to some paas (vercel...) */
  localePath: typeof window === "undefined" ? require("path").resolve("./public/locales") : "./public/locales",

  reloadOnPrerender: process.env.NODE_ENV === "development",
};
