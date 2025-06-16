```ts
// statement 와 function expression은 다르게 인식함

function rollDice1(sides: number): number {
  return 1;
}

const rollDice2 = function (sides: number): number {
  return 1;
};

const rollDice3 = (sides: number): number => {
  return 1;
};

// 그래도 params랑 return 타입이 같아서 그런지 같은 타입으로 보긴함
const fnc: typeof rollDice2 = rollDice1;
const fnc2: typeof rollDice1 = rollDice2;
const fnc3: typeof rollDice3 = rollDice2;

//되도록 함수 표현식으로 사용하는게 좋음, 매개변수 부터 반환값부터 함수 타입으로 선언하여 function expression로 재사용 가능
function func4(sides: number): number {
  return 1;
} // 재사용 불가
const func5: typeof rollDice2 = (sides: number) => 1; // 재사용 가능

type DiceRollFn = (sides: number) => number; // 함수 타입 선언으로
const rollDice4: DiceRollFn = (sides) => 1; // 재사용 가능

// 중복된 함수 타입 선언

function add(a: number, b: number) {
  return a + b;
}
function sub(a: number, b: number) {
  return a - b;
}

function mul(a: number, b: number) {
  return a * b;
}

function div(a: number, b: number) {
  return a / b;
}

// 함수 타입을 선언후 function expression으로 타입 재사용 가능

type BinaryFn = (a: number, b: number) => number;
const add2: BinaryFn = (a, b) => a + b;
const sub2: BinaryFn = (a, b) => a - b;
const mul2: BinaryFn = (a, b) => a * b;
const div2: BinaryFn = (a, b) => a / b;

// fetch의 response 타입은 Promis<Response>
const responseP = fetch("/quote?by=Mark");

// Response.json()으로 결과를 JSON으로 받을 수 있음
// 에러가 뜬 경우엔 JSON 형태가 아님
async function getQuote() {
  const response = await fetch("/quote?by=Mark");
  const quote = await response.json();
  return quote;
}

declare function fetch(
  input: RequestInfo,
  init?: RequestInit
): Promise<Response>; //외부 라이브러리의 타입 선언

// 에러가 뜬 경우를 대비해서 예외처리 해둠
async function checkedFetch(input: RequestInfo, init?: RequestInit) {
  const response = await fetch(input, init);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response;
}

// 함수타입을 사용해서 좀더 깔끔하게 처리
const checkedFetch2: typeof fetch = async (input, init) => {
  const response = await fetch(input, init);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response;
};

//함수 타입을 쓰면 throw 대신 return 으로 처리한 경우도 잡아내줌
const checkedFetch3: typeof fetch = async (input, init) => {
  const response = await fetch(input, init);
  if (!response.ok) {
    return new Error("Network response was not ok"); // return타입이 안맞아서 에러뜸
  }
  return response;
};
```
