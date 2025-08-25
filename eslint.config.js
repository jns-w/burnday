const expoConfig = require("eslint-config-expo/flat");
const perfectionistPlugin = require("eslint-plugin-perfectionist");
const eslintPluginPrettierRecommended = require("eslint-plugin-prettier/recommended");
// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require("eslint/config");

module.exports = defineConfig([
    expoConfig,
    eslintPluginPrettierRecommended,
    {
        ...perfectionistPlugin.configs["recommended-natural"],
    },
    {
        ignores: ["dist/*"],
    },
]);
