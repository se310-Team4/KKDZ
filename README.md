# KKDZ Games

## Project Overview

KKDZ is a growing collection of for-fun mini-games. Each game takes around 5 - 30 minutes to play, making it the perfect option during study breaks, recreational time, or just to de-stress and take your mind off things.

This project is associated with the University of Auckland SOFTENG 310.

Currently, 3 games are being worked on:

- Liedle - a variation of [Wordle](https://en.wikipedia.org/wiki/Wordle) where the game has a small chance of colouring a letter incorrectly.
- Capidle - the user is presented with a map of a city. The aim of the game is to guess the city in 6 guesses.
- 2048 Expert - a variation of [2048](https://en.wikipedia.org/wiki/2048_%28video_game%29) where 2 (instead of 1) new tiles are added after each move.

We hope to have at least 4 games complete by launch day (18 October 2022).

## Usage

To play the games, visit [our website](https://se310-Team4.github.io). The `main` branch is automatically deployed to the website.

## Installation

It is possible to edit the code without installing any tools or software, by simply opening [src/index.html](src/index.html) in your browser.

However, you get a much better development experience by following these steps:

**Initial set up:**

- Use Visual Studio Code as your IDE.
- [Install NodeJS](https://nodejs.org/en/download) (Choose either "LTS" or "Current")
- Clone this repository
- Open this repository folder in your terminal, and run `npm install`

**Starting the app:**

- Open this repository folder in your terminal, and run `npm start`
- Visit http://localhost:1234 in your web browser.

**Running tests:**

- Follow the instructions above to start the app. Keep that terminal window open.
- Open this repository folder in your terminal, and run `npm test`
- The cypress app will open. Click <kbd>E2E Testing</kbd>
- Chose a browser and click <kbd>Start</kbd>

## Architecture

- All code lives in the folder called [src](src). Tests are written using [cypress](https://docs.cypress.io), and are located in the folder called [cypress/e2e](cypress/e2e).
<!-- TODO: document further -->

Instructions to run this project locally coming soon …

## License

This project is licensed under the terms of the [MIT License](https://github.com/se310-Team4/KKDZ/blob/main/LICENSE)

## Contribute to this Project

Please visit our [contributing guidelines](https://github.com/se310-Team4/KKDZ/blob/main/CONTRIBUTING.md)

## References

Liedle is inspired by [Wordle](https://www.nytimes.com/games/wordle/index.html)

2048 Expert is inspired by [2048](https://en.wikipedia.org/wiki/2048_%28video_game%29)

Capidle is inspired by [Flagle](https://flagle.io), [GeoGuessr](https://geoguessr.com) and [Wordle](https://www.nytimes.com/games/wordle/index.html)
