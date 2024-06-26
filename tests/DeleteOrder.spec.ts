import { test, expect } from '@playwright/test';
import 'dotenv/config';
import { retrieveENV } from './shared/environment';
import { ENVValues } from './shared/types';
import { validateOrderPageLoadSuccess } from './shared/pages';

test('User is able to delete order', async ({ page }) => {
    // call shared function to validate env values
    const ev: ENVValues = retrieveENV();

    // auth is now called automatically before tests run so start test with going to page
    await page.goto(ev.BASE);

    // expect values to show and routed to proper page
    await validateOrderPageLoadSuccess(page, ev);

    // delete Mrs. Hughes order
    await page
        .getByRole('row', { name: 'Mrs. Hughes Pumpkin Pie 10' })
        .getByRole('button')
        .click();

    // verify values are not shown now since the value is deleted
    await expect(
        page.getByRole('rowheader', { name: 'Mrs. Hughes' })
    ).toBeHidden();
    await expect(
        page.getByRole('cell', { name: 'Pumpkin Pie' }).nth(1)
    ).toBeHidden();
    await expect(page.getByRole('cell', { name: '2' })).toBeHidden();
});
