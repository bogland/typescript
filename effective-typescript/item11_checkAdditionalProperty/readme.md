```ts
interface Room {
  numDoors: number;
  ceilingHeightFt: number;
}
//literal object 사용시 잉여 속성 검사함
const r: Room = {
  numDoors: 1,
  ceilingHeightFt: 10,
  elephant: "preset", //elepant 존재하지 않는다고 에러뜸
};

// 임시 변수 선언후 변수를 넣으면 Room만 만족하는지 검사, 잉여검사 x
const obj = {
  numDoors: 1,
  ceilingHeightFt: 10,
  elephant: "present",
};

const r2: Room = obj; //에러가 안남, 잉여 property가 있어도 에러가 안뜸

interface Options {
  title: string;
  darkMode?: boolean;
}

function createWindow(options: Options) {
  if (options.darkMode) {
  }
}

// 함수 파라미터로 literal object 사용시 잉여속성 검사
createWindow({ title: "Spider Solitudte", darkmode: true });

const windowParams = {
  title: "Spider Solitudte",
  darkmode: true,
};
createWindow(windowParams);

// optional property를 가진 type이라도 property가 하나도 일치하지 않으면 에러뜸
interface LineChartOptions {
  logscale?: boolean;
  invertedYAxis?: boolean;
  areaChart?: boolean;
}
const opts = { logScale: true };
const o: LineChartOptions = opts; // 하나도 property가 일치하지 않을때 에러뜸

// 빈객체는 괜춘(?)
const objEmpty = {};
const o2: LineChartOptions = objEmpty; // 하나도 property가 일치하지 않을때 에러뜸
```
