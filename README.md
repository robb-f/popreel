# PopReel

This project is a TikTok clone project. The site is built using [this](https://github.com/clerk/nextjs-auth-starter-template) starter template by Clerk.

The site is not functional, but you can create an account now clicking on [this link](popreel-amber.vercel.app), found in the "About" section of the repository.

Currently, there are two features that need to be implemented:
<ol>
  <li>Embedding videos into the /for-you URI</li>
  <li>Devising an actual "for you" algorithm</li>
</ol>

## Running locally
You should first clone this repository on your machine, for example:
```bash
git clone git@github.com:robb-f/popreel.git
```

Then, follow these steps:
1. Sign up for a Clerk account at [https://clerk.com](https://go.clerk.com/31bREJU).
2. Go to the [Clerk dashboard](https://go.clerk.com/4I5LXFj) and create an application.
3. Set the required Clerk environment variables as shown in [the example `env` file](./.env.example).
4. Go to "Organization Settings" in your sidebar and enable Organizations
5. `npm install` the required dependencies.
6. `npm run dev` to launch the development server.

## Issues and Feedback

*WIP*

-------
###### Last updated Jan. 26, 2025