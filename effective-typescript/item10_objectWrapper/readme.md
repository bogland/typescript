- x는 primitive immutable 타입이라서 property할당시 해당 속성이 사라짐

```js
const x = "hello";
x.language = "English";
console.log(x.language); //undefined
```

- primitive 타입인데 함수가 있던데요?  
  primitive 타입은 객체 래퍼 타입이 존재

number : Number  
boolean : Boolean  
symobol : Symbol  
bigint : Bigint  
string : String

- string 타입은 String타입을 할당할수 있지만
  String은 string에 할당하지 못함

```js
function isGreeting(phrase: string) {
  return ["hello", "hi", "howdy", "hola"].includes(phrase);
}

function isGreeting2(phrase: String) {
  return ["hello", "hi", "howdy", "hola"].includes(phrase);
}
```

- 굳이 객체 래퍼 타입으로 선언할 필요는 없음
