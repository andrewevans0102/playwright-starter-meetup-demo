# Playwright Starter

Copy of a project I used to demo Playwright at the [RVA Software Development User Group's Meetup Automated Testing with Playwright](https://www.meetup.com/rva-software-development-user-group/events/301470201/) on 06/25/20-24.

## About Project

![LOGO SCREENSHOT](/README_IMAGES/LOGO_SCREENSHOT.jpg)

Project is React TypeScript Application built with [Vite](https://vitejs.dev/guide/). The application is a made up Bakery from the television show [Downton Abbey](https://en.wikipedia.org/wiki/Downton_Abbey).

To start the application run `npm run dev`.

The application also has a simulated backend API that is ran with `npm run start:backend`. This runs a local [node express](https://expressjs.com/) server that the app uses for a fake weather report (see the "backend" folder).

For auth, the app creates a [http cookie](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies) when the user logs in. This value is stored and used to show the user's name on the `orders` page.

To run the Playwright tests, make sure to have both the React App and simulated backend running and then use the associated npm scripts (see the next section on npm scripts).

> If you want to run the `WeatherFail.spec.ts` and `WeatherSuccess.spec.ts` tests in particular, make sure to run the backend in another terminal session.

The only thing you need to have setup locally when running the tests is a `.env` file with the following:

```bash
BASE="<LOCALHOST_URL>"
USERNAME="<USERNAME_WHEN_RUNNING_APPLICATION>"
```

## Playwright Scripts

-   `npm run test:headed` runs tests in headed mode so you can view them locally
-   `npm run test:silent` runs tests in CI mode (silent)
-   `npm run test:report` runs Playwright report on last run with traces
-   `npm run test:codegen` runs Playwrights code generator against your local instance of the app (make sure you are running the app locally when doing this)

## Learning more about Playwright

If you'd like to learn more about Playwright, check out my article [Playwright: A High Level Overview](https://andrewevans.dev/blog/2024-04-28-playwright-a-high-level-overview/). You should also check out the [official Playwright getting started docs](https://playwright.dev/docs/intro).
