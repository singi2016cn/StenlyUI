import { Config } from '@stencil/core';
import tailwind, { setPluginConfigurationDefaults, tailwindGlobal, tailwindHMR } from 'stencil-tailwind-plugin';

const options = {
  stripComments: true
};

setPluginConfigurationDefaults(options);

export const config: Config = {
  namespace: 'stenlyui',
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    {
      type: 'dist-custom-elements',
      customElementsExportBehavior: 'auto-define-custom-elements',
      externalRuntime: false,
    },
    {
      type: 'docs-readme',
    },
    {
      type: 'www',
      serviceWorker: null, // disable service workers
    },
  ],
  testing: {
    browserHeadless: 'shell',
  },
  plugins: [
    tailwind({
      tailwindCssPath: './src/input.css',
    }),
    tailwindGlobal(),
    tailwindHMR(),
  ],
  devServer: {
    reloadStrategy: 'pageReload',
  },
};
