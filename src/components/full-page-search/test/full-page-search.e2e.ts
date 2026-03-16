import { newE2EPage } from '@stencil/core/testing';

describe('full-page-search', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<full-page-search></full-page-search>');

    const element = await page.find('full-page-search');
    expect(element).toHaveClass('hydrated');
  });
});
