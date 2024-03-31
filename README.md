This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

## Getting Started

>**Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding. \
It might take a few hours to do it, so be patient.

## Start Development
### 0. [For Windows only] Setup workaround for ninja
Follow [this instruction](https://github.com/ninja-build/ninja/issues/1900#issuecomment-1817532728) to setup a workaround for ninja. \
Please make sure to download ninja from the **artifacts** of the GitHub Actions build, not from the **releases**.

### 1. Create .env file
Create a file named `.env` in the root directory of the project and add the content in [this google doc](https://docs.google.com/document/d/1b8g1Iau7TJo6f2scI5bhIGdKSBgu8lu7Kp8v8QPR0Uc/edit) \
Please request access to the document if you are a developer of the project. 

### 2. Install yarn
```bash
npm install -g yarn
```

### 3. Install dependencies
```bash
yarn
```

### 4. Start the app
Android:
```bash
yarn android
```

iOS:
```bash
yarn ios
```

## Style Checks
We have set up style checks using [ESLint](https://eslint.org) and [Prettier](https://prettier.io). \
To enable auto-formatting on save, install the [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) and [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) extensions in VSCode. \
Then follow [these instructions](https://stackoverflow.com/questions/39494277/how-do-you-format-code-on-save-in-vs-code) to turn on auto-formatting on save. \
Make sure auto-formatting works before starting development.