```ts
// 코드 뿐만 아니라 타입도 반복을 줄이자.
console.log(
  "Cylinder 1 x 1 ",
  "Surface area:",
  6.283185 * 1 * 1 + 6.283185 * 1 * 1,
  "Volume:",
  3.14159 * 1 * 1 * 1
);

console.log(
  "Cylinder 1 x 2 ",
  "Surface area:",
  6.283185 * 1 * 1 + 6.283185 * 1 * 2,
  "Volume:",
  3.14159 * 1 * 1 * 2
);

console.log(
  "Cylinder 1 x 3 ",
  "Surface area:",
  6.283185 * 1 * 1 + 6.283185 * 1 * 3,
  "Volume:",
  3.14159 * 1 * 1 * 3
);

const surfaceArea = (r, h) => 2 * Math.PI * r * (r + h);
const volume = (r, h) => Math.PI * r * r * h;
for (const [r, h] of [
  [1, 1],
  [1, 2],
  [2, 1],
]) {
  console.log(
    `Cylinder ${r} x ${h} `,
    `Surface area: ${surfaceArea(r, h)}`,
    `Volume: ${volume(r, h)}`
  );
}

// DRY 원칙 (Don't repeat yourself)

// 반복을 줄이는 방법, 타입에 이름을 붙임
function distance(a: { x: number; y: number }, b: { x: number; y: number }) {
  return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
}

interface Point2D {
  x: number;
  y: number;
}

function distance2(a: Point2D, b: Point2D) {
  return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
}

// 타입 함수도 마찬가지
function get(url: string, opts: Options): Promise<Response>;
function post(url: string, opts: Options): Promise<Response>;

type HTTPFunction = (url: string, opts: Options) => Promise<Response>;
const get2: HTTPFunction = (url, opts) => {
  return fetch(url, opts);
};
const post2: HTTPFunction = (url, opts) => {
  return fetch(url, opts);
};

// 속성 중복 되는 경우
interface Person {
  firstName: string;
  lastName: string;
}
interface PersonWithBirthDate {
  firstName: string;
  lastName: string;
  birth: Date;
}

// interface 상속 사용
interface IPersonWithBirthDate extends Person {
  birth: Date;
}

// union 사용
type UPersonWithBirthDate = Person | { birth: Date };

// 상세한 속성을 정의해 놓고 가져다 쓰도록 처리
interface PersonProperty {
  firstName: string;
  lastName: string;
  birth: Date;
}
interface Person2 {
  firstName: PersonProperty["firstName"];
  lastName: PersonProperty["lastName"];
}

type Person3 = {
  [k in "firstName" | "lastName"]: PersonProperty[k];
};

type Person4 = Pick<PersonProperty, "firstName" | "lastName">;

// 태그 중복
interface SaveAction {
  type: "save";
}

interface LoadAction {
  type: "load";
}

// 불필요한 literal type 사용
type ActionType = "save" | "load";

// 깔끔하게 개선
type Action = SaveAction | LoadAction;
type ActionType2 = Action["type"];

// Pick과의 차이점 주의, Pick은 객체형태의 타입이 만들어짐
type ActionRec = Pick<Action, "type">; // {type: "save" | "load"}

// optional 만들기
interface Options {
  width: number;
  height: number;
  color: string;
  label: string;
}

type OptionsUpdate = { [k in keyof Options]?: Options[k] };
type OptionsKeys = keyof Options; // "width" | "height" | "color" | "label"
// Partial로 간단하게 표현
type OPtionsUpdate2 = Partial<Options>;

// 값의 형태에서 타입 정의
const ININT_OPTIONS = {
  width: 640,
  height: 480,
  color: "#000000",
  label: "VGA",
};

type Options2 = typeof ININT_OPTIONS;
/*
{
  width: number;
  height: number;
  color: string;
  label: string;
}
*/

// 함수의 Return 타입을 타입으로 만드는방법
function getUserInfo(userId: string) {
  const name = "John";
  const age = 30;
  const height = 170;
  const weight = 70;
  const favoriteColor = "blue";
  return {
    userId,
    name,
    age,
    height,
    weight,
    favoriteColor,
  };
}

type UserInfo = ReturnType<typeof getUserInfo>;

// 제네릭 타입에서 매개변수 제한하는법
interface Name {
  first: string;
  last: string;
}

type DancingDuo<T extends Name> = [T, T];

const couple1: DancingDuo<Name> = [
  { first: "Fred", last: "Astaire" },
  { first: "Ginger", last: "Rogers" },
];

const couple2: DancingDuo<Name> = [{ first: "Fred" }, { first: "Ginger" }];

// Pick은 제네링의 extends 형태로 구현 가능
type Pick2<T, K> = {
  [k in K]: T[k];
};

type Pick3<T, K extends keyof T> = {
  [k in K]: T[k];
};

// 이상한 key로 접근시 오류 발생
type FirstLast = Pick<Name, "first" | "last">;
type FirstMiddle = Pick<Name, "first" | "middle">;
```
