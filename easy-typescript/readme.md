Q. 타입스크립트를 왜 써야하는가?

1. 타입을 통한 에러 검출 Eslint
2. 자동완성

## 타입 추론

분기로 타입 추론 가능

```
function introduce(someone: Person | Developer) {
  if ("age" in someone) {
    console.log(someone.age); //Person type
  }
  if ("skill" in someone) {
    console.log(someone.skill); // Developer type
  }
}

```
