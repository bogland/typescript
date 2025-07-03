// 하나씩 속성을 넣기보단 한번에 생성하는게 좋음

const pt = {};
pt.x = 3;
pt.y = 4;

interface Point {
  x: number;
  y: number;
}

const pt2: Point = {};
pt2.x = 3;
pt2.y = 4;

const pt3 = {
  x: 3,
  y: 4,
};

// 중간에 속성을 변경하고자 한다면 타입 단언문 사용
const pt4 = {} as Point;
pt4.x = 3;
pt4.y = 4;

const pt5: Point = {
  x: 3,
  y: 4,
};

// Object.assign을 통해서 생성을 해도 특정 key가 있는지 확인을 못함
const pt6 = { x: 3, y: 4 };
const id = { name: "Pythagoras" };
const namedPoint = {};
Object.assign(namedPoint, pt6, id);
console.log(namedPoint); // {x:3,y:4,name:"Pythagoras"}
namedPoint.name;

// 객체 전개 연산자를 통해 객체 생성
const namedPoint2 = { ...pt6, ...id };
namedPoint2.name;

//객체 전개 연산자로 새로운 타입을 계속 생성시 새로운 타입을 추론해줌
const pt0 = {};
const pt1 = { ...pt0, x: 3 };
const pt8: Point = { ...pt1, y: 4 };

//빈객체를 이용해서 조건부 속성 추가방법
declare let hasMiddle: boolean;
const firstLast = { first: "Harry", last: "Truman" };
const president = { ...firstLast, ...(hasMiddle ? { middle: "S" } : {}) };
president;

// start와 end가 union으로 추론된다고 했지만 잘되네?
declare let hasDates: boolean;
const nameTitle = { name: "Khufu", title: "Pharaoh" };
const pharaoh = {
  ...nameTitle,
  ...(hasDates ? { start: -2589, end: -2566 } : {}),
};
pharaoh.start;

//명시적 Partial처리
function addOptional<T extends object, U extends object>(
  a: T,
  b: U | null
): T & Partial<U> {
  return { ...a, ...b };
}

const pharaoh2 = addOptional(
  nameTitle,
  hasDates ? { start: -2589, end: -2566 } : null
);
pharaoh.start; // 정상, 타입이 number | undefined;
