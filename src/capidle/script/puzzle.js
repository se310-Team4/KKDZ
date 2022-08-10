// @ts-check
import capitalCitiesDB from "../puzzles/capitalCities.json";
import nzCitiesDB from "../puzzles/nzCities.json";

export const gameModes = {
  capitalCities: {
    name: "Capital Cities",
    db: capitalCitiesDB,
  },
  nzCities: {
    name: "New Zealand Towns & Cities",
    db: nzCitiesDB,
  },
};

/** @param {keyof gameModes} gameMode */
export function generatePuzzle(gameMode) {
  const { db } = gameModes[gameMode];
  return db[Math.floor(Math.random() * db.length)];
}
