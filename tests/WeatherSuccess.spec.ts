import { test, expect } from '@playwright/test';
import 'dotenv/config';
import { retrieveENV } from './shared/environment';
import { ENVValues } from './shared/types';
import { validateOrderPageLoadSuccess } from './shared/pages';
import { weatherSuccess } from './shared/network';

test('Page loads when weather shows successfully', async ({ page }) => {
    // call shared function to validate env values
    const ev: ENVValues = retrieveENV();

    // create intercepted API call
    await weatherSuccess(page);

    // auth is now called automatically before tests run so start test with going to page
    await page.goto(ev.BASE);

    // expect values to show and routed to proper page
    await validateOrderPageLoadSuccess(page, ev);

    // validate values are shown correctly
    await expect(page.getByText('Temp:')).toHaveText('Temp: 82');
    await expect(page.getByText('Humidity:')).toHaveText('Humidity: 41');
    await expect(page.getByText('Conditions: Partly Cloudy')).toHaveText(
        'Conditions: Partly Cloudy'
    );
    await expect(page.getByText('Wind:')).toHaveText('Wind: 3');
});
