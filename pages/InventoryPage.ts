import { Page } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  private getItemByTitle(title: string) {
    return this.page
      .getByTestId('inventory-item')
      .filter({ has: this.page.getByText(title, { exact: true }) });
  }

  async addToCartByTitle(title: string) {
    const item = this.getItemByTitle(title);
    await item.getByRole('button', { name: 'Add to cart' }).click();
  }

  async openCart() {
    await this.page.getByTestId('shopping-cart-link').click();
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
}
