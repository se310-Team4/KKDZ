# BrainGain

![Build](https://github.com/se310-Team4/KKDZ/actions/workflows/build.yml/badge.svg)
![Sonarcloud](https://github.com/se310-Team4/KKDZ/actions/workflows/sonarcloud.yml/badge.svg)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=kkdz&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=kkdz)
[![Reliability Rating](https://sonarcloud.io/api/project_badges/measure?project=kkdz&metric=reliability_rating)](https://sonarcloud.io/summary/new_code?id=kkdz)
[![Duplicated Lines (%)](https://sonarcloud.io/api/project_badges/measure?project=kkdz&metric=duplicated_lines_density)](https://sonarcloud.io/summary/new_code?id=kkdz)
[![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=kkdz&metric=vulnerabilities)](https://sonarcloud.io/summary/new_code?id=kkdz)
[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=kkdz&metric=bugs)](https://sonarcloud.io/summary/new_code?id=kkdz)
[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=kkdz&metric=security_rating)](https://sonarcloud.io/summary/new_code?id=kkdz)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=kkdz&metric=coverage)](https://sonarcloud.io/summary/new_code?id=kkdz)
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=kkdz&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=kkdz)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=kkdz&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=kkdz)
[![Lines of Code](https://sonarcloud.io/api/project_badges/measure?project=kkdz&metric=ncloc)](https://sonarcloud.io/summary/new_code?id=kkdz)
[![Technical Debt](https://sonarcloud.io/api/project_badges/measure?project=kkdz&metric=sqale_index)](https://sonarcloud.io/summary/new_code?id=kkdz)

## Project Overview

BrainGain is a growing collection of for-fun mini-games. Each game takes around 5 - 30 minutes to play, making it the perfect option during study breaks, recreational time, or just to de-stress and take your mind off things.

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

- Use Visual Studio Code as your IDE. We also recommend Prettier for code formatting.
- [Install NodeJS](https://nodejs.org/en/download) (Choose either "LTS" or "Current")
- Clone this repository
- Open this repository folder in your terminal, and run `npm install`

**Starting the app:**

- Open this repository folder in your terminal, and run `npm start`
- Visit http://localhost:1234 in your web browser.

**Running tests:**

- Follow the instructions above to start the app. Keep that terminal window open.
- Make sure [Cypress](https://docs.cypress.io/guides/getting-started/installing-cypress) is installed
- Open this repository folder in your terminal, and run `npm test`
- The Cypress app will open. Click <kbd>E2E Testing</kbd>
- Chose a browser and click <kbd>Start</kbd>

## Architecture

- All code lives in the folder called [src](src). Tests are written using [Cypress](https://docs.cypress.io), and are located in the folder called [cypress/e2e](cypress/e2e).

## License

This project is licensed under the terms of the [MIT License](https://github.com/se310-Team4/KKDZ/blob/main/LICENSE)

## Contribute to this Project

Please visit our [contributing guidelines](https://github.com/se310-Team4/KKDZ/blob/main/CONTRIBUTING.md)

## References

Liedle is inspired by [Wordle](https://www.nytimes.com/games/wordle/index.html)

2048 Expert is inspired by [2048](https://en.wikipedia.org/wiki/2048_%28video_game%29)

Capidle is inspired by [Flagle](https://flagle.io), [GeoGuessr](https://geoguessr.com) and [Wordle](https://www.nytimes.com/games/wordle/index.html)

Replay button icon from [Font Awesome Icons](https://fontawesomeicons.com/svg/icons/arrow-clockwise)

Liedle word list [The Stanford GraphBase](https://www-cs-faculty.stanford.edu/~knuth/sgb.html)

In Capidle, the aerial imagery is sourced from [Toitū Te Whenua Land Information New Zealand](https://linz.govt.nz/data/licensing-and-using-data/attributing-elevation-or-aerial-imagery-data), and licensed under [CC-BY 4.0](https://creativecommons.org/licenses/by/4.0).
The location of cities is sourced from [Wikidata](https://wikidata.org), licensed under [CC-0](https://creativecommons.org/share-your-work/public-domain/cc0).
