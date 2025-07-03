```js
// let 으로 문자열을 정의하면 string타입으로 되기때문에 유니온으로 정의된 좁은 타입에 넣을수 없게 된다.

interface Vector3 {
  x: number;
  y: number;
  z: number;
}
function getComponent(vector: Vector3, axis: "x" | "y" | "z") {
  return vector[axis];
}

let x = "x";
let vec = { x: 10, y: 20, z: 30 };

getComponent(vec, x);

const mixed = ["x", 1];

// let으로 정의된 문자열 리터럴은 string타입으로 정의됨, 다른 타입으론 변경 불가

let x2 = "x";
x = "a";
x = "Four score and seven years ago...";

let x3 = "x";
let x4 = /x|y|z/;
x3 = x4;
x3 = ["x", "y", "z"];

// const 로 정의된 문자열 리터럴은 그대로 타입이 됨

const x5 = "x";
let vec2 = { x: 10, y: 20, z: 30 };
getComponent(vec2, x5);

// const v를 하면 프로퍼티 요소는  let으로 정의되는걸로 취급되어 숫자면 number, 문자열은 string 타입으로 됨
// 여전히 자식의 타입은 변경불가
const v = {
  x: 1,
};
v.x = 3;
v.x = "3";
v.y = 4;
v.name = "Pythangora";

// 프로퍼티 속성이 자동으로 추론되지 않게 하는법
const v2: { x: 1 | 3 | 5 } = {
  x: 1,
};

const v3 = {
  x: 1,
  y: 2,
};

const v3_2 = {
  x: 1 as const,
  y: 2,
};

const v4 = {
  x: 1,
  y: 2,
};

// {readonly x:1, readonly y:2} 타입으로 정의됨
const v4_2 = {
  x: 1,
  y: 2,
} as const;

v4_2.x = 12;

// 배열 리터럴에 as const 하면 number[]가 아닌 특정 (1|2|3)[]로 좁혀짐
const a1 = [1, 2, 3];
const a2 = [1, 2, 3] as const;

// 별첨 enum은 js에서 분기문으로 변환되어 성능 저하유발, const 붙이면 상수로 변경됨
enum eType {
  A,
  B,
  C,
}

const e1 = eType.A;

const enum eType2 {
  A,
  B,
  C,
}
const e2 = eType2.A;

```
