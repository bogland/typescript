tsconfig 옵션

- `noImplicitAny` : 암시적인 any를 허용하지 않는다.
  타입을 선언하지 않은것을 허용하지 않음

```
function add(a, b) {
  return a + b;
}
```

- `strictNullChecks` : null을 암시적으로 허용 안함

```
  const a:number = null
```

- `noImplicitThis` : this가 any 타입 되는걸 금지

```
const obj = {
  name: "ChatGPT",
  getName() {
    return this.name; // this의 타입을 명확히 지정해야 함
  }
};
```

<noImplicitThis, 해결책>

```
type ObjType = {
  name: string;
  getName(this: ObjType): string;
};

const obj: ObjType = {
  name: "ChatGPT",
  getName() {
    return this.name;
  }
};
```

- `strictFunctionTypes` : 함수간 파라미터나 리턴 타입 호환성 검사

```
type Func1 = (x: number) => void;
type Func2 = (x: number | string) => void;

let f1: Func1 = (x) => {};
let f2: Func2 = f1; // strictFunctionTypes: true이면 오류
```

- `esModuleInterop` : true면 import로 모듈 사용

```
import fs from 'fs'
```

- `allowSyntheticDefaultImports` : export default가 없어도 default import 사용가능

```
// fs.js (Node.js 내장 모듈 예시)
module.exports = {
  readFile: function () {},
  writeFile: function () {}
};

// 기본적인 CommonJS import 방식 (정확한 문법)
import * as fs from 'fs';
```

<allowSyntheticDefaultImports, 해결법>

```
// 이건 문법적으로 ES 모듈 default import처럼 보이지만,
import fs from 'fs';

fs.readFile(...);
```

- `strict` : 모든 엄격한 타입 검사, 아래 리스트 모두 검사

```
noImplicitAny
strictNullChecks
strictFunctionTypes
strictBindCallApply
strictPropertyInitialization
noImplicitThis
alwaysStrict
```

- `skipLibCheck` : node_modules에 있는 .d.ts타입 검사 생략
  속도 향상 및 외부라이브러리 타입 문제로 인한 오류 방지

- `forceConsistentCasingInFileNames` : 대소문자 일관성 검사
  윈도우에서 대소문자 구분없어 발생하는 문제 방지해줌

- `resolveJsonModule` : json파일을 import 가능하게 해줌

- `noEmitOnError` : 타입 에러 발생시 js파일을 생성하지 않도록 막음
