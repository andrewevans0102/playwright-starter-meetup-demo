import { Page, expect } from '@playwright/test';
import { ENVValues } from './types';

const validateOrderPageLoadSuccess = async (page: Page, ev: ENVValues) => {
    // expect values to show and routed to proper page
    await expect(page).toHaveURL(`${ev.BASE}/orders`);
    await expect(page.getByText(`Hello ${ev.USERNAME}`)).toBeVisible();
};

export { validateOrderPageLoadSuccess };
