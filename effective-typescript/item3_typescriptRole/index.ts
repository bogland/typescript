let x = "hello";
x = 1234;
console.log(x);

interface Square {
  width: number;
}

interface Rectangle extends Square {
  height: number;
}

type Shape = Square | Rectangle;

function calculateArea(shape: Shape) {
  if (shape instanceof Rectangle) {
    // ~~~~~~~~~~ 'Rectangle'은(는) 형식만 참조하지만,
    //           여기서는 값으로 사용되고 있습니다.
    return shape.width * shape.height;
    //              ~~~~~~ 'Shape' 형식에 'height' 속성이 없습니다.
  } else {
    return shape.width * shape.width;
  }
}

function calculateArea2(shape: Shape) {
  if ("height" in shape) {
    return shape.width * shape.height;
  } else {
    return shape.width * shape.width;
  }
}

interface Square2 {
  kind: "square";
  width: number;
}

interface Rectangle2 {
  kind: "rectangle";
  width: number;
  height: number;
}

type Shape2 = Square2 | Rectangle2;
function calculateArea3(shape: Shape2) {
  if (shape.kind === "rectangle") {
    return shape.width * shape.height; //타입이 Retangle2
  } else {
    return shape.width * shape.width;
  }
}

class Square {
  constructor(public width: number) {}
}
class Rectangle extends Square {
  constructor(public width: number, public height: number) {
    super(width);
  }
}
type Shape4 = Square | Rectangle;

function calculateArea4(shape: Shape4) {
  if (shape instanceof Rectangle) {
    return shape.width * shape.height;
  } else {
    return shape.width * shape.width;
  }
}

function asNumber(val: number | string): number {
  return val as number;
}

function asNumber2(val: number | string): number {
  return typeof val === "string" ? Number(val) : val;
}

function setLightSwitch(value: boolean) {
  switch (value) {
    case true:
      console.log("on");
      break;
    case false:
      console.log("off");
      break;
    default:
      console.log("invalid");
  }
}
