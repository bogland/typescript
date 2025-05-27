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
  elephant: "present",
};

const r2: Room = obj; //에러가 안남, 잉여 property가 있어도 에러가 안뜸

interface LineChartOptions {
  logscale?: boolean;
  invertedYAxis?: boolean;
  areaChart?: boolean;
}
const opts = { logScale: true };
const o: LineChartOptions = opts; // 공통 property가 없다고 에러뜸
