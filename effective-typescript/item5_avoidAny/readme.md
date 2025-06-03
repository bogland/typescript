- any로 선언되면 타입안정성이 없다.

```js
let age:number // number로 선언되었어도
age = '12' as any; // as any 타입단언문에 의해 문자열이 들어가
age+= 1; // '121'이라는 문자열이 된다.
```

- any는 타입 정의된 입출력 약속을 어길수 있음

```js
function calculateAge(birthDate: Date): number {
  return 20;
}

let birthDate: any = "1990-01-19";
calculateAge(birthDate); // 에러가 안남
```

- any타입은 자동완성 기능을 제공하지 않음

- any타입은 이름 변경 기능이 제공되지 않음
  > interface의 key값 이름 변경해도 any타입이면 변경이 안됨

```js
interface Person {
  firstName: string;
  lastName2: string;
}

const person: Person = {
  firstName: "John",
  lastName2: "Doe",
};
const formatName = (p: Person) => `${p.firstName} ${p.lastName2}`;
const formatNameAny = (p: any) => `${p.firstName} ${p.lastName}`; //2로 바꿨는데도 안바뀜
```

- any타입을 쓰면 없는 key값을 써도 에러가 안난다.

```js
function renderSelector(props: ComponentProps) {}
let selectedId: number = 0;

function handleSelectItem(item: any) {
  selectedId = item.id; // item이 any타입이라 id를 뽑아도 에러가 안나지만 runtime 에서 에러남
}

renderSelector({ onSelectItem: handleSelectItem });
```

- any타입을 쓰면 런타임상에서 에러가 나므로 타입에 대한 신뢰도가 없어진다.

- any타입을 써야만 하는 경우, 단점 커버방법
  `런타임 타입 가드 사용`

```js
function handleData(data: any) {
  if (typeof data === 'object' && data !== null && 'user' in data && 'name' in data.user) {
    console.log((data as { user: { name: string } }).user.name);
  } else {
    console.warn('Invalid data structure');
  }
}
```

`임시 타입 정의 (as 키워드 사용)`
타입 단언을 쓰되 옵셔널 체이닝(?.)과 함께 사용

```js
function handleData(data: any) {
  const typedData = data as { user?: { name?: string } };
  console.log(typedData.user?.name ?? 'Unknown user');
}
```

`any를 좁은 범위로 한정짓기`

```js
function processRawData(raw: any) {
  // ✅ any 사용은 여기까지만
  const parsed: { id: number, title: string } = {
    id: raw.id,
    title: raw.title ?? "Untitled",
  };
  handleParsedData(parsed);
}

function handleParsedData(data: { id: number, title: string }) {
  console.log(data.title);
}
```

`Partial Typing`
api response가 너무 복잡해서 any를 써야한다면?
any를 쓰되 타입 단언으로 필요한 부분만 타입선언

```js
type PartialUser = {
  user?: {
    name?: string;
    email?: string;
  };
};

function handleData(data: any) {
  const partial = data as PartialUser;
  console.log(partial.user?.name ?? 'No name');
}
```

`파싱으로 구조분리`
api 구조가 너무 크면 한번 파싱해서 특정 키값만 꺼내씀

```js
function extractUserName(data: any): string | undefined {
  if (data?.user?.name && typeof data.user.name === "string") {
    return data.user.name;
  }
  return undefined;
}

console.log(extractUserName(apiResponse));
```
