import { newSpecPage } from '@stencil/core/testing';
import { FullPageSearch } from '../full-page-search';

describe('full-page-search', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [FullPageSearch],
      html: `<full-page-search></full-page-search>`,
    });
    expect(page.root).toEqualHtml(`
      <full-page-search>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </full-page-search>
    `);
  });
});
