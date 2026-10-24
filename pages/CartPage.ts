import { Page } from '@playwright/test';

export class CartPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  private getItemByTitle(title: string) {
    return this.page
      .getByTestId('inventory-item')
      .filter({ has: this.page.getByText(title, { exact: true }) });
  }

  async removeFromCartByTitle(title: string) {
    const item = this.getItemByTitle(title);
    await item.getByRole('button', { name: 'Remove' }).click();
  }

  async getPriceByTitle(title: string): Promise<string> {
    const item = this.getItemByTitle(title);
    const price = await item.getByTestId('inventory-item-price').innerText();
    return price;
  }

  async checkout() {
    await this.page.getByRole('button', { name: 'Checkout', exact: true }).click();
  }

  async continueShopping() {
    await this.page.getByRole('button', { name: 'Continue Shopping', exact: true }).click();
  }
}
