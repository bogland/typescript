// 객체란 키/값 쌍의 모음, 키는 보통 문자열
// 복잡한 키는 문자열로 변환됨
// 객체 키로 string, number, symbol만 사용 가능
let x: any = {};
x[[1, 2, 3]] = 2;
console.log(x); // { '1,2,3': 2 }

//숫자 키도 문자열로 변환
const y = { 1: 2, 3: 4 };
console.log("y", y); // { '1': 2, '3': 4 }

// 배열은 key값이 number로 접근하는게 맞지만 배열도 object타입이기에
// Ojbect.keys로 확인시 키값이 문자열로 확인됨
// 그래서 헷갈리지 않게 TS 컴파일단계에선 number타입이 아니면 에러가 출력됨

const arr = [1, 2, 3];

// Object.keys로 확인시 문자키로 출력됨
const keyY = Object.keys(arr);
console.log("keys", keyY); // [ '1', '3' ]

// 배열은 Array에 대한 타입은 아래와 비슷함
interface Array<T> {
  [n: number]: T;
}

const xs = [1, 2, 3];
const x0 = xs[0];
const x1 = xs["1"];

function get<T>(array: T[], k: string): T {
  return array[k];
}

//배열의 key에 string을 넣었는데도 허용됨
// 타입이 불안정하다면 for in 문은 for of문이나 for루프에 비해서 느리다.
const keys = Object.keys(xs);
for (const key in xs) {
  key;
  const x = xs[key];
}

for (const x of xs) {
  x;
}

xs.forEach((x, i) => {
  i;
  x;
});

for (let i = 0; i < xs.length; i++) {
  const x = xs[i];
  if (x < 0) break;
}

// number로 인덱스 시그니처를 사용해야하는경우, 배열이나 튜플을 사용한다.
// 배열의 길이를 가지는 object 선언시 ArrayLike 사용
// ArrayLike를 사용하면 숫자 인덱스로 접근하거나 length를 사용할수 있으나 map이나 push는 사용불가

function checkedAccess<T>(xs: ArrayLike<T>, i: number): T {
  if (i < xs.length) {
    return xs[i];
  }
}

const tupleLike: ArrayLike<string> = {
  "0": "A",
  "1": "B",
  length: 2,
};
