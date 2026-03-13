import { newSpecPage } from '@stencil/core/testing';
import { DButton } from '../d-button';

describe('d-button', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [DButton],
      html: `<d-button></d-button>`,
    });
    expect(page.root).toEqualHtml(`
      <d-button>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </d-button>
    `);
  });
});
