- 숫자로 이뤄진 interface에 대해서 for of 문을 돌려도 타입에러가 뜬다.
  > 타입스크립트는 `덕 타이핑`때문에 요구하는 일부 key값만 만족해도 해당 타입을 만족했다고 판단.
  > 이를 `구조적 타이핑`이라고도 부름
  > 여러타입 받지 않고 특정 타입만 받도록 하고 싶으면 brand를 붙여야함

```
interface Vector3D {
  x: number;
  y: number;
  z: number;
}

function calculateLengthL1(v: Vector3D) {
  let length = 0;
  for (const axis of Object.keys(v)) {
    const coord = v[axis]; //Element implicitly has an 'any' type because expression of type 'string' can't be used to index type 'Vector3D'.
    length += Math.abs(coord);
  }
  return length;
}
```

<해결법>
brand를 쓰면 다른 타입은 방지하면서 Vector3D의 키값만을 가져서 as [Type]으로 선언후 for of 문을 돌릴수 있음

```
interface Vector3D {
  x: number;
  y: number;
  z: number;
  // 브랜드용 필드 (다른 용도로 쓰이지 않음)
  _brand?: "Vector3D";
}

// x, y, z만 허용하는 축 키 타입
type VectorAxis = keyof Omit<Vector3D, "_brand">;

function calculateLengthL1(v: Vector3D) {
  let length = 0;
  for (const axis of Object.keys(v) as VectorAxis[]) {
    const coord = v[axis];
    length += Math.abs(coord);
  }
  return length;
}
```

- 구조적 타이핑을 이용한 추상화
  <구체화된 함수, PostgresDB>

```
interface Author {
  first: string;
  last: string;
}

function getAuthors(database: PostgresDB): Author[] {
  const authorRows = database.runQuery(`SELECT FIRST, LAST FROM AUTHORS`);
  return authorRows.map((row) => ({ first: row[0], last: row[1] }));
}
```

<추상화처리, DB>

```
interface DB {
  runQuery: (sql: string) => any[];
}
function getAuthors(database: DB): Author[] {
  const authorRows = database.runQuery(`SELECT FIRST, LAST FROM AUTHORS`);
  return authorRows.map((row) => ({ first: row[0], last: row[1] }));
}
```

<Text코드 작성 용이>
구조적 타이핑에 의해서 DB가 가지는 runQuery만 만족하면 어떤 object든 넣어도 타입 에러가 안남

```

test("getAuthors", () => {
  const authors = getAuthors({
    runQuery: (sql: string) => {
      return [
        ["Toni", "Morrison"],
        ["J.", "Kinsella"],
      ];
    },
  });
  expect(authors).toEqual([
    { first: "Toni", last: "Morrison" },
    { first: "J.", last: "Kinsella" },
  ]);
});

```
