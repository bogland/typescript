type AB = "A" | "B";
type AB12 = "A" | "B" | 12;

const a: AB = "A";
const c: AB = "C";

const ab: AB = Math.random() < 0.5 ? "A" : "B";
const ab12: AB12 = ab; // "A","B"는 AB12의 부분집합

declare let twelve: AB12;
const back: AB = twelve;

type A = { a: number };
type B = { b: string };

type C = A | B;
type Keys = keyof C; // "a" | "b" 인 것
const value: Keys = "A";

interface Person {
  name: string;
}
interface PersonSpan extends Person {
  birth: Date;
  death?: Date;
}

function getKey<K extends string>(val: any, key: K) {}

getKey({}, "a");
getKey({}, 12);

interface Point {
  x: number;
  y: number;
}
type PointKeys = keyof Point; // 타입은 "x" | "y"
function sortBy<K extends keyof T, T>(vals: T[], key: K): T[] {
  return vals;
}
const pts: Point[] = [
  { x: 1, y: 1 },
  { x: 2, y: 0 },
];
sortBy(pts, "x");
sortBy(pts, "y");
sortBy(pts, Math.random() < 0.5 ? "x" : "y");
sortBy(pts, "z");

const list = [1, 2, 3];
const tuple: [number, number, number] = list;

const tuple2: [number, number, number] = [1, 2, 3];
const list2: number[] = tuple2;

const triple: [number, number, number] = [1, 2, 3];
const double: [number, number] = triple;
