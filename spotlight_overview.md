# Beefree SDK Check Overview


## Some notes
- We’ll walk through a quick integration of the **Check API** into a demo project focusing on email checks for the main language.
- This project will be shared as a public GitHub repository.
- You need the **Beefree SDK API KEY** and the **Beefree SDK Plugin Client and Secret key**.
- Please note: integrating the **Beefree SDK** is **not** part of today’s demo, but you can find examples and guides at [https://github.com/BeefreeSDK](https://github.com/BeefreeSDK).
- We’ll be using **Next.js** to set up a proxy server, allowing us to make API calls from the same origin.
- The **`@beefree/sdk`** package is our official NPM module for integrating the SDK into your projects.


## Agenda

#### Beefree SDK API
- Endpoints
- Checks
- Example of request


#### Application Demo
- Make a request to the Check API with a single check.
- Send the response data to a component to render the results.
- Set up `onHover` handlers on suggestions and warnings.
- Set up `onClick` handlers on suggestions and warnings.
- Enable automatic checks to trigger validations as content is updated. (If we still have time)


## Beefree SDK API Overview
### API Endpoints
|                        |                   |
| ---------------------- | ----------------- |
| POST /v1/message/check | for emails        |
| POST /v1/page/check    | for landing pages |
| POST /v1/row/check     | for rows          |

Same body request:
```
{
  "checks": list of checks to perform - Required,
  "template": Beefree's json of the email, page or row - Required
  "languages": list of secondary languages to evaluate - optional
}
```

Just one note on secondary languages. The check works in incremental way:
- list of checks results on main language and
- for each language,
  - checks results on that message sections on this language

### Available checks
 Complete details on https://docs.beefree.io/beefree-sdk/apis/content-services-api/check

| Check code          | Short description                        | Check Type | For emails | For pages | For rows | Widgets checked                   |
| ------------------- | ---------------------------------------- | ---------- | ---------- | --------- | -------- | --------------------------------- |
| missingAltText      | Highlight missing Alt-text in images     | warning    | x          | x         | x        | gif, image, sticker, icon, social |
| missingImageLink    | Highlight missing link on images         | suggestion | x          | x         | x        | gif, image, sticker, icon         |
| missingCopyLink     | Highlight missing link on copy           | warning    | x          | x         | x        | button, social, menu              |
| overageImageWeight  | Highlight image overage weight           | suggestion | x          | x         | x        | gif, image, sticker, icon, social |
| overageHtmlWeight   | Highlight HTML overage size              | warning    | x          | -         | -        | -                                 |
| missingDetailsEmail | Highlight missing subject and pre header | suggestion | x          | -         | -        | -                                 |
| missingDetailsPage  | Highlight missing description and title  | suggestion | -          | x         | -        | -                                 |

You create your list of checks!

If warning and suggestion, the general status is warning.

### Hands on code
1. [Request Example](request_http/request_simple_template.http)
2. Application Demo

## Stay tuned
Other checks will be released and **we are open to define some of them with you**.
