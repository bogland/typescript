interface Vector2D {
  x: number;
  y: number;
}
interface Vector3D {
  x: number;
  y: number;
  z: number;
}

function calculateLength(v: Vector2D) {
  return Math.sqrt(v.x * v.x + v.y * v.y);
}

interface NamedVector {
  name: string;
  x: number;
  y: number;
}

const v: NamedVector = { x: 3, y: 4, name: "Zee" };
calculateLength(v); // 5

function calculateLengthL1(v: Vector3D) {
  let length = 0;
  for (const axis of Object.keys(v)) {
    const coord = v[axis];
    length += Math.abs(coord);
  }
  return length;
}

interface Vector3D {
  x: number;
  y: number;
  z: number;
}

interface Vector3D2 {
  x: number;
  y: number;
  z: number;
  // 브랜드용 필드 (다른 용도로 쓰이지 않음)
  _brand?: "Vector3D";
}

// x, y, z만 허용하는 축 키 타입
type VectorAxis = keyof Omit<Vector3D2, "_brand">;

function calculateLengthL2(v: Vector3D2) {
  let length = 0;
  for (const axis of Object.keys(v) as VectorAxis[]) {
    const coord = v[axis];
    length += Math.abs(coord);
  }
  return length;
}

interface Author {
  first: string;
  last: string;
}

function getAuthors(database: PostgresDB): Author[] {
  const authorRows = database.runQuery(`SELECT FIRST, LAST FROM AUTHORS`);
  return authorRows.map((row) => ({ first: row[0], last: row[1] }));
}

interface DB {
  runQuery: (sql: string) => any[];
}
function getAuthors2(database: DB): Author[] {
  const authorRows = database.runQuery(`SELECT FIRST, LAST FROM AUTHORS`);
  return authorRows.map((row) => ({ first: row[0], last: row[1] }));
}

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
