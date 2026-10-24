import { Page } from '@playwright/test';

export class CheckoutStepTwoPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async getTotal(): Promise<number> {
    const total = await this.page.getByTestId('total-label').innerText();
    return Number(total.replace('Total: $', ''));
  }

  async getItemTotal(): Promise<number> {
    const itemTotalText = await this.page
      .getByTestId('subtotal-label')
      .innerText();

    return Number(itemTotalText.replace('Item total: $', ''));
  }

  async getTax(): Promise<number> {
    const tax = await this.page.getByTestId('tax-label').innerText();

    return Number(tax.replace('Tax: $', ''));
  }

  async finish() {
    await this.page.getByTestId('finish').click();
  }
}
