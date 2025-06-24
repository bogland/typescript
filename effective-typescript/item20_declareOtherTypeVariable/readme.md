```js
// 타입을 다르게 재선언하면 타입 에러발생

let id = "12-34-56";
id = 1234;

// 유니온으로 해결하려고 하면 매번 타입 가드 처리해야함

let id2: string | number = 1234;
if (typeof id === "number") {
  addOne(id2);
}

function addOne(n: number) {
  return n + 1;
}

// 가려지는 변수(?)와 혼돈하지 않기
const id3 = "12-34";
{
  const id3 = 12345;
}
```
