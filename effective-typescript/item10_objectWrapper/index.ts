const x = "hello";
x.language = "English";
console.log(x.language);

function isGreeting(phrase: string) {
  return ["hello", "hi", "howdy", "hola"].includes(phrase);
}

function isGreeting2(phrase: String) {
  return ["hello", "hi", "howdy", "hola"].includes(phrase);
}
const b: String = "123123";
const a: string = b;

const _b: string = "123123";
const _a: String = _b;

type TABC = "A" | "B" | "C";
type TB = "B";
const variableB: TB = "B";
const variableX: TABC = variableB;
//string 타입은 String타입을 할당할수 있지만
//String은 string에 할당하지 못함

interface IA {
  a: string;
}

interface IAB {
  a: string;
  b: string;
}

let _ab: IAB = {
  a: "asdf",
  b: "asdf",
};
const __a: IA = _ab;
console.log(__a);

const func = (a: IA) => {};
func(_ab);
