class Cylinder {
  radius = 1;
  height = 1;
}

const v = typeof Cylinder; // 값이 "function"
type T = typeof Cylinder; // 타입이 typeof Cylinder

declare let fn: T; //생성자 타입 T
const c = new fn();
type C = InstanceType<typeof Cylinder>; // 생상자 타입 전환 -> 인스턴스 타입 C

interface Person {
  name: string;
  age: number;
}

const first: Person["name"] = "John";

type PersonEl = Person["name" | "age"]; //string | number
type Tuple = [string, number, Date]; // 튜플 타입
type TupleEl = Tuple[number]; //  인덱스 타입 접근법, 튜플의 모든 인덱스로 접근 가능한 타입을 유니옷으로 묶음
// string | number | Date;
