# Smart Check: SDK API overview

You need the Beefree SDK API KEY


## Beefree SDK API Endpoints
- POST /v1/message/check

- POST /v1/page/check

- POST /v1/row/check

Same body:
```
{
  "checks": list of checks to perform - required,
  "template": Beefree's json of the message, page or row - required
  "languages": list of languages to evaluate - optional
}
```

## Available checks 
list of checks

You can create your list of checks

not available for all endpoints - table

## This Spotlight is focused on Message checks on main language


## Other feature
- multilanguage

## Stay tuned
Other checks will be developed and **we are open to define some of them with you**


