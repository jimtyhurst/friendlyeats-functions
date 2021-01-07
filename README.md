# FriendlyEats (Functions)

**Contents**

* [Introduction](#introduction)
* [Set-up](#set-up)
* [License](#license)

---

## Introduction

This project contains experiments and simple, sample code for implementing Google [Cloud Functions](https://cloud.google.com/functions/) associated with a [Firebase](https://firebase.google.com/) application that access data from a [Firestore repository](https://cloud.google.com/firestore/docs/).

[FriendlyEats](https://github.com/firebase/friendlyeats-web) is a restaurant recommendation app built on [Cloud Firestore](https://cloud.google.com/firestore/). While working through the tutorial, I [modified](https://github.com/jimtyhurst/friendlyeats-web) the application slightly to calculate a `valueIndex` for each restaurant. See the [valueIndex branch](https://github.com/jimtyhurst/friendlyeats-web/tree/valueIndex) of that application.

In this "functions" repository, I have been experimenting with Cloud Functions to learn how to create serverless functions in [TypeScript](https://www.typescriptlang.org/), using the [Firebase](https://firebase.google.com/docs) libraries. I am familiar with writing web services in Java, so this repository contains my experiments to learn how to do this within the Firebase environment, using JavaScript/TypeScript.

* Respond to an HTTPS request.
* Read query parameters from an HTTPS request.
* Build a JSON response.
* Query a Firestore repository, including a `where` clause.

Note: I have also been experimenting with [yarn](https://yarnpkg.com/), rather than [npm](https://www.npmjs.com/), as a package manager.

## Set-up
```
clone git@github.com:jimtyhurst/friendlyeats-functions.git
cd friendlyeats-functions/functions
yarn install
```

### Steps I followed to create the project:
Create project:
```bash
cd ~/src/js/Firebase-samples/
mkdir friendlyeats-functions
cd friendlyeats-functions
firebase login
firebase init
# Select 'functions' option.
# Select 'Use an existing project' option.
# Select com-tyhurst-friendlyeats project.
# Select 'Typescript' option.
# Select 'ESLint'.
# Select 'n' to *not* install dependencies with NPM.
git init
cd functions
yarn install
```

`firebase init` creates:

* `.firebaserc`
* `.gitignore`
* `firebase.json`
* `functions/`
    * `package.json`
    * `src/`
    * `tsconfig.json`

Get latest versions of firebase libraries:
```bash
yarn add firebase-admin@latest
yarn add firebase-functions@latest
```

Experiment with scripts:
```bash
yarn lint
yarn build
yarn serve
# then navigate to: http://localhost:5001/com-tyhurst-friendlyeats/us-central1/helloWorld
```

Deploy the function:
```bash
yarn deploy
# which is: firebase deploy --only functions
# then navigate to: https://us-central1-com-tyhurst-friendlyeats.cloudfunctions.net/helloWorld
```

Note: I have since replaced the `helloWorld` function with my `helloFriend` function.


## License
Copyright (c) 2020 [Jim Tyhurst](https://www.jimtyhurst.com)

Licensed under the [Open Software License version 3.0](./LICENSE).
