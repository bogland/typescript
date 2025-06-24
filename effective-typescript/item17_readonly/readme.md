```js
// 배열의 내용이 변경되어서 예상치 못한 결과를 낳음
function arraySum(arr: number[]) {
  let sum = 0;
  for (const num of arr) {
    sum += num;
  }
  return sum;
}

function printTriangles(n: number) {
  const nums = [];
  for (let i = 0; i < n; i++) {
    nums.push(i);
    console.log(arraySum(nums)); // 0,1,2,3,4
  }
}

// readonly를 통해서 array의 내용을 변경하는것을 방지할수 있다.
// length는 가능, pop이나 push는 불가능
function arraySum2(arr: readonly number[]) {
  let sum = 0;
  for (const num of arr) {
    sum += num;
  }
  arr.pop();
  util(arr);
  return sum;
}

const util = (arr: number[]) => {
  arr.pop();
};

// 좁은 범위는 넓은 범위에 넣을 수 있다.
// number는 읽고 쓸수 있지만 readonly는 읽을 수 만 있으므로
// 기능이 많다는 것은 좁은 범위임,
const a: number[] = [1, 2, 3];
const b: readonly number[] = a;
const c: number[] = b;

// 함수타입의 파라미터는 반공변성(?)이라서 넓은 타입을 좁은 타입에 넣어야 에러가 안뜸
let func = (arr: number[]) => {}; //좁
let func2 = (arr: readonly number[]) => {}; //넓
const valFunc: typeof func = func2;
const valFunc2: typeof func2 = func;

let func3 = (arr: { a: number }) => {}; //넓
let func4 = (arr: { a: number; b: string }) => {}; //좁
const valFunc3: typeof func3 = func4;
const valFunc4: typeof func4 = func3;

function parseTaggedText(lines: string[]): string[][] {
  const paragraphs: string[][] = [];
  const currPara: string[] = [];

  const addParagraph = () => {
    if (currPara.length) {
      paragraphs.push(currPara);
      currPara.length = 0;
    }
  };

  for (const line of lines) {
    if (!line) {
      addParagraph();
    } else {
      currPara.push(line);
    }
  }
  addParagraph();
  return paragraphs;
}

const result = parseTaggedText(["no way to go. I can't forward ", "walking"]);
console.log(result); // [[]] 글이 없어져버림

function parseTaggedTextReadOnly(lines: string[]): string[][] {
  const currPara: readonly string[] = [];
  const paragraphs: string[][] = [];

  const addParagraph = () => {
    if (currPara.length) {
      paragraphs.push([...currPara]); //수정 될수 없는것을 수정될수 있는 배열에 넣는건 불가능
      currPara.length = 0;
    }
  };

  for (const line of lines) {
    if (!line) {
      addParagraph();
    } else {
      currPara.push(line);
    }
  }
  addParagraph();
  return paragraphs;
}

// (readonly string[])[] :  안쪽 배열 읽기전용, 바깥배열 변경 가능
// readonly string[][] : 바깥 배열 읽기전용, 안쪽배열 변경 가능
function parseTaggedTextReadOnly2(lines: string[]): (readonly string[])[] {
  //readonly지만 let으로 선언하면 초기화는 다시 가능..!
  let currPara: readonly string[] = [];
  currPara = [];
  const paragraphs: (readonly string[])[] = [];

  const addParagraph = () => {
    if (currPara.length) {
      paragraphs.push(currPara);
      // paragraphs.push([...currPara]); readonly로 처리된 currPara를 받기 위해선 복사본생성
      // paragraphs.push(currPara as string[])
    }
  };

  for (const line of lines) {
    if (!line) {
      addParagraph();
    } else {
      // currPara.push(line);
      currPara = currPara.concat([line]);
    }
  }
  addParagraph();
  return paragraphs;
}

// readonly는 얇게 적용됨
interface Outer {
  inner: {
    x: number;
  };
}

const o: Readonly<Outer> = {
  inner: {
    x: 1,
  },
};

o.inner = { x: 1 };
o.inner.x = 2;

// index signature에도 얇게 적용
//obj의 키에 대해서 readonly를 걸었기에 키값을 바꿀려고 하면 에러
// obj의 spread 복사본은 문제 없음

let obj: { readonly [key: string]: number } = {};
obj.hi = 1;
obj = { ...obj, hi: 12 };
const obj2 = { ...obj };
obj2.hi = 1;

```
