# Agenda

## Intro
- This project will be shared as a public GitHub repository.
- Today, we’ll walk through a quick integration of the **Smart Check API** into a demo project.
- Please note: integrating the **Beefree SDK** is **not** part of today’s demo, but you can find examples and guides at [https://github.com/BeefreeSDK](https://github.com/BeefreeSDK).
- We’ll be using **Next.js** to set up a proxy server, allowing us to make API calls from the same origin.
- The **`@beefree/sdk`** package is our official NPM module for integrating the SDK into your projects.

## Demo Steps
1. **Make a request to the Smart Check API** with a single check.
2. **Send the response data to a component** to render the results.
3. **Set up `onHover` and `onClick` handlers** on suggestions and warnings.
4. **Enable automatic checks** to trigger validations as content is updated.