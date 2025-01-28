
# LitLink

![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)

## Description

LitLink is a social network API that allows users to share their thoughts, add other users as friends, and react to friends' thoughts.

## Table of Contents

- [LitLink](#litlink)
  - [Description](#description)
  - [Table of Contents](#table-of-contents)
  - [Screenshot](#screenshot)
  - [User Story](#user-story)
  - [Acceptance Criteria](#acceptance-criteria)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Credits](#credits)
  - [License](#license)
  - [How to Contribute](#how-to-contribute)
  - [Tests](#tests)
  - [Questions?](#questions)

## Screenshot

Demo video is [here](https://drive.google.com/file/d/1g6Ewg2frARg28zG7BMuqnGkQb1G0_NSd).

![Screenshot of Insomnia w/ endpoints and data.](/assets/screenshot.png)

## User Story

- AS A social media startup
- I WANT an API for my social network that uses a NoSQL database
- SO THAT my website can handle large amounts of unstructured data

## Acceptance Criteria

- GIVEN a social network API
- WHEN I enter the command to invoke the application
- THEN my server is started and the Mongoose models are synced to the MongoDB database
- WHEN I open API GET routes in Insomnia for users and thoughts
- THEN the data for each of these routes is displayed in a formatted JSON
- WHEN I test API POST, PUT, and DELETE routes in Insomnia
- THEN I am able to successfully create, update, and delete users and thoughts in my database
- WHEN I test API POST and DELETE routes in Insomnia
- THEN I am able to successfully create and delete reactions to thoughts and add and remove friends to a user's friend list

## Installation

Ensure Node.js is installed. Download or clone the repo. Use `npm i` to install the dependencies needed for the project. Use `npm run build` to build the app. Use `npm start` to run the server.

## Usage

While server is running, utilize Insomnia, MongoDBCompass or similar program which can simulate API calls. Use the appropriate routes listed in the routes code.

## Credits

All code written by me, with help from several AI chatbots, incl. Claude, ChatGPT, and GitHub Copilot. TA's time graciously donated when having issues with Insomnia. Several YouTube tutorials were also utilized to help understand API structure.

## License

This project is licensed under the ![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg) [MIT](https://opensource.org/licenses/MIT) license.

## How to Contribute

No contributions needed at this time - but feel free to download, fork, use, and play with as desired.

## Tests

See above; [Usage](#usage) instructions.

## Questions?

Contact me at
[GitHub](https://github.com/k3strl), or email me at: <k3strl@geemail.com>.
