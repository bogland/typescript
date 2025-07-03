```js
// 변수를 alias(별칭)라 부른다.
const borough = { name: "Brooklyn", location: [40.688, -73.979] };
const loc = borough.location;

//
interface Coordinate {
  x: number;
  y: number;
}

interface BoundingBox {
  x: [number, number];
  y: [number, number];
}

interface Polygon {
  exterior: Coordinate[];
  holes: Coordinate[][];
  bbox?: BoundingBox;
}

function isPointInPolygon(polygon, pt: Coordinate) {
  if (polygon.bbox) {
    if (
      pt.x < polygon.bbox.x[0] ||
      pt.x > polygon.bbox.x[1] ||
      pt.y < polygon.bbox.y[0] ||
      pt.y > polygon.bbox.y[1]
    ) {
      return false;
    }
  }
}

// 코드 중복을 위해 box 변수를 선언했지만 타입 가드는 polygon.bbox에 하다보니 box는 undefined가 될 수 있다.
function isPointInPolygon2(polygon: Polygon, pt: Coordinate) {
  const box = polygon.bbox;
  if (polygon.bbox) {
    if (
      pt.y < box.y[0] ||
      pt.y > box.y[1] ||
      pt.y < box.y[0] ||
      pt.y > box.y[1]
    )
      return false;
  }
}

function isPointInPolygon3(polygon: Polygon, pt: Coordinate) {
  polygon.bbox;
  const box = polygon.bbox;
  box;
  if (polygon.bbox) {
    polygon.bbox;
    const box = polygon.bbox;
    box;
  }
}

// undefined 는 잘 피했지만 box 변수명이 bbox와 헷갈림
function isPointInPolygon4(polygon: Polygon, pt: Coordinate) {
  const box = polygon.bbox;
  if (box) {
    if (
      pt.x < box.x[0] ||
      pt.x > box.x[1] ||
      pt.y < box.y[0] ||
      pt.y > box.y[1]
    ) {
      return false;
    }
  }
}

//객체 비구조화를 통한 변수 선언
function isPointInPolygon5(polygon: Polygon, pt: Coordinate) {
  const { bbox } = polygon;
  if (bbox) {
    if (
      pt.x < bbox.x[0] ||
      pt.x > bbox.x[1] ||
      pt.y < bbox.y[0] ||
      pt.y > bbox.y[1]
    ) {
      return false;
    }
  }
}

//비구조화를 하더라도 안의 속성이 선택적인지 확인 필요
bbox.x;

//bbox와 calculatePolygonBbox이후의 polygon.bbox는 다른값을 참조
function isPointInPolygon6(polygon: Polygon, pt: Coordinate) {
  const { bbox } = polygon;
  if (!bbox) {
    calculatePolygonBbox(polygon);
  }
}

// ts는 함수가 타입을 변경시킨다고 가정함, 실제론 무효화될수 있음
function fn(p: Polygon) {}

function isPointInPolygon7(polygon: Polygon, pt: Coordinate) {
  polygon.bbox;
  if (polygon.bbox) {
    polygon.bbox;
    fn(polygon);
    polygon.bbox;
  }
}
```
