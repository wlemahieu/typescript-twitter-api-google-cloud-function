# Twitter API Connected Google Cloud Function
###### Connect to Twitter API through a Cloud Secrets API key in order to manage Tweets.

### Cloud Account Prerequisites:
- [Google Cloud Console account](https://console.cloud.google.com)
- [2nd-gen Cloud Function](https://cloud.google.com/functions/docs/2nd-gen/console-quickstart)
- [Cloud Run API enabled](https://console.cloud.google.com/marketplace/product/google/run.googleapis.com)

### General Knowledge Prerequisites:
- [Google Cloud IAM privileges & roles](https://cloud.google.com/iam/docs/understanding-roles)
- [Google Cloud Service Accounts](https://cloud.google.com/run/docs/configuring/service-accounts?hl=en)
- [Google Cloud Run](https://cloud.google.com/run/docs/quickstarts/deploy-container)
- [Node 16](https://nodejs.org/dist/latest-v16.x/docs/api/)
- [Typescript](https://www.typescriptlang.org/)
- [GTS](https://github.com/google/gts)
- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)
- [Nodemon](https://www.npmjs.com/package/nodemon)
- [Concurrently](https://www.npmjs.com/package/concurrently)
- [Twitter API](https://developer.twitter.com/en/docs/twitter-api)
- [Twitter API SDK](https://www.npmjs.com/package/twitter-api-sdk)

### Local Tool Recommendations:
- [VSCode](https://code.visualstudio.com/)
- [NPX](https://www.npmjs.com/package/npx) (npm install -g npx)
- [NVM](https://github.com/nvm-sh/nvm) (or a similar node manager)

#### To test a GCF locally:

1. **nvm use 16** - Switch to Node 16 (nvm install 16.5.1 if not installed)
2. **npm install** - Install all node_modules for the GCF
3. TWITTER_BEARER_TOKEN=<your twitter bearer token> npm run watch** - Serve the example GCF locally
4. **http://localhost:8080/** - Visit the locally served GCF

##### *A note on easily moving ready components from local to the cloud:
After cloning this repository, you can upload a zip of the example GCF directory directly to a created Cloud Function. Alternatively, you can manually create & copy GCF files and their contents into your created Cloud Function.

##### Twitter Developer Sign-up required!
In order to use the Twitter API SDK, you'll need to sign-up to the Twitter developer portal and create a Bearer token & access tokens. Those should be stored in Google Cloud Secrets as **TWITTER_BEARER_TOKEN**, **TWITTER_CLIENT_ID**, **TWITTER_CLIENT_SECRET**