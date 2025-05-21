- 타입을 집합으로 생각
- 유니온(|) 과 인터섹션(&)

- 유니온은 A or B 둘중 하나라는 뜻
- 인터섹션은 둘다 만족하는 것
  `여러 역할 합치기`

```
type Admin = { accessLevel: 'admin' };
type User = { name: string };

type AdminUser = Admin & User;

const rootUser: AdminUser = {
  name: 'root',
  accessLevel: 'admin',
};
```

`컴포넌트 props 확장`

```
type ButtonProps = { label: string };
type Clickable = { onClick: () => void };

type ClickableButton = ButtonProps & Clickable;
```

- keyof (A & B) = (keyof A) | (keyof B)
  인터섹션 타입 A & B 는 A와 B의 모든 속성을 다 가지는 타입
- keyof (A | B) = (keyof A) & (keyof B)
  유니온 타입 A | B는 A또는 B 중 하나만 만족하면 되는 타입

```
type A = { a: number };
type B = { b: string };

type C = A | B;
type Keys = keyof C;  // "a" | "b" 인 것 같지만 실제로는 "a" & "b" = never
```

```
type A = { shared: number, onlyA: boolean }
type B = { shared: number, onlyB: string }

type C = A | B;
type Keys = keyof C;  // "shared"
```

- A&B, A|B, keyof(A&B), keyof(A|B) 차이
  A&B : A와 B 둘 다 만족하는 타입 (모든 키 가짐)
  A|B : A 또는 B 중 하나 (공통된 키만 확실히 있음)
  keyof(A&B) A와 B의 키를 모두 사용할 수 있음
  keyof(A|B) A와 B에 모두 존재하는 키만 사용 가능

- interface A의 extends B : A는 B의 부분 집합
- 제너릭K의 extends B : K는 B의 부분 집합

```
function getKey<K extends string>(val: any,key:K)
//K는 문자열의 부분 집합

getKey({}, "a"); // 정상
getKey({}, 12);  // 에러
```

- tuple은 배열의 부분집합

```
const list = [1, 2, 3];
const tuple: [number, number, number] = list;

const tuple2: [number, number, number] = [1, 2, 3];
const list2: number[] = tuple2;
```
