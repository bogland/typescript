- instanceof는 런타임 타입 체크여서 interface나 type엔 사용 불가

- js는 런타임 타입이 string, number, boolean, undefined, object, function으로 존재

- class 키워드는 런타임과 타입에 둘다 사용가능

```js
class Cylinder {
  radius = 1;
  height = 1;
}

const v = typeof Cylinder; // 값이 "function"
type T = typeof Cylinder; // 타입이 typeof Cylinder
```

- 타입부분에 선언된 obj[key]는 타입을 가져옴

```js
interface Person {
  name: string;
  age: number;
}

const first: Person["name"] = "John"; //string
type PersonEl = Person["name" | "age"]; //string | number
```

- 튜플에 [number]는 인덱스 타입 접근법으로 튜플의 모든 인덱스로 접근 가능한 타입을 유니온으로 묶음

```js
type Tuple = [string, number, Date]; // 튜플 타입
type TupleEl = Tuple[number]; //  인덱스 타입 접근법, 튜플의 모든 인덱스로 접근 가능한 타입을 유니옷으로 묶음, string | number | Date;
```

- this는 값으로의 this와 타입으로의 다형성 this가 있다.  
  `값으로의 this`

```js
const obj = {
  count: 0,
  increment() {
    this.count += 1; // 여기서 this는 obj를 가리킴
  },
};
obj.increment();
console.log(obj.count); // 1
```

`다형성 this, 메서드 체이닝`

```js
class Builder {
  content: string = "";
  setContent(content: string): this {
    this.content = content;
    return this;
  }
}

class HTMLBuilder extends Builder {
  setHTML(html: string): this {
    this.content = `<html>${html}</html>`;
    return this;
  }
}

const html = new HTMLBuilder().setHTML("hi").setContent("hello");
```

- 값에서 &와 |은 AND와 OR 비트연산  
  타입에서는 인터섹션과 유니온

- as const는 리터럴형태의 타입으로 변환해줌

```js
const color = "red";         // 타입: string
const fixedColor = "red" as const;  // 타입: "red" (리터럴)

const arr = [1, 2, 3] as const;
// 타입: readonly [1, 2, 3] → 값이 변경 불가한 튜플
```

- in은 루프 혹은 매핑된 타입에 등장  
  타입수준에서 키를 순회할때도 사용됨 (Mapped Types)  
  `매핑된 타입에서의 in`

```js
type Keys = 'name' | 'age';
type Person = {
  [K in Keys]: string;
};
// Person 타입은 { name: string; age: string; }
```
