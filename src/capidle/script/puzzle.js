// @ts-check
import capitalCitiesDB from "../puzzles/capital-cities.json";
import nzCitiesDB from "../puzzles/nz-cities.json";

export const gameModes = {
  capitalCities: {
    name: "Capital Cities",
    db: capitalCitiesDB,
    tileServer:
      "https://services.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    attribution: "<a href='https://wiki.osm.org/Esri'>Powered by Esri</a>",
  },
  nzCities: {
    name: "New Zealand Towns & Cities",
    db: nzCitiesDB,
    tileServer:
      "https://basemaps.linz.govt.nz/v1/tiles/aerial/WebMercatorQuad/{z}/{x}/{y}.webp?api=c01g9c4ksg53p3m171bafj9shmp",
    attribution:
      "<a href='https://linz.govt.nz/data/licensing-and-using-data/attributing-elevation-or-aerial-imagery-data'>Sourced from LINZ CC-BY 4.0</a>",
  },
};

/** @param {keyof gameModes} gameMode */
export function generatePuzzle(gameMode) {
  const { db } = gameModes[gameMode];

  // if the URL contains `?test`, the puzzle is always the same, to allow for automated tests
  if (location.search.includes("?test")) return db[22];

  const puzzle = db[Math.floor(Math.random() * db.length)];

  // print the answer to the devtools console to assist debugging
  console.log(`SPOILER: The answer is ${puzzle.names.en}`);

  return puzzle;
}

/** @typedef {ReturnType<typeof generatePuzzle>} Answer */
