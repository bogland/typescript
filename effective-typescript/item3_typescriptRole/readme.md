타입스크립트의 역할

- ts to js, transpile
- type error check

타입에 에러가 있더라도 컴파일은 해낸다.

런타임에는 타입 체크가 불가능

> interface나 type은 instanceof가 불가능함

```
interface Square {
  width: number;
}

interface Rectangle extends Square {
  height: number;
}

type Shape = Square | Rectangle;

function calculateArea(shape: Shape) {
  if (shape instanceof Rectangle) {
    // ~~~~~~~~~~ 'Rectangle'은(는) 형식만 참조하지만,
    //           여기서는 값으로 사용되고 있습니다.
    return shape.width * shape.height;
    //              ~~~~~~ 'Shape' 형식에 'height' 속성이 없습니다.
  } else {
    return shape.width * shape.width;
  }
}
```

<해결법, key값 유무로 타입 구분>

```
function calculateArea2(shape: Shape) {
  if ("height" in shape) {
    return shape.width * shape.height;
  } else {
    return shape.width * shape.width;
  }
}
```

<해결법, tag방식>

> tag된 유니온으로 런타임에 타입 정보를 유지가능

```
interface Square2 {
  kind: "square";
  width: number;
}

interface Rectangle2 {
  kind: "rectangle";
  width: number;
  height: number;
}

type Shape2 = Square2 | Rectangle2;
function calculateArea3(shape: Shape2) {
  if (shape.kind === "rectangle") {
    return shape.width * shape.height; //타입이 Retangle2
  } else {
    return shape.width * shape.width;
  }
}
```

<해결법, class방식>

> class방식을 쓰면 타입과 런타임 때 둘다 검사 가능
> instanceof 사용가능 (런타임)

```
class Square {
  constructor(public width: number) {}
}
class Rectangle extends Square {
  constructor(public width: number, public height: number) {
    super(width);
  }
}
type Shape4 = Square | Rectangle;

function calculateArea4(shape: Shape4) {
  if (shape instanceof Rectangle) {
    return shape.width * shape.height;
  } else {
    return shape.width * shape.width;
  }
}

```

- 타입 연산은 런타임에 영향을 주지 않음
  as number는 타입 연산이므로 런타임 타입 체크를 위해선 typeof를 사용

```
function asNumber(val: number | string): number {
  return val as number;
}
```

- typeof 와 instanceof
  typeof는 원시타입 확인용

```
number, string, boolean, undefined, object, function, symbol, bigint
```

instanceof는 객체 타입 확인용

```
class Person {}
const p = new Person();

console.log(p instanceof Person);  // true
console.log([] instanceof Array);  // true
console.log({} instanceof Object); // true
```

- as number는 언제쓸까? (타입단언)
  unknown이나 any같은 타입을 확정된 타입으로 변경시 사용

```
function handleValue(val: unknown) {
  const num = val as number;
  console.log(num + 10);  // 타입스크립트는 이제 num이 number라고 믿음
}
```

- 선언된 타입이 항상 그대로 값이 들어오진 않는다.
  특히 api response처리시

- 함수오버로딩이 타입으로서만 사용가능하나 구현부는 하나여야함
  > 타입 오버로딩을 써야하면 조건부 타입을 쓰라고함
  > 조건부 타입

```
T extends U ? X : Y
T가 U에 할당 가능하면 → X 타입
아니면 → Y 타입
```

예시

```
type IsString<T> = T extends string ? "yes" : "no";

type A = IsString<string>;  // "yes"
type B = IsString<number>;  // "no"
```

Generic + 조건부타입

```
function getLength<T extends string | any[]>(x: T): T extends string ? number : number {
  return x.length;
}
```

infer + Generic + 조건부 타입

> return type을 추론해서 조건부 타입처리

```
type ReturnType<T> = T extends (...args: any) => infer R ? R : never;

type A = ReturnType<() => number>;  // number
type B = ReturnType<() => string[]>; // string[]
```
