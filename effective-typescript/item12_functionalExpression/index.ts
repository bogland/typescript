function rollDicel(sides: number): number {
  return 1;
}

const rollDice2 = function (sides: number): number {
  return 1;
};

const rollDice3 = (sides: number): number => {
  return 1;
};

type DiceRollFn = (sides: number) => number;
const rollDice4: DiceRollFn = (sides) => 1; //function type 선언

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

type BinaryFn = (a: number, b: number) => number;
const add2: BinaryFn = (a, b) => a + b;
const sub2: BinaryFn = (a, b) => a - b;
const mul2: BinaryFn = (a, b) => a * b;
const div2: BinaryFn = (a, b) => a / b;

const responseP = fetch("/quote?by=Mark");

async function getQuote() {
  const response = await fetch("/quote?by=Mark");
  const quote = await response.json();
  return quote;
}

declare function fetch(
  input: RequestInfo,
  init?: RequestInit
): Promise<Response>; //외부 라이브러리의 타입 선언

async function checkedFetch(input: RequestInfo, init?: RequestInit) {
  const response = await fetch(input, init);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response;
}

const checkedFetch2: typeof fetch = async (input, init) => {
  const response = await fetch(input, init);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response;
};

const checkedFetch3: typeof fetch = async (input, init) => {
  const response = await fetch(input, init);
  if (!response.ok) {
    return new Error("Network response was not ok"); // return타입이 안맞아서 에러뜸
  }
  return response;
};
