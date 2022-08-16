/// <reference types="cypress" />

import {
  directionBetween,
  distanceBetween,
} from "../../../src/capidle/script/util";

const buiding405 = [-36.85322, 174.77];
const oggb = [-36.85314, 174.7713];
const wellington = [-41.28942, 174.77802];
const newYork = [40.72934, -73.99229];
const paris = [48.85201, 2.35709];

describe("directionBetween", () => {
  it("can calculate the distance between two coordinates", () => {
    // to avoid floating-point errors, we use .to.be.closeTo instead of .to.equal
    expect(distanceBetween(...buiding405, ...oggb)).to.be.closeTo(0.116, 0.01);
    expect(distanceBetween(...buiding405, ...wellington)).to.be.closeTo(493, 1);
    expect(distanceBetween(...newYork, ...wellington)).to.be.closeTo(14405, 1);
    expect(distanceBetween(...newYork, ...paris)).to.be.closeTo(5835, 1);
  });

  it("doesn't crash when comparing with itself", () => {
    expect(distanceBetween(...paris, ...paris)).to.eq(0);
  });
});

describe("directionBetween", () => {
  it("can calculate the distance between two coordinates", () => {
    expect(directionBetween(...buiding405, ...oggb)).to.eq("➡️");
    expect(directionBetween(...buiding405, ...wellington)).to.eq("⬇️");
    expect(directionBetween(...newYork, ...wellington)).to.eq("↙️");
    expect(directionBetween(...newYork, ...paris)).to.eq("↗️");
  });

  it("doesn't crash when comparing with itself", () => {
    expect(directionBetween(...paris, ...paris)).to.eq("⬆️");
  });
});
