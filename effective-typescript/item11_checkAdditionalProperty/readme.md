- object literal 선언시 타입에 어긋나면 에러뜨지만
  object literal로 정의된 변수를 넣으면(변수 간접할당시) 추가 프로퍼티에 대해선 타입 에러가 안뜸
  마치 타입 단언문 처럼 동작

```js
interface Room {
  numDoors: number;
  ceilingHeightFt: number;
}

const r: Room = {
  numDoors: 1,
  ceilingHeightFt: 10,
  elephant: "preset", //elepant 존재하지 않는다고 에러뜸
};

const obj = {
  numDoors: 1,
  ceilingHeightFt: 10,
  elephnant: "present",
};

const r2: Room = obj; //에러가 안남
```

- optional property를 가진 type이라도 property가 하나도 일치하지 않으면 에러뜸

```
interface LineChartOptions {
  logscale?: boolean;
  invertedYAxis?: boolean;
  areaChart?: boolean;
}
const opts = { logScale: true };
const o: LineChartOptions = opts; // 하나도 property가 일치하지 않을때 에러뜸

```
