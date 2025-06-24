```js
// 타입 추론이 가능한 경우 타입 선언하지 않기

let x: number = 12;
let x2 = 12;

// 리터럴 객체는 그냥 값만 선언해도 타입이 추론된다.

const person: {
  name: string,
  born: {
    where: string,
    when: string,
  },
  died: {
    where: string,
    when: string,
  },
} = {
  name: "Marie Curie",
  born: {
    where: "Warsaw, Poland",
    when: "1867",
  },
  died: {
    where: "Paris, France",
    when: "1934",
  },
};

const person2 = {
  name: "Marie Curie",
  born: {
    where: "Warsaw, Poland",
    when: "1867",
  },
  died: {
    where: "Paris, France",
    when: "1934",
  },
};

// 함수 리턴도 추론됨
function square(nums: number[]) {
  return nums.map((x) => x * x);
}

const squares = square([1, 2, 3, 4]);

// string literal 타입은 const로 선언시 구체적으로 추론됨
const axis1: string = "x";
const axis2 = "y";
let axis3 = "z";

// 함수 매개변수로 넘겨진것들은 따로 타입을 지정할 필요없음
// 매개변수로 넘어온것을 또 함수안에서 타입정의시 id의 타입이 바뀌었을때 함수내에서도 바꿔줘야해서 번거로움
interface Product {
  id: number;
  name: string;
  price: number;
}
function logProduct(product: Product) {
  const id: number = product.id;
  const name = product.name;
  const price = product.price;
  console.log(id, name, price);
}
// 비구조화 할당문 (destructuring assignment) 사용시 타입 추론가능
function logProduct2(product: Product) {
  const { id, name, price } = product;
}

//초기화된 매개변수도 추론됨
function parseNumber(str: string, base = 2) {}

// 콜백 함수의 매개변수 타입도 추론됨
app.get("/", (req: express.Request, res: express.Response) => {
  res.send("OK");
});

app.get("/", (req, res) => {
  res.send("OK");
});

// 객체 잉여 속성 체크를 위해선 타입 명시
const elmo: Product = {
  id: 1,
  name: "Elmo",
  price: 10,
  flavor: "banana",
};

// 객체 선언시 타입 명시 안하면 사용하는 쪽에서 컴파일 에러 발생
const elmo2 = {
  id: 1,
  name: "Elmo",
};
logProduct(elmo2);

// 함수 반환시 타입을 명시하여 오류 방지 가능
function getQuote(ticker: string) {
  return fetch("https://quotes").then((response) => response.json());
}

// getQuote는 Promise 타입인데 return이 Promise가 아니라서 호출하는쪽에서 에러 발생
const cache: { [ticker: string]: string } = {};
function getQuote2(ticker: string) {
  if (ticker in cache) {
    return cache[ticker];
  }
  return fetch("https://quotes").then((response) => {
    return response.json().then((quote) => {
      cache[ticker] = quote;
      return quote;
    });
  });
}

getQuote2("MSFT").then();

const cache2: { [ticker: string]: number } = {};
function getQuote3(ticker: string): Promise<number> {
  if (ticker in cache) {
    return cache[ticker];
  }
  return fetch("https://quotes").then((response) => {
    return response.json().then((quote) => {
      cache[ticker] = quote;
      return quote;
    });
  });
}

// return type 지정을 안하면 객체 타입인 경우 풀려서 나와 헷갈림
interface Vector2D {
  x: number;
  y: number;
}
function add(a: Vector2D, b: Vector2D) {
  return { x: a.x + b.x, y: a.y + b.y };
}
add({ x: 0, y: 1 }, { x: 0, y: 1 });
```
