# GitHub Issues Teleport :rocket:

## Overview :telescope:

This app's main purpose is to allow authenticated users to transfer GitHub issues from one repo to another. Other than that, you can see your GitHub profile card on the home screen and browse your repos in the _repos_ section.

## Live :boom:

You can see the live version of this project [here](https://cc-github-issues.herokuapp.com/)

## How to install :floppy_disk:

If you want to play with this project locally on your machine, feel free to copy or download this repository. First thing you need to do in order to run the app is to create `.env` file in the root folder of the project with the following environment variables set:

```
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_SECRET=your_github_client_secret
```

You also have to create `.env` file in the `client` folder with the same `client_id` as in the root folder:

```
REACT_APP_GITHUB_CLIENT_ID=your_github_client_id
```

To get your own `client_id` and `secret` you have to create a [GitHub OAuth App](https://docs.github.com/en/free-pro-team@latest/developers/apps/creating-an-oauth-app).

Then, in the project directory, you can run:

### `npm run dev`

Runs the app in the development mode (both the server and the client).<br />

- Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

- Send your requests from Postman to [http://localhost:5000](http://localhost:5000) to test the API.

## Tech stack :hammer:

- **FrontEnd Framework:** React with TypeScript
- **ServerSide Framework:** Express with TypeScript
- **State Management:** React Context API + React Hooks for auth state management
- **Data Fetching:** [react-query](https://react-query.tanstack.com/) :rocket: :rocket: :rocket:
- **UI Framework:** [Material-UI](https://material-ui.com/)
