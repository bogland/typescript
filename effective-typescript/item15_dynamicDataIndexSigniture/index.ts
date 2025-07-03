type Rocket = { [property: string]: string };
const rocket: Rocket = {
  name: "Falcon 9",
  variant: "v1.0",
  thrust: "4,940 kN",
};

// 동적 key에 대해선 인덱스 시그니쳐 사용

function parseCSV(input: string): { [columnName: string]: string }[] {
  const lines = input.split("\n");
  const [header, ...rows] = lines;
  const headerColumns = header.split(",");
  return rows.map((rowStr) => {
    const row: { [columnName: string]: string } = {};
    rowStr.split(",").forEach((cell, i) => {
      row[headerColumns[i]] = cell;
    });
    return row;
  });
}

// 인덱스 시그니쳐 타입이 특정 타입으로 정해져 있다면 타입단언문으로 특정 타입 캐스팅
//window.csvData = `productId,name,price`;
interface ProductRow {
  productId: string;
  name: string;
  price: number;
}
declare let csvData: string; //외부에 csvData가 이미 선언되어 있다 알려줌
const products = parseCSV(csvData) as unknown as ProductRow[];

// 열이 있다는 보장이 없다면?
function safeParseCSV(
  input: string
): { [columnName: string]: string | undefined }[] {
  return parseCSV(input);
}

const rows = parseCSV(csvData);
const prices: { [product: string]: number } = {};
for (const row of rows) {
  prices[row.productId] = Number(row.price);
}

const safeRows = safeParseCSV(csvData);
for (const row of safeRows) {
  prices[row.productId] = Number(row.price);
}

// 최대한 인덱스 시그니쳐 보단 선택적 필드 또는 유니온타입으로 정의
interface Row1 {
  [column: string]: number;
}
interface Row2 {
  a: number;
  b?: number;
  c?: number;
  d?: number;
}
type Row3 =
  | { a: number }
  | { a: number; b: number }
  | { a: number; b: number; c: number }
  | { a: number; b: number; c: number; d: number };

//마지막 형태가 제일 좋지만 번거롭다.
//Record 사용
type Vec3D = Record<"x" | "y" | "z", number>;
/*
Type Vec3D = {
  x: number;
  y: number;
  z: number;
};
*/

interface Test {
  a: string;
  b: string;
}
const test: Test = { a: "123", b: "456" };

type TestRecord = Record<"a" | "b", string>;
const testRecord: TestRecord = { a: "123", b: "456" };

//매핑된 타입
type Vec3D_ = { [k in "x" | "y" | "z"]: number };

//매핑된 타입, 값 다르게
type ABC = { [k in "a" | "b" | "c"]: k extends "b" ? string : number };
/*
Type ABC = {
  a: number;
  b: string;
  c: number;
};
*/
