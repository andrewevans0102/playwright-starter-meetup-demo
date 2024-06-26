import { test as setup, expect } from '@playwright/test';
import { retrieveENV } from './shared/environment';
import { ENVValues } from './shared/types';

const authFile = 'playwright/.auth/user.json';

setup('authenticate', async ({ page }) => {
    // call shared function to validate env values
    const ev: ENVValues = retrieveENV();

    // go to landing page
    await page.goto(ev.BASE);

    // login with credentials
    await page.getByLabel('USERNAME').click();
    await page.getByLabel('USERNAME').fill(ev.USERNAME);
    await page.getByRole('button', { name: 'Login' }).click();

    // store auth in file
    await page.context().storageState({ path: authFile });
});
