- 타입단언문을 사용하면 빠진 값을 감지하지 못함

```
const alice: Person = { name: "Alice" };
const bob = { name: "Bob" } as Person; // 에러

const alice2: Person = {};
const bob2 = {} as Person;  // 정상

```

- 타입단언문을 사용하면 추가된 값에 에러가 안뜸

```
const alice3: Person = {
  name: "Alice",
  occupation: "Typescript developer",
};

const alice4 = {
  name: "Alice",
  occupation: "Typescript developer",
} as Person;

```
