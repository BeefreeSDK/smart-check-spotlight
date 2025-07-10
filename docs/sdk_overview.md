# Smart Check: SDK API overview

**You need the Beefree SDK API KEY**

### This Spotlight is focused on Message checks on main language

## Beefree SDK API Endpoints
- POST /v1/message/check   

- POST /v1/page/check

- POST /v1/row/check

Same body:
```
{
  "checks": list of checks to perform - required,
  "template": Beefree's json of the message, page or row - required
  "languages": list of secondary languages to evaluate - optional
}
```

Just one note on secondary languages. The check works in incremental way:
- list of checks results on main language and 
- for each language, 
  - checks results on that message sections on this language

## Available checks 
 Complete details on https://docs.beefree.io/beefree-sdk/apis/content-services-api/check

| Check code          | Short description                        | Check Type | For messages | For pages | For rows | Widgets checked                    |
| ------------------- | ---------------------------------------- | ---------- | ------------ | --------- | -------- | --------------------------------- |
| missingAltText      | Highlight missing Alt-text in images     | warning    | x            | x         | x        | gif, image, sticker, icon, social |
| missingImageLink    | Highlight missing link on images         | warning    | x            | x         | x        | gif, image, sticker, icon         |
| missingCopyLink     | Highlight missing link on copy           | warning    | x            | x         | x        | button, social, menu              |
| overageImageWeight  | Highlight image overage weight           | suggestion | x            | x         | x        | gif, image, sticker, icon, social |
| overageHtmlWeight   | Highlight HTML overage size              | warning    | x            | -         | -        | -                                 |
| missingDetailsEmail | Highlight missing subject and pre header | suggestion | x            | -         | -        | -                                 |
| missingDetailsPage  | Highlight missing description and title  | Suggestion | -            | x         | -        | -                                 |

If warning and suggestion, the general status is warning.

You create your list of checks!


## Stay tuned
Other checks will be released and **we are open to define some of them with you**.


