```ts
// 타입과 인터페이스 차이

// literal object에 대해서 잉여 프로퍼티 에러뜸
type TState = {
  name: string;
  capital: string;
};

interface IState {
  name: string;
  capital: string;
}

const s1: TState = {
  name: "California",
  capital: "Sacramento",
  population: 39500000, // 잉여 프로퍼티 에러
};

const s2: IState = {
  name: "California",
  capital: "Sacramento",
  population: 39500000,
};

// 인덱스 시그니처 모두 사용 가능
type TDict = { [key: string]: string };
interface IDict {
  [key: string]: string;
}

const t1: TDict = {
  a: "1",
};

//함수 타입도 모두 가능
type TFn = (x: number) => string;
interface Ifn {
  (x: number): string;
}
const toStrT: TFn = (x) => x.toString();
const toStrI: Ifn = (x) => x.toString();

// 함수 타입에 프로퍼티 추가 가능
type TFnWidthProperties = {
  (x: number): number;
  prop: string;
};

interface IFnWidthProperties {
  (x: number): number;
  prop: string;
}

// 제네링 가능
type TPair<T> = {
  first: T;
  second: T;
};

interface IPair<T> {
  first: T;
  second: T;
}

// 인터페이스의 타입 확장시 타입도 쓸수 있음
interface IStateWidthPop extends TState {
  population: number;
}

// 유니온 같이 복잡한 타입 확장은 타입만 가능
type TStateWidthPop = IState & { population: number }; //interface는 유니온 같은 복잡한 타입 확장을 못함

//클래스는 interface type 둘다 받을수 있음
class StateT implements TState {
  name: string;
  capital: string;
}

class StateI implements IState {
  name: string;
  capital: string;
}

//타입의 경우 유니온 타입 확장이 가능
type Input = {
  age: number;
};
type Output = {
  isMarried: boolean;
};
type NamedVariable = (Input | Output) & { name: string };
type Pair = [number, number]; //튜플도 쉽게 선언
type StringList = string[];
type NamedNums = [string, ...number[]];

const x: NamedVariable = {
  age: 20,
  name: "John",
};

const arrNumber: NamedNums = ["1", 2, 3];

//인터페이스는 보강(augment) 가능
interface IState5 {
  name: string;
  capital: string;
}

interface IState5 {
  population: number;
}

const s3: IState5 = {
  name: "California",
  capital: "Sacramento",
  population: 39500000,
};
```
