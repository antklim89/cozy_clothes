# Cozy Clothes

Learning project


## Run
### prod
```
yarn docker:build
yarn docker:up
```
### dev
```
yarn docker:dev
```


## Env

URL=http://localhost:3000

REPOSITORY_URL = owner-name/repo-name

// Create app on https://github.com/settings/developers
// Homepage URL is your URL
// Authorization callback URL is your URL + /callback
GITHUB_OAUTH_ID=1234567890qwerty
GITHUB_OAUTH_SECRET=1234567890qwerty
