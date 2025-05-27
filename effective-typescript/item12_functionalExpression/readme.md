- 함수 타입 선언을 통해서 심플하게 선언가능

```js
const rollDice3 = (sides: number): number => {
  return 1;
};

type DiceRollFn = (sides: number) => number;
const rollDice4: DiceRollFn = (sides) => 1; //function type 선언
```

- 깔끔2

```js
type BinaryFn = (a: number, b: number) => number;
const add2: BinaryFn = (a, b) => a + b;
const sub2: BinaryFn = (a, b) => a - b;
const mul2: BinaryFn = (a, b) => a * b;
const div2: BinaryFn = (a, b) => a / b;
```

- 타입없는 외부라이브러리 함수 타입 선언

```js
declare function fetch(
  input: RequestInfo,
  init?: RequestInit
): Promise<Response>; //외부 라이브러리의 타입 선언
```

```js
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
    return new Error("Network response was not ok"); // return타입이 안맞으면 에러뜸
  }
  return response;
};
```
