// el이 HTMLElement | null인경우 널처리를 통한 타입을 좁힌 케이스
const el = document.getElementById("foo");
if (el) {
  el.innerHTML = "party Time".blink();
} else {
  alert("No element #foo");
}

// 미리 return 혹은 에러 던지기 처리로 나머지 부분은 타입을 좁힐수 있음
const el2 = document.getElementById("foo");
if (!el) throw new Error("Unable to find #foo");
el;
el.innerHTML = "party Time".blink();

//instanceof를 통해서 타입 좁히기
function contains(text: string, search: string | RegExp) {
  if (search instanceof RegExp) {
    return !!search.exec(text);
  }
  return text.includes(search);
}

// 속성 체크로 타입 좁히기
interface A {
  a: number;
}
interface B {
  b: number;
}
function pickAB(ab: A | B) {
  if ("a" in ab) {
    ab; //A
  } else {
    ab; //B
  }
  ab; // A | B
}

// Array.isArray로 타입 좁히기
function contains(text: string, terms: string | string[]) {
  const termList = Array.isArray(terms) ? terms : [terms];
  termList; // 타입이 string[]
}

// typeof null은 object이므로 null은 제외되지 않음
const el3 = document.getElementById("foo");
if (typeof el3 === "object") {
  el3; // 타입이 HTMLElement | null
}

// !x로  string과 number를 거르고 싶었지만 ""와 0은 !x가 true가 되기때문에 여전히 좁히지 못함
function foo(x?: number | string | null) {
  if (!x) {
    x; // 타입이 string | number | null | undefined
  }
}

// null 처리 방법
const el4 = document.getElementById("foo");
if (el4 !== null) {
  el4; // 타입이 HTMLElement
}

// null 처리 방법 2
function foo2(x?: number | string | null) {
  if (x != null && x !== "") {
    x; // 타입은 string | number (단, ''는 제외됨, 0은 포함됨)
  }
}

//x != null → null과 undefined를 모두 제외함 (x !== null && x !== undefined와 동일)

// null 처리 방법 3, 원하는 타입만 남기기
function foo3(x?: number | string | null) {
  if (typeof x === "string" && x !== "") {
    // string만 남음
    x; // string
  } else if (typeof x === "number" && x !== 0) {
    // number만 남음
    x; // number
  }
}

//                  null과                  undefined 차이
//용도 :            명시적 값 없음을 표현      초기화 혹은 정의가 안됨
//typeof 결과 :	    "object"	            "undefined"
//JSON.stringify:	포함됨: "key": null	    제외됨
let x1 = null;
x1;
let x2;
x2;
typeof null === "object"; // true
typeof undefined === "undefined"; // true

//
interface UploadEvent {
  type: "upload";
  filename: string;
  contents: string;
}

interface DownloadEvent {
  type: "download";
  filename: string;
}

type AppEvent = UploadEvent | DownloadEvent;
function handleEvent(e: AppEvent) {
  switch (e.type) {
    case "download":
      e;
      break;
    case "upload":
      e;
      break;
  }
}

// 사용자 정의 타입 가드
// 반환 타입이 true인 경우 타입이 좁혀짐짐
function isInputElement(el: HTMLElement): el is HTMLInputElement {
  return "value " in el;
}
function getElementContent(el: HTMLElement) {
  if (isInputElement(el)) {
    el;
    return el.value;
  }
  el;
  return el.textContent;
}

// undefined를 포함한 결과
const jackson5 = ["jackie", "jermaine", "marlon", "michael", "tito"];
const members = ["Janet", "Michael"].map((who) =>
  jackson5.find((n) => n === who)
); // (string|undefined)[]

// undefined를 걸러내고 싶었으나 여전히 undefined?
const members2 = ["Janet", "Michael"]
  .map((who) => jackson5.find((n) => n === who))
  .filter((who) => who !== undefined);

// x가 undefined가 아닌 경우에 결과값은 입력 파라미터 타입임
function isDefined<T>(x: T | undefined): x is T {
  return x !== undefined;
}

const members3 = ["Janet", "Michael"]
  .map((who) => jackson5.find((n) => n === who))
  .filter(isDefined);

// ㅇㅇㅇ
type AosType = { name: string };
type IosType = { version: number };

type Platform = "aos" | "ios";

type Data<T extends Platform> = T extends "aos"
  ? AosType & { platform: "aos" }
  : T extends "ios"
  ? IosType & { platform: "ios" }
  : never;

function getData<T extends Platform>(platform: T): Data<T> {
  if (platform === "aos") {
    return {
      name: "Android",
      platform: "aos",
    } as Data<T>;
  } else {
    return {
      version: 17,
      platform: "ios",
    } as Data<T>;
  }
}

const data1 = getData("aos");
data1;
//     AosType & { platform: "aos" }

const data2 = getData("ios");
data2;
//     IosType & { platform: "ios" }
