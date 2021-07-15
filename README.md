# MarketoLive


## Developer setup

### prettier

npm run prettier

### mitmproxy

Useful references:
1. [mitmproxy options](https://docs.mitmproxy.org/stable/concepts-options/)
2. [Chromium command line switches](https://peter.sh/experiments/chromium-command-line-switches/)



Launch Chrome with a new profile configured to use mitmproxy. The 1st time that it's launched you will need to add the developer chrome extension. (You may also want to remove any default Chrome extensions.) Subsequent launches will remember your settings in this new profile. You can also enable the extension in incognito mode and set developer tools preferences like "Disable cache".

``` bash
/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome \
  --proxy-server="https=127.0.0.1:8080" \
  --disable-fre \
  --no-default-browser-check \
  --no-first-run \
  --profile-directory="Marketo" \
  --user-data-dir=$HOME/.marketo-data-dir \
  https://login.marketo.com/homepage/login
```