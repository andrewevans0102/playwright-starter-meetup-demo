import { Page } from '@playwright/test';

const weatherSuccess = async (page: Page) => {
    await page.route('**/weather', async (route) => {
        // Fetch original response.
        const response = await route.fetch();

        // replace JSON of body with mock value
        let body = JSON.stringify({
            temp: 82,
            humidity: 41,
            conditions: 'Partly Cloudy',
            wind: 3,
        });

        await route.fulfill({
            // Pass all fields from the response.
            response,
            // Override response body.
            body,
            // Force content type to be html.
            headers: {
                ...response.headers(),
                'content-type': 'text/html',
            },
        });
    });
};

const weatherFail = async (page: Page) => {
    await page.route('**/weather', async (route) => {
        // simulate failure in API request
        await route.abort();
    });
};

export { weatherSuccess, weatherFail };
