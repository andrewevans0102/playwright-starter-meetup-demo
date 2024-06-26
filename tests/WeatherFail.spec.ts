import { test, expect } from '@playwright/test';
import 'dotenv/config';
import { retrieveENV } from './shared/environment';
import { ENVValues } from './shared/types';
import { validateOrderPageLoadSuccess } from './shared/pages';
import { weatherFail } from './shared/network';

test('Page loads when weather fails', async ({ page }) => {
    // call shared function to validate env values
    const ev: ENVValues = retrieveENV();

    // create intercepted API call
    // must call before page load
    await weatherFail(page);

    // auth is now called automatically before tests run so start test with going to page
    await page.goto(ev.BASE);

    // expect values to show and routed to proper page
    await validateOrderPageLoadSuccess(page, ev);

    // expect that the no weather message is shown
    await expect(page.getByText('no weather')).toBeVisible();
});
