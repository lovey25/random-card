import { tsvParse, csvParse } from "d3-dsv";
import { timeParse } from "d3-time-format";
import csv from "./db.csv";

function parseData(parse) {
  return function (d) {
    d.date = parse(d.date);
    d.open = +d.open;
    d.high = +d.high;
    d.low = +d.low;
    d.close = +d.close;
    d.volume = +d.volume;

    return d;
  };
}

const parseDate = timeParse("%Y-%m-%d");

export function getData() {
  const promiseMSFT = fetch(csv)
    .then((response) => response.text())
    .then((data) => csvParse(data));
  // .then((data) => csvParse(data, parseData(parseDate)));
  return promiseMSFT;
}
