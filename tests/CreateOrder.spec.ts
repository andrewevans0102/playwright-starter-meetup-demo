import { test, expect } from '@playwright/test';
import 'dotenv/config';
import { retrieveENV } from './shared/environment';
import { ENVValues } from './shared/types';
import { validateOrderPageLoadSuccess } from './shared/pages';

test('User is able to create order', async ({ page }) => {
    // call shared function to validate env values
    const ev: ENVValues = retrieveENV();

    // auth is now called automatically before tests run so start test with going to page
    await page.goto(ev.BASE);

    // expect values to show and routed to proper page
    await validateOrderPageLoadSuccess(page, ev);

    // select cinnamon bun
    await page.getByLabel('Baked Good').click();
    await page.getByRole('option', { name: 'Cinnamon Bun' }).click();

    // select quantity
    await page.getByLabel('Quantity').click();
    await page.getByLabel('Quantity').fill('02');

    // click create order
    await page.getByRole('button', { name: 'Create Order' }).click();

    // verify values are shown
    await expect(
        page.getByRole('rowheader', { name: 'Matthew Crawley' })
    ).toBeVisible();
    await expect(
        page.getByRole('cell', { name: 'Cinnamon Bun' }).nth(1)
    ).toBeVisible();
    await expect(page.getByRole('cell', { name: '2' })).toBeVisible();
});
