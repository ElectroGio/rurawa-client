/** @type {import('prettier').Config} */
module.exports = {
  semi: true,
  singleQuote: true,
  tabWidth: 2,

  plugins: ["prettier-plugin-tailwindcss"],

  tailwindFunctions: ["cn", "tv"],
};
