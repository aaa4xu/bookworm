# Bookwalker client for Node.js
**NOTE**: Bookworm supports only manga releases!

## How to use
1. Install [Node.js](https://nodejs.org/).
2. [Download bookworm](https://github.com/aaa4xu/bookworm/archive/master.zip) code. Extract it.
3. Run `start` file

## How to get content id
* bookwalker > My Library > Read this book
* Copy content id from url
    - member.bookwalker.jp/app/03/webstore/cooperation?r=BROWSER_VIEWER/**xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx**/https%3A%2F%2Fglobal.bookwalker.jp%2FholdBooks%2F
    - viewer.bookwalker.jp/03/10/viewer.html?cid=**xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx**&cty=1

## Env variables
- `BW_THROTTLE` `default: 10` - Throttle http requests per minute to bookwalker
- `BW_DONT_SAVE_AUTH` `default: 0` - Disable saving username/password to `auth.json`
- `BW_CONTENT_ID` - Non-interactive way to set contentId
- `BW_USERNAME` - Non-interactive way to set username
- `BW_PASSWORD` - Non-interactive way to set password
- `BW_BROWSER_ID` - Non-interactive way to set browser id
