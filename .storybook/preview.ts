import { defineCustomElements } from '../loader';

// 注册 Stencil 自定义元素
defineCustomElements();

const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
