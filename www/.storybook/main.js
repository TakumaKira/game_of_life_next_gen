import path from "path";
import viteSvgr from 'vite-plugin-svgr';

/** @type { import('@storybook/react-vite').StorybookConfig } */
const config = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-onboarding",
    // "@storybook/addon-interactions",
  ],
  /**
   * @param { import('vite').InlineConfig } config
   * @param { import('@storybook/react-vite').Options } options
   * @returns { import('vite').InlineConfig | Promise<import('vite').InlineConfig> }
   */
  viteFinal: async (config, options) => {
    config.plugins = [
      ...config.plugins,
      viteSvgr({ exportAsDefault: true, svgrOptions: { plugins: ['@svgr/plugin-jsx'] }, include: "**/*.svg" }),
    ]
    config.resolve.alias = {
      ...config.resolve.alias,
      '@/assets': path.resolve(__dirname, "../src/assets"),
      '@/components': path.resolve(__dirname, "../src/components"),
    };
    return config;
  },
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  core: {
    builder: '@storybook/builder-vite'
  },
};
export default config;
