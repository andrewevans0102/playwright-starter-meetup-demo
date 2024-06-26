import { test, expect } from '@playwright/test';
import 'dotenv/config';
import { retrieveENV } from './shared/environment';
import { ENVValues } from './shared/types';
import { validateOrderPageLoadSuccess } from './shared/pages';

test('User is able to logout successfully', async ({ page }) => {
    // call shared function to validate env values
    const ev: ENVValues = retrieveENV();

    // auth is now called automatically before tests run so start test with going to page
    await page.goto(ev.BASE);

    // expect values to show and routed to proper page
    await validateOrderPageLoadSuccess(page, ev);

    // click the logout button
    await page.getByRole('button', { name: 'Logout' }).click();

    // verify title is shown
    await page.getByRole('heading', { name: 'Downton Bakery' }).click();

    //verify username field is shown meaning the user is back on the logout screen
    await page.getByLabel('USERNAME').click();

    // verify URL has been modified to show a logged out state
    await expect(page).toHaveURL(`${ev.BASE}/login`);
});
