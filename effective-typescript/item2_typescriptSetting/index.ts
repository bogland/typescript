import fs from "./fs";

function add(a, b) {
  return a + b;
}

const x: number = null;

type Func1 = (x: number) => void;
let f1: Func1 = (x) => {};
