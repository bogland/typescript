- 타입 스크립트는 런타임 정확성을 보장하지 않는다.

```js
const names = ["Alice", "Bob"];
console.log(names[2].toUpperCase());
```

- Error Lens Extension을 쓰면 코드 옆에 Lint에러 표시해줌

- tsc --init
  tsc index.ts // ts to js
- ts-node : node상에서 타입스크립트 실행
