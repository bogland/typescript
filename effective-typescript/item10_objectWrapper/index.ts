const x = "hello";
x.language = "English";
console.log(x.language);

function isGreeting(phrase: string) {
  return ["hello", "hi", "howdy", "hola"].includes(phrase);
}

function isGreeting2(phrase: String) {
  return ["hello", "hi", "howdy", "hola"].includes(phrase);
}
//string 타입은 String타입을 할당할수 있지만
//String은 string에 할당하지 못함
